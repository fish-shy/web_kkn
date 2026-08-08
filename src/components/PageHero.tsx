import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from './Icon'

export type Crumb = { label: string; to?: string }

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  meta,
  children,
}: {
  eyebrow?: string
  title: string
  lead?: ReactNode
  crumbs?: Crumb[]
  meta?: { icon: IconName; text: string }[]
  children?: ReactNode
}) {
  return (
    <section className="pagehero">
      <div className="container pagehero__inner">
        {crumbs && (
          <nav className="crumbs" aria-label="Remah roti">
            {crumbs.map((c, i) => (
              <span key={c.label} style={{ display: 'contents' }}>
                {i > 0 && (
                  <span className="crumbs__sep" aria-hidden="true">
                    /
                  </span>
                )}
                {c.to ? (
                  <Link to={c.to}>{c.label}</Link>
                ) : (
                  <span aria-current="page">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && <span className="eyebrow eyebrow--light">{eyebrow}</span>}
        <h1>{title}</h1>
        {lead && <p className="pagehero__lead">{lead}</p>}

        {meta && (
          <div className="pagehero__meta">
            {meta.map((m) => (
              <span key={m.text}>
                <Icon name={m.icon} />
                {m.text}
              </span>
            ))}
          </div>
        )}

        {children}
      </div>
    </section>
  )
}
