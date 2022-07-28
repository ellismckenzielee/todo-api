import { APIGatewayEvent } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import generateResponse from "./utils/utils";
exports.handler = async (event: APIGatewayEvent) => {
  console.log("inside delete function");
  const docClient = new DynamoDB.DocumentClient();
  const body = JSON.parse(event.body!);
  const id = body.id;
  try {
    await docClient
      .delete({ TableName: process.env.TABLE_NAME || "", Key: { id: `${id}` } })
      .promise();

    return generateResponse(200, { message: "success" });
  } catch (err) {
    console.log("Error in delete lambda", err);
    return generateResponse(500, { message: "internal server error" });
  }
};
