// handler.js
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { client } from "../../libs/dynamoDB.js";
import { response } from "../../libs/response.js";

const TABLE_NAME = process.env.TABLE_NAME;

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { pathParameters } = event;

  try {
    const result = await client.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { id: pathParameters?.id },
      }),
    );
    return result.Item
      ? response(200, result.Item)
      : response(404, { message: "Not found" });
  } catch (err: unknown) {
    console.error(err);
    return response(500, {
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
