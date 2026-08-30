import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { projects } from '../data/projects.js'
import { articles } from '../data/articles.js'
import { profile, credentials } from '../data/profile.js'
import ProjectCard from '../components/ProjectCard.jsx'
import ArticleRow from '../components/ArticleRow.jsx'
import HeroGraph from '../components/HeroGraph.jsx'

// Black-to-cobalt text gradient (near-black → saturated cobalt) for the large
// "Think with Agents" heading only, it has room to read there. Solid
// #0047AB fallback (via `color`) keeps the text visible where
// background-clip:text is unsupported, never invisible.
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
            {/* No eyebrow: the h1 opens the page, so it carries no top margin
                and the block starts at the section's own top padding. */}
            <h1 className="text-balance text-[clamp(2.6rem,6vw,4.6rem)] font-bold leading-[1.04] tracking-[-0.03em] text-ink">
              Judgment for agents.
            </h1>
            <p className="mt-6 max-w-xl text-[19px] leading-relaxed text-muted">
              Agents where the path cannot be known in advance, workflows where
              it can. Thinking carefully about when a human should intervene,
              and how much autonomy an agent can reasonably be given.
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

      {/* ── Articles ── */}
      {/* A text list, not cards: articles accumulate, and a list scales past
          twenty entries where a card grid stops reading. Heading matches
          Selected work; bg-surface keeps the section distinct from the canvas
          hero above and the surface-2 work section below. */}
      <section id="articles" className="scroll-mt-24 bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold tracking-tight text-ink">
              Articles
            </h2>
            <p className="hidden text-[15px] text-faint sm:block">
              {articles.length} {articles.length === 1 ? 'article' : 'articles'}
            </p>
          </div>
          <ul className="divide-y divide-line-soft border-y border-line-soft">
            {articles.map((a) => (
              <ArticleRow key={a.slug} article={a} />
            ))}
          </ul>
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
              {projects.length} {projects.length === 1 ? 'project' : 'projects'}
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
                  Lucas Kim's background is in machine learning, and during his
                  graduate studies he has focused on agent systems: how
                  LLM-based agents route across tools, retrieve what they need,
                  and stay reliable in production. The through-line is judgment:
                  knowing where a learned or agentic approach wins, and where a
                  rule-based or deterministic one is simpler, auditable, and
                  correct, including the cases where the honest answer is that
                  the model loses.
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
            Think with Agents
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
