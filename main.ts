// Star Basket — make.fun entry for "The agent builds a game from one prompt".
//
// What this program does (Node 22, standard library only): it copies this
// repository's POST.json — the file that names the X post carrying the entry
// video — into the output directory, where the grader reads it back and
// compares it with the post it reads from X itself. Nothing else is written.
//
// The directories honour the grader's environment:
//   MAKEFUN_BOT_DIR    where the repository lives   (default /bot)
//   MAKEFUN_OUTPUT_DIR where the output goes        (default /output)
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Safety properties:
//   * POST.json is parsed and checked for a non-empty "url" before copying,
//     so a malformed hand-in fails here with a clear message, not later.
//   * The copied bytes are read back and compared with the source, so a
//     truncated write fails loudly (exit 1) instead of handing in a bad file.
//   * No network, no clock, no randomness: two runs write identical bytes.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const sourcePath = join(botDir, "POST.json");
const targetPath = join(outputDir, "POST.json");

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

function readSource(): Buffer {
  try {
    return readFileSync(sourcePath);
  } catch (err) {
    fail(`cannot read ${sourcePath}: ${(err as Error).message}`);
  }
}

function checkPostJson(bytes: Buffer): void {
  let parsed: unknown;
  try {
    parsed = JSON.parse(bytes.toString("utf8"));
  } catch (err) {
    fail(`${sourcePath} is not valid JSON: ${(err as Error).message}`);
  }
  const url = (parsed as { url?: unknown } | null)?.url;
  if (typeof url !== "string" || url.trim().length === 0) {
    fail(`${sourcePath} does not carry a non-empty string "url"`);
  }
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    fail(`${sourcePath} "url" is not an http(s) address: ${url}`);
  }
}

function copyAndVerify(bytes: Buffer): void {
  try {
    mkdirSync(outputDir, { recursive: true });
    copyFileSync(sourcePath, targetPath);
  } catch (err) {
    fail(`cannot write ${targetPath}: ${(err as Error).message}`);
  }
  let written: Buffer;
  try {
    written = readFileSync(targetPath);
  } catch (err) {
    fail(`cannot read back ${targetPath}: ${(err as Error).message}`);
  }
  if (!written.equals(bytes)) {
    fail(`${targetPath} does not match ${sourcePath} after copying`);
  }
}

const sourceBytes = readSource();
checkPostJson(sourceBytes);
copyAndVerify(sourceBytes);
