import { useApp, useHostStyles } from "@modelcontextprotocol/ext-apps/react";
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import styles from "./mcp-app.module.css";

interface Variation {
  intent: string;
  text: string;
}

interface ToolInput {
  original_text: string;
  variations: Variation[];
}

function GrammarApp() {
  const [data, setData] = useState<ToolInput | null>(null);
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);

  const { app, error } = useApp({
    appInfo: { name: "Wordly", version: "1.0.0" },
    onAppCreated: (app) => {
      app.ontoolinput = (params) => {
        console.log("Received input:", params);
        const args = params.arguments as unknown as ToolInput;
        setData(args);
        if (args.variations && args.variations.length > 0 && !selectedIntent) {
          setSelectedIntent(args.variations[0].intent);
        }
      };
    },
  });

  useHostStyles(app);

  if (error) return <div className={styles.error}>Error: {error.message}</div>;
  if (!app) return <div className={styles.loading}>Connecting...</div>;
  if (!data) return (
    <div className={styles.emptyState}>
      <p>Waiting for text to rewrite...</p> 
      <p className={styles.hint}>Try asking the assistant to "Rewrite this text".</p>
    </div>
  );

  const currentVariation = data.variations.find(v => v.intent === selectedIntent) || data.variations[0];

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        {data.variations.map((v) => (
          <button
            key={v.intent}
            className={`${styles.intentBtn} ${selectedIntent === v.intent ? styles.active : ""}`}
            onClick={() => setSelectedIntent(v.intent)}
          >
            {getIcon(v.intent)}
            <span>{v.intent}</span>
          </button>
        ))}
      </div>
      <div className={styles.content}>
        <div className={styles.originalSection}>
           <h3 className={styles.heading}>Original</h3>
           <div className={styles.textCard}>{data.original_text}</div>
        </div>
        <div className={styles.rewriteSection}>
           <h3 className={styles.heading}>{currentVariation?.intent || "Rewrite"}</h3>
           <div className={`${styles.textCard} ${styles.highlighted}`}>
             {currentVariation?.text}
           </div>
        </div>
      </div>
    </div>
  );
}

function getIcon(intent: string) {
  switch (intent.toLowerCase()) {
    case "fluency": return "⚡";
    case "formal": return "👔";
    case "informal": return "💬";
    case "sensory": return "👁️";
    case "shorten": return "✂️";
    case "expand": return "📏";
    default: return "📝";
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GrammarApp />
  </StrictMode>,
);