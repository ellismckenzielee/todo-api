import { DynamoDB } from "aws-sdk";
exports.handler = async () => {
  console.log("inside post function");
  const docClient = new DynamoDB.DocumentClient();

  try {
    const data = await docClient
      .put({
        TableName: process.env.TABLE_NAME || "",
        Item: { id: '3', username: "calippo" },
      })
      .promise();

    return data;
  } catch (err) {
    console.log("ERROR", err);
  }
};
