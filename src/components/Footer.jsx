import { profile } from '../data/profile.js'

export default function Footer() {
  return (
    <footer className="border-t border-line-soft">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 text-[13px] text-faint sm:flex-row">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <div className="flex items-center gap-5">
          <a href={`mailto:${profile.email}`} className="transition-colors hover:text-ink">
            Email
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
