import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import type { APIGatewayProxyResult } from "aws-lambda";
import { client } from "../../libs/dynamoDB.js";
import { response } from "../../libs/response.js";

const TABLE_NAME = process.env.TABLE_NAME;

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const result = await client.send(
      new ScanCommand({ TableName: TABLE_NAME }),
    );
    return response(200, result.Items ?? []);
  } catch (err: unknown) {
    console.error(err);
    return response(500, {
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
