import { Link } from 'react-router-dom'

// One row in the Articles list. A text list, not a card: articles accumulate,
// so this has to stay readable at twenty entries. Type sizes are the card
// sizes (21px title, 12.5px mono meta, 15px summary) so the section still
// reads as part of the same system as Selected work.
//
// The whole row is the link. Hover is restrained: title to accent plus the
// site's arrow nudge, no lift and no background change. Motif and tags exist
// in the data but are deliberately not rendered here.
export default function ArticleRow({ article }) {
  return (
    <li>
      <Link
        to={`/articles/${article.slug}`}
        onClick={() => window.scrollTo({ top: 0 })}
        className="group block py-5 sm:py-6"
      >
        {/* Date sits on the title's baseline on sm+, and directly beneath the
            title on narrow screens where they would otherwise collide. */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <h3 className="text-[21px] font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
            {article.title}
            <span
              aria-hidden="true"
              className="ml-2 inline-block text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
            >
              →
            </span>
          </h3>
          {article.metric && (
            <span className="shrink-0 font-mono text-[12.5px] text-faint">
              {article.metric}
            </span>
          )}
        </div>
        <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-muted">
          {article.summary}
        </p>
      </Link>
    </li>
  )
}
