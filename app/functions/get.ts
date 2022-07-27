import { DynamoDB } from "aws-sdk";
exports.handler = async () => {
  console.log("inside get function");
  const docClient = new DynamoDB.DocumentClient();

  try {
    const data = await docClient
      .scan({ TableName: process.env.TABLE_NAME || "" })
      .promise();

    return data;
  } catch (err) {
    console.log("ERROR", err);
  }
};
