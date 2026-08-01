import { Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getArticle } from '../data/articles.js'
import Tag from '../components/Tag.jsx'

// Article page: same header treatment as a project case study, then the
// long-form body rendered from the block list in data/articles.js. Single
// measured column (max-w-3xl), sized for reading rather than scanning.
export default function Article() {
  const { slug } = useParams()
  const article = getArticle(slug)

  if (!article) return <NotFound />

  return (
    <article className="mx-auto max-w-5xl px-6 py-14 sm:py-16">
      <BackLink />

      <header className="mt-6 max-w-3xl">
        <h1 className="text-[clamp(2.2rem,5vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.03em] text-ink">
          {article.title}
        </h1>
        {article.metric && (
          <p className="mt-4 font-mono text-[13px] text-faint">{article.metric}</p>
        )}
        <p className="mt-4 text-[19px] leading-relaxed text-muted">{article.summary}</p>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {article.tags?.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </header>

      {article.body ? (
        <div className="mt-10 max-w-3xl border-t border-line-soft pt-10">
          {article.body.map((block, i) => (
            <Block key={i} block={block} first={i === 0} />
          ))}
        </div>
      ) : (
        <ComingSoon />
      )}
    </article>
  )
}

function Block({ block, first }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2
          className={`text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-tight text-ink${
            first ? '' : ' mt-12 sm:mt-14'
          }`}
        >
          {block.text}
        </h2>
      )

    // A `strong` paragraph is a standalone key statement (the definition, the
    // closing line): larger, ink, no bold lead-in.
    case 'p':
      return (
        <p
          className={
            block.strong
              ? `text-[20px] font-medium leading-[1.6] text-ink${first ? '' : ' mt-6'}`
              : `text-[18px] leading-[1.75] text-muted${first ? '' : ' mt-5'}`
          }
        >
          {block.lead && (
            <>
              <strong className="font-semibold text-ink">{block.lead}</strong>{' '}
            </>
          )}
          <Inline content={block.text} />
        </p>
      )

    case 'ol':
      return (
        <ol
          className={`list-decimal space-y-4 pl-6 marker:font-mono marker:text-[15px] marker:text-accent${
            first ? '' : ' mt-6'
          }`}
        >
          {block.items.map((it, i) => (
            <li key={i} className="pl-1 text-[18px] leading-[1.75] text-muted">
              <strong className="font-semibold text-ink">{it.lead}</strong>
              {' — '}
              <Inline content={it.text} />
            </li>
          ))}
        </ol>
      )

    default:
      return null
  }
}

// Block text is either a plain string or an array of strings and { em } parts
// for inline italics (cited titles).
function Inline({ content }) {
  if (typeof content === 'string') return content
  return content.map((part, i) => (
    <Fragment key={i}>
      {typeof part === 'string' ? part : <em className="italic">{part.em}</em>}
    </Fragment>
  ))
}

function ComingSoon() {
  return (
    <div className="mt-12 rounded-2xl border border-line-soft bg-surface p-10 text-center">
      <p className="text-[17px] font-medium text-ink">Coming soon</p>
      <p className="mx-auto mt-2 max-w-md text-[15px] text-muted">
        This article is in progress.
      </p>
    </div>
  )
}

function BackLink() {
  return (
    <Link
      to="/"
      state={{ scrollTo: 'articles' }}
      className="text-[14px] font-medium text-muted transition-colors hover:text-ink"
    >
      ← Back to articles
    </Link>
  )
}

function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold text-ink">Article not found</h1>
      <Link
        to="/"
        className="mt-4 inline-block text-accent underline-offset-2 hover:text-accent-ink hover:underline"
      >
        ← Back home
      </Link>
    </div>
  )
}
