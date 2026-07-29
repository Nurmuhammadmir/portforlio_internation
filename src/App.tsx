import { useState, useEffect, useRef, type ReactNode } from 'react'

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface Credential {
  role: string
  login?: string
  password?: string
  url: string
}

interface ProjectLink {
  label: string
  url: string
}

interface Project {
  id: number
  number: string
  title: string
  subtitle: string
  description: ReactNode
  stack: string[]
  type: string
  hue: 'violet' | 'sky' | 'emerald' | 'amber'
  credentials?: Credential[]
  credentialsNote?: string
  links: ProjectLink[]
  status?: string
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Replace all placeholder values with your actual content

const PROJECTS: Project[] = [
  {
    id: 1,
    number: '01',
    title: 'UniAcademy',
    subtitle: 'School Management Platform',
    description: (
      <>
        A CRM and student-management platform built the way top{' '}
        <span className="font-bold" style={{ color: '#fcd34d' }}>
          international
        </span>{' '}
        schools run their operations: directors get full business and
        financial oversight, admins manage day-to-day operations, teachers
        track group progress and take attendance, and students see their
        homework. A settings panel lets every user switch the platform's
        language. Built for a real client in Karakalpakstan with 700+
        students across 3 branches — complete and ready to deploy to
        production on Eskiz.uz.
      </>
    ),
    stack: ['React', 'Tailwind CSS', 'Node.js', 'TypeScript'],
    type: 'Platform',
    hue: 'violet',
    credentials: [
      {
        role: 'Director',
        login: '+998912746060',
        password: 'test1234',
        url: 'https://uniacademy-director.onrender.com',
      },
      {
        role: 'Admin',
        login: '+998990211212',
        password: 'test1234',
        url: 'https://uniacademy-admin.onrender.com',
      },
      {
        role: 'Teacher',
        login: '+998778889976',
        password: 'test1234',
        url: 'https://uniacademy.onrender.com',
      },
      {
        role: 'Student',
        login: '+9984678233',
        password: 'test1234',
        url: 'https://uniacademy-student-app.onrender.com/',
      },
    ],
    links: [{ label: 'Open Platform', url: 'https://uniacademy.onrender.com' }],
  },
  {
    id: 2,
    number: '02',
    title: 'Luna Beauty',
    subtitle: 'Beauty Salon Booking Platform',
    description:
      "A booking and CRM platform built for a beauty salon in Tashkent — clients book appointments online, while the salon manages its masters, schedules, and financials from one dashboard. Built as a prototype the client loved, and it's next in line to go live on Eskiz.uz.",
    stack: ['React', 'Tailwind CSS', 'Node.js', 'TypeScript'],
    type: 'Platform',
    hue: 'sky',
    credentials: [
      {
        role: 'CEO',
        login: 'valera@gmail.com',
        password: 'valera@gmail.com',
        url: 'https://luna-beauty-ceo.onrender.com',
      },
      {
        role: 'Admin',
        login: 'luna@gmail.com',
        password: 'luna@gmail.com',
        url: 'https://luna-beauty-admin.onrender.com',
      },
      {
        role: 'Master',
        login: 'luna@luna.salon',
        password: 'luna1234',
        url: 'https://luna-beauty-master.onrender.com',
      },
      {
        role: 'User',
        url: 'https://luna-beauty.onrender.com/',
      },
    ],
    links: [
      { label: 'Live App', url: 'https://luna-beauty.onrender.com/' },
    ],
  },
  {
    id: 3,
    number: '03',
    title: 'Booka',
    subtitle: 'Booking Platform',
    description:
      "Booka is my own startup — a SaaS platform where masters and clients can book and manage appointments together, without every business needing to build its own CRM. It's still in active development and self-funded, which is exactly why I'm looking for a role that can support it.",
    stack: ['React', 'Tailwind CSS', 'Node.js', 'TypeScript'],
    type: 'Platform',
    hue: 'emerald',
    status: 'In Development — My Own Startup',
    credentialsNote:
      "Admin and Master share the same platform — log out and sign back in with the other role's credentials to switch between them.",
    credentials: [
      {
        role: 'Admin',
        login: 'mir296133@gmail.com',
        password: '9876543210Aaz.',
        url: 'https://booka-admin.onrender.com',
      },
      {
        role: 'Master',
        login: 'test@gmail.com',
        password: 'test@gmail.com',
        url: 'https://booka-admin.onrender.com',
      },
      {
        role: 'User',
        url: 'https://booka-frontend-f0kv.onrender.com',
      },
    ],
    links: [
      { label: 'Visit Site', url: 'https://booka-frontend-f0kv.onrender.com' },
    ],
  },
  {
    id: 4,
    number: '04',
    title: 'Bank Compliance Platform',
    subtitle: 'Client & Compliance Portal',
    description:
      "A compliance prototype built as a reference for DAVRBANK, designed to stop flagged individuals and organizations from carrying out banking operations. The compliance department adds people to a stoplist, and it's instantly enforced on the bank's client-manager side — built and tested end-to-end as a working proof of concept.",
    stack: ['React', 'Tailwind CSS', 'Node.js', 'TypeScript'],
    type: 'Platform',
    hue: 'amber',
    credentials: [
      {
        role: 'Compliance Department',
        login: 'test_user@example.com',
        password: 'Test1234',
        url: 'https://bank-department-uz.onrender.com/',
      },
      {
        role: 'Bank Client',
        login: 'test_user@example.com',
        password: 'Test1234',
        url: 'https://bankclient-u3i6.onrender.com/',
      },
    ],
    links: [
      { label: 'Bank Client App', url: 'https://bankclient-u3i6.onrender.com/' },
      { label: 'Compliance Department', url: 'https://bank-department-uz.onrender.com/' },
    ],
  },
]

// ─── HUE CONFIG ──────────────────────────────────────────────────────────────

const HUE: Record<string, {
  accent: string
  subtle: string
  tag: string
  glow: string
  mockupBg: string
  mockupAccent: string
  mockupLight: string
}> = {
  violet: {
    accent: '#a78bfa',
    subtle: 'rgba(167,139,250,0.12)',
    tag: 'rgba(167,139,250,0.15)',
    glow: 'rgba(124,58,237,0.18)',
    mockupBg: '#0f0b1e',
    mockupAccent: '#7c3aed',
    mockupLight: '#a78bfa',
  },
  sky: {
    accent: '#38bdf8',
    subtle: 'rgba(56,189,248,0.12)',
    tag: 'rgba(56,189,248,0.15)',
    glow: 'rgba(14,165,233,0.18)',
    mockupBg: '#071220',
    mockupAccent: '#0ea5e9',
    mockupLight: '#38bdf8',
  },
  emerald: {
    accent: '#34d399',
    subtle: 'rgba(52,211,153,0.12)',
    tag: 'rgba(52,211,153,0.15)',
    glow: 'rgba(16,185,129,0.18)',
    mockupBg: '#051a10',
    mockupAccent: '#10b981',
    mockupLight: '#34d399',
  },
  amber: {
    accent: '#fcd34d',
    subtle: 'rgba(252,211,77,0.12)',
    tag: 'rgba(252,211,77,0.15)',
    glow: 'rgba(245,158,11,0.18)',
    mockupBg: '#1a1100',
    mockupAccent: '#f59e0b',
    mockupLight: '#fcd34d',
  },
}

// ─── HOOK ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ─── BROWSER MOCKUP ──────────────────────────────────────────────────────────

function BrowserMockup({ hue }: { hue: string }) {
  const c = HUE[hue]
  const rows = [0, 1, 2, 3]
  return (
    <svg viewBox="0 0 520 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Outer shell */}
      <rect width="520" height="340" rx="14" fill="#141414" />
      {/* Chrome bar */}
      <rect width="520" height="40" rx="14" fill="#1e1e1e" />
      <rect y="26" width="520" height="14" fill="#1e1e1e" />
      {/* Traffic lights */}
      <circle cx="22" cy="20" r="5.5" fill="#ff5f57" />
      <circle cx="40" cy="20" r="5.5" fill="#febc2e" />
      <circle cx="58" cy="20" r="5.5" fill="#28c840" />
      {/* URL bar */}
      <rect x="76" y="12" width="290" height="16" rx="8" fill="#2a2a2a" />
      <text x="88" y="23" fontSize="7.5" fill="#555" fontFamily="monospace">https://your-app.com</text>
      {/* Lock icon */}
      <rect x="80" y="16" width="5" height="4" rx="1" fill="#555" />
      <path d="M79 18 Q79 14 83 14 Q87 14 87 18" stroke="#555" strokeWidth="1.2" fill="none" />

      {/* Page bg */}
      <rect x="0" y="40" width="520" height="300" fill={c.mockupBg} />

      {/* Left sidebar */}
      <rect x="0" y="40" width="88" height="300" fill="rgba(0,0,0,0.35)" />
      {/* Logo area */}
      <rect x="12" y="56" width="64" height="14" rx="7" fill={c.mockupAccent} opacity="0.8" />
      {/* Nav items */}
      {[84, 108, 132, 156, 180].map((y, i) => (
        <rect key={i} x="14" y={y} width={i === 0 ? 62 : 48 - i * 4} height="7" rx="3.5"
          fill={i === 0 ? c.mockupAccent : 'rgba(255,255,255,0.08)'} />
      ))}
      {/* Bottom avatar */}
      <circle cx="44" cy="320" r="14" fill="rgba(255,255,255,0.06)" stroke={c.mockupAccent} strokeWidth="1" strokeOpacity="0.4" />
      <text x="44" y="325" textAnchor="middle" fontSize="10" fill={c.mockupLight} opacity="0.7">U</text>

      {/* Top bar */}
      <rect x="100" y="52" width="200" height="16" rx="5" fill={c.mockupLight} opacity="0.85" />
      <rect x="100" y="74" width="130" height="8" rx="4" fill="rgba(255,255,255,0.2)" />
      <rect x="390" y="52" width="118" height="16" rx="8" fill={c.mockupAccent} opacity="0.9" />

      {/* Stat cards */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={100 + i * 137} y="98" width="125" height="72" rx="10"
            fill="rgba(255,255,255,0.04)" stroke={c.mockupAccent} strokeWidth="0.8" strokeOpacity="0.25" />
          <rect x={112 + i * 137} y="112" width="55" height="8" rx="4" fill={c.mockupAccent} opacity="0.75" />
          <rect x={112 + i * 137} y="125" width="85" height="5" rx="2.5" fill="rgba(255,255,255,0.15)" />
          <rect x={112 + i * 137} y="135" width="65" height="5" rx="2.5" fill="rgba(255,255,255,0.1)" />
          <rect x={112 + i * 137} y="152" width="44" height="9" rx="4.5" fill={c.mockupAccent} opacity="0.8" />
        </g>
      ))}

      {/* Chart bar */}
      <rect x="100" y="184" width="408" height="80" rx="8"
        fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const heights = [30, 45, 20, 55, 35, 48, 28]
        const h = heights[i]
        return (
          <rect key={i} x={115 + i * 52} y={252 - h} width="28" height={h} rx="4"
            fill={c.mockupAccent} opacity={i === 3 ? 1 : 0.35} />
        )
      })}

      {/* Table rows */}
      {rows.map((i) => (
        <g key={i}>
          <rect x="100" y={278 + i * 17} width="408" height="14" rx="2"
            fill={i % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'transparent'} />
          <rect x="108" y={282 + i * 17} width="70" height="5" rx="2.5" fill="rgba(255,255,255,0.18)" />
          <rect x="200" y={282 + i * 17} width="55" height="5" rx="2.5" fill="rgba(255,255,255,0.12)" />
          <rect x="280" y={282 + i * 17} width="40" height="5" rx="2.5" fill={c.mockupLight} opacity="0.45" />
          <rect x="350" y={280 + i * 17} width="36" height="9" rx="4.5" fill={c.mockupAccent} opacity="0.55" />
          <rect x="400" y={282 + i * 17} width="50" height="5" rx="2.5" fill="rgba(255,255,255,0.08)" />
        </g>
      ))}
    </svg>
  )
}

// ─── PROJECT VISUAL ──────────────────────────────────────────────────────────
// Looks for a real screenshot at /public/projects/project{id}.{ext}. If none
// exists (or it fails to load), falls back to the drawn browser mockup.

const SCREENSHOT_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp']

function ProjectVisual({ project }: { project: Project }) {
  const [extIndex, setExtIndex] = useState(0)
  const [useFallback, setUseFallback] = useState(false)

  if (useFallback) {
    return <BrowserMockup hue={project.hue} />
  }

  return (
    <img
      src={`/projects/project${project.id}.${SCREENSHOT_EXTENSIONS[extIndex]}`}
      alt={`${project.title} screenshot`}
      className="w-full h-full object-cover"
      onError={() => {
        if (extIndex < SCREENSHOT_EXTENSIONS.length - 1) {
          setExtIndex(extIndex + 1)
        } else {
          setUseFallback(true)
        }
      }}
    />
  )
}

// ─── CREDENTIAL CARD ─────────────────────────────────────────────────────────

function CredentialCard({ cred, accent }: { cred: Credential; accent: string }) {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = (value: string, key: string) => {
    navigator.clipboard.writeText(value).catch(() => {})
    setCopied(key)
    setTimeout(() => setCopied(null), 1600)
  }

  return (
    <div
      className="rounded-xl p-4 border transition-colors duration-200"
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      <div
        className="text-[10px] font-mono uppercase tracking-[0.15em] mb-3 font-semibold"
        style={{ color: accent }}
      >
        {cred.role}
      </div>

      {cred.login || cred.password ? (
        (['login', 'password'] as const)
          .filter((field) => cred[field])
          .map((field) => (
            <div key={field} className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] text-white/30 w-12 shrink-0">{field}</span>
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono text-[11px] text-white/70 truncate">{cred[field]}</span>
                <button
                  onClick={() => copy(cred[field]!, cred.role + field)}
                  className="text-white/25 hover:text-white/70 transition-colors text-xs shrink-0"
                  title={`Copy ${field}`}
                >
                  {copied === cred.role + field ? '✓' : '⎘'}
                </button>
              </div>
            </div>
          ))
      ) : (
        <div className="text-[11px] text-white/35 italic mb-2">No login required</div>
      )}

      <a
        href={cred.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center gap-1.5 text-[11px] transition-colors duration-150"
        style={{ color: 'rgba(255,255,255,0.3)' }}
        onMouseEnter={e => (e.currentTarget.style.color = accent)}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
      >
        <span>Open as {cred.role}</span>
        <span>↗</span>
      </a>
    </div>
  )
}

// ─── PROJECT SECTION ─────────────────────────────────────────────────────────

function ProjectSection({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView()
  const isEven = index % 2 === 0
  const c = HUE[project.hue]

  return (
    <section
      ref={ref}
      className="relative py-28 px-6 lg:px-16 xl:px-24"
      style={{
        background: `radial-gradient(ellipse at ${isEven ? '0%' : '100%'} 50%, ${c.glow}, transparent 55%)`,
      }}
    >
      {/* Separator line */}
      <div className="absolute top-0 left-16 right-16 h-px bg-white/[0.04]" />

      <div
        className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center`}
        style={{ direction: isEven ? 'ltr' : 'rtl' }}
      >
        {/* Text */}
        <div
          style={{ direction: 'ltr' }}
          className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Number + type */}
          <div className="flex items-center gap-4 mb-7">
            <span
              className="font-mono text-xs font-semibold"
              style={{ color: c.accent, opacity: 0.7 }}
            >
              {project.number}
            </span>
            <div className="h-px w-12 bg-white/10" />
            <span className="text-[10px] text-white/25 uppercase tracking-[0.2em] font-mono">
              {project.type}
            </span>
          </div>

          {/* Status badge (e.g. "in development") */}
          {project.status && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6 text-[11px] font-mono uppercase tracking-[0.1em]"
              style={{
                borderColor: 'rgba(252,211,77,0.35)',
                background: 'rgba(252,211,77,0.08)',
                color: '#fcd34d',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#fcd34d', animation: 'pulse 2s ease-in-out infinite' }}
              />
              {project.status}
            </div>
          )}

          {/* Title */}
          <h2
            className="font-black text-white leading-[0.95] mb-3"
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
              letterSpacing: '-0.03em',
            }}
          >
            {project.title}
          </h2>
          <p className="text-base font-semibold mb-6" style={{ color: c.accent }}>
            {project.subtitle}
          </p>

          <p className="text-white/50 leading-relaxed mb-8 text-[0.9375rem] max-w-lg">
            {project.description}
          </p>

          {/* Stack */}
          <div className="flex flex-wrap gap-2 mb-9">
            {project.stack.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-3 py-1 rounded-full border font-mono"
                style={{
                  background: c.tag,
                  borderColor: `${c.accent}30`,
                  color: c.accent,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Credentials */}
          {project.credentials && (
            <div className="mb-9">
              <div className="text-[10px] text-white/25 uppercase tracking-[0.2em] font-mono mb-3">
                Test Credentials
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {project.credentials.map((cred) => (
                  <CredentialCard key={cred.role} cred={cred} accent={c.accent} />
                ))}
              </div>
              {project.credentialsNote && (
                <div className="flex items-start gap-2 mt-3 text-[11px] leading-relaxed text-white/35 max-w-lg">
                  <span style={{ color: c.accent }}>ⓘ</span>
                  <span>{project.credentialsNote}</span>
                </div>
              )}
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-200"
                style={{
                  borderColor: 'rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.65)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = c.accent
                  e.currentTarget.style.color = c.accent
                  e.currentTarget.style.background = c.subtle
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {link.label}
                <span className="text-xs">↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* Mockup */}
        <div
          style={{ direction: 'ltr' }}
          className={`transition-all duration-700 delay-200 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-[0.96]'}`}
        >
          <div className="relative">
            {/* Glow */}
            <div
              className="absolute -inset-6 rounded-3xl blur-3xl opacity-30 pointer-events-none"
              style={{ background: c.glow }}
            />
            {/* Frame */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{
                boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 32px 64px rgba(0,0,0,0.6)`,
                aspectRatio: '520 / 340',
              }}
            >
              <ProjectVisual project={project} />
            </div>
            {/* Reflection strip */}
            <div
              className="absolute inset-x-4 top-0 h-px rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── STICKY NOTE ─────────────────────────────────────────────────────────────

const NOTE_COLORS = ['#fef08a', '#bbf7d0', '#fbcfe8']
const NOTE_DEFAULTS = [
  "🔒 Every project here is actually secured — CORS allowlist, bcrypt password hashing, JWT auth, role-based access control. Security is not a joke.",
  "⏳ These run on Render's free tier, so the first load can take a couple minutes to spin up. Please be patient with the server!",
  "I focus on real solutions. If I don't know something yet, I'll figure out how to solve it.",
]
const NOTE_ROTATIONS = [-3, 2.5, -2]
const NOTE_SIDES: Array<'left' | 'right'> = ['left', 'right', 'left']
const NOTE_TOPS = ['22%', '48%', '72%']

function StickyNote({ index, visible, onClose }: { index: number; visible: boolean; onClose: () => void }) {
  const [text, setText] = useState(NOTE_DEFAULTS[index])
  const side = NOTE_SIDES[index]
  const rot = NOTE_ROTATIONS[index]

  return (
    <div
      className="fixed z-50 select-none"
      style={{
        top: NOTE_TOPS[index],
        [side]: '6px',
        opacity: visible ? 1 : 0,
        transform: visible
          ? `rotate(${rot}deg)`
          : `translateX(${side === 'left' ? '-130%' : '130%'}) rotate(${rot}deg)`,
        transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${index * 120}ms`,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        className="relative w-52 p-3 shadow-2xl"
        style={{
          background: NOTE_COLORS[index],
          boxShadow: '2px 6px 20px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.08)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Dismiss note"
          className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold leading-none text-white bg-red-500 hover:bg-red-600 transition-colors z-10"
          style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.45), 0 0 0 2px rgba(255,255,255,0.5)' }}
        >
          ✕
        </button>
        {/* Pin */}
        <div className="flex justify-center -mt-1 mb-2">
          <div
            className="w-3 h-3 rounded-full shadow"
            style={{ background: 'rgba(0,0,0,0.2)', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)' }}
          />
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-transparent resize-none text-[11px] leading-relaxed placeholder:text-black/30 text-black/70"
          style={{ fontFamily: 'Inter, sans-serif', minHeight: '130px', fontWeight: 500 }}
          placeholder="Leave a note…"
        />
        <div className="text-right text-[8px] text-black/25 mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          editable
        </div>
      </div>
    </div>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    const h = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const fadeProgress = Math.min(scrollY / 380, 1)
  const heroOpacity = 1 - fadeProgress
  const heroY = scrollY * 0.22

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-center">

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          transform: `translateY(${scrollY * 0.08}px)`,
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(124,58,237,0.08), transparent)',
        }}
      />

      {/* Content */}
      <div
        style={{
          opacity: heroOpacity,
          transform: `translateY(${heroY}px)`,
          willChange: 'transform, opacity',
        }}
        className="relative z-10 max-w-5xl"
      >
        {/* Eyebrow */}
        <div
          className={`text-[10px] font-mono uppercase tracking-[0.45em] text-white/25 mb-14 animate-fade-in delay-100 ${loaded ? '' : 'opacity-0'}`}
        >
          Portfolio — {new Date().getFullYear()}
        </div>

        {/* Name display */}
        <div
          className={`animate-fade-up delay-200 ${loaded ? '' : 'opacity-0'}`}
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          <h1
            className="font-black text-white leading-[0.88] mb-0"
            style={{
              fontSize: 'clamp(4rem, 13vw, 11rem)',
              letterSpacing: '-0.04em',
            }}
          >
            NUR
          </h1>
          <h1
            className="font-black leading-[0.88]"
            style={{
              fontSize: 'clamp(4rem, 13vw, 11rem)',
              letterSpacing: '-0.04em',
              WebkitTextStroke: '1px rgba(255,255,255,0.22)',
              color: 'transparent',
            }}
          >
            MIRSODIKOV
          </h1>
        </div>

        {/* Tagline */}
        <p
          className={`text-white/40 text-base lg:text-lg max-w-sm mx-auto leading-relaxed mt-10 mb-14 animate-fade-up delay-400 ${loaded ? '' : 'opacity-0'}`}
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Full-stack developer & founder — I solve real
          business problems with platforms, apps, and CRMs
          I build myself, end to end.
        </p>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-500 ${loaded ? '' : 'opacity-0'}`}>
          <a
            href="#projects"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-white text-black rounded-full text-sm font-semibold hover:bg-white/90 transition-all duration-200 hover:gap-4"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            See my work
            <span>→</span>
          </a>
          <a
            href="mailto:mir2961333@gmail.com"
            className="text-sm text-white/30 hover:text-white/70 transition-colors duration-200 font-mono"
          >
            mir2961333@gmail.com
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
        style={{ opacity: heroOpacity * (loaded ? 1 : 0) }}
      >
        <div className="text-[9px] text-white/20 font-mono uppercase tracking-[0.3em]">Scroll</div>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
      </div>
    </section>
  )
}

// ─── WORK SECTION HEADER ──────────────────────────────────────────────────────

function WorkHeader() {
  const { ref, inView } = useInView(0.3)
  return (
    <div
      ref={ref}
      className={`text-center py-24 px-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="text-[10px] text-white/20 font-mono uppercase tracking-[0.4em] mb-4">Selected Work</div>
      <h2
        className="font-black text-white"
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 'clamp(3rem, 8vw, 6.5rem)',
          letterSpacing: '-0.04em',
        }}
      >
        Projects
      </h2>
    </div>
  )
}

// ─── CONTACT LINKS ────────────────────────────────────────────────────────────

const CONTACT_LINKS = [
  { label: 'mir2961333@gmail.com', url: 'mailto:mir2961333@gmail.com' },
  { label: '+998 88 487 75 30', url: 'tel:+998884877530' },
  { label: 'Telegram · @Orbitagroupuz', url: 'https://t.me/Orbitagroupuz' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/nurmuhammad-mirsodikov-183853395/' },
]

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  const { ref, inView } = useInView(0.4)
  return (
    <footer
      ref={ref}
      className={`border-t py-20 px-6 text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ borderColor: 'rgba(255,255,255,0.04)' }}
    >
      <div className="max-w-xl mx-auto">
        <div className="text-[10px] text-white/20 font-mono uppercase tracking-[0.4em] mb-5">
          Let&apos;s build something
        </div>
        <h3
          className="font-black text-white mb-6"
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '-0.03em',
          }}
        >
          Get in touch
        </h3>

        <p
          className="text-white/45 text-sm leading-relaxed max-w-md mx-auto mb-10"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          I&apos;m currently building my own startup, and looking for a role
          where real, hands-on software experience creates real value —
          which is exactly what draws me to{' '}
          <span className="font-bold" style={{ color: '#fcd34d' }}>
            Inter Nation English School
          </span>
          . Every project above was designed, built, and shipped by me alone,
          end to end. I don&apos;t just write code — I solve business
          problems with full-stack platforms and CRMs I build myself.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center px-4 py-2 rounded-full border text-xs transition-all duration-200"
              style={{
                borderColor: 'rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.5)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#a78bfa'
                e.currentTarget.style.color = '#a78bfa'
                e.currentTarget.style.background = 'rgba(167,139,250,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-16 text-white/10 text-[11px] font-mono">
          Built with React · Tailwind CSS · {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  )
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [notesVisible, setNotesVisible] = useState(false)
  const [dismissedNotes, setDismissedNotes] = useState<boolean[]>([false, false, false])

  useEffect(() => {
    const h = () => setNotesVisible(window.scrollY > window.innerHeight * 0.55)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: '#060608', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Sticky notes */}
      {[0, 1, 2].map((i) =>
        dismissedNotes[i] ? null : (
          <StickyNote
            key={i}
            index={i}
            visible={notesVisible}
            onClose={() =>
              setDismissedNotes((prev) => prev.map((d, idx) => (idx === i ? true : d)))
            }
          />
        )
      )}

      {/* Hero */}
      <Hero />

      {/* Projects */}
      <div id="projects">
        <WorkHeader />
        {PROJECTS.map((project, i) => (
          <ProjectSection key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
