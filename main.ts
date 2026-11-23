// The harness driver for this entry. The grader runs `node main.ts`: it reads every case from the
// input directory's cases.json (a JSON array of {id, input}), answers each one with run() from
// solve.js, and writes the answers to the output directory's answers.json, one per case and in
// the cases' order. Outside a container, MAKEFUN_INPUT_DIR and MAKEFUN_OUTPUT_DIR stand in for
// /input and /output.

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { setFlagsFromString } from 'node:v8';

// The house baseline runs with V8's incremental marking off, so this entry sets the same flag —
// before solve.js is imported, so all of its work runs under it.
setFlagsFromString('--no-incremental-marking');

/** solve.js loaded by URL (a plain .js module carries no types) and typed by its contract. */
const { run } = (await import(new URL('./solve.js', import.meta.url).href)) as { run: (input: unknown) => unknown };

const inputDir = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const cases = JSON.parse(readFileSync(join(inputDir, 'cases.json'), 'utf8')) as Array<{ id: string; input: unknown }>;
const answers = cases.map((c) => run(c.input));
writeFileSync(join(outputDir, 'answers.json'), JSON.stringify(answers));
