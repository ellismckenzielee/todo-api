import { APIGatewayEvent } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
exports.handler = async (event: APIGatewayEvent) => {
  console.log("inside delete function");
  const docClient = new DynamoDB.DocumentClient();
  const body = JSON.parse(event.body!);
  const { id } = body.id;
  try {
    await docClient
      .delete({ TableName: process.env.TABLE_NAME || "", Key: { id: `${id}` } })
      .promise();

    let response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      isBase64Encoded: false,
      body: JSON.stringify({ message: "successful deletion" }),
    };
    return response;
  } catch (err) {
    console.log("ERROR", err);
    let response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      isBase64Encoded: false,
      body: JSON.stringify({ message: "unsuccessul deletion" }),
    };
    return response;
  }
};
