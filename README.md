# Wordly MCP App: Text Rewriting and Visualization

An MCP App that visualizes rewritten variations of text, grouped by intent, to the user. This app is designed to work with models that provide grammar checks, rewrites, or text improvements.

## Features

-   **Visualize Rewrites**: Displays an original text alongside various rewritten versions.
-   **Intent-Based Grouping**: Organizes rewritten texts by their intended purpose (e.g., Fluency, Formal, Informal, Sensory).
-   **Interactive Selection**: Allows users to switch between different rewrite intents to view the corresponding text.
-   **Themed UI**: Integrates with the host application's styling for a seamless user experience.

## Usage with MCP Clients

To use the Wordly MCP App with a compatible Model Context Protocol (MCP) client, such as Claude or another MCP-enabled environment, you typically configure your client to run the `wordly-mcp-app` as a managed server.

### Configuration



```json
{
  "mcpServers": {
    "wordly": {
      "command": "npx",
      "args": ["-y", "wordly-mcp-app"]
    }
  }
}
```

Once your MCP client is configured and running, it can discover and interact with the `visualize_rewrites` tool provided by this app.

### Tool Invocation Example

For example, a model might invoke the tool with parameters like:

```json
{
  "tool_code": "visualize_rewrites",
  "args": {
    "original_text": "This is a sentence that needs rewriting.",
    "variations": [
      {
        "intent": "Fluency",
        "text": "This sentence needs some rephrasing."
      },
      {
        "intent": "Formal",
        "text": "This particular statement requires revision."
      }
    ]
  }
}
```

The app will then display an interactive UI within your MCP client to visualize these rewrites.
