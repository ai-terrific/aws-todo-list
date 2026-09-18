// handler.js
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { client } from "../../libs/dynamoDB.js";
import { response } from "../../libs/response.js";

const TABLE_NAME = process.env.TABLE_NAME;

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { body } = event;

  try {
    const data = JSON.parse(body || "{}");

    const item = {
      title: data.title || "",
      description: data.description || "",
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await client.send(new PutCommand({ TableName: TABLE_NAME, Item: item }));
    return response(201, item);
  } catch (err: unknown) {
    console.error(err);
    return response(500, {
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
