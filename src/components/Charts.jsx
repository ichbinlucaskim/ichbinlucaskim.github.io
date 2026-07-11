// Case-study data charts. Pure CSS/flex bars (no SVG scaling, no deps) using
// the site's design tokens. Every number traces to a committed source, cited
// per chart. Rendered inside the existing <figure> slots by CaseStudy.jsx.

const ACCENT = 'var(--color-accent)' // #1b3a6b deep navy — series 1 (Calgary / NaiveRAG), the subject
const ACCENT_2 = '#808080' //            pure neutral gray — series 2 (Edmonton / GNN), the comparison
//                                       Apple one-hue-plus-gray: 3.95:1 vs white, 3.23:1 vs track, achromatic vs navy

// One horizontal bar row: label (name + sub) · track/fill · mono value.
function BarRow({ name, sub, pct, value, color = ACCENT, zero = false, cols }) {
  return (
    <div
      className="grid items-center gap-3"
      style={{ gridTemplateColumns: cols }}
    >
      <div className="flex min-w-0 flex-col leading-tight">
        <span className="text-[13px] font-medium text-ink">{name}</span>
        {sub && <span className="text-[11px] text-faint">{sub}</span>}
      </div>
      <div className="relative h-3.5 overflow-hidden rounded-full bg-line-soft">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span
        className={`text-right font-mono text-[13px] tabular-nums ${
          zero ? 'text-faint' : 'text-ink'
        }`}
      >
        {value}
      </span>
    </div>
  )
}

function Axis({ ticks, cols }) {
  return (
    <div className="mt-2.5 grid gap-3" style={{ gridTemplateColumns: cols }}>
      <div className="col-start-2 flex justify-between font-mono text-[10.5px] text-faint">
        {ticks.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  )
}

function Title({ children, sub }) {
  return (
    <>
      <p className="text-[12px] font-semibold uppercase tracking-wider text-faint">
        {children}
      </p>
      {sub && <p className="mt-1 text-[12px] text-faint">{sub}</p>}
    </>
  )
}

// ── MCP #1 — baseline vs GNN (structural completion) ────────────────
// Source: mcp-router-eval README.md:19-23 (test split, 236 queries, k=10,
// GNN mean over 5 seeds).
const MCP_COLS = 'minmax(92px,30%) 1fr 44px'
const MCP_ROUTERS = [
  { name: 'NaiveRAG', sub: 'dense retrieval', v: 0.979 },
  { name: 'HybridRAG', sub: 'dense + sparse', v: 0.936 },
  { name: 'Traversal', sub: 'graph traversal', v: 0.877 },
  { name: 'BM25', sub: 'sparse', v: 0.725 },
  { name: 'GNN · GAT', sub: 'learned', v: 0.052 },
  { name: 'GNN · R-GCN / SAGE', sub: 'learned', v: 0.0 },
]

function McpRouters() {
  return (
    <div>
      <Title sub="Test split · 236 queries · k = 10 · GNN mean over 5 seeds">
        Structural completion by router
      </Title>
      <div className="mt-4 flex flex-col gap-[11px]">
        {MCP_ROUTERS.map((r) => (
          <BarRow
            key={r.name}
            name={r.name}
            sub={r.sub}
            pct={r.v * 100}
            value={r.v.toFixed(3)}
            zero={r.v === 0}
            cols={MCP_COLS}
          />
        ))}
      </div>
      <Axis ticks={['0', '0.5', '1.0']} cols={MCP_COLS} />
    </div>
  )
}

// ── MCP #2 — collapse isolation probe ───────────────────────────────
// Source: mcp-router-eval docs/findings-gnn-collapse.md:72,75 (validation
// split, 235 queries, seed 0).
function McpProbe() {
  const panels = [
    {
      head: 'Query completion',
      dir: 'higher is better',
      rows: [
        { name: 'NaiveRAG', sub: 'dense cosine', v: 0.97, color: ACCENT },
        { name: 'GNN', sub: 'message passing only', v: 0.0, color: ACCENT_2, zero: true },
      ],
    },
    {
      head: 'Node pairwise cosine',
      dir: 'higher = more over-smoothed',
      rows: [
        { name: 'NaiveRAG', sub: 'dense cosine', v: 0.501, color: ACCENT },
        { name: 'GNN', sub: 'message passing only', v: 0.862, color: ACCENT_2 },
      ],
    },
  ]
  return (
    <div>
      <Title sub="Validation split · 235 queries · seed 0">
        Isolation probe: message passing alone reproduces the collapse
      </Title>
      <div className="mt-3.5 flex flex-col gap-5">
        {panels.map((p) => (
          <div key={p.head}>
            <p className="text-[12px] font-semibold text-muted">
              {p.head} <span className="font-normal text-faint">· {p.dir}</span>
            </p>
            <div className="mt-2.5 flex flex-col gap-[11px]">
              {p.rows.map((r) => (
                <BarRow
                  key={r.name}
                  name={r.name}
                  sub={r.sub}
                  pct={r.v * 100}
                  value={r.v.toFixed(3)}
                  color={r.color}
                  zero={r.zero}
                  cols={MCP_COLS}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Axis ticks={['0', '0.5', '1.0']} cols={MCP_COLS} />
    </div>
  )
}

// ── OSM #3 — baseline comparison (AUC + Hits@20) ────────────────────
// Source: osm-link-inference README.md:19-22 (per-city, Calgary / Edmonton).
const OSM_COLS = '62px 1fr 44px'
const OSM_METHODS = [
  { name: 'raw endpoint distance', auc: [0.53, 0.54], hits: [0.03, 0.08] },
  { name: 'stretch', tag: 'network ÷ straight-line', auc: [0.69, 0.71], hits: [0.05, 0.1] },
  { name: 'GraphSAGE + HadamardMLP', auc: [0.85, 0.87], hits: [0.07, 0.12] },
  { name: 'SEAL / DRNL', auc: [0.85, 0.86], hits: [0.008, 0.002] },
]
const CITIES = ['Calgary', 'Edmonton']

function OsmGroup({ name, tag, values, max, fmt }) {
  return (
    <div className="mt-3 flex flex-col gap-[5px]">
      <p className="text-[12.5px] font-medium text-ink">
        {name}
        {tag && <span className="font-normal text-faint"> {tag}</span>}
      </p>
      {values.map((v, i) => (
        <div
          key={CITIES[i]}
          className="grid items-center gap-2.5"
          style={{ gridTemplateColumns: OSM_COLS }}
        >
          <span className="text-[11px] text-faint">{CITIES[i]}</span>
          <div className="relative h-3.5 overflow-hidden rounded-full bg-line-soft">
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ width: `${(v / max) * 100}%`, background: i === 0 ? ACCENT : ACCENT_2 }}
            />
          </div>
          <span className="text-right font-mono text-[13px] tabular-nums text-ink">
            {fmt(v)}
          </span>
        </div>
      ))}
    </div>
  )
}

function OsmBaseline() {
  const auc2 = (v) => v.toFixed(2)
  const hits2 = (v) => (v < 0.01 ? v.toFixed(3) : v.toFixed(2))
  return (
    <div>
      <Title>Baseline comparison · Calgary and Edmonton</Title>
      <div className="mt-3 flex items-center gap-4">
        {CITIES.map((c, i) => (
          <span key={c} className="flex items-center gap-1.5 text-[12px] text-muted">
            <span
              className="inline-block h-2.5 w-2.5 rounded-[3px]"
              style={{ background: i === 0 ? ACCENT : ACCENT_2 }}
            />
            {c}
          </span>
        ))}
      </div>

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-faint">
        AUC — higher is better
      </p>
      {OSM_METHODS.map((m) => (
        <OsmGroup key={m.name} name={m.name} tag={m.tag} values={m.auc} max={1} fmt={auc2} />
      ))}
      <Axis ticks={['0', '0.5', '1.0']} cols={OSM_COLS} />

      <p className="mt-5 text-[11px] font-semibold uppercase tracking-wide text-faint">
        Hits@20 — higher is better
      </p>
      {OSM_METHODS.map((m) => (
        <OsmGroup key={m.name} name={m.name} values={m.hits} max={0.13} fmt={hits2} />
      ))}
      <Axis ticks={['0', '0.065', '0.13']} cols={OSM_COLS} />
    </div>
  )
}

const charts = {
  'mcp-routers': McpRouters,
  'mcp-probe': McpProbe,
  'osm-baseline': OsmBaseline,
}

export default function Chart({ name }) {
  const Cmp = charts[name]
  return Cmp ? <Cmp /> : null
}
