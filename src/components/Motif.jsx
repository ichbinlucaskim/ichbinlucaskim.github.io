// Signature element: minimal geometric line-art, one per domain.
// Replaces fake screenshots — each motif nods to the project's real
// subject (spatial / geometric). Monochrome line + single accent.

const line = 'var(--color-line)'
const ink = 'var(--color-faint)'
const accent = 'var(--color-accent)'

function Plan(props) {
  // a residential floor plan (rooms, walls, a door) decomposing into panels (AEC)
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      {/* floor plan: outer walls + interior partitions (rooms) */}
      <g stroke={ink} strokeLinejoin="round" strokeLinecap="round">
        <path d="M18 26 H92 V98 H18 Z" strokeWidth="1.7" />
        <path d="M58 26 V64" strokeWidth="1.3" />
        <path d="M18 64 H40" strokeWidth="1.3" />
        <path d="M56 64 H92" strokeWidth="1.3" />
      </g>
      {/* door opening + swing arc at the partition gap */}
      <path d="M56 64 A16 16 0 0 0 40 48" stroke={ink} strokeWidth="1" fill="none" />
      {/* decomposition marker (muted) */}
      <path d="M102 55 L110 63 L102 71" stroke={ink} strokeWidth="1.2" opacity="0.55" strokeLinecap="round" strokeLinejoin="round" />
      {/* the plan's buildable parts: wall panels, one highlighted in accent */}
      <g stroke={ink} strokeWidth="1.3" strokeLinejoin="round">
        <path d="M124 40 H136 V88 H124 Z" />
        <path d="M160 40 H172 V88 H160 Z" />
        <path d="M176 40 H188 V88 H176 Z" />
      </g>
      <path d="M142 40 H154 V88 H142 Z" stroke={accent} strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="148" cy="40" r="2.4" fill={accent} />
    </svg>
  )
}

function Graph(props) {
  // node-edge graph (GNN)
  const nodes = [
    [40, 40], [92, 26], [150, 48], [64, 86], [126, 92], [168, 84],
  ]
  const edges = [
    [0, 1], [1, 2], [0, 3], [1, 4], [3, 4], [2, 5], [4, 5], [2, 4],
  ]
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <g stroke={line} strokeWidth="1.25">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
        ))}
      </g>
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 4.5 : 3.2} fill={i % 3 === 0 ? accent : ink} />
      ))}
    </svg>
  )
}

function Contour(props) {
  // nested contour field (geospatial)
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <g stroke={ink} strokeWidth="1.25">
        <path d="M30 92 C70 70 130 70 170 92" />
        <path d="M44 80 C78 62 122 62 156 80" />
        <path d="M58 68 C84 54 116 54 142 68" />
        <path d="M74 56 C92 48 108 48 126 56" />
      </g>
      <path d="M88 46 C96 42 104 42 112 46" stroke={accent} strokeWidth="1.5" />
      <circle cx="100" cy="44" r="2.5" fill={accent} />
    </svg>
  )
}

function Roads(props) {
  // road-network fragment with one inferred (dashed accent) link (OSM link inference)
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <g stroke={ink} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M24 44 H84 V20" />
        <path d="M84 44 H150 V98" />
        <path d="M44 98 H150" />
        <path d="M84 44 V98" />
        <path d="M150 44 H178" />
      </g>
      {/* known intersections */}
      <circle cx="84" cy="44" r="3" fill={ink} />
      <circle cx="84" cy="98" r="3" fill={ink} />
      {/* inferred missing link + its endpoint, in accent */}
      <path d="M150 44 L84 98" stroke={accent} strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="150" cy="44" r="3.2" fill={accent} />
    </svg>
  )
}

function Router(props) {
  // an MCP tool graph: the retrieval route holds (solid navy, source → target);
  // the GNN route collapses (dashed, faded, breaks before the target).
  const N = {
    A: [26, 58], B: [66, 30], C: [106, 46], D: [148, 28], E: [178, 60], F: [122, 90], G: [70, 88],
  }
  const L = (k) => `${N[k][0]} ${N[k][1]}`
  const ctx = [['B', 'G'], ['C', 'F'], ['C', 'G'], ['D', 'F']] // context edges → reads as a graph
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      {/* the tool graph (context edges) */}
      <g stroke={line} strokeWidth="1.25">
        {ctx.map(([a, b], i) => (
          <line key={i} x1={N[a][0]} y1={N[a][1]} x2={N[b][0]} y2={N[b][1]} />
        ))}
      </g>
      {/* GNN route: dashed, faded, breaks before reaching the target */}
      <g stroke={ink} strokeWidth="1.3" strokeDasharray="4 4" strokeLinecap="round">
        <line x1={N.A[0]} y1={N.A[1]} x2={N.G[0]} y2={N.G[1]} />
        <line x1={N.G[0]} y1={N.G[1]} x2={N.F[0]} y2={N.F[1]} />
        <line x1={N.F[0]} y1={N.F[1]} x2="152" y2="74" />
      </g>
      {/* retrieval route: solid navy, source → target */}
      <path
        d={`M${L('A')} L${L('B')} L${L('C')} L${L('D')} L${L('E')}`}
        stroke={accent}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* source + target */}
      <circle cx={N.A[0]} cy={N.A[1]} r="3.6" fill={ink} />
      <circle cx={N.E[0]} cy={N.E[1]} r="3.6" fill={ink} />
      {/* retrieval-route nodes, accent */}
      <circle cx={N.B[0]} cy={N.B[1]} r="3.6" fill={accent} />
      <circle cx={N.C[0]} cy={N.C[1]} r="3.6" fill={accent} />
      <circle cx={N.D[0]} cy={N.D[1]} r="3.6" fill={accent} />
      {/* collapsed-route nodes, hollow + faint */}
      <circle cx={N.G[0]} cy={N.G[1]} r="3" fill="var(--color-canvas)" stroke={line} strokeWidth="1.25" />
      <circle cx={N.F[0]} cy={N.F[1]} r="3" fill="var(--color-canvas)" stroke={line} strokeWidth="1.25" />
    </svg>
  )
}

function Strata(props) {
  // layered strata (subsurface) + a sampled column
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <g stroke={ink} strokeWidth="1.25">
        <path d="M24 40 C70 30 130 50 176 38" />
        <path d="M24 60 C70 52 130 70 176 58" />
        <path d="M24 82 C70 76 130 92 176 80" />
      </g>
      <line x1="108" y1="28" x2="108" y2="96" stroke={accent} strokeWidth="1.5" />
      <circle cx="108" cy="45" r="2.5" fill={accent} />
      <circle cx="108" cy="65" r="2.5" fill={accent} />
      <circle cx="108" cy="86" r="2.5" fill={accent} />
    </svg>
  )
}

const variants = { plan: Plan, graph: Graph, contour: Contour, strata: Strata, roads: Roads, router: Router }

export default function Motif({ variant = 'graph', className = '' }) {
  const Cmp = variants[variant] || Graph
  return <Cmp className={className} aria-hidden="true" />
}
