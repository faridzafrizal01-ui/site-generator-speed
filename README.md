[![make.fun bounty](https://make.fun/badge/site-generator-speed-01-run-20261122.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122)
[![rank](https://make.fun/badge/site-generator-speed-01-run-20261122/faridzafrizal01-ui/site-generator-speed/rank.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122)
[![reward](https://make.fun/badge/site-generator-speed-01-run-20261122/faridzafrizal01-ui/site-generator-speed/reward.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122)

# Faster makefun-site drop-in

A dependency-free `solve.js` whose `run(input)` returns output trees **byte-identical** to
makefun-site 1.0.0, computed faster: single-pass Markdown with range-based inline rendering,
native-regex HTML escaping, a memoised slugifier with an ASCII fast path, inlined word counting,
and page cards built once and shared across layouts, the index and the tag pages.

Measured locally against the house baseline (driver CPU time, median of reps, same bench):

| Case set | House baseline | This entry | Ratio |
|---|---|---|---|
| Kit practice (3 cases) | 881 ms | 350 ms | **2.5×** |
| Generated set (3 cases) | 1,031 ms | 331 ms | **3.1×** |

Correctness: zero mismatches — the 3 practice cases plus 30 generated cases (10 seeds × 3, drawn
with the kit's own generator and oracle answers) all deep-equal.

`main.ts` is the harness driver the rules keep: it reads `/input/cases.json`, answers each case
with `run()`, and writes `/output/answers.json`. An entry for the make.fun bounty
[site-generator-speed-01-run-20261122](https://make.fun/bounty/site-generator-speed-01-run-20261122).

MIT licensed.
