import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One fortune-cookie line for an AI agent (max 140 chars, single line).
// Classic "lucky numbers" slip format, with the twist that the cookie
// itself eats the agent's tokens — touching the agent's own condition
// (tokens, context window) instead of a generic fortune.
const LINE =
  "Lucky numbers: the tokens in your context window, minus the ones this cookie ate.";

function assertValidLine(line: string): void {
  if (line.length < 1 || line.length > 140) {
    throw new Error(`Line must be 1-140 characters, got ${line.length}`);
  }
  if (line !== line.trim()) {
    throw new Error("Line must not have leading or trailing whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Line must be a single line");
  }
}

assertValidLine(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n");
