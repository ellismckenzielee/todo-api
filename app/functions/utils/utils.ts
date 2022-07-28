export default function generateResponse(status: number, data: Object) {
  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
    },
    isBase64Encoded: false,
    body: JSON.stringify(data),
  };
}
