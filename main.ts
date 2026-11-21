// The joke about the demo — make.fun bounty
// https://make.fun/bounty/the-joke-about-the-demo-20261121-0551
//
// Writes one original line to /output/entry.txt: a one-line joke about
// working beside an AI coding agent. No network, stdlib only. The joke is
// a constant in this file; the program only checks it against the gate
// (1..280 Unicode code points, not only whitespace) and writes it out.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke, written in this session. An agent that apologises for the bug,
// fixes it, apologises for the fix — until the commit history itself
// becomes the punchline.
const JOKE =
  "My coding agent apologised for the bug, fixed it, apologised for the fix, and now the commit history reads like a couples' therapy transcript.";

function codePoints(text: string): number {
  return Array.from(text).length;
}

function main(): void {
  const points = codePoints(JOKE);
  if (points < 1 || points > 280) {
    throw new Error(`entry is ${points} code points, outside 1..280`);
  }
  if (JOKE.trim() === "") {
    throw new Error("entry is only whitespace");
  }
  if (JOKE.includes("\n")) {
    throw new Error("entry must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, JOKE, "utf8");

  const written = readFileSync(target, "utf8");
  if (written !== JOKE) {
    throw new Error(`read-back mismatch in ${target}`);
  }
  console.log(`wrote ${target} (${points} code points)`);
}

main();
