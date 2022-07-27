import { DynamoDB } from "aws-sdk";
exports.handler = async () => {
  console.log("inside delete function");
  const docClient = new DynamoDB.DocumentClient();

  try {
    const data = await docClient
      .delete({ TableName: process.env.TABLE_NAME || "", Key: { id: "1" } })
      .promise();

    return data;
  } catch (err) {
    console.log("ERROR", err);
  }
};
