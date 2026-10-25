# Published result tables

These tables support the paper’s paired analyses and the project website. They contain the recorded reference labels and verifier outcomes, with their original task and replica identities.

- `p1_joint_programmes.csv`: source and rebuilt program outcomes across initial-state conditions, including main-panel and witness correctness.
- `p2_program_assignments.csv`: 44 assigned programs, each with a natural ending and checkpoint. The 88 rows share 22 task families.
- `semantic_audit.json`: all 195 GPT-6 Astra judgments with public instructions, evidence, and reference comparisons. [Audit protocol and results](SEMANTIC_AUDIT.md).
- `collection_common_states.csv`: the same 99 failed states and 36 valid anchors used for both methods, with two recorded judgments per method.

Run `python scripts/reproduce_results.py` from the repository root to recover the headline counts. The script uses the standard library and makes no model requests.

These files are the result-table release. Full business-state snapshots and native service environments are separate from these tables. Reference labels reflect the paper’s executable contract. GPT-6 Astra agrees with 191/192 resolved labels across the 195-state semantic audit; three indeterminate cases remain in the full record.
