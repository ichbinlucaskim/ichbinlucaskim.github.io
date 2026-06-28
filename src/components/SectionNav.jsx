import { useEffect, useState } from 'react'

// "On this page" TOC for a case study (Brittany Chiang sticky-nav pattern).
// Sticky left rail on desktop; horizontal scroller on mobile. Highlights
// the section currently in view.
export default function SectionNav({ sections }) {
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean)
    if (!els.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [sections])

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-24">
      <p className="mb-3 hidden text-[12px] font-semibold uppercase tracking-wider text-faint lg:block">
        On this page
      </p>
      <ul className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:gap-0.5 lg:overflow-visible">
        {sections.map((s) => {
          const on = active === s.id
          return (
            <li key={s.id} className="shrink-0">
              <button
                type="button"
                onClick={() => go(s.id)}
                aria-current={on ? 'true' : undefined}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[14px] transition-colors lg:w-full lg:rounded-md lg:text-left ${
                  on
                    ? 'bg-surface font-medium text-accent lg:bg-transparent'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {s.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
