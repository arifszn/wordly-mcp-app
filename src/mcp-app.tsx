import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import styles from "./mcp-app.module.css";
import { useApp, useHostStyles } from "@modelcontextprotocol/ext-apps/react";

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
  const [copied, setCopied] = useState(false); // New state for copy feedback

  const { app, error } = useApp({
    appInfo: { name: "Wordly", version: "1.0.0" },
    capabilities: {},
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

  const handleCopy = async () => {
    if (currentVariation?.text) {
      try {
        await navigator.clipboard.writeText(currentVariation.text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000); // Reset "Copied!" message after 1 second
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

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
             <span className={styles.rewrittenText}>{currentVariation?.text}</span>
             <button onClick={handleCopy} className={styles.copyButton}>
              {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              )}
            </button>
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