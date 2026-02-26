"use client";

import { useEffect, useRef, useState } from "react";

/* ───────── FLOATING PARTICLES ───────── */
function Particles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, i) => {
        const isPurple = i % 3 !== 0;
        const left = `${5 + (i * 37) % 90}%`;
        const delay = `${(i * 1.7) % 12}s`;
        const duration = `${10 + (i * 3) % 8}s`;
        const size = i % 4 === 0 ? "4px" : i % 3 === 0 ? "2px" : "3px";
        return (
          <div
            key={i}
            className={`particle ${isPurple ? "particle-purple" : "particle-green"}`}
            style={{
              left,
              bottom: "-10px",
              width: size,
              height: size,
              animation: `float ${duration} ${delay} linear infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ───────── SCROLL REVEAL HOOK ───────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function RevealSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

/* ───────── SECTION HEADING ───────── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold tracking-widest uppercase text-phantom-light">
        {children}
      </h2>
      <div className="mt-4 section-divider" />
    </div>
  );
}

/* ───────── NAV ───────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#about", label: "Lore" },
    { href: "#skills", label: "Stats" },
    { href: "#quests", label: "Quests" },
    { href: "#education", label: "Training" },
    { href: "#contact", label: "Summon" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-crypt/90 backdrop-blur-md border-b border-phantom/20 shadow-[0_4px_30px_#7c3aed11]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className="font-[family-name:var(--font-display)] text-lg text-phantom-light tracking-[0.3em] hover:text-phantom transition-colors"
        >
          DC
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-[family-name:var(--font-heading)] text-xs tracking-[0.25em] uppercase text-bone/60 hover:text-phantom-light transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </div>
        <MobileMenu links={links} />
      </div>
    </nav>
  );
}

function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-bone/60 hover:text-phantom-light transition-colors p-2"
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          {open ? (
            <path d="M6 6l12 12M6 18L18 6" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 bg-crypt/95 backdrop-blur-md border-b border-phantom/20 py-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 font-[family-name:var(--font-heading)] text-sm tracking-[0.2em] uppercase text-bone/60 hover:text-phantom-light hover:bg-phantom/5 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/* ───────── HERO ───────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background radial gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, #7c3aed12 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 50% 60%, #10b98108 0%, transparent 60%)",
        }}
      />

      {/* Decorative rune circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] z-0 opacity-[0.06]">
        <svg viewBox="0 0 700 700" className="w-full h-full" style={{ animation: "runeRotate 120s linear infinite" }}>
          <circle cx="350" cy="350" r="340" fill="none" stroke="#7c3aed" strokeWidth="0.5" />
          <circle cx="350" cy="350" r="280" fill="none" stroke="#7c3aed" strokeWidth="0.3" strokeDasharray="8 12" />
          <circle cx="350" cy="350" r="220" fill="none" stroke="#10b981" strokeWidth="0.3" />
          {/* Rune marks */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x = 350 + 340 * Math.cos(angle);
            const y = 350 + 340 * Math.sin(angle);
            return (
              <g key={i} transform={`translate(${x},${y}) rotate(${i * 30})`}>
                <line x1="-8" y1="0" x2="8" y2="0" stroke="#7c3aed" strokeWidth="0.8" />
                <line x1="0" y1="-5" x2="0" y2="5" stroke="#7c3aed" strokeWidth="0.5" />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="relative z-10">
        {/* Crow icon */}
        <div className="mb-6 flex justify-center">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-phantom/50">
            <path
              d="M24 4C20 8 12 12 8 20C6 24 8 30 12 34L18 38L24 44L30 38L36 34C40 30 42 24 40 20C36 12 28 8 24 4Z"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
            <path d="M18 22L24 18L30 22" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="20" cy="24" r="1.5" fill="currentColor" />
            <circle cx="28" cy="24" r="1.5" fill="currentColor" />
            <path d="M22 28L24 30L26 28" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </div>

        <h1
          className="glow-title font-[family-name:var(--font-display)] text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.2em] text-phantom-light leading-none"
        >
          DEATHCROW
        </h1>

        <p className="mt-6 font-[family-name:var(--font-heading)] text-lg md:text-xl tracking-[0.15em] text-bone/70">
          Ngoc Nguyen Quang
        </p>

        <div className="mt-4 flex items-center justify-center gap-3 text-sm font-[family-name:var(--font-mono)] text-wraith/70">
          <span className="inline-block w-2 h-2 rounded-full bg-wraith animate-pulse" />
          <span>Lead Escalation Officer @ SAP</span>
        </div>

        <p className="mt-2 font-[family-name:var(--font-mono)] text-xs tracking-widest text-bone/40">
          Budapest, Hungary
        </p>

        <a
          href="#about"
          className="mt-16 inline-block animate-bounce text-phantom/40 hover:text-phantom-light transition-colors"
          aria-label="Scroll down"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 10l5 5 5-5" />
          </svg>
        </a>
      </div>
    </section>
  );
}

/* ───────── ABOUT ───────── */
function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <RevealSection>
          <SectionHeading>Lore</SectionHeading>
        </RevealSection>

        <RevealSection className="max-w-3xl mx-auto">
          <div className="relative p-8 md:p-12 border border-phantom/15 bg-ash/40 backdrop-blur-sm rune-border">
            <p className="font-[family-name:var(--font-body)] text-lg md:text-xl leading-relaxed text-bone/80 italic">
              &ldquo;Solving all operational issues, focusing on the technical resolution &mdash;
              IT Infrastructure and Application troubleshooting, monitoring, IT security reviews.
              Working to reach higher levels in modern IT security.&rdquo;
            </p>
            <p className="mt-6 font-[family-name:var(--font-body)] text-base md:text-lg leading-relaxed text-bone/60">
              Living in Budapest and working in a multicultural environment &mdash;
              motivated for new challenges, if you can give one.
            </p>

            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-phantom/30" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-phantom/30" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-wraith/30" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-wraith/30" />
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ───────── SKILLS & LANGUAGES ───────── */
const skills = [
  { name: "Network Engineering", level: 92, color: "purple" as const },
  { name: "Major Incident Management", level: 95, color: "purple" as const },
  { name: "IT Security", level: 80, color: "green" as const },
  { name: "ITIL / ITSM", level: 90, color: "purple" as const },
  { name: "Infrastructure (Hyperscalers, Storage, Compute)", level: 88, color: "green" as const },
  { name: "MMORPG", level: 99, color: "green" as const },
];

const languages = [
  { name: "Hungarian", level: "Native", pct: 100 },
  { name: "English", level: "Native", pct: 100 },
  { name: "Vietnamese", level: "Professional", pct: 85 },
  { name: "Italian", level: "Limited", pct: 35 },
  { name: "Spanish", level: "Limited", pct: 35 },
];

function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <RevealSection>
          <SectionHeading>Character Stats</SectionHeading>
        </RevealSection>

        {/* Skills */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {skills.map((s, i) => (
            <RevealSection key={s.name} className={`delay-${i}`} >
              <SkillBar skill={s} index={i} />
            </RevealSection>
          ))}
        </div>

        {/* Languages */}
        <RevealSection>
          <h3 className="font-[family-name:var(--font-heading)] text-xl tracking-[0.2em] uppercase text-wraith-light text-center mb-8">
            Spoken Tongues
          </h3>
        </RevealSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {languages.map((l, i) => (
            <RevealSection key={l.name}>
              <LanguageCard lang={l} index={i} />
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-baseline mb-2">
        <span className="font-[family-name:var(--font-heading)] text-sm tracking-wider text-bone/80 uppercase">
          {skill.name}
        </span>
        <span className="font-[family-name:var(--font-mono)] text-xs text-phantom-light/60">
          {skill.level}/100
        </span>
      </div>
      <div className="skill-bar-bg h-3">
        <div
          className={`${skill.color === "purple" ? "skill-bar-fill-purple" : "skill-bar-fill-green"} ${
            visible ? "animate-bar-fill" : ""
          }`}
          style={{
            width: visible ? `${skill.level}%` : "0%",
            animationDelay: `${index * 0.15}s`,
          }}
        />
      </div>
    </div>
  );
}

function LanguageCard({ lang, index }: { lang: typeof languages[0]; index: number }) {
  return (
    <div
      className="p-4 border border-phantom/15 bg-ash/30 text-center hover:border-phantom/40 hover:bg-ash/50 transition-all duration-300 group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <p className="font-[family-name:var(--font-heading)] text-sm tracking-wider text-bone/90 uppercase mb-1">
        {lang.name}
      </p>
      <p className="font-[family-name:var(--font-mono)] text-xs text-phantom-light/50 mb-3">
        {lang.level}
      </p>
      <div className="w-full h-1 bg-crypt rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-phantom to-wraith rounded-full transition-all duration-1000"
          style={{ width: `${lang.pct}%` }}
        />
      </div>
    </div>
  );
}

/* ───────── EXPERIENCE (QUEST LOG) ───────── */
const quests = [
  {
    company: "SAP",
    role: "Lead Escalation Officer",
    period: "May 2020 - Present",
    location: "Budapest, Hungary",
    type: "LEGENDARY" as const,
    desc: [
      "Lead Incident Management for the whole SAP infrastructure",
      "Hyperscalers, Network, Compute, Storage",
    ],
  },
  {
    company: "Pareteum Corporation",
    role: "Incident Management Coordinator",
    period: "Feb 2014 - May 2020",
    location: "San Feliu de Guixols",
    type: "EPIC" as const,
    desc: [
      "Senior Incident Manager",
      "Organizing the work of Incident Managers",
      "Incident Management Process Owner",
      "ITIL Expert",
    ],
  },
  {
    company: "Frostshock.eu",
    role: "Online Journalist / Tournament Organizer",
    period: "Jan 2006 - May 2020",
    location: "Budapest",
    type: "EPIC" as const,
    desc: [
      "Blogging about WoW, Starcraft, Diablo & Hearthstone since 2006",
      "Blog with over 10,000 regular readers",
      "Organizing & Hosting Tournaments, Live Streams",
      "Forum Administrator",
    ],
  },
  {
    company: "NTT Europe Ltd.",
    role: "Customer Service Team Leader",
    period: "Jul 2013 - Feb 2014",
    location: "Barcelona",
    type: "RARE" as const,
    desc: [
      "Service transition of server/network support from UK to Barcelona",
      "24/7 operation across 5 teams",
      "Global NTTE customer support (Windows & Linux servers)",
    ],
  },
  {
    company: "T-Systems",
    role: "Information Security Specialist",
    period: "Feb 2012 - Jun 2013",
    location: "Budapest",
    type: "RARE" as const,
    desc: [
      "Firewall changes and rules monitoring",
      "File Integrity and Network Intrusion systems",
      "Penetration testing, Wireless scan",
    ],
  },
  {
    company: "T-Systems",
    role: "Transition Manager - Incident & Problem Management",
    period: "Oct 2011 - Dec 2011",
    location: "Milton Keynes, UK",
    type: "UNCOMMON" as const,
    desc: [
      "Migration of Incident & Problem Management",
      "Known Error Database management",
      "SM9 ticket system configuration",
    ],
  },
  {
    company: "T-Systems",
    role: "Transition Manager / Data Analyst",
    period: "May 2011 - Sep 2011",
    location: "Budapest",
    type: "UNCOMMON" as const,
    desc: [
      "Migration of data to Identity Management Systems (IMS)",
      "Building intranet systems",
    ],
  },
  {
    company: "T-Systems",
    role: "UAM Transition & Handover",
    period: "Apr 2011",
    location: "Budapest → Lisbon",
    type: "UNCOMMON" as const,
    desc: [
      "User Account Management transition to Fujitsu Lisbon",
      "Complete handover: work instructions, process docs, knowledge transfer",
    ],
  },
  {
    company: "T-Systems",
    role: "User Account Specialist / Manager",
    period: "Jan 2009 - Mar 2011",
    location: "Budapest",
    type: "UNCOMMON" as const,
    desc: [
      "User Account Management & On-Call VIP support",
      "Corporate printer & server setup (Windows Server 2003/2008)",
      "File Access Management",
    ],
  },
  {
    company: "T-Systems",
    role: "Second Line Desktop Support Technician",
    period: "Sep 2007 - Dec 2008",
    location: "Budapest",
    type: "COMMON" as const,
    desc: [
      "System rebuilds on desktops, laptops and VMs",
      "Re-occurring incident analysis",
      "First time fixes and analysis",
    ],
  },
];

const questColors = {
  LEGENDARY: { border: "border-[#ff8000]", text: "text-[#ff8000]", glow: "shadow-[0_0_12px_#ff800033]", bg: "bg-[#ff8000]" },
  EPIC: { border: "border-phantom-light", text: "text-phantom-light", glow: "shadow-[0_0_12px_#a78bfa33]", bg: "bg-phantom-light" },
  RARE: { border: "border-[#0070dd]", text: "text-[#0070dd]", glow: "shadow-[0_0_12px_#0070dd33]", bg: "bg-[#0070dd]" },
  UNCOMMON: { border: "border-wraith", text: "text-wraith", glow: "shadow-[0_0_12px_#10b98133]", bg: "bg-wraith" },
  COMMON: { border: "border-bone/40", text: "text-bone/80", glow: "", bg: "bg-bone/60" },
};

function Experience() {
  return (
    <section id="quests" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <RevealSection>
          <SectionHeading>Quest Log</SectionHeading>
        </RevealSection>

        <RevealSection>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {(["LEGENDARY", "EPIC", "RARE", "UNCOMMON", "COMMON"] as const).map((t) => (
              <span key={t} className={`font-[family-name:var(--font-mono)] text-xs tracking-wider ${questColors[t].text} flex items-center gap-2`}>
                <span className={`w-2 h-2 rounded-full ${questColors[t].bg}`} />
                {t}
              </span>
            ))}
          </div>
        </RevealSection>

        <div className="quest-line">
          {quests.map((q, i) => (
            <RevealSection key={`${q.company}-${q.role}`}>
              <QuestCard quest={q} index={i} isLast={i === quests.length - 1} />
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuestCard({
  quest,
  index,
  isLast,
}: {
  quest: typeof quests[0];
  index: number;
  isLast: boolean;
}) {
  const colors = questColors[quest.type];
  const isRight = index % 2 === 1;

  return (
    <div className={`relative flex flex-col md:flex-row items-start ${!isLast ? "mb-8" : ""}`}>
      {/* Timeline node */}
      <div className="absolute left-[18px] md:left-1/2 md:-translate-x-1/2 top-0 z-10">
        <div className={`w-[12px] h-[12px] rounded-full border-2 ${colors.border} bg-crypt ${colors.glow}`} />
      </div>

      {/* Card */}
      <div
        className={`ml-12 md:ml-0 md:w-[calc(50%-32px)] ${
          isRight ? "md:ml-auto" : "md:mr-auto"
        }`}
      >
        <div className={`quest-card p-6 border ${colors.border}/30 bg-ash/40 backdrop-blur-sm hover:bg-ash/60 transition-all duration-300 group`}>
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div>
              <span className={`font-[family-name:var(--font-mono)] text-[10px] tracking-[0.3em] uppercase ${colors.text} opacity-80`}>
                {quest.type}
              </span>
              <h3 className="font-[family-name:var(--font-heading)] text-lg md:text-xl font-semibold text-bone/95 mt-1 tracking-wide">
                {quest.role}
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-[family-name:var(--font-heading)] text-sm text-phantom-light/80 tracking-wider">
              {quest.company}
            </span>
            <span className="text-bone/20">|</span>
            <span className="font-[family-name:var(--font-mono)] text-xs text-bone/40">
              {quest.period}
            </span>
          </div>

          {quest.location && (
            <p className="font-[family-name:var(--font-mono)] text-xs text-wraith/50 mb-4 flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              {quest.location}
            </p>
          )}

          {/* Description bullets */}
          <ul className="space-y-1.5">
            {quest.desc.map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm text-bone/55 font-[family-name:var(--font-body)]">
                <span className={`mt-2 w-1 h-1 rounded-full shrink-0 ${colors.bg} opacity-60`} />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ───────── EDUCATION ───────── */
function Education() {
  const education = [
    {
      school: "Budapesti Corvinus Egyetem",
      degree: "Bachelor of Science (BSc)",
      field: "Information Technology & Economics",
      period: "2004 - 2007",
    },
    {
      school: "Berzsenyi Daniel Gimnazium",
      degree: "Secondary Education",
      field: "Mathematics and Statistics",
      period: "1998 - 2004",
    },
  ];

  return (
    <section id="education" className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <RevealSection>
          <SectionHeading>Training Grounds</SectionHeading>
        </RevealSection>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((e) => (
            <RevealSection key={e.school}>
              <div className="p-8 border border-phantom/15 bg-ash/30 hover:border-phantom/30 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-10 h-10 border border-wraith/30 flex items-center justify-center shrink-0" style={{ animation: "glowGreen 3s ease-in-out infinite" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-wraith">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-bone/90 tracking-wide">
                      {e.school}
                    </h3>
                    <p className="font-[family-name:var(--font-body)] text-sm text-phantom-light/70 mt-1">
                      {e.degree} &mdash; {e.field}
                    </p>
                    <p className="font-[family-name:var(--font-mono)] text-xs text-bone/40 mt-2">
                      {e.period}
                    </p>
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

        {/* Certification */}
        <RevealSection>
          <div className="mt-8 text-center">
            <span className="inline-block px-4 py-2 border border-wraith/20 bg-wraith/5 font-[family-name:var(--font-mono)] text-xs tracking-wider text-wraith/70">
              Certified: Duolingo English Fluency &mdash; Expert
            </span>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ───────── CONTACT ───────── */
function Contact() {
  const links = [
    {
      label: "deathcrow42@gmail.com",
      href: "mailto:deathcrow42@gmail.com",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 4L12 13 2 4" />
        </svg>
      ),
    },
    {
      label: "+36 30 3112433",
      href: "tel:+36303112433",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ngocnguyenquang",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <RevealSection>
          <SectionHeading>Summon Me</SectionHeading>
        </RevealSection>

        <RevealSection>
          <p className="font-[family-name:var(--font-body)] text-lg text-bone/50 mb-12 max-w-lg mx-auto italic">
            Ready for the next raid? Looking for a seasoned incident commander?
            Send a signal.
          </p>
        </RevealSection>

        <RevealSection>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 px-6 py-4 border border-phantom/20 bg-ash/30 text-bone/70 hover:text-phantom-light hover:border-phantom/50 hover:bg-ash/60 transition-all duration-300 w-full sm:w-auto justify-center group"
              >
                <span className="text-phantom/50 group-hover:text-phantom-light transition-colors">
                  {l.icon}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-sm tracking-wider">
                  {l.label}
                </span>
              </a>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ───────── FOOTER ───────── */
function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-phantom/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="section-divider mb-8" />
        <p className="font-[family-name:var(--font-mono)] text-xs text-bone/25 tracking-wider">
          &copy; {new Date().getFullYear()} Ngoc Nguyen Quang &mdash; Forged in darkness, tempered by incidents.
        </p>
      </div>
    </footer>
  );
}

/* ───────── MAIN PAGE ───────── */
export default function Home() {
  return (
    <>
      <Particles />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
