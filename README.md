# AgentProofBench

**Reusable Verifiers for Web Agents**

[Project page](https://ethanning.github.io/AgentProofBench/) · [Paper PDF](paper/AgentProofBench.pdf) · [arXiv source package](paper/AgentProofBench_arxiv_source.tar.gz) · [Published result tables](data/)

Jingjie Ning*, Xueqi Li, Yi Lu, Yibo Kong  
School of Computer Science, Carnegie Mellon University  
*Corresponding author: [jening@cs.cmu.edu](mailto:jening@cs.cmu.edu)

AgentProofBench connects acceptance tests, frozen-verifier reuse under changed initial requirements, and the execution consequences of verifier-guided continuation. The resource spans 97 tasks and 79 families across four Web services. Its paired reuse study covers 48 families; its execution study covers 44 program assignments across 22 families.

Deployment-state panels and delivery are measured separately. In the recorded execution study, 32 of 33 assignments with error-free related panels deliver both saved openings correctly, compared with 1 of 11 assignments with panel errors. This is a descriptive association over the reported DeepSeek Flash/Pro conditions.

## Repository contents

- `docs/`: the GitHub Pages website, with local fonts and vector figures.
- `paper/`: the named preprint and its self-contained LaTeX source package.
- `data/`: the paired result tables supporting the reported figures.
- `scripts/reproduce_results.py`: a zero-model-call summary of those tables.

```bash
python scripts/reproduce_results.py
python -m http.server --directory docs 8000
```

The website is buildless HTML, CSS, and JavaScript. Its interactive mechanism example is marked as an illustration; empirical plots retain their original units and reference labels. The preprint contains the full methods and interpretation boundaries. This repository releases the website, preprint, and result tables; it does not bundle the service replicas or all raw execution archives.

## Citation

```bibtex
@misc{ning2026agentproofbench,
  title = {AgentProofBench: Reusable Verifiers for Web Agents},
  author = {Ning, Jingjie and Li, Xueqi and Lu, Yi and Kong, Yibo},
  year = {2026},
  howpublished = {Preprint},
  url = {https://ethanning.github.io/AgentProofBench/}
}
```

Project code is distributed under the MIT license. The preprint and third-party assets retain their own notices.
