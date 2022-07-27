import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_lambda_nodejs, aws_apigateway } from "aws-cdk-lib";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const methods = ["GET", "POST", "PUT", "DELETE"];
    const api = new aws_apigateway.RestApi(this, "todo-api");
    const todos = api.root.addResource("todos");
    methods.forEach((method) => {
      const lambda = new aws_lambda_nodejs.NodejsFunction(this, method, {
        entry: `functions/${method}.ts`,
      });
      const integration = new aws_apigateway.LambdaIntegration(lambda);
      todos.addMethod(method, integration);
    });
  }
}
