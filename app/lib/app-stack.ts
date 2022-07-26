import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_lambda_nodejs, aws_apigateway, aws_dynamodb } from "aws-cdk-lib";
export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    // API-Methods which map to a Lambda
    const methods = ["GET", "POST", "PUT", "DELETE"];
    const table = new aws_dynamodb.Table(this, "TodoTable", {
      partitionKey: { name: "id", type: aws_dynamodb.AttributeType.STRING },
    });
    const TABLE_NAME = table.tableName;
    const api = new aws_apigateway.RestApi(this, "todo-api");

    const todos = api.root.addResource("todos");
    methods.forEach((method) => {
      const lambda = new aws_lambda_nodejs.NodejsFunction(this, method, {
        entry: `functions/${method}.ts`,
        environment: {
          TABLE_NAME: TABLE_NAME || "",
        },
      });
      const integration = new aws_apigateway.LambdaIntegration(lambda);
      todos.addMethod(method, integration, { apiKeyRequired: true });
      table.grantFullAccess(lambda);
    });
    const apiPlan = api.addUsagePlan("apiUsagePlan", {
      name: "Easy",
    });
    const key = api.addApiKey("APIKEY", {
      apiKeyName: "API_KEY",
      value: process.env.API_KEY,
    });
    apiPlan.addApiKey(key);
    apiPlan.addApiStage({ stage: api.deploymentStage });
  }
}
