# Evidence index

| Measurement | Published file | Unit |
|---|---|---|
| Initial-state reuse | [P1 program results](data/p1_joint_programmes.csv) | Task, model, construction role, program replica, and initial-state condition |
| Execution after a gate decision | [P2 assignments](data/p2_program_assignments.csv) | 44 assigned programs with two saved openings each, clustered within 22 families |
| Matched collection comparison | [Collection results](data/collection_common_states.csv) | 99 failed states and 36 valid anchors, with two observations per method |
| Reference semantic agreement | [GPT-6 Astra audit](data/SEMANTIC_AUDIT.md) · [Case records](data/semantic_audit.json) | 195 reviewed states, 192 resolved judgments, and all 48 requirement-change pairs |
| Study protocol and interpretation | [Paper](paper/AgentProofBench.pdf) | Full definitions, denominators, intervals, and case analyses |

Run `python scripts/reproduce_results.py` to summarize the published tables. The complete input-state and execution-archive layout is documented in the paper; the files above are the public result-table release.
