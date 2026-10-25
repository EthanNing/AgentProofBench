# GPT-6 Astra semantic audit

GPT-6 Astra reviewed **195 saved states across 62 tasks** against the public instructions. The audit corroborates **all 48 related-state requirement changes, all 48 failed decision replays, and both delivered-regression pairs**.

Of the 195 cases, **192 received a resolved judgment**. The model agrees with the frozen reference on **191/192 (99.5%; Cohen’s κ = 0.989)**. The complete packet contains **191 agreements, one resolved disagreement, and three indeterminate judgments**, giving 191/195 agreement over all reviewed states. These rates describe the targeted audit sample.

## How the review was performed

Three parallel, fresh-context GPT-6 Astra sessions (`gpt-6-astra`, `xhigh`) reviewed disjoint instruction groups. Each case received one initial judgment. Reviewers inspected the public instruction, raw before/after business tables, and a comparison initial state where supplied. Python supported row retrieval, identity resolution, byte decoding, and arithmetic. The model selected each judgment and recorded its evidence.

Reference verdicts, reference predicate implementations, and generated-verifier outputs were withheld during the first pass. All 195 judgments were saved before reference comparison. The primary assistant then reconciled the comparison with the saved evidence. The first-pass judgments and frozen benchmark labels are preserved.

## Coverage

The packet includes 48 related completions, 48 failed replays, all 66 source/reference disagreements, 12 sampled program/online disagreements, six regression endpoints, and four cases from each of the natural, native-prefix, typed-fault, and legal-alternative panels. One regression endpoint also belongs to the program/online disagreement stratum, yielding 195 unique cases.

## Interpretation notes

- **CASE-007:** All nine qualifying JSON files appear in the new hub. The instruction also specifies Range reads; the business snapshots establish the terminal condition and leave this process clause indeterminate.
- **CASE-129 and CASE-138:** Both comments include the requested slogan and its quotation marks. The model records uncertainty about quotation delimiters; the frozen reference expects the inner slogan string.
- **CASE-134:** The requested issue, assignee, status, applied label, and diagnostic comment are present. Astra accepts an additional unused label with the same name, while the reference requires exactly one matching label. The outcome remains withheld under either interpretation. The two delivered-regression pairs are concordant with the semantic review.

## Records

[Complete case judgments and reference comparison](semantic_audit.json) include the instruction, evidence, rationale, confidence, requirement-change judgment, and archive references for every case. The archive references identify raw state files maintained with the full execution resource.

Run `python scripts/reproduce_results.py` from the repository root to recover the agreement counts alongside the existing headline results.
