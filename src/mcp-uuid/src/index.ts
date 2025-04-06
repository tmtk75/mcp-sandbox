import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const server = new McpServer({
	name: "uuid-service",
	version: "1.0.0",
	description: "A MCP service for generating UUIDs",
	documentation: "https://github.com/your-repo/mcp-uuid"
});

// UUIDを生成するツールを登録
server.tool(
	"generate",
	{},
	async () => {
		const uuid = uuidv4();
		return {
			content: [{ type: "text", text: uuid }]
		};
	},
	{
		description: "Generates a new UUID",
		examples: [
			{
				description: "Generate a new UUID",
				response: "550e8400-e29b-41d4-a716-446655440000"
			}
		]
	}
);

// サーバーを起動
const transport = new StdioServerTransport();
await server.connect(transport);

console.log("UUID MCP service started");
