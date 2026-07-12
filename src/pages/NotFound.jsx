import { Link } from 'react-router-dom'

// Route-level catch-all. Unmatched paths render this (visible), not Home, so a
// broken/mistyped link is obvious rather than silently masquerading as the
// homepage.
export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-28 text-center sm:py-36">
      <p className="text-[14px] font-medium text-accent">404</p>
      <h1 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-ink">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[17px] leading-relaxed text-muted">
        That page doesn't exist. It may have moved, or the link may be off.
      </p>
      <Link
        to="/"
        onClick={() => window.scrollTo({ top: 0 })}
        className="mt-8 inline-block rounded-full bg-ink px-5 py-2.5 text-[15px] font-medium text-canvas transition-colors hover:bg-accent"
      >
        Back to home
      </Link>
    </div>
  )
}
