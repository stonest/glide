import { CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";

export type StackOutputs = {
  CognitoClientID: string;
  CloudFrontDomain: string;
  FrontendDomainOutput: string;
  CloudFrontDistributionID: string;
  S3BucketName: string;
  UserPoolID: string;
  UserPoolDomain: string;
  APIURL: string;
  WebhookURL: string;
  GovernanceURL: string;
  APILogGroupName: string;
  WebhookLogGroupName: string;
  IDPSyncLogGroupName: string;
  EventBusLogGroupName: string;
  SlackNotifierLogGroupName: string;
  DynamoDBTable: string;
  EventBusArn: string;
  EventBusSource: string;
  IdpSyncFunctionName: string;
  SAMLIdentityProviderName: string;
  Region: string;
  PaginationKMSKeyARN: string;
  CacheSyncLogGroupName: string;
  RestAPIExecutionRoleARN: string;
  IDPSyncExecutionRoleARN: string;
  CacheSyncFunctionName: string;
  CLIAppClientID: string;
  HealthcheckFunctionName: string;
  HealthcheckLogGroupName: string;
  GranterV2StateMachineArn: string;
};
/**
 * generateOutputs creates a Cloudformation Output for each key-value pair in the type StackOutputs
 *
 */
export const generateOutputs = (scope: Construct, o: StackOutputs) => {
  Object.entries(o).forEach(
    ([k, v]) =>
      new CfnOutput(scope, k, {
        value: v,
      })
  );
};
