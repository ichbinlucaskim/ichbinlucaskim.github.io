# Lucas Kim

Lucas Kim is a spatial ML engineer who designs and trains machine-learning models on
spatial and geometric data, across buildings and geospatial domains, and builds the
pipelines around them.

His background is machine learning: graph neural networks and spatial ML. The common
thread is judgment: knowing where a learned model wins, and where a rule-based or
deterministic approach is simpler, auditable, and correct.

Live site: https://ichbinlucaskim.github.io

## Selected work

### GNN link prediction for missing OpenStreetMap roads

Edge-level link prediction over city road graphs: given two intersections, infer
whether a road should connect them. It is the machine-learning stage of a larger
ML-to-rules-to-human system, where the model proposes, deterministic checks dispose,
and a person approves.

- Edge-level link prediction as the primary task. A two-layer GraphSAGE encoder with
  a Hadamard-MLP decoder. A domain feature, stretch (on-graph distance over
  straight-line distance), plus GraphSAGE beat a heavier link-level model (SEAL with
  DRNL labelling) on the same graphs.
- Honest metrics. The candidate space is every pair of nodes, so it grows with N² and
  accuracy is meaningless. Evaluation uses AUC, PR-AUC, Precision@k, MRR and Hits@K,
  never accuracy. Distance-matched negatives remove distance as a free signal.
- Leakage-safe by construction. For each candidate pair the target edge (both
  directions, including parallel edges) is removed from the message-passing graph,
  enforced with runtime asserts and tests.
- ML, rules, and human boundary. The model only proposes candidate links; deterministic
  rules validate topology and routing, and a person gives final approval, with no
  auto-editing of the map. The data-validation gate is built; the topology and
  human-review tiers are specified, not yet implemented.

Repo: https://github.com/ichbinlucaskim/osm-link-inference
Case study: https://ichbinlucaskim.github.io/#/projects/osm-link-inference

### Floorplan to structural decomposition to IFC

A seven-package pipeline that turns a 2D residential floor plan into manufacturing-ready
building data for panelized prefab. It reconstructs walls and openings, splits them into
transport-legal panels, synthesizes code-prescriptive light-wood framing, resolves a
build order, and exports a validated IFC4 model.

- Deterministic by design. Every stage is geometry or rules; no learned model ships
  anywhere in the pipeline. Framing follows building-code prescriptive tables (IRC
  R602.7, NBC/OBC Part 9); build order is a precedence DAG resolved by a topological
  sort. Choosing rules where they are simpler, auditable, and correct is the point.
- Geometry from the source polygons. Walls are recovered by enumerating each room's
  exterior-ring edges. IFC is the pipeline's output, not its input, and the
  coordinate-free room-connectivity graph is deliberately not used for geometry.
- Verified output. On the example plan (plan-008557): 29 walls, 397 framing members,
  31 panels, 15 openings, and a validated IFC4 model with zero validation errors. 215
  tests across 7 packages. The source ResPlan corpus holds roughly 17,000 plans.

Repo: https://github.com/ichbinlucaskim/floorplan-pipeline
Case study: https://ichbinlucaskim.github.io/#/projects/aec-pipeline

### Does a GNN beat retrieval for MCP tool routing?

A controlled harness that frames MCP tool routing as ranking over a tool graph (tools
are nodes; edges encode parameter dependencies and functional association) and asks
whether a GNN beats retrieval baselines. It does not. Dense retrieval wins. The value
is an audited negative finding and a diagnosis of why the GNN collapses.

- Clean comparison. Five routers (BM25, dense retrieval, their fusion, graph traversal,
  and a GNN) run behind one deterministic contract, so the comparison isolates ranking
  quality. Built on the ToolLinkOS benchmark (573 tools, roughly 1,569 queries).
- The result. On identical features, averaged over five seeds, a learning-free
  dense-retrieval baseline completes 0.979 of queries; the dependency-aware GNN reaches
  at most 0.052.
- The diagnosis. The GNN collapses through message-passing hub amplification (a dominant
  hub, in-degree 371), a frequency-biased training objective, and a heterophilic graph
  where dependency-linked tools are not lexically similar. An isolation probe shows
  message passing alone reproduces the collapse.
- Audited, not hand-waved: 200 tests, 31 architecture decision records written before
  the code, and an expected-failure test that encodes the collapse.

Repo: https://github.com/ichbinlucaskim/mcp-router-eval
Case study: https://ichbinlucaskim.github.io/#/projects/mcp-router-eval

## Links

- Site: https://ichbinlucaskim.github.io
- Email: ichbinlucas211@gmail.com
- LinkedIn: https://www.linkedin.com/in/ichbinlucas
- GitHub: https://github.com/ichbinlucaskim
