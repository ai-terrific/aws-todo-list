import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { client } from "../../libs/dynamoDB.js";
import { response } from "../../libs/response.js";

const TABLE_NAME = process.env.TABLE_NAME;

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { pathParameters } = event;

  try {
    const id = pathParameters?.id || "";
    await client.send(
      new DeleteCommand({ TableName: TABLE_NAME, Key: { id } }),
    );
    return response(200, { message: "Deleted", id });
  } catch (err: unknown) {
    console.error(err);
    return response(500, {
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
