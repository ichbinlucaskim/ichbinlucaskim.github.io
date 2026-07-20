// The hero's one orchestrated motion: a small spatial node-graph whose
// edges draw in once on load, then nodes pop. Reduced-motion shows it
// static. Decorative, hidden from assistive tech.

const nodes = [
  [60, 50], [140, 30], [210, 70], [95, 120], [180, 140], [40, 150], [250, 120],
]
const edges = [
  [0, 1], [1, 2], [0, 3], [3, 4], [1, 4], [2, 6], [4, 6], [0, 5], [3, 5], [2, 4],
]

function len(a, b) {
  const dx = nodes[a][0] - nodes[b][0]
  const dy = nodes[a][1] - nodes[b][1]
  return Math.round(Math.hypot(dx, dy))
}

export default function HeroGraph({ className = '' }) {
  return (
    <svg viewBox="0 0 290 180" fill="none" aria-hidden="true" className={className}>
      <g stroke="var(--color-line)" strokeWidth="1.25">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            className="edge-draw"
            style={{ '--len': len(a, b), animationDelay: `${0.15 + i * 0.07}s` }}
          />
        ))}
      </g>
      {nodes.map(([x, y], i) => {
        const lead = i % 3 === 0
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={lead ? 5.5 : 3.8}
            fill={lead ? 'var(--color-accent)' : 'var(--color-faint)'}
            className="node-pop"
            style={{ animationDelay: `${0.7 + i * 0.06}s` }}
          />
        )
      })}
    </svg>
  )
}
