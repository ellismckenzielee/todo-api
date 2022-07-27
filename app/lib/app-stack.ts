import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_lambda_nodejs, aws_apigateway } from "aws-cdk-lib";
import { readdirSync } from "fs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const api = new aws_apigateway.RestApi(this, "todo-api");
    const todos = api.root.addResource("todos");
    ["GET", "POST", "PUT", "DELETE"].forEach((method) => {
      todos.addMethod(method);
    });
    const lambdas = readdirSync("functions");
    lambdas.forEach((method) => {
      new aws_lambda_nodejs.NodejsFunction(this, method.slice(0, -3), {
        entry: `functions/${method}`,
      });
    });
  }
}
