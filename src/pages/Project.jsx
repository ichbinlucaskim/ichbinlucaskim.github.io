import { Link, useParams } from 'react-router-dom'
import { getProject, aecCaseStudy } from '../data/projects.js'
import SectionNav from '../components/SectionNav.jsx'
import Motif from '../components/Motif.jsx'
import Tag from '../components/Tag.jsx'

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
              className="ml-1 text-[14px] font-medium text-accent transition-colors hover:text-accent-ink"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      </header>

      {project.caseStudy ? <AecCaseStudy /> : <ComingSoon />}
    </article>
  )
}

function AecCaseStudy() {
  const cs = aecCaseStudy
  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[180px_1fr] lg:gap-14">
      <aside className="lg:col-start-1">
        <SectionNav sections={cs.sections} />
      </aside>

      <div className="min-w-0 space-y-16">
        <Section id="overview" title="Overview">
          <p>
            A modular pipeline that turns a residential floor plan into
            manufacturing-ready building data. It reads the plan, reconstructs walls
            and openings, decomposes them into transport-ready panels, synthesizes
            light-wood framing, and exports a validated IFC4 model with a buildable
            assembly sequence. Structured, machine-readable output a factory or
            robotic cell can act on. No Revit required.
          </p>
        </Section>

        <Section id="problem" title="The problem">
          <p>
            A floor plan is drawn for people, not machines. Turning it into something
            a factory can build takes precise geometry, thousands of small
            code-compliant decisions, and output a downstream system can trust.
            Repeatably. Across very different plans. With zero tolerance for invalid
            building models.
          </p>
        </Section>

        <Section id="approach" title="Approach">
          <p className="mb-6">
            The pipeline runs as six independent, schema-linked stages. Every seam is
            a JSON contract, validated in-flight, so a plan can be checked and
            debugged at every step.
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
        </Section>

        <Section id="judgment" title="Where ML fits vs rule-based">
          <p className="mb-6">
            The real decisions are about which tool each sub-problem deserves. ML is a
            means here, not the goal.
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
            Real ResPlan floor plans. CI is green across all 7 repositories.
          </p>
        </Section>

        <Section id="visuals" title="Visuals">
          <p className="mb-6">
            Placeholders below mark where real media drops in. Each uses the project's
            geometric motif until the asset is ready.
          </p>
          <div className="space-y-5">
            {cs.visuals.map((v) => (
              <figure
                key={v.label}
                className="overflow-hidden rounded-2xl border border-line-soft bg-surface"
              >
                <div className="flex aspect-[16/9] items-center justify-center">
                  <Motif variant={v.motif} className="h-[42%] w-[42%] opacity-70" />
                </div>
                <figcaption className="flex flex-col gap-1 border-t border-line-soft bg-canvas px-5 py-4">
                  <span className="text-[15px] font-semibold text-ink">
                    {v.label}{' '}
                    <span className="font-normal text-faint">(coming)</span>
                  </span>
                  <span className="text-[14px] text-muted">{v.note}</span>
                </figcaption>
              </figure>
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
              href="https://github.com/ichbinlucaskim"
              target="_blank"
              rel="noreferrer"
              className="text-[15px] font-medium text-accent transition-colors hover:text-accent-ink"
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
        className="mt-6 inline-block text-[15px] font-medium text-accent hover:text-accent-ink"
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
      <Link to="/" className="mt-4 inline-block text-accent hover:text-accent-ink">
        ← Back to work
      </Link>
    </div>
  )
}
