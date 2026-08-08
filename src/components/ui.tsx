import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from 'react'
import { Icon } from './Icon'

/* ---------------------------------------------------------------- Reveal */

/** Muncul perlahan saat elemen masuk viewport. */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: ReactNode
  delay?: number
  as?: ElementType
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  // Tanpa IntersectionObserver, konten langsung tampil (tanpa animasi).
  const [shown, setShown] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal${shown ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}

/* ------------------------------------------------------------- Section head */

export function SectionHead({
  eyebrow,
  title,
  lead,
  action,
  light = false,
}: {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  action?: ReactNode
  light?: boolean
}) {
  return (
    <Reveal className="section-head">
      {eyebrow && (
        <span className={`eyebrow${light ? ' eyebrow--light' : ''}`}>
          {eyebrow}
        </span>
      )}
      <div className="section-head__row">
        <h2>{title}</h2>
        {action}
      </div>
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  )
}

/* ------------------------------------------------------------------ Meter */

export function Meter({
  name,
  pct,
  color,
  suffix = '%',
  ondark = false,
}: {
  name: string
  pct: number
  color?: string
  suffix?: string
  ondark?: boolean
}) {
  return (
    <div className={`meter${ondark ? ' meter--ondark' : ''}`}>
      <div className="meter__head">
        <span className="meter__name">{name}</span>
        <span className="meter__value">
          {String(pct).replace('.', ',')}
          {suffix}
        </span>
      </div>
      <div
        className="meter__track"
        role="img"
        aria-label={`${name}: ${pct}${suffix}`}
      >
        <div
          className="meter__fill"
          style={
            {
              '--meter-pct': `${pct}%`,
              ...(color ? { '--meter-color': color } : {}),
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------- Stat */

export function Stat({
  value,
  label,
  ondark = false,
}: {
  value: string
  label: string
  ondark?: boolean
}) {
  return (
    <div className={`stat${ondark ? ' stat--ondark' : ''}`}>
      <div className="stat__value">{value}</div>
      <div className="stat__label">{label}</div>
    </div>
  )
}

/* -------------------------------------------------------------- Data row */

export function DataRow({
  k,
  v,
  ondark = false,
}: {
  k: string
  v: string
  ondark?: boolean
}) {
  return (
    <div className={`datarow${ondark ? ' datarow--ondark' : ''}`}>
      <span className="datarow__key">{k}</span>
      <span className="datarow__val">{v}</span>
    </div>
  )
}

/* ---------------------------------------------------------- Arrow link */

export function ArrowLink({
  children,
  light = false,
}: {
  children: ReactNode
  light?: boolean
}) {
  return (
    <span className={`link-arrow${light ? ' link-arrow--light' : ''}`}>
      {children}
      <Icon name="arrow-right" />
    </span>
  )
}

/* ------------------------------------------------------------- Accordion */

export function Accordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="acc">
      <button
        type="button"
        className="acc__btn"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {q}
        <Icon name="chevron-down" className="acc__icon" />
      </button>
      {open && <div className="acc__panel">{a}</div>}
    </div>
  )
}

/* ------------------------------------------------------------- Empty state */

export function Empty({ title, text }: { title: string; text: string }) {
  return (
    <div className="empty">
      <Icon name="search" />
      <p className="empty__title">{title}</p>
      <p className="empty__text">{text}</p>
    </div>
  )
}

/* ------------------------------------------------------------- Pagination */

export function Pagination({
  page,
  pages,
  onChange,
}: {
  page: number
  pages: number
  onChange: (p: number) => void
}) {
  if (pages <= 1) return null
  return (
    <nav className="pagination" aria-label="Navigasi halaman">
      <button
        type="button"
        className="pagination__btn"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Halaman sebelumnya"
      >
        <Icon name="chevron-left" />
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          className="pagination__btn"
          aria-current={n === page ? 'page' : undefined}
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        className="pagination__btn"
        onClick={() => onChange(page + 1)}
        disabled={page === pages}
        aria-label="Halaman berikutnya"
      >
        <Icon name="chevron-right" />
      </button>
    </nav>
  )
}
