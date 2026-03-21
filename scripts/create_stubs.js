const fs = require('fs');
const path = require('path');

const contentMapKeys = [
  "foundations/what-are-llms",
  "foundations/how-llms-work",
  "foundations/tokens",
  "foundations/temperature",
  "foundations/context-window",
  "foundations/llm-landscape",
  
  "apis/first-api-call",
  "apis/messages-roles",
  "apis/streaming",

  "prompting/basics",
  "prompting/advanced",
  "prompting/output-control",

  "tools/copilot-fundamentals",
  "tools/copilot-mastery",
  "tools/ai-tools-strategy",

  "rag/embeddings",
  "rag/vector-databases",
  "rag/intro-rag",
  "rag/rag-pipeline",
  "rag/advanced-rag",

  "production/efficiency",
  "production/evaluation",
  "production/architecture",
  "production/guardrails",
];

const basePath = path.join(__dirname, '../src/app/learn/(content)');

contentMapKeys.forEach(key => {
  const dirPath = path.join(basePath, key);
  fs.mkdirSync(dirPath, { recursive: true });
  
  const filePath = path.join(dirPath, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, `export default function Page() {\n  return null;\n}\n`);
    console.log(`Created stub: ${filePath}`);
  }
});
