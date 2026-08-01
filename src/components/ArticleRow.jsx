import { Link } from 'react-router-dom'

// One row in the Articles list. A text list, not a card: the series runs to
// seven entries, so it has to stay readable as it fills in. Title and summary
// use the card type sizes (21px title, 15px summary) so the section still
// reads as part of the same system as Selected work.
//
// Two states, driven by `status`. A published row is the whole link, with a
// restrained hover (title to accent, the site's arrow nudge, no lift). A draft
// row keeps the same rhythm but is inert: no link, no arrow, no hover, and a
// lighter title. Date, motif and tags exist in the data but are not rendered
// here: this is a fixed series, not a chronological feed.
export default function ArticleRow({ article }) {
  if (article.status === 'draft') {
    return (
      <li className="py-5 sm:py-6">
        {/* text-faint reads as inactive and still clears AA contrast at 21px
            semibold, where it counts as large text. The summary stays
            text-muted, since at 15px text-faint would not clear it. */}
        <h3 className="text-[21px] font-semibold tracking-tight text-faint">
          {article.title}
        </h3>
        <Summary text={article.summary} />
      </li>
    )
  }

  return (
    <li>
      <Link
        to={`/articles/${article.slug}`}
        onClick={() => window.scrollTo({ top: 0 })}
        className="group block py-5 sm:py-6"
      >
        <h3 className="text-[21px] font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
          {article.title}
          <span
            aria-hidden="true"
            className="ml-2 inline-block text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
          >
            →
          </span>
        </h3>
        <Summary text={article.summary} />
      </Link>
    </li>
  )
}

function Summary({ text }) {
  return (
    <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-muted">
      {text}
    </p>
  )
}
