// Projects hub. Each project is a card on Home and (if `caseStudy`) a
// detail page at /#/projects/:slug. Add new projects as objects here.

// ── Case study: osm-link-inference (P4) ────────────────────────────
// Data-driven blocks rendered by components/CaseStudy.jsx. Every claim and
// number traces to the repo; results are described honestly (within-city
// experiments, not a transfer claim).
const osmCaseStudy = {
  blocks: [
    {
      id: 'overview',
      title: 'Overview',
      type: 'prose',
      paragraphs: [
        'Given two intersection nodes in an OpenStreetMap road graph, the model predicts whether a road edge should connect them, inferring the connections the map is missing. It is built as the machine-learning stage of a larger ML-to-rules-to-human system: the model proposes, deterministic checks dispose, and a person approves.',
      ],
    },
    {
      id: 'problem',
      title: 'The problem',
      type: 'prose',
      paragraphs: [
        'A missing road rarely looks like a short gap. It shows up as a long detour: two points close in space but far apart on the graph. The candidate space is every pair of nodes, so it grows with the square of the node count, which makes accuracy a meaningless metric and makes a naive train/test split leak neighbouring geometry into evaluation.',
      ],
    },
    {
      id: 'approach',
      title: 'Approach',
      nav: 'Approach',
      type: 'stages',
      lead: 'The pipeline runs as validated stages, each a schema-checked artifact. A quality gate can hard-stop a malformed graph before any model sees it.',
      items: [
        { n: 1, name: 'Graph + gate', note: 'OSM → validated road graph' },
        { n: 2, name: 'Leakage-safe split', note: 'spatial holdout, not random' },
        { n: 3, name: 'Negatives', note: 'distance-matched pairs' },
        { n: 4, name: 'Features', note: 'stretch, Katz, degree' },
        { n: 5, name: 'GraphSAGE', note: 'encoder + Hadamard MLP' },
      ],
    },
    {
      id: 'hard-parts',
      title: 'The hard parts',
      nav: 'The hard parts',
      type: 'cards',
      lead: 'Two problems decide whether the numbers mean anything, plus a boundary that keeps the model in its lane.',
      items: [
        {
          kind: 'Imbalance',
          title: 'Honest metrics, not accuracy',
          body: 'The pair space grows with N² and is overwhelmingly negative, so accuracy is uninformative. Evaluation uses AUC, PR-AUC, Precision@k, MRR and Hits@K. Negatives are distance-matched to the positives, which removes distance as a free signal and dropped an inflated AUC of about 0.80 to about 0.55, the honest measure of the task.',
        },
        {
          kind: 'Leakage',
          title: 'The target edge never leaks',
          body: 'For each candidate pair the edge under prediction, both directions and including parallel edges, is removed from the message-passing graph. Splits are disjoint at the node-pair level, and the firewall is enforced with runtime asserts and dedicated tests, not left to convention.',
        },
        {
          kind: 'Boundary',
          title: 'ML proposes, rules dispose',
          body: 'The model only proposes candidate links. Deterministic rules are designed to validate topology and routing, and a human gives final approval. The map is never auto-edited. The data-validation gate is built; the topology and human-review tiers are specified and governed, not yet implemented.',
        },
      ],
    },
    {
      id: 'finding',
      title: 'What the model showed',
      nav: 'Finding',
      type: 'prose',
      paragraphs: [
        'A domain feature carried the task. Adding stretch, the ratio of on-graph distance to straight-line distance, to a standard two-layer GraphSAGE encoder beat a heavier link-level model (SEAL with DRNL labelling) on the same graphs.',
        'Results are reported as independent within-city experiments, not a cross-city transfer claim. Unseen-city generalisation is named as the next step, not asserted.',
      ],
    },
    {
      id: 'visuals',
      title: 'Visuals',
      type: 'visuals',
      lead: 'Drawn from the committed AUC and Hits@20 table in the repository.',
      items: [
        {
          label: 'baseline comparison',
          note: 'On AUC, GraphSAGE and SEAL / DRNL tie; on ranking (Hits@20) the domain feature plus GraphSAGE beats the heavier SEAL / DRNL. Committed table in the repository.',
          chart: 'osm-baseline',
        },
      ],
    },
    {
      id: 'tech',
      title: 'Tech & links',
      nav: 'Tech',
      type: 'tech',
      tech: ['Python', 'PyTorch Geometric', 'GraphSAGE', 'SEAL / DRNL', 'OSMnx', 'NetworkX', 'NumPy'],
      link: {
        label: 'View the repository',
        href: 'https://github.com/ichbinlucaskim/osm-link-inference',
      },
    },
  ],
}

// ── Case study: mcp-router-eval (P5) ───────────────────────────────
// An audited negative result. The GNN loses to dense retrieval; do not
// frame it as a win. Numbers are the committed README / findings figures.
const mcpCaseStudy = {
  blocks: [
    {
      id: 'overview',
      title: 'Overview',
      type: 'prose',
      paragraphs: [
        'MCP tool routing framed as a ranking problem over a graph. Tools are nodes; edges encode parameter dependencies and functional association. Given a query, the router must recover not just the obvious tool but the full dependency closure needed to complete it, including tools the query never names.',
        'The work is a controlled harness built on the ToolLinkOS benchmark (573 tools, roughly 1,569 queries, four typed edge relations) for one question: does a graph neural network beat plain retrieval at this?',
      ],
    },
    {
      id: 'harness',
      title: 'The harness',
      nav: 'Harness',
      type: 'prose',
      paragraphs: [
        'Five routers sit behind one deterministic contract: BM25 (sparse), NaiveRAG (dense cosine over BGE embeddings), HybridRAG (their fusion), a graph Traversal that expands dependencies, and a GNN (R-GCN, GAT or GraphSAGE) scored as a query-conditioned two-tower model.',
        'Every router output flows through the identical contract layer, which expands the top-k into its dependency closure and attributes any failure to routing, contract, or execution. Because that layer is byte-identical across routers, the comparison isolates ranking quality and nothing else.',
      ],
    },
    {
      id: 'result',
      title: 'The result',
      type: 'metrics',
      lead: 'Dense retrieval wins. On identical BGE features, averaged over five seeds, a learning-free cosine baseline completes 0.979 of queries; the dependency-aware GNN reaches at most 0.052.',
      groups: [
        {
          cols: 3,
          items: [
            { value: '0.979', label: 'NaiveRAG (dense)' },
            { value: '0.936', label: 'HybridRAG' },
            { value: '0.877', label: 'Traversal' },
            { value: '0.725', label: 'BM25' },
            { value: '0.052', label: 'GNN (GAT)' },
            { value: '0.000', label: 'GNN (R-GCN / SAGE)' },
          ],
          note: 'Structural-completion rate on the held-out test split, k = 10, mean over 5 seeds.',
        },
      ],
    },
    {
      id: 'collapse',
      title: 'Why the GNN collapses',
      nav: 'Why it fails',
      type: 'cards',
      items: [
        {
          kind: 'Topology',
          title: 'Hub amplification',
          body: 'Message passing over a graph with a dominant hub (in-degree 371) washes node representations toward that hub, so the ranker retrieves it for nearly every query.',
        },
        {
          kind: 'Objective',
          title: 'Frequency-biased loss',
          body: 'The InfoNCE training objective is biased toward popular tools. logQ debiasing and a GCNII residual were both tried as remedies; neither rescued the collapse.',
        },
        {
          kind: 'Structure',
          title: 'Heterophilic graph',
          body: 'Dependency-linked tools are not lexically similar: mean pairwise Jaccard 0.08, with 54% of pairs sharing no tokens. An isolation probe shows message passing alone reproduces the collapse. The structure actively hurts here.',
        },
      ],
    },
    {
      id: 'defensible',
      title: 'Why a negative result stands',
      nav: 'Why it stands',
      type: 'prose',
      paragraphs: [
        'The question is cleanly answerable, and that is what makes the negative result stand. Strong baselines (BM25, dense retrieval, fusion, and graph traversal) make "does the GNN actually beat retrieval" a decidable question rather than a hope.',
        'The finding is audited, not hand-waved: 200 tests, 31 architecture decision records written before the code, and an expected-failure test that encodes the collapse and would flip the moment a change lifts GNN completion off the floor.',
      ],
    },
    {
      id: 'visuals',
      title: 'Visuals',
      type: 'visuals',
      lead: 'Charts drawn from the committed evaluation numbers (README and the collapse write-up).',
      items: [
        {
          label: 'baseline vs GNN comparison',
          note: 'Structural-completion rate for all five routers, the headline of the negative result: a learning-free dense-retrieval baseline beats the dependency-aware GNN.',
          chart: 'mcp-routers',
        },
        {
          label: 'collapse isolation probe',
          note: 'Message-passing-alone versus dense retrieval on the same features: completion 0.97 to 0.00, node pairwise cosine 0.50 to 0.86. The evidence that the graph is the problem.',
          chart: 'mcp-probe',
        },
      ],
    },
    {
      id: 'tech',
      title: 'Tech & links',
      nav: 'Tech',
      type: 'tech',
      tech: ['Python', 'PyTorch Geometric', 'R-GCN / GAT / GraphSAGE', 'sentence-transformers (BGE)', 'rank-bm25', 'NumPy'],
      link: {
        label: 'View the repository',
        href: 'https://github.com/ichbinlucaskim/mcp-router-eval',
      },
    },
  ],
}

export const projects = [
  // Live case studies first, then NDA-pending internship placeholders.
  {
    slug: 'osm-link-inference',
    title: 'GNN link prediction for missing OpenStreetMap roads',
    summary:
      'Edge-level link prediction over city road graphs: given two intersections, infer whether a road should connect them. Distance-matched negatives and a leakage-safe message/supervision split keep the evaluation honest; deterministic rules and human review sit downstream of the model.',
    tags: ['GNN', 'Link prediction', 'PyTorch Geometric', 'Geospatial'],
    motif: 'roads',
    status: 'live',
    links: [{ label: 'GitHub', href: 'https://github.com/ichbinlucaskim/osm-link-inference' }],
    caseStudy: true,
    study: osmCaseStudy,
  },
  {
    slug: 'aec-pipeline',
    title: 'Floorplan → structural decomposition → IFC',
    summary:
      'Floor plans become manufacturing-ready building data for panelized prefab. Structural decomposition into walls, panels, and building-code framing, exported as validated IFC.',
    tags: ['Geometry', 'Pipeline', 'IFC'],
    motif: 'plan',
    status: 'live',
    links: [{ label: 'GitHub', href: 'https://github.com/ichbinlucaskim/floorplan-pipeline' }],
    caseStudy: true,
  },
  {
    slug: 'mcp-router-eval',
    title: 'Does a GNN beat retrieval for MCP tool routing?',
    summary:
      'A controlled harness that frames MCP tool routing as ranking over a tool graph and asks whether a GNN beats retrieval baselines. It does not. Dense retrieval wins. The result is an audited negative finding and a diagnosis of why the GNN collapses.',
    tags: ['GNN', 'Evaluation', 'MCP', 'Ranking'],
    motif: 'router',
    status: 'live',
    links: [{ label: 'GitHub', href: 'https://github.com/ichbinlucaskim/mcp-router-eval' }],
    caseStudy: true,
    study: mcpCaseStudy,
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)

// ── Full case study for the flagship AEC pipeline ──────────────────
// Real numbers; visuals are honest labelled placeholders.
export const aecCaseStudy = {
  sections: [
    { id: 'overview', label: 'Overview' },
    { id: 'problem', label: 'The problem' },
    { id: 'approach', label: 'Approach' },
    { id: 'judgment', label: 'ML vs rule-based' },
    { id: 'results', label: 'Results' },
    { id: 'visuals', label: 'Visuals' },
    { id: 'tech', label: 'Tech & links' },
  ],

  stages: [
    { n: 1, name: 'Floor plan', note: 'raw ResPlan polygons' },
    { n: 2, name: 'Walls', note: 'edges enumerated, px→mm' },
    { n: 3, name: 'Panels', note: 'split ≤3600 mm for transport' },
    { n: 4, name: 'Framing', note: 'IRC / NBC prescriptive members' },
    { n: 5, name: 'IFC + sequence', note: 'validated IFC4 + build order' },
  ],

  judgment: [
    {
      kind: 'Rule-based',
      title: 'Framing',
      body: 'Member layout follows building-code prescriptive tables: IRC R602.7 and the Canadian NBC / OBC Part 9. Studs at 400 mm on-centre; headers sized by span up to the 2970 mm prescriptive limit, beyond which the synthesizer refuses rather than guesses. No public dataset of framed walls exists to learn from; a rule engine is the right tool.',
    },
    {
      kind: 'Deterministic',
      title: 'Assembly sequence',
      body: 'Build order is a precedence DAG (carpentry constraints as edges) resolved by a deterministic, lexicographic topological sort. It yields one valid ordering, computed rather than predicted, and validated to be acyclic and complete.',
    },
    {
      kind: 'Judgment',
      title: 'Where a model would fit',
      body: 'Sequence optimization (minimizing robot path, time, or cost) is where learning could earn its keep, and it is left out on purpose: it needs factory data and an objective this project does not have. That same judgment runs across my work: this pipeline stays rule-based, while osm-link-inference uses a GNN where structure is learnable, and mcp-router-eval tests one and shows it losing to retrieval.',
    },
  ],

  planMetrics: [
    { value: '29', label: 'walls' },
    { value: '397', label: 'framing members' },
    { value: '31', label: 'panels' },
    { value: '15', label: 'openings' },
  ],

  engMetrics: [
    { value: '0', label: 'IFC validation errors' },
    { value: '215', label: 'tests across 7 packages' },
    { value: '6', label: 'JSON-schema contracts' },
  ],

  visuals: [
    {
      label: 'the exported IFC4 model',
      note: 'The pipeline output for plan-008557, opened as a 3D IFC4 model. The highlighted wall is the one decomposed into its 18 framing members in the build-order render below.',
      motif: 'plan',
      src: '/aec/ifc-model.png',
    },
    {
      label: 'framing assembly order',
      note: 'Wall-018 from that model, its 18 framing members colored and numbered by build order from the assembly-sequence stage. The order follows how the panel is actually built: flat on the table, plates down first, studs nailed through them.',
      motif: 'strata',
      src: '/aec/assembly-order.png',
    },
  ],

  tech: ['Python', 'Shapely', 'IfcOpenShell / IFC4', 'NetworkX', 'JSON Schema (2020-12)', '7-package CI'],
}
