import { APIGatewayEvent } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import generateResponse from "./utils/utils";

exports.handler = async (event: APIGatewayEvent) => {
  console.log("inside put function");
  const docClient = new DynamoDB.DocumentClient();
  const body = JSON.parse(event.body!);
  const { id, todo, username, status } = body;
  try {
    const data = await docClient
      .put({
        TableName: process.env.TABLE_NAME || "",
        Item: {
          id: `${id}`,
          todo: `${todo}`,
          username: `${username}`,
          status: status,
        },
      })
      .promise();

    return generateResponse(200, data);
  } catch (err) {
    console.log("Error in PUT function", err);
    return generateResponse(500, { message: "internal server error" });
  }
};
