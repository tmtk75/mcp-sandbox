import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const server = new McpServer({
  name: "uuid-service",
  version: "1.0.0",
  description: "A MCP service for generating UUIDs",
  documentation: "https://github.com/your-repo/mcp-uuid",
});

// Register a resource
server.resource("generate", "mcp://localhost/uuid", async (uri: URL, extra) => ({
  contents: [
    {
      uri: uri.href,
      text: "UUID pool",
      mimeType: "text/plain",
    },
  ],
}));

// Generate a tool
server.tool("generate", "Generate a new UUID", { prefix: z.string() }, async ({ prefix }) => {
  const uuid = uuidv4();
  return {
    content: [{ type: "text", text: `${prefix}-${uuid}` }],
  };
});

// Register a prompt
server.prompt("generate", "Generate a new UUID", { prefix: z.string() }, ({ prefix }) => ({
  messages: [
    {
      role: "user",
      content: {
        type: "text",
        text: `Please generate a new UUID. Prepend the prefix: ${prefix}.`,
      },
    },
  ],
}));

const transport = new StdioServerTransport();
await server.connect(transport);
