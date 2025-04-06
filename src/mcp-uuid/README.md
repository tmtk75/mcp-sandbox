# MCP UUID Service

A MCP service for generating UUIDs. This is a server implementation using the [Model Context Protocol](https://github.com/modelcontextprotocol/typescript-sdk).

## Requirements

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## Installation

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

## Build and Run

```bash
pnpm build
pnpm start
```

## Cleanup

```bash
pnpm clean
```

## MCP Features

### Tools

#### generate
- Description: Generates a new UUID
- Parameters: None
- Return value: UUID string

### Resources

#### health
- URI: `health://status`
- Description: Checks the server status
- Response: `{ "status": "ok" }`

## Environment Variables

- `PORT`: Server port number (default: 3000)

## Client Usage Example

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["dist/index.js"]
});

const client = new Client(
  {
    name: "example-client",
    version: "1.0.0"
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

await client.connect(transport);

// Generate UUID
const result = await client.callTool({
  name: "generate"
});

console.log(result.content[0].text); // Generated UUID
``` 