import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { client } from "../../libs/dynamoDB.js";
import { response } from "../../libs/response.js";

const TABLE_NAME = process.env.TABLE_NAME;

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { pathParameters, body } = event;

  try {
    const data = JSON.parse(body || "{}");
    const id = pathParameters?.id || "";
    const result = await client.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression:
          "SET #title = :title, description = :description, completed = :completed, updatedAt = :updatedAt",
        ExpressionAttributeNames: { "#title": "title" },
        ExpressionAttributeValues: {
          ":title": data.title || "",
          ":description": data.description || "",
          ":completed": data.completed ?? true,
          ":updatedAt": new Date().toISOString(),
        },
        ReturnValues: "ALL_NEW",
      }),
    );
    return response(200, result.Attributes);
  } catch (err: unknown) {
    console.error(err);
    return response(500, {
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
