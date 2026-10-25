"""Recover the paper's headline counts from the published result tables."""
from collections import Counter, defaultdict
import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(name):
    with (ROOT / "data" / name).open(newline="") as stream:
        return list(csv.DictReader(stream))


def main():
    p1 = read("p1_joint_programmes.csv")
    reuse = {}
    for model in ("flash", "pro"):
        rows = [r for r in p1 if r["model"] == model and r["role"] == "reuse" and r["variant"] == "related"]
        reuse[model] = {"programs": len(rows), "panel_correct": sum(r["panel_all_correct"] == "True" for r in rows),
                        "joint_correct": sum(r["joint_all_correct"] == "True" for r in rows)}
    assignments = defaultdict(list)
    for row in read("p2_program_assignments.csv"):
        assignments[(row["task_id"], row["actor"], row["replica"])].append(row)
    groups = defaultdict(Counter)
    for rows in assignments.values():
        assert len(rows) == 2 and {r["cohort"] for r in rows} == {"natural_terminal", "checkpoint"}
        group = "panel_has_errors" if int(rows[0]["related_errors"]) else "panel_error_free"
        groups[group]["assignments"] += 1
        groups[group]["both_correct"] += all(r["delivery"] == "C" for r in rows)
        groups[group].update({"openings": len(rows)})
        groups[group].update(r["delivery"] for r in rows)
    collection = read("collection_common_states.csv")
    profile = {}
    for label, name in (("FAILURE", "false_acceptance"), ("SUCCESS", "valid_acceptance")):
        by_task = defaultdict(list)
        for row in collection:
            if row["reference_label"] == label:
                by_task[row["task_id"]].append(row)
        profile[name] = {}
        for method in ("program", "online"):
            per_task = [sum(r[f"{method}_rep{k}"] == "PASS" for r in rows for k in (1, 2)) / (2 * len(rows)) for rows in by_task.values()]
            profile[name][method] = round(100 * sum(per_task) / len(per_task), 4)
    audit = json.loads((ROOT / "data" / "semantic_audit.json").read_text())["cases"]
    resolved = [r for r in audit if r["label"] != "AMBIGUOUS"]
    agreed = sum(r["label"] == r["reference_label"] for r in resolved)
    semantic = {"reviewed": len(audit), "resolved": len(resolved), "agreed": agreed,
                "resolved_disagreements": len(resolved) - agreed,
                "indeterminate": len(audit) - len(resolved),
                "resolved_agreement_percent": round(100 * agreed / len(resolved), 4)}
    print(json.dumps({"related_source_programs": reuse, "paired_execution": dict(groups),
                      "collection_task_mean_percent": profile, "semantic_audit": semantic}, indent=2))


if __name__ == "__main__":
    main()
