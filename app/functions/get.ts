import { APIGatewayEvent } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import generateResponse, { generate500 } from "./utils/utils";
exports.handler = async (event: APIGatewayEvent) => {
  console.log("inside get function");
  const docClient = new DynamoDB.DocumentClient();
  try {
    const data = await docClient
      .scan({ TableName: process.env.TABLE_NAME || "" })
      .promise();

    return generateResponse(200, data);
  } catch (err) {
    console.log("Error in GET function", err);
    return generate500();
  }
};
