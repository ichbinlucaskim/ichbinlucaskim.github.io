import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProject, aecCaseStudy } from '../data/projects.js'
import SectionNav from '../components/SectionNav.jsx'
import Motif from '../components/Motif.jsx'
import Tag from '../components/Tag.jsx'
import CaseStudy from '../components/CaseStudy.jsx'

export default function Project() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project) return <NotFound />

  return (
    <article className="mx-auto max-w-5xl px-6 py-14 sm:py-16">
      <BackLink />

      <header className="mt-6 max-w-3xl">
        <h1 className="text-[clamp(2.2rem,5vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.03em] text-ink">
          {project.title}
        </h1>
        <p className="mt-4 text-[19px] leading-relaxed text-muted">{project.summary}</p>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
          {project.links?.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="ml-1 text-[14px] font-medium text-accent underline-offset-2 transition-colors hover:text-accent-ink hover:underline"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      </header>

      {project.study ? (
        <CaseStudy data={project.study} />
      ) : project.caseStudy ? (
        <AecCaseStudy />
      ) : (
        <ComingSoon />
      )}
    </article>
  )
}

function AecCaseStudy() {
  const cs = aecCaseStudy
  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[180px_1fr] lg:gap-14">
      <aside className="min-w-0 lg:col-start-1">
        <SectionNav sections={cs.sections} />
      </aside>

      <div className="min-w-0 space-y-16">
        <Section id="overview" title="Overview">
          <p>
            A seven-package pipeline, six processing stages plus the shared schema
            that links them, turns a 2D residential floor plan into a validated,
            machine-readable building model a factory can act on. It reads the raw
            ResPlan room polygons, reconstructs walls and openings, splits them into
            transport-legal panels, synthesizes code-prescriptive light-wood framing,
            resolves a build order, and exports a validated IFC4 model. Every stage is
            deterministic geometry or rules. No learned model ships anywhere in the
            pipeline, by design.
          </p>
        </Section>

        <Section id="problem" title="The problem">
          <p>
            A floor plan is drawn for people, not machines. Turning one into something
            a factory can build takes exact geometry, thousands of small code-compliant
            decisions, and output a downstream system can trust: repeatably, across
            very different plans, with zero tolerance for an invalid building model. The
            hard part is choosing which technique each step actually deserves.
          </p>
        </Section>

        <Section id="approach" title="Approach">
          <p className="mb-6">
            The pipeline runs as six schema-linked stages. Every seam is a JSON contract
            validated in flight against a draft-2020-12 schema, so any plan can be
            inspected and debugged at each step.
          </p>
          <ol className="grid gap-px overflow-hidden rounded-xl border border-line-soft bg-line-soft sm:grid-cols-5">
            {cs.stages.map((s) => (
              <li key={s.n} className="flex flex-col gap-1 bg-canvas p-4">
                <span className="font-mono text-[12px] text-accent">0{s.n}</span>
                <span className="text-[15px] font-semibold text-ink">{s.name}</span>
                <span className="text-[13px] text-faint">{s.note}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6">
            Geometry comes straight from the room polygons. Walls are recovered by
            enumerating each room's exterior-ring edges and de-duplicating the shared
            ones: interior walls appear in two rooms, envelope walls in one. ResPlan
            also ships a room-connectivity graph, but its edges carry no coordinates, so
            it cannot place a wall or a door; the cheap, direct route was the correct
            one. The only place a heavier graph earns its weight is build order, handled
            with a small precedence DAG. Sequence optimization and collision checking
            are the problems that would justify heavier graph work, and both are
            deliberately deferred to a stage that would need real factory data to exist.
            They are left unbuilt rather than faked.
          </p>
        </Section>

        <Section id="judgment" title="Where ML fits vs rule-based">
          <p className="mb-6">
            This pipeline ships no learned model. Each sub-problem here is better served
            by rules or deterministic computation than by a model: simpler, auditable,
            and correct. The judgment is knowing where that holds, and where a model
            would and would not pay off.
          </p>
          <div className="grid gap-px overflow-hidden rounded-xl border border-line-soft bg-line-soft md:grid-cols-3">
            {cs.judgment.map((j) => (
              <div key={j.title} className="bg-canvas p-5">
                <span className="text-[12px] font-semibold uppercase tracking-wider text-accent">
                  {j.kind}
                </span>
                <h3 className="mt-2 text-[17px] font-semibold text-ink">{j.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{j.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="results" title="Results">
          <p className="mb-2 text-[14px] font-medium text-faint">Example hero plan</p>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line-soft bg-line-soft sm:grid-cols-4">
            {cs.planMetrics.map((m) => (
              <Metric key={m.label} {...m} />
            ))}
          </div>
          <p className="mb-2 mt-6 text-[14px] font-medium text-faint">Engineering</p>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line-soft bg-line-soft sm:grid-cols-3">
            {cs.engMetrics.map((m) => (
              <Metric key={m.label} {...m} />
            ))}
          </div>
          <p className="mt-4 text-[14px] text-faint">
            Numbers from plan-008557, a real ResPlan plan taken end to end. The pipeline
            validates its own output at every seam, and the exported IFC4 passes
            ifcopenshell validation with zero errors. Three plans are run end-to-end in
            the repo; the source corpus holds roughly 17,000.
          </p>
        </Section>

        <Section id="visuals" title="Visuals">
          <p className="mb-6">
            Two static renders of one real plan, plan-008557, taken through the pipeline.
          </p>
          <div className="space-y-5">
            {cs.visuals.map((v) => (
              <VisualFigure key={v.label} v={v} />
            ))}
          </div>
        </Section>

        <Section id="tech" title="Tech & links">
          <div className="flex flex-wrap gap-2">
            {cs.tech.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <div className="mt-6">
            <a
              href="https://github.com/ichbinlucaskim/floorplan-pipeline"
              target="_blank"
              rel="noreferrer"
              className="text-[15px] font-medium text-accent underline-offset-2 transition-colors hover:text-accent-ink hover:underline"
            >
              View the repositories ↗
            </a>
          </div>
        </Section>
      </div>
    </div>
  )
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-tight text-ink">
        {title}
      </h2>
      <div className="mt-4 text-[17px] leading-relaxed text-muted">{children}</div>
    </section>
  )
}

function Metric({ value, label }) {
  return (
    <div className="bg-canvas p-5">
      <div className="font-mono text-[26px] font-semibold tracking-tight text-ink">
        {value}
      </div>
      <div className="mt-1 text-[13px] text-muted">{label}</div>
    </div>
  )
}

// A visual slot. Renders the real image once its file exists at v.src; until
// then (or if it fails to load) it falls back to the project motif with a
// "(coming)" tag. Drop a file at public/<v.src> to fill the slot.
function VisualFigure({ v }) {
  const [failed, setFailed] = useState(false)
  const showImg = v.src && !failed
  return (
    <figure className="overflow-hidden rounded-2xl border border-line-soft bg-surface">
      {showImg ? (
        <div className="aspect-[16/9] bg-surface">
          <img
            src={v.src}
            alt={v.label}
            onError={() => setFailed(true)}
            className="h-full w-full object-contain"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center">
          <Motif variant={v.motif} className="h-[42%] w-[42%] opacity-70" />
        </div>
      )}
      <figcaption className="flex flex-col gap-1 border-t border-line-soft bg-canvas px-5 py-4">
        <span className="text-[15px] font-semibold text-ink">
          {v.label}
          {!showImg && <span className="font-normal text-faint"> (coming)</span>}
        </span>
        <span className="text-[14px] text-muted">{v.note}</span>
      </figcaption>
    </figure>
  )
}

function ComingSoon() {
  return (
    <div className="mt-12 rounded-2xl border border-line-soft bg-surface p-10 text-center">
      <p className="text-[17px] font-medium text-ink">Case study coming</p>
      <p className="mx-auto mt-2 max-w-md text-[15px] text-muted">
        The write-up for this project is in progress. The flagship pipeline is fully
        documented in the meantime.
      </p>
      <Link
        to="/projects/aec-pipeline"
        onClick={() => window.scrollTo({ top: 0 })}
        className="mt-6 inline-block text-[15px] font-medium text-accent underline-offset-2 hover:text-accent-ink hover:underline"
      >
        Read the flagship case study →
      </Link>
    </div>
  )
}

function BackLink() {
  return (
    <Link
      to="/"
      onClick={() => window.scrollTo({ top: 0 })}
      className="text-[14px] font-medium text-muted transition-colors hover:text-ink"
    >
      ← Back to work
    </Link>
  )
}

function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold text-ink">Project not found</h1>
      <Link to="/" className="mt-4 inline-block text-accent underline-offset-2 hover:text-accent-ink hover:underline">
        ← Back to work
      </Link>
    </div>
  )
}
