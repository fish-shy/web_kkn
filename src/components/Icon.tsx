import type { SVGProps } from 'react'

/**
 * Ikon garis 24×24, konsisten stroke 1.75.
 * Ditulis inline agar situs tidak bergantung pada paket ikon eksternal.
 */
export type IconName = keyof typeof PATHS

const PATHS = {
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  'arrow-right': <path d="M4 12h15m0 0l-6-6m6 6l-6 6" />,
  'arrow-left': <path d="M20 12H5m0 0l6-6m-6 6l6 6" />,
  'arrow-up': <path d="M12 20V5m0 0l-6 6m6-6l6 6" />,
  'chevron-down': <path d="M6 9l6 6 6-6" />,
  'chevron-right': <path d="M9 6l6 6-6 6" />,
  'chevron-left': <path d="M15 6l-6 6 6 6" />,
  check: <path d="M4 12.5l5 5L20 6.5" />,
  'check-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.2l2.4 2.4 4.6-4.9" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4 4" />
    </>
  ),
  external: <path d="M14 5h5v5M19 5l-8 8M18 14v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h4" />,
  phone: (
    <path d="M6.5 4h3l1.5 4-2 1.5a12 12 0 005.5 5.5l1.5-2 4 1.5v3a2 2 0 01-2.2 2A16.5 16.5 0 014.5 6.2 2 2 0 016.5 4z" />
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M4 8l7.1 4.7a2 2 0 002.2 0L20.4 8" />
    </>
  ),
  'map-pin': (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19.5a5.5 5.5 0 0111 0" />
      <path d="M16 5.4a3.2 3.2 0 010 5.2M17 15.2a5.5 5.5 0 013.5 4.3" />
    </>
  ),
  home: <path d="M4 10.5L12 4l8 6.5V19a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 19v-8.5zM9.5 20.5v-6h5v6" />,
  store: (
    <>
      <path d="M4 9.5V19a1.5 1.5 0 001.5 1.5h13A1.5 1.5 0 0020 19V9.5" />
      <path d="M3 9.5l1.5-5h15L21 9.5a3 3 0 01-6 0 3 3 0 01-6 0 3 3 0 01-6 0z" />
      <path d="M9.5 20.5V14h5v6.5" />
    </>
  ),
  heart: (
    <path d="M12 20s-7-4.4-7-9.4A4.1 4.1 0 0112 8.3a4.1 4.1 0 017 2.3c0 5-7 9.4-7 9.4z" />
  ),
  'hand-heart': (
    <>
      <path d="M11 8.6s-.8-1.6-2.1-1.2C7.5 7.8 7.6 9.5 8.7 10.4L11 12.4l2.3-2c1.1-.9 1.2-2.6-.2-3-1.3-.4-2.1 1.2-2.1 1.2z" />
      <path d="M3.5 15l3-1.2 4.6 1.9h3a1.4 1.4 0 010 2.8H11" />
      <path d="M20.5 14.2l-5 4.3-4.5 2-4.5-2" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c-1.5-6 2-12 14-13 .5 7-3 13-10.5 13H5z" />
      <path d="M5.5 18.5c3-4.5 6.5-7 11-8.5" />
    </>
  ),
  'id-card': (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <circle cx="9" cy="11" r="2.1" />
      <path d="M5.8 16.4a3.6 3.6 0 016.4 0M14.5 10h4M14.5 13.5h3" />
    </>
  ),
  rings: (
    <>
      <circle cx="9" cy="15" r="4.6" />
      <circle cx="15" cy="15" r="4.6" />
      <path d="M9 6.5l1.6 2.2M15 6.5l-1.6 2.2M9 6.5h6l-3-2.6-3 2.6z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5l7 2.6v5.3c0 4.4-3 7.7-7 9.1-4-1.4-7-4.7-7-9.1V6.1l7-2.6z" />
      <path d="M9.2 12.1l2 2 3.6-3.9" />
    </>
  ),
  baby: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M9.8 8.4h.01M14.2 8.4h.01M10.3 11.2a2.6 2.6 0 003.4 0" />
      <path d="M6.5 20.5c1.4-2.2 3.3-3.3 5.5-3.3s4.1 1.1 5.5 3.3" />
    </>
  ),
  flower: (
    <>
      <circle cx="12" cy="9" r="2.2" />
      <path d="M12 6.8c0-2 .6-3.3 2.2-3.3 1.3 0 2 1.3 1.2 2.6M12 6.8c0-2-.6-3.3-2.2-3.3-1.3 0-2 1.3-1.2 2.6" />
      <path d="M14.1 10c1.7-1 3.2-1.1 3.9.4.6 1.2-.4 2.3-1.9 2.1M9.9 10c-1.7-1-3.2-1.1-3.9.4-.6 1.2.4 2.3 1.9 2.1" />
      <path d="M12 11.2V21" />
    </>
  ),
  scroll: (
    <>
      <path d="M6 4.5h11a2 2 0 012 2v11a2 2 0 01-2 2H6" />
      <path d="M6 4.5a2 2 0 00-2 2v1.6h4V6.5a2 2 0 00-2-2zM6 19.5a2 2 0 002-2v-1.6H4v1.6a2 2 0 002 2z" />
      <path d="M10.5 9h6M10.5 12.5h6" />
    </>
  ),
  move: (
    <>
      <path d="M4 12h16M16 8l4 4-4 4" />
      <path d="M4 5v14" />
    </>
  ),
  building: (
    <>
      <path d="M4 20.5V6a1.5 1.5 0 011.5-1.5h7A1.5 1.5 0 0114 6v14.5" />
      <path d="M14 10h4.5A1.5 1.5 0 0120 11.5v9M2.5 20.5h19" />
      <path d="M7 8.5h4M7 12h4M7 15.5h4M16.5 13.5h1M16.5 17h1" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A1.5 1.5 0 015.5 4H11a2.5 2.5 0 012.5 2.5V20a2 2 0 00-2-2H5.5A1.5 1.5 0 014 16.5v-11z" />
      <path d="M20 5.5A1.5 1.5 0 0018.5 4H13a2.5 2.5 0 00-2.5 2.5V20a2 2 0 012-2h6A1.5 1.5 0 0020 16.5v-11z" />
    </>
  ),
  mosque: (
    <>
      <path d="M12 3.5c2 1.6 3 3 3 4.4 0 1.1-.7 1.9-1.4 2.4h-3.2C9.7 9.8 9 9 9 7.9c0-1.4 1-2.8 3-4.4z" />
      <path d="M5 20.5v-7a2.5 2.5 0 015 0v7M14 20.5v-7a2.5 2.5 0 015 0v7M3 20.5h18" />
      <path d="M10 20.5v-3.2a2 2 0 014 0v3.2" />
    </>
  ),
  ruler: (
    <>
      <rect x="2.6" y="8.5" width="18.8" height="7" rx="1.6" transform="rotate(-45 12 12)" />
      <path d="M9 8.2l1.4 1.4M11.5 10.7l1.4 1.4M14 13.2l1.4 1.4" />
    </>
  ),
  layers: <path d="M12 3.5l8.5 4.3L12 12 3.5 7.8 12 3.5zM3.5 12L12 16.3 20.5 12M3.5 16.2L12 20.5l8.5-4.3" />,
  quote: (
    <path d="M9.5 6.5C6.5 8 5 10.4 5 13.7c0 2.4 1.4 3.9 3.3 3.9 1.8 0 3-1.3 3-3 0-1.7-1.2-2.9-2.8-2.9h-.4c.2-1.4 1.1-2.6 2.6-3.5l-1.2-1.7zm8 0c-3 1.5-4.5 3.9-4.5 7.2 0 2.4 1.4 3.9 3.3 3.9 1.8 0 3-1.3 3-3 0-1.7-1.2-2.9-2.8-2.9h-.4c.2-1.4 1.1-2.6 2.6-3.5l-1.2-1.7z" />
  ),
  image: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="M4.5 17l4.3-4.3a1.6 1.6 0 012.2 0L15 16.5m0 0l1.6-1.6a1.6 1.6 0 012.2 0l1.2 1.2" />
    </>
  ),
  'file-text': (
    <>
      <path d="M13.5 3.5H7A1.5 1.5 0 005.5 5v14A1.5 1.5 0 007 20.5h10a1.5 1.5 0 001.5-1.5V8.5l-5-5z" />
      <path d="M13.5 3.5v5h5M9 13h6M9 16.5h4" />
    </>
  ),
  download: <path d="M12 4v11m0 0l-4-4m4 4l4-4M4.5 19.5h15" />,
  send: <path d="M20.5 3.5L10.5 13.5M20.5 3.5l-6.4 17-3.6-7-7-3.6 17-6.4z" />,
  share: (
    <>
      <circle cx="18" cy="6" r="2.6" />
      <circle cx="6" cy="12" r="2.6" />
      <circle cx="18" cy="18" r="2.6" />
      <path d="M8.3 10.8l7.4-3.6M8.3 13.2l7.4 3.6" />
    </>
  ),
  link: (
    <path d="M10.5 13.5a3.5 3.5 0 005 0l3-3a3.54 3.54 0 00-5-5l-1.4 1.4M13.5 10.5a3.5 3.5 0 00-5 0l-3 3a3.54 3.54 0 005 5l1.4-1.4" />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M16.9 7.1h.01" />
    </>
  ),
  facebook: (
    <path d="M14.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.6V3.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.5H8.5V13h2.8v8h3.2z" />
  ),
  youtube: (
    <>
      <rect x="2.8" y="5.5" width="18.4" height="13" rx="4" />
      <path d="M10.5 9.4l4.7 2.6-4.7 2.6V9.4z" />
    </>
  ),
  whatsapp: (
    <path d="M3.8 20.2l1.2-4.1a7.9 7.9 0 111.6 1.6l-2.8-.5m5.3-8.6c.3-.1.6 0 .8.3l.9 1.5c.1.2.1.5 0 .7l-.6.8c-.1.2-.2.4 0 .7a6 6 0 002.6 2.3c.3.1.5 0 .6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.5.3.8-.3.9-1.2 1.5-2.1 1.4a8.4 8.4 0 01-6.5-6.4c-.1-.9.4-1.7 1.1-1.9z" />
  ),
  megaphone: (
    <>
      <path d="M4 10v3.5a1.5 1.5 0 001.5 1.5h1.8L17 20V4L7.3 9H5.5A1.5 1.5 0 004 10.5z" />
      <path d="M17 8.5a3.5 3.5 0 010 7M7.5 15v4.5a1 1 0 001 1h1.6a1 1 0 001-1V17" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.2 8.8l-1.7 4.7-4.7 1.7 1.7-4.7 4.7-1.7z" />
    </>
  ),
} as const

type Props = SVGProps<SVGSVGElement> & { name: IconName }

export function Icon({ name, ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  )
}

/** Ikon isi-penuh untuk pemakaian dekoratif (mis. tanda kutip). */
export function IconSolid({ name, ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  )
}
