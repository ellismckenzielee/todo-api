import { DynamoDB } from "aws-sdk";
exports.handler = async () => {
  console.log("inside delete function");
  const docClient = new DynamoDB.DocumentClient();

  try {
    const data = await docClient
      .delete({ TableName: process.env.TABLE_NAME || "", Key: { id: "1" } })
      .promise();

    let response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      isBase64Encoded: false,
      body: JSON.stringify({ message: "successful deletion" }),
    };
    console.log("RESPONSE!!!!!", response);
    return response;
  } catch (err) {
    console.log("ERROR", err);
  }
};
