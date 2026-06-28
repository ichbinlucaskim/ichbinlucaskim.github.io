// Signature element: minimal geometric line-art, one per domain.
// Replaces fake screenshots — each motif nods to the project's real
// subject (spatial / geometric). Monochrome line + single accent.

const line = 'var(--color-line)'
const ink = 'var(--color-faint)'
const accent = 'var(--color-accent)'

function Plan(props) {
  // orthogonal floor-plan wireframe (AEC)
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <g stroke={ink} strokeWidth="1.5" strokeLinejoin="round">
        <path d="M28 26 H150 V52 H172 V96 H78 V74 H28 Z" />
        <line x1="96" y1="26" x2="96" y2="74" strokeWidth="1" />
        <line x1="96" y1="52" x2="150" y2="52" strokeWidth="1" />
      </g>
      {/* door swing in accent */}
      <path d="M78 74 a22 22 0 0 1 22 -22" stroke={accent} strokeWidth="1.5" fill="none" />
      <circle cx="78" cy="74" r="2.5" fill={accent} />
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

const variants = { plan: Plan, graph: Graph, contour: Contour, strata: Strata }

export default function Motif({ variant = 'graph', className = '' }) {
  const Cmp = variants[variant] || Graph
  return <Cmp className={className} aria-hidden="true" />
}
