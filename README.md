# Wordly MCP App: Text Rewriting and Visualization

An MCP App that visualizes rewritten variations of text, grouped by intent, to the user. This app is designed to work with models that provide grammar checks, rewrites, or text improvements.

## Features

-   **Visualize Rewrites**: Displays an original text alongside various rewritten versions.
-   **Intent-Based Grouping**: Organizes rewritten texts by their intended purpose (e.g., Fluency, Formal, Informal, Sensory).
-   **Interactive Selection**: Allows users to switch between different rewrite intents to view the corresponding text.
-   **Themed UI**: Integrates with the host application's styling for a seamless user experience.

## Getting Started

### Prerequisites

-   Node.js and npm

### Installation

Clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd wordly-mcp-app
npm install
```

## Development

To run the application in a development environment with hot-reloading for both the server and the frontend, use the following command:

```bash
npm run dev
```

This starts the server with `tsx` and the Vite build in watch mode, providing the best experience for local development.

## Building for Production

To build the application for production, run:

```bash
npm run build
```

This command performs two actions:
1.  **Builds the UI**: It uses Vite to bundle the React frontend into a single, optimized HTML file located in the `dist` directory.
2.  **Compiles the Server**: It uses `tsc` to compile the TypeScript server (`server.ts`) into a standard JavaScript file (`dist/server.js`).

After building, you can start the application in a production-like mode with:

```bash
npm start
```

This will run the compiled `dist/server.js` file directly with `node`.

## Publishing and Usage

This package is configured to be published to npm.

1.  **Publish**: To publish the package, first ensure you are logged into npm and then run:
    ```bash
    npm publish
    ```
    The `prepublishOnly` script will automatically run `npm run build` to ensure you are publishing the latest version.

2.  **Usage**: Once published, any user can install and run your application with a single command:
    ```bash
    npx wordly-mcp-app
    ```
    This will download the package from npm and execute the server, making your MCP App available.

## How It Works

1.  The server registers a `visualize_rewrites` tool. This tool is designed to receive an `original_text` and an array of `variations`, each with an `intent` and `text`.
2.  The `_meta.ui.resourceUri` in the tool's metadata links it to the `mcp-app.html` UI resource.
3.  When a model invokes the `visualize_rewrites` tool, the Host renders the React UI from `mcp-app.html`.
4.  The React UI, using the `useApp()` hook, receives the tool's input (`original_text` and `variations`).
5.  The UI then displays the original text and allows the user to interactively select and view the different rewritten variations based on their intent.
