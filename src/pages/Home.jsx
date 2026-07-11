import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { projects } from '../data/projects.js'
import { profile, credentials } from '../data/profile.js'
import ProjectCard from '../components/ProjectCard.jsx'
import HeroGraph from '../components/HeroGraph.jsx'

// Black-to-cobalt text gradient (near-black → saturated cobalt) for the large
// "Build Something Spatial" heading only — it has room to read there. Solid
// #0047AB fallback (via `color`) keeps the text visible where
// background-clip:text is unsupported — never invisible.
const navyTextGradient = {
  backgroundImage: 'linear-gradient(160deg, #1A1A1C 0%, #0047AB 100%)',
  color: '#0047AB',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

export default function Home() {
  const location = useLocation()

  // Scroll to a section when arriving from another route's nav.
  useEffect(() => {
    const id = location.state?.scrollTo
    if (id) {
      requestAnimationFrame(() =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      )
    }
  }, [location.state])

  return (
    <>
      {/* ── Hero ── */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-16 sm:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="fade-up">
            <p className="text-[14px] font-medium text-accent">{profile.role}</p>
            <h1 className="mt-3 text-[clamp(2.6rem,6vw,4.6rem)] font-bold leading-[1.04] tracking-[-0.03em] text-ink">
              Spatial <span className="whitespace-nowrap">machine learning,</span>{' '}
              engineered into production pipelines.
            </h1>
            <p className="mt-6 max-w-xl text-[19px] leading-relaxed text-muted">
              Models designed and trained where learning wins. Rule-based methods
              where it does not. Then the full pipeline around them, from buildings
              to geospatial.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="rounded-full bg-ink px-5 py-2.5 text-[15px] font-medium text-canvas transition-colors hover:bg-accent"
              >
                View work
              </a>
              <a
                href="#contact"
                className="rounded-full px-5 py-2.5 text-[15px] font-medium text-accent transition-colors hover:text-accent-ink"
              >
                Get in touch →
              </a>
            </div>
          </div>

          <div className="fade-up hidden justify-self-end lg:block" style={{ animationDelay: '0.15s' }}>
            <HeroGraph className="w-[320px] max-w-full" />
          </div>
        </div>
      </section>

      {/* ── Selected work ── */}
      <section id="work" className="scroll-mt-24 bg-surface-2 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold tracking-tight text-ink">
              Selected work
            </h2>
            <p className="hidden text-[15px] text-faint sm:block">
              {projects.length} projects
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold tracking-tight text-ink">
                About
              </h2>
              <div className="mt-5 space-y-4 text-[19px] leading-relaxed text-muted">
                <p>
                  Lucas Kim is a spatial ML engineer. He designs and trains
                  machine-learning models on spatial and geometric data, across
                  buildings and geospatial domains, and builds the
                  pipelines around them.
                </p>
                <p>
                  His background is machine learning: graph neural networks and
                  spatial ML. The common thread is judgment: knowing where a learned
                  model wins, and where a rule-based or deterministic approach is
                  simpler, auditable, and correct.
                </p>
              </div>
            </div>

            <aside className="self-start space-y-10">
              <CredGroup label="Experience" items={credentials.experience} />
              <CredGroup label="Education" items={credentials.education} />
            </aside>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="scroll-mt-24 bg-surface py-28 sm:py-36">
        <div className="mx-auto max-w-5xl px-6 text-center">
          {/* Black-to-cobalt text-gradient (see navyTextGradient), solid
              #0047AB fallback. The only heading that carries it. */}
          <h2
            className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-accent"
            style={navyTextGradient}
          >
            Build Something Spatial
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
            <a
              href={`mailto:${profile.email}`}
              className="text-[17px] font-medium text-ink transition-colors hover:text-accent"
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-[17px] font-medium text-ink transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="text-[17px] font-medium text-ink transition-colors hover:text-accent"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

function CredGroup({ label, items }) {
  return (
    <div>
      <p className="text-[12px] font-semibold uppercase tracking-wider text-faint">
        {label}
      </p>
      <ul className="mt-4 space-y-5">
        {items.map((it) => (
          <li key={it.primary}>
            <p className="text-[16px] font-semibold text-ink">
              {it.href ? (
                <a
                  href={it.href}
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-2 transition-colors hover:text-accent hover:underline"
                >
                  {it.primary}
                </a>
              ) : (
                it.primary
              )}
            </p>
            <p className="mt-0.5 text-[15px] text-muted">{it.secondary}</p>
            {it.tertiary && (
              <p className="mt-0.5 text-[14px] text-faint">{it.tertiary}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
