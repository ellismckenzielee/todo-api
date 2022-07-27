import { DynamoDB } from "aws-sdk";
exports.handler = async () => {
  console.log("inside put function");
  const docClient = new DynamoDB.DocumentClient();

  try {
    const data = await docClient
      .put({
        TableName: process.env.TABLE_NAME || "",
        Item: { id: "3", username: "calippo" },
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
  }
};
