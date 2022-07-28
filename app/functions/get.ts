import { APIGatewayEvent } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
exports.handler = async (event: APIGatewayEvent) => {
  console.log("inside get function");
  const docClient = new DynamoDB.DocumentClient();
  try {
    const data = await docClient
      .scan({ TableName: process.env.TABLE_NAME || "" })
      .promise();

    let response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      isBase64Encoded: false,
      body: JSON.stringify(data),
    };
    console.log("RESPONSE!!!!!", response);
    return response;
  } catch (err) {
    console.log("ERROR", err);
  }
};
