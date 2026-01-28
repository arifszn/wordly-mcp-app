# Wordly MCP App: Text Rewriting and Visualization

An MCP App that visualizes rewritten variations of text, grouped by intent, to the user. This app is designed to work with models that provide grammar checks, rewrites, or text improvements.

## Features

-   **Visualize Rewrites**: Displays an original text alongside various rewritten versions.
-   **Intent-Based Grouping**: Organizes rewritten texts by their intended purpose (e.g., Fluency, Formal, Informal, Sensory).
-   **Interactive Selection**: Allows users to switch between different rewrite intents to view the corresponding text.
-   **Themed UI**: Integrates with the host application's styling for a seamless user experience.

## Overview

-   Tool registration for `visualize_rewrites` with a linked UI resource.
-   React UI using the `useApp()` hook for communication with the MCP host.

## Key Files

-   [`server.ts`](server.ts) - MCP server that registers the `visualize_rewrites` tool and serves the UI resource.
-   [`mcp-app.html`](mcp-app.html) / [`src/mcp-app.tsx`](src/mcp-app.tsx) - The React-based user interface using the `useApp()` hook to receive tool input and render content.

## Getting Started

To set up and run the application locally:

```bash
npm install
npm run dev
```

This will install dependencies, build the UI, and start the MCP server.

## How It Works

1.  The server registers a `visualize_rewrites` tool. This tool is designed to receive an `original_text` and an array of `variations`, each with an `intent` and `text`.
2.  The `_meta.ui.resourceUri` in the tool's metadata links it to the `mcp-app.html` UI resource.
3.  When a model invokes the `visualize_rewrites` tool, the Host renders the React UI from `mcp-app.html`.
4.  The React UI, using the `useApp()` hook, receives the tool's input (`original_text` and `variations`).
5.  The UI then displays the original text and allows the user to interactively select and view the different rewritten variations based on their intent.
