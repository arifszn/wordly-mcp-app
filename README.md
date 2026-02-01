# Wordly MCP App

An MCP (Model Context Protocol) App that provides an interactive UI for visualizing multiple rewritten variations of text. Perfect for grammar checking, style adjustments, and text improvements with real-time comparison.

This app showcases the mcp ui capabilities described in https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/.

https://github.com/user-attachments/assets/f34d9d00-c8b4-4857-9bd9-709371783523

## Configuration

Add to your MCP client configuration:

```json
{
  "mcpServers": {
    "wordly": {
      "command": "npx",
      "args": ["-y", "wordly-mcp-app", "--stdio"]
    }
  }
}
```

## How It Works

Once configured, the Wordly MCP App provides a `visualize_rewrites` tool that AI assistants can use to display text rewrites in an interactive UI.

### Example Usage

**User**: Rewrite this text in multiple styles: thanks for the details you shared

**AI Assistant** will call the `visualize_rewrites` tool with:

```json
{
  "original_text": "thanks for the details you shared",
  "variations": [
    {
      "intent": "Professional & Formal",
      "text": "Thank you for providing those details."
    },
    {
      "intent": "Clear & Conversational",
      "text": "Thanks for sharing that information!"
    },
    {
      "intent": "Constructive & Collaborative",
      "text": "I appreciate you sharing those details with me."
    },
    {
      "intent": "Friendly & Direct",
      "text": "Thanks for the info!"
    }
  ]
}
```

The app will then render an interactive UI showing all variations with the ability to:
- Switch between different rewrite styles
- Compare original with rewritten text
- Copy any variation with one click

## API Reference

### Tool: `visualize_rewrites`

Displays rewritten variations of text to the user.

**Input Schema:**

```typescript
{
  original_text: string;           // The original text to rewrite
  variations: Array<{
    intent: string;                // The rewrite style/intent
    text: string;                  // The rewritten text
  }>;
}
```

## License

[MIT](LICENSE)
