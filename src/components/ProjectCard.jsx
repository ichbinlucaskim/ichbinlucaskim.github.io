import { Link } from 'react-router-dom'
import Motif from './Motif.jsx'
import Tag from './Tag.jsx'

// Whole card is one link (Brittany Chiang pattern). Live projects route
// to their case study; "soon" projects route to a minimal stub page.
export default function ProjectCard({ project }) {
  const soon = project.status === 'soon'
  return (
    <Link
      to={`/projects/${project.slug}`}
      onClick={() => window.scrollTo({ top: 0 })}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line-soft bg-canvas transition-all duration-300 hover:-translate-y-1 hover:border-line hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)] focus-visible:-translate-y-1"
    >
      {/* geometric motif thumbnail — the signature, not a fake screenshot */}
      <div className="relative flex aspect-[16/9] items-center justify-center bg-surface">
        <Motif variant={project.motif} className="h-[62%] w-[62%]" />
        {soon && (
          <span className="absolute right-3 top-3 rounded-full bg-canvas/90 px-2.5 py-1 text-[11px] font-medium text-faint shadow-sm">
            Case study coming
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[21px] font-semibold tracking-tight text-ink">
            {project.title}
          </h3>
          <span
            aria-hidden="true"
            className="translate-x-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
          >
            →
          </span>
        </div>
        <p className="text-[15px] leading-relaxed text-muted">{project.summary}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
    </Link>
  )
}
