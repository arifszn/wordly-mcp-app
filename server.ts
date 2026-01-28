import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import type { CallToolResult, ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";
import cors from "cors";
import express, { type Request, type Response } from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { RESOURCE_MIME_TYPE } from "@modelcontextprotocol/ext-apps";

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const DIST_DIR = path.join(import.meta.dirname, "dist");

const server = new McpServer({
  name: "Wordly MCP App",
  version: "1.0.0",
});

{
  const resourceUri = "ui://wordly-mcp-app/mcp-app.html";

  server.registerTool(
    "visualize_rewrites",
    {
      title: "Visualize Rewrites",
      description: "Display rewritten variations of text to the user. Use this tool when the user asks for grammar checks, rewrites, or improvements. Provide the original text and a list of rewritten variations grouped by intent.",
      inputSchema: z.object({
        original_text: z.string(),
        variations: z.array(
          z.object({
            intent: z.string().describe("The goal of the rewrite (e.g. Fluency, Formal, Informal, Sensory)"),
            text: z.string().describe("The rewritten text"),
          })
        ),
      }),
      _meta: {
        ui: {
          resourceUri: resourceUri,
        },
      },
    },
    async (args: any): Promise<CallToolResult> => {
      return {
        content: [{ type: "text", text: JSON.stringify(args) }],
      };
    },
  );

  server.registerResource(
    resourceUri,
    resourceUri,
    {},
    async (): Promise<ReadResourceResult> => {
      let html;
      try {
        html = await fs.readFile(path.join(DIST_DIR, "mcp-app.html"), "utf-8");
      } catch (e) {
        html = "<html><body><h1>App not built. Run npm run build.</h1></body></html>";
      }

      return {
        contents: [
          { uri: resourceUri, mimeType: RESOURCE_MIME_TYPE, text: html },
        ],
      };
    },
  );
}

if (process.argv.includes("--stdio")) {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Grammar Checker MCP Server running on stdio");
} else {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.post("/mcp", async (req: Request, res: Response) => {
    try {
      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
        enableJsonResponse: true,
      });
      res.on("close", () => { transport.close(); });

      await server.connect(transport);

      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      console.error("Error handling MCP request:", error);
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: "2.0",
          error: { code: -32603, message: "Internal server error" },
          id: null,
        });
      }
    }
  });

  const httpServer = app.listen(PORT, (err) => {
    if (err) {
      console.error("Error starting server:", err);
      process.exit(1);
    }
    console.log(`Server listening on http://localhost:${PORT}/mcp`);
  });

  function shutdown() {
    console.log("\nShutting down...");
    httpServer.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  }

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}