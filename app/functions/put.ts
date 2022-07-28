import { APIGatewayEvent } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import generateResponse, { generate500 } from "./utils/utils";

exports.handler = async (event: APIGatewayEvent) => {
  console.log("inside put function");
  const docClient = new DynamoDB.DocumentClient();
  const body = JSON.parse(event.body!);
  const { id, complete } = body;
  try {
    const data = await docClient
      .update({
        TableName: process.env.TABLE_NAME || "",
        Key: {
          id: `${id}`,
        },
        UpdateExpression: "set complete = :val",
        ExpressionAttributeValues: {
          ":val": complete,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return generateResponse(200, data);
  } catch (err) {
    console.log("Error in PUT function", err);
    return generate500();
  }
};
