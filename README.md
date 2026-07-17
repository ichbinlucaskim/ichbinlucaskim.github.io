# Lucas Kim

Graph ML engineer. I understand the world through graph structure, and have applied it
across spatial and AEC domains. The common thread is judgment: knowing where a learned
model wins, and where a rule-based or deterministic approach is simpler, auditable, and
correct.

Live site: https://ichbinlucaskim.github.io

## Selected work

**[GNN link prediction for missing OpenStreetMap roads](https://ichbinlucaskim.github.io/projects/osm-link-inference)** — Edge-level link
prediction over city road graphs: given two intersections, infer whether a road should
connect them. GraphSAGE encoder with a Hadamard-MLP decoder, leakage-safe by
construction, evaluated on ranking metrics rather than accuracy. The model proposes;
deterministic rules dispose; a person approves.
· [Repo](https://github.com/ichbinlucaskim/osm-link-inference)

**[Floorplan to structural decomposition to IFC](https://ichbinlucaskim.github.io/projects/aec-pipeline)** — A seven-package pipeline
turning a 2D floor plan into manufacturing-ready data for panelized prefab: walls and
openings, transport-legal panels, code-prescriptive framing, build order, validated
IFC4. Fully deterministic — no learned model ships anywhere, and that is the point.
· [Repo](https://github.com/ichbinlucaskim/floorplan-pipeline)

**[Does a GNN beat retrieval for MCP tool routing?](https://ichbinlucaskim.github.io/projects/mcp-router-eval)** — Frames MCP tool routing
as ranking over a tool graph and asks whether a GNN beats retrieval. It does not: dense
retrieval completes 0.979 of queries, the GNN at most 0.052. The value is an audited
negative finding and a diagnosis of why the GNN collapses.
· [Repo](https://github.com/ichbinlucaskim/mcp-router-eval)

## Links

- Site: https://ichbinlucaskim.github.io
- Email: ichbinlucas211@gmail.com
- LinkedIn: https://www.linkedin.com/in/ichbinlucas
- GitHub: https://github.com/ichbinlucaskim
