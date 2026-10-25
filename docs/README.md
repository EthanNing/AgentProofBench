# AgentProofBench project page

Buildless GitHub Pages source. Serve this directory with any static HTTP server. All assets use relative URLs and work under `/AgentProofBench/`.

```sh
python -m http.server 8000 --directory website
```

The publishing step supplies `assets/AgentProofBench.pdf` from the named-author preprint. This directory contains no model credentials, native service state, or experiment launcher.

## Page behavior

- The hero switches between a source state, changed requirement, and old-decision replay. A/B are explanatory identities for the Linear45 mechanism.
- The first result section represents 44 program assignments, with two saved openings each. It retains the 22-family clustering and the exploratory status of the association.
- Acceptance always shows false acceptance and valid-anchor acceptance together. The metric switch changes the main chart's emphasis.
- Reuse rings retain the unconditional 96-program denominators for both models.
- The Linear45 branch switch presents the recorded event sequence with schematic A/B identities. Generic rejection carries no program-specific check.
- The cost slider calculates `c + C/k` from saved policy means. Its values come from `reports/reviewer_revision_20261025/p2_amortized_costs.csv`; moving the slider creates no experimental observations.
- Figure filters, zoomable dialogs, arrow-key browsing, Escape, mobile navigation, and BibTeX copy use local JavaScript.

## Assets and licenses

Inter Regular, Medium, and SemiBold are included under the SIL Open Font License in `assets/fonts/OFL.txt`. No Helvetica font files are distributed. Manuscript SVGs use outlined figure text. The page's editable SVG illustrations are generated in `app.js`.

## Publication links

- Page: <https://ethanning.github.io/AgentProofBench/>
- Repository: <https://github.com/EthanNing/AgentProofBench>
- Paired result files: <https://github.com/EthanNing/AgentProofBench/tree/main/data>

The page links the paper and paired result release. It does not advertise a complete native API environment or the full experiment archive.
