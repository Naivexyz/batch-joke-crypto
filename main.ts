// make.fun entry for "Laugh Track: The Crypto Trading Joke Contest"
// (u-alfasurya91-laugh-track-the-crypto-trading-joke-a454158a,
// harness program/v1).
//
// The program writes exactly one crypto trading joke to
// /output/entry.txt and nothing else: the line is the whole entry,
// judged head to head on its setup and turn, the laugh it lands,
// how true it feels to trading life, how well every word is used
// and whether a trader would repeat it. The pick and the reasoning
// are in README.md.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// The program is deterministic: two runs write the same bytes.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The joke:
 *
 *   "I bought the dip. Then I bought the dip's dip. At this point
 *    I'm not a trader, I'm the exit liquidity — and I have a
 *    loyalty card."
 *
 * Why this line, in the judge's own order of criteria:
 *
 * - Setup and turn. Two short buys establish the pattern, then the
 *   line turns on its narrator: the buyer was never the strategist
 *   in the trade, he was the other side of it. The payoff —
 *   "loyalty card" — rewards the setup by extending the demotion:
 *   he has done this often enough to earn points for it.
 * - A real laugh. The surprise is the reframe (trader → exit
 *   liquidity), and the loyalty card lands the second, smaller
 *   laugh right behind it, as the last words of the line.
 * - True to trading life. Buying the dip, the dip having a dip,
 *   and retail ending up as exit liquidity are the three most
 *   recognisable details of the group-chat era; every trader has
 *   lived the first two and suspected the third.
 * - Tight. Three beats, no throat clearing, slang only where the
 *   joke needs it ("dip", "exit liquidity"), punchline last.
 * - Repeatable. It holds up on a second read and is exactly the
 *   line a trader sends a friend after the second red candle.
 *
 * The line must never change without re-reading README.md: the entry
 * is the line, byte for byte.
 */
const JOKE_LINE =
  "I bought the dip. Then I bought the dip's dip. At this point I'm not a trader, I'm the exit liquidity — and I have a loyalty card.";

/** The file the grader reads inside the output directory. */
const ENTRY_FILENAME = 'entry.txt';

/** The grader's output directory, used when no override is set. */
const DEFAULT_OUTPUT_DIR = '/output';

/**
 * Where the entry goes: /output inside the grader. Outside it,
 * MAKEFUN_OUTPUT_DIR stands in for /output so the program can be run
 * and checked locally without touching the real /output.
 */
function resolveOutputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? DEFAULT_OUTPUT_DIR;
}

/**
 * Write the entry exactly: the joke and nothing else — no trailing
 * newline, no punctuation added, nothing attached. Economy of the
 * line is one of the judged criteria, so the bytes are part of the
 * entry: keep them at precisely the line itself.
 */
function writeEntry(outputDir: string, line: string): void {
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, ENTRY_FILENAME), line, 'utf8');
}

function main(): void {
  writeEntry(resolveOutputDir(), JOKE_LINE);
}

main();
