import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_lambda_nodejs } from "aws-cdk-lib";
import { readdirSync } from "fs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const lambdas = readdirSync("functions");
    lambdas.forEach((method) => {
      new aws_lambda_nodejs.NodejsFunction(this, method.slice(0, -3), {
        entry: `functions/${method}`,
      });
    });
  }
}
