import Motif from './Motif.jsx'
import Tag from './Tag.jsx'
import SectionNav from './SectionNav.jsx'
import Chart from './Charts.jsx'

// Data-driven case study renderer for projects beyond the bespoke AEC
// flagship. A study is `{ blocks: [...] }`; each block is one section on the
// page and one entry in the sticky TOC. Block types reuse the exact markup
// and tokens of the AEC case study so the pages read as one system.

// Static column classes so Tailwind's scanner emits them.
const gridCols = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
}

export default function CaseStudy({ data }) {
  const sections = data.blocks.map((b) => ({ id: b.id, label: b.nav || b.title }))

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[180px_1fr] lg:gap-14">
      <aside className="min-w-0 lg:col-start-1">
        <SectionNav sections={sections} />
      </aside>

      <div className="min-w-0 space-y-16">
        {data.blocks.map((b) => (
          <section key={b.id} id={b.id} className="scroll-mt-24">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-tight text-ink">
              {b.title}
            </h2>
            <div className="mt-4 text-[17px] leading-relaxed text-muted">
              <Body block={b} />
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

function Body({ block }) {
  switch (block.type) {
    case 'prose':
      return (
        <>
          {block.lead && <p className="mb-4">{block.lead}</p>}
          {block.paragraphs?.map((p, i) => (
            <p key={i} className={i > 0 ? 'mt-4' : undefined}>
              {p}
            </p>
          ))}
        </>
      )

    case 'stages':
      return (
        <>
          {block.lead && <p className="mb-6">{block.lead}</p>}
          <ol
            className={`grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line-soft bg-line-soft ${
              gridCols[block.items.length] || 'sm:grid-cols-3'
            }`}
          >
            {block.items.map((s) => (
              <li key={s.n} className="flex flex-col gap-1 bg-canvas p-4">
                <span className="font-mono text-[12px] text-accent">0{s.n}</span>
                <span className="text-[15px] font-semibold text-ink">{s.name}</span>
                <span className="text-[13px] text-faint">{s.note}</span>
              </li>
            ))}
          </ol>
        </>
      )

    case 'cards':
      return (
        <>
          {block.lead && <p className="mb-6">{block.lead}</p>}
          <div
            className={`grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line-soft bg-line-soft ${
              block.wcols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
            }`}
          >
            {block.items.map((c) => (
              <div key={c.title} className="bg-canvas p-5">
                <span className="text-[12px] font-semibold uppercase tracking-wider text-accent">
                  {c.kind}
                </span>
                <h3 className="mt-2 text-[17px] font-semibold text-ink">{c.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </>
      )

    case 'metrics':
      return (
        <>
          {block.lead && <p className="mb-6">{block.lead}</p>}
          {block.groups.map((g, gi) => (
            <div key={gi} className={gi > 0 ? 'mt-6' : undefined}>
              {g.label && (
                <p className="mb-2 text-[14px] font-medium text-faint">{g.label}</p>
              )}
              <div
                className={`grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line-soft bg-line-soft ${
                  gridCols[g.cols] || 'sm:grid-cols-3'
                }`}
              >
                {g.items.map((m) => (
                  <div key={m.label} className="bg-canvas p-5">
                    <div className="font-mono text-[26px] font-semibold tracking-tight text-ink">
                      {m.value}
                    </div>
                    <div className="mt-1 text-[13px] text-muted">{m.label}</div>
                  </div>
                ))}
              </div>
              {g.note && <p className="mt-4 text-[14px] text-faint">{g.note}</p>}
            </div>
          ))}
        </>
      )

    case 'visuals':
      return (
        <>
          {block.lead && <p className="mb-6">{block.lead}</p>}
          <div className="space-y-5">
            {block.items.map((v) => (
              <figure
                key={v.label}
                className="overflow-hidden rounded-2xl border border-line-soft bg-surface"
              >
                {v.chart ? (
                  // Real data chart from a committed source (see Charts.jsx).
                  <div className="bg-canvas p-5 sm:p-6">
                    <Chart name={v.chart} />
                  </div>
                ) : (
                  // PLACEHOLDER: swap the motif fill for real media; keep the 16:9 frame.
                  <div className="flex aspect-[16/9] items-center justify-center">
                    <Motif variant={v.motif} className="h-[42%] w-[42%] opacity-70" />
                  </div>
                )}
                <figcaption className="flex flex-col gap-1 border-t border-line-soft bg-canvas px-5 py-4">
                  <span className="text-[15px] font-semibold text-ink">
                    {v.label}
                    {!v.chart && <span className="font-normal text-faint"> (coming)</span>}
                  </span>
                  <span className="text-[14px] text-muted">{v.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </>
      )

    case 'tech':
      return (
        <>
          <div className="flex flex-wrap gap-2">
            {block.tech.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          {block.link && (
            <div className="mt-6">
              <a
                href={block.link.href}
                target="_blank"
                rel="noreferrer"
                className="text-[15px] font-medium text-accent underline-offset-2 transition-colors hover:text-accent-ink hover:underline"
              >
                {block.link.label} ↗
              </a>
            </div>
          )}
        </>
      )

    default:
      return null
  }
}
