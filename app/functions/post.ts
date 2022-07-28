import { APIGatewayEvent } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
exports.handler = async (event: APIGatewayEvent) => {
  console.log("inside post function");
  const docClient = new DynamoDB.DocumentClient();
  const body = JSON.parse(event.body!);
  const { id, todo, username } = body;
  try {
    const data = await docClient
      .put({
        TableName: process.env.TABLE_NAME || "",
        Item: { id: `${id}`, todo: `${todo}`, username: `${username}` },
      })
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
    let response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      isBase64Encoded: false,
      body: JSON.stringify({ message: "something went wrong" }),
    };
    return response;
  }
};
