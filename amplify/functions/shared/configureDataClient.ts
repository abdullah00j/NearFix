import { Amplify } from "aws-amplify";
import { getAmplifyDataClientConfig } from "@aws-amplify/backend/function/runtime";

const getRequiredEnvironmentVariable = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Required Lambda environment variable ${name} is missing`);
  }

  return value;
};

const getDataClientEnvironment: Parameters<
  typeof getAmplifyDataClientConfig
>[0] = {
  AWS_ACCESS_KEY_ID: getRequiredEnvironmentVariable("AWS_ACCESS_KEY_ID"),
  AWS_SECRET_ACCESS_KEY: getRequiredEnvironmentVariable(
    "AWS_SECRET_ACCESS_KEY",
  ),
  AWS_SESSION_TOKEN: getRequiredEnvironmentVariable("AWS_SESSION_TOKEN"),
  AWS_REGION: getRequiredEnvironmentVariable("AWS_REGION"),
  AMPLIFY_DATA_DEFAULT_NAME: getRequiredEnvironmentVariable(
    "AMPLIFY_DATA_DEFAULT_NAME",
  ),
};

export const configureAmplifyDataClient = async (): Promise<void> => {
  const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(
    getDataClientEnvironment,
  );

  Amplify.configure(resourceConfig, libraryOptions);
};
