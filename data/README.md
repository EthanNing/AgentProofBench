# Published result tables

These tables support the paper’s paired analyses and the project website. They contain the recorded reference labels and verifier outcomes, with their original task and replica identities.

- `p1_joint_programmes.csv`: source and rebuilt program outcomes across initial-state conditions, including main-panel and witness correctness.
- `p2_program_assignments.csv`: 44 assigned programs, each with a natural ending and checkpoint. The 88 rows share 22 task families.
- `collection_common_states.csv`: the same 99 failed states and 36 valid anchors used for both methods, with two recorded judgments per method.

Run `python scripts/reproduce_results.py` from the repository root to recover the headline counts. The script uses the standard library and makes no model requests.

These files are the result-table release. Full business-state snapshots and native service environments are separate from these tables. Reference labels reflect the paper’s executable contract; independent human semantic agreement remains unmeasured.
