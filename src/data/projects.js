// Projects hub. Each project is a card on Home and (if `caseStudy`) a
// detail page at /#/projects/:slug. Add new projects as objects here.

export const projects = [
  {
    slug: 'aec-pipeline',
    title: 'Floorplan → structural decomposition → IFC',
    summary:
      'Floor plans become manufacturing-ready building data for panelized prefab. Structural decomposition into walls, panels, and building-code framing, exported as validated IFC.',
    tags: ['Spatial ML', 'Pipeline', 'IFC'],
    motif: 'plan',
    status: 'live',
    links: [{ label: 'GitHub', href: 'https://github.com/ichbinlucaskim' }],
    caseStudy: true,
  },
  {
    slug: 'gnn-spatial',
    title: 'GNN spatial models',
    summary:
      'Graph neural networks over spatial and geometric structure. Learned representations applied where they beat hand-written rules.',
    tags: ['GNN', 'Spatial ML', 'Research'],
    motif: 'graph',
    status: 'soon',
    caseStudy: false,
  },
  {
    slug: 'geospatial',
    title: 'Geospatial modeling',
    summary:
      'Models over terrain and geospatial fields. Spatial ML beyond buildings.',
    tags: ['Geospatial', 'Spatial ML'],
    motif: 'contour',
    status: 'soon',
    caseStudy: false,
  },
  {
    slug: 'subsurface',
    title: 'Subsurface / geology',
    summary:
      'Structured models of layered subsurface data. Another domain where spatial ML and the right rules meet.',
    tags: ['Subsurface', 'Spatial ML'],
    motif: 'strata',
    status: 'soon',
    caseStudy: false,
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
    { n: 1, name: 'Floor plan', note: 'real ResPlan input' },
    { n: 2, name: 'Walls', note: 'vectorized geometry' },
    { n: 3, name: 'Panels', note: 'segmented assemblies' },
    { n: 4, name: 'Framing', note: 'light-wood members' },
    { n: 5, name: 'IFC + sequence', note: 'machine-readable model' },
  ],

  judgment: [
    {
      kind: 'Rule-based',
      title: 'Framing',
      body: 'Member layout follows building-code prescriptive tables: IRC R602.7, NBC, OBC. No public dataset of framed walls exists to learn from. The right tool is a rule engine, not a model.',
    },
    {
      kind: 'Deterministic',
      title: 'Assembly sequence',
      body: 'Build order is a precedence DAG, resolved by deterministic topological sort. One valid ordering, computed rather than predicted.',
    },
    {
      kind: 'Learned',
      title: 'ML, where it earns it',
      body: 'ML is used only where learned structure beats hand-written rules. Deciding where it fits, and where it does not, is the core of the work.',
    },
  ],

  planMetrics: [
    { value: '29', label: 'walls' },
    { value: '~397', label: 'framing members' },
    { value: '31', label: 'panels' },
    { value: '15', label: 'openings' },
  ],

  engMetrics: [
    { value: '0', label: 'IFC validation errors' },
    { value: '215', label: 'tests green across 7 repos' },
    { value: '17,000', label: 'plans fixed (door-blockage)' },
  ],

  visuals: [
    {
      label: 'floor-plan → IFC animation',
      note: 'A short clip of one plan walking through the pipeline. ~16:9.',
      motif: 'plan',
    },
    {
      label: 'pipeline-stages diagram',
      note: 'Walls → panels → framing → IFC drawn as a single annotated figure.',
      motif: 'graph',
    },
    {
      label: 'interactive assembly sequence',
      note: 'A 3D, step-through view of the framing assembling in build order. Planned as a react-three-fiber scene.',
      motif: 'strata',
    },
  ],

  tech: ['Python', 'Geometry processing', 'IFC / IfcOpenShell', 'Graph algorithms', 'PyTorch / GNNs', 'CI across 7 repos'],
}
