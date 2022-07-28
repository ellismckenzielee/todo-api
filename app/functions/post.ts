import { APIGatewayEvent } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import generateResponse, { generate500 } from "./utils/utils";

exports.handler = async (event: APIGatewayEvent) => {
  console.log("inside post function");
  const docClient = new DynamoDB.DocumentClient();
  const body = JSON.parse(event.body!);
  const { id, todo, username } = body;
  try {
    const data = await docClient
      .put({
        TableName: process.env.TABLE_NAME || "",
        Item: {
          id: `${id}`,
          todo: `${todo}`,
          username: `${username}`,
          complete: false,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();
    return generateResponse(200, data);
  } catch (err) {
    console.log("Error in POST function", err);
    return generate500();
  }
};
