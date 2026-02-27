"use client";

import { useEffect, useRef, useState } from "react";

/* ───────── FLOATING BALLOONS ───────── */
const balloonColors = [
  "#ff6b9d", "#c084fc", "#67d4fc", "#6ee7b7", "#fbbf24",
  "#fb7185", "#a78bfa", "#fda085", "#34d399", "#f472b6",
];

function Balloons() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 14 }).map((_, i) => {
        const color = balloonColors[i % balloonColors.length];
        const left = `${5 + (i * 41) % 90}%`;
        const delay = `${(i * 2.3) % 16}s`;
        const duration = `${18 + (i * 3) % 12}s`;
        const size = 28 + (i % 5) * 8;
        return (
          <div
            key={i}
            className="balloon"
            style={{
              left,
              bottom: "-80px",
              animation: `balloonFloat ${duration} ${delay} linear infinite`,
            }}
          >
            <svg width={size} height={size * 1.3} viewBox="0 0 40 52" fill="none">
              <ellipse cx="20" cy="18" rx="16" ry="18" fill={color} opacity="0.5" />
              <path d="M20 36 L18 52 M20 36 L22 52" stroke={color} strokeWidth="0.8" opacity="0.4" />
              <ellipse cx="14" cy="12" rx="4" ry="5" fill="white" opacity="0.2" />
            </svg>
          </div>
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
function SectionHeading({ children, emoji }: { children: React.ReactNode; emoji?: string }) {
  return (
    <div className="mb-12 text-center">
      {emoji && <span className="text-4xl mb-3 block">{emoji}</span>}
      <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold tracking-wide text-foreground">
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
    { href: "#about", label: "About" },
    { href: "#gallery", label: "Gallery" },
    { href: "#skills", label: "Skills" },
    { href: "#quests", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-pink/20 shadow-lg shadow-pink/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className="font-[family-name:var(--font-display)] text-xl font-bold rainbow-text tracking-wider hover:opacity-80 transition-opacity"
        >
          DC
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-[family-name:var(--font-body)] text-sm font-medium tracking-wider text-foreground/60 hover:text-pink transition-colors duration-300"
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
        className="text-foreground/60 hover:text-pink transition-colors p-2"
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? (
            <path d="M6 6l12 12M6 18L18 6" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-pink/20 py-4 shadow-lg">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 font-[family-name:var(--font-body)] text-sm font-medium tracking-wider text-foreground/70 hover:text-pink hover:bg-pink/5 transition-colors"
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
      {/* Soft gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, #ff6b9d15 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 30% 70%, #c084fc12 0%, transparent 50%), radial-gradient(ellipse 50% 50% at 70% 60%, #67d4fc10 0%, transparent 50%)",
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-6xl opacity-30" style={{ animation: "floatSlow 4s ease-in-out infinite" }}>
        🎈
      </div>
      <div className="absolute top-32 right-16 text-5xl opacity-25" style={{ animation: "floatSlow 5s ease-in-out 1s infinite" }}>
        🌈
      </div>
      <div className="absolute bottom-32 left-20 text-4xl opacity-20" style={{ animation: "floatSlow 6s ease-in-out 2s infinite" }}>
        ✨
      </div>
      <div className="absolute bottom-40 right-12 text-5xl opacity-25" style={{ animation: "floatSlow 4.5s ease-in-out 0.5s infinite" }}>
        🎀
      </div>

      <div className="relative z-10">
        {/* Avatar circle with rainbow border */}
        <div className="mb-8 flex justify-center">
          <div className="rainbow-border rounded-full p-1" style={{ animation: "heartBeat 3s ease-in-out infinite" }}>
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gradient-to-br from-pink-light to-lavender-light">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D03AQHLzqFl67F0jQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1720693221552?e=1744243200&v=beta&t=2LrVcIyH_VCvwNJaIeKPBPWj76LlWH1_8KUz2ZqWYmA"
                alt="Deathcrow"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-6xl">🐦‍⬛</div>';
                }}
              />
            </div>
          </div>
        </div>

        <h1 className="rainbow-text font-[family-name:var(--font-display)] text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-wide leading-none">
          DEATHCROW
        </h1>

        <p className="mt-4 font-[family-name:var(--font-display)] text-xl md:text-2xl tracking-wide text-foreground/70 italic">
          Ngoc Nguyen Quang
        </p>

        <div className="mt-4 flex items-center justify-center gap-3 text-sm font-[family-name:var(--font-mono)] text-lavender">
          <span className="inline-block w-2 h-2 rounded-full bg-mint animate-pulse" />
          <span>Lead Escalation Officer @ SAP</span>
        </div>

        <p className="mt-2 font-[family-name:var(--font-mono)] text-xs tracking-widest text-foreground/40">
          Budapest, Hungary 🇭🇺
        </p>

        {/* Fun tagline */}
        <p className="mt-6 text-lg font-[family-name:var(--font-display)] italic text-pink/80">
          Serving looks & resolving incidents since 2007 💅
        </p>

        <a
          href="#about"
          className="mt-12 inline-block animate-bounce text-pink/50 hover:text-pink transition-colors"
          aria-label="Scroll down"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
          <SectionHeading emoji="💖">About Me</SectionHeading>
        </RevealSection>

        <RevealSection className="max-w-3xl mx-auto">
          <div className="gradient-card rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative corner emojis */}
            <span className="absolute top-4 right-4 text-2xl opacity-30">🌸</span>
            <span className="absolute bottom-4 left-4 text-2xl opacity-30">✨</span>

            <p className="font-[family-name:var(--font-display)] text-xl md:text-2xl leading-relaxed text-foreground/80 italic">
              &ldquo;Solving all operational issues with flair and finesse &mdash;
              IT Infrastructure and Application troubleshooting, monitoring, IT security reviews.
              Working to reach higher levels in modern IT security.&rdquo;
            </p>
            <p className="mt-6 font-[family-name:var(--font-body)] text-base md:text-lg leading-relaxed text-foreground/60">
              Living my best life in Budapest 🏳️‍🌈 working in a multicultural environment &mdash;
              always motivated for new challenges, honey. If you can give one, bring it on! 💪
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["IT Hero", "WoW Veteran", "MMORPG Addict", "Incident Slayer", "Budapest Life"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-sm font-medium bg-pink/10 text-pink border border-pink/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ───────── PHOTO GALLERY ───────── */
const photos = [
  {
    src: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&h=600&fit=crop",
    caption: "Feeling cute, might resolve incidents later 😼",
    rotate: "-2deg",
  },
  {
    src: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=600&h=600&fit=crop",
    caption: "The boss vibes 🐱",
    rotate: "1deg",
  },
  {
    src: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=600&h=600&fit=crop",
    caption: "Best boi energy 🐕",
    rotate: "-1deg",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=700&fit=crop",
    caption: "Party time! 🎈🎈🎈",
    rotate: "2deg",
  },
  {
    src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&h=600&fit=crop",
    caption: "Cheers to fabulous nights 🥂",
    rotate: "-1.5deg",
  },
  {
    src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&h=600&fit=crop",
    caption: "Confetti vibes only! 🎊",
    rotate: "1.5deg",
  },
  {
    src: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600&h=600&fit=crop",
    caption: "Budapest sunsets hit different 🌅",
    rotate: "-2.5deg",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=600&fit=crop",
    caption: "Food is life, periodt 🍕",
    rotate: "0.5deg",
  },
];

function PhotoGallery() {
  return (
    <section id="gallery" className="py-24 md:py-32 px-6 bg-gradient-to-b from-transparent via-blush/50 to-transparent">
      <div className="max-w-6xl mx-auto">
        <RevealSection>
          <SectionHeading emoji="📸">The Gallery</SectionHeading>
          <p className="text-center text-foreground/50 font-[family-name:var(--font-display)] italic text-lg -mt-6 mb-12">
            A curated collection of vibes ✨
          </p>
        </RevealSection>

        <div className="photo-grid">
          {photos.map((photo, i) => (
            <RevealSection key={i}>
              <div
                className="photo-card rounded-2xl overflow-hidden bg-white"
                style={{ transform: `rotate(${photo.rotate})` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-foreground/60 font-[family-name:var(--font-body)]">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

        {/* Boobs & Balloons section - cheeky bird themed */}
        <RevealSection>
          <div className="mt-16 text-center">
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground/80 mb-6">
              Boobies & Balloons 🎈
            </h3>
            <p className="text-foreground/50 mb-8 italic">The real stars of the show</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Blue-footed booby */}
              <div className="photo-card rounded-2xl overflow-hidden bg-white" style={{ transform: "rotate(-1deg)" }}>
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1517845506591-e79663ac4c23?w=600&h=600&fit=crop"
                    alt="Blue-footed booby bird"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-foreground/60">Blue-footed Booby, iconic queen 👑</p>
                </div>
              </div>

              {/* Colorful balloons */}
              <div className="photo-card rounded-2xl overflow-hidden bg-white" style={{ transform: "rotate(1.5deg)" }}>
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&h=600&fit=crop&q=80"
                    alt="Colorful party balloons"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-foreground/60">Balloon extravaganza! 🎈🎈🎈</p>
                </div>
              </div>

              {/* Another booby */}
              <div className="photo-card rounded-2xl overflow-hidden bg-white" style={{ transform: "rotate(-0.5deg)" }}>
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=600&fit=crop"
                    alt="Booby bird on rock"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-foreground/60">Serving body-ody-ody 💃</p>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* More balloons row */}
        <RevealSection>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop", cap: "Pop off! 🎈" },
              { src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=400&fit=crop", cap: "Confetti rain 🎊" },
              { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop", cap: "Party never stops 🪩" },
              { src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop", cap: "Festival energy ⚡" },
            ].map((item, i) => (
              <div key={i} className="photo-card rounded-xl overflow-hidden bg-white" style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (1 + i * 0.5)}deg)` }}>
                <div className="aspect-square overflow-hidden">
                  <img src={item.src} alt={item.cap} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-3">
                  <p className="text-xs text-foreground/50">{item.cap}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ───────── SKILLS ───────── */
const skills = [
  { name: "Network Engineering", level: 92 },
  { name: "Major Incident Management", level: 95 },
  { name: "IT Security", level: 80 },
  { name: "ITIL / ITSM", level: 90 },
  { name: "Infrastructure (Cloud, Storage, Compute)", level: 88 },
  { name: "MMORPG", level: 99 },
];

const languages = [
  { name: "Hungarian", level: "Native", pct: 100, flag: "🇭🇺" },
  { name: "English", level: "Native", pct: 100, flag: "🇬🇧" },
  { name: "Vietnamese", level: "Professional", pct: 85, flag: "🇻🇳" },
  { name: "Italian", level: "Limited", pct: 35, flag: "🇮🇹" },
  { name: "Spanish", level: "Limited", pct: 35, flag: "🇪🇸" },
];

function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <RevealSection>
          <SectionHeading emoji="💪">Skills & Powers</SectionHeading>
        </RevealSection>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {skills.map((s, i) => (
            <RevealSection key={s.name}>
              <SkillBar skill={s} index={i} />
            </RevealSection>
          ))}
        </div>

        <RevealSection>
          <h3 className="font-[family-name:var(--font-display)] text-xl tracking-wide text-center mb-8 text-foreground/80">
            Languages I Slay In 🗣️
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
    <div ref={ref} className="gradient-card rounded-xl p-5">
      <div className="flex justify-between items-baseline mb-3">
        <span className="font-[family-name:var(--font-body)] text-sm font-semibold tracking-wide text-foreground/80">
          {skill.name}
        </span>
        <span className="font-[family-name:var(--font-mono)] text-xs text-lavender font-bold">
          {skill.level}%
        </span>
      </div>
      <div className="skill-bar-bg">
        <div
          className="skill-bar-fill"
          style={{
            width: visible ? `${skill.level}%` : "0%",
            transitionDelay: `${index * 0.15}s`,
          }}
        />
      </div>
      {skill.name === "MMORPG" && (
        <p className="mt-2 text-xs text-pink italic">Max level achieved, obviously 💅</p>
      )}
    </div>
  );
}

function LanguageCard({ lang, index }: { lang: typeof languages[0]; index: number }) {
  return (
    <div className="gradient-card rounded-xl p-4 text-center hover:shadow-lg hover:shadow-pink/10 transition-all duration-300">
      <span className="text-3xl mb-2 block">{lang.flag}</span>
      <p className="font-[family-name:var(--font-body)] text-sm font-semibold text-foreground/80 mb-1">
        {lang.name}
      </p>
      <p className="font-[family-name:var(--font-mono)] text-xs text-lavender mb-3">
        {lang.level}
      </p>
      <div className="skill-bar-bg h-2">
        <div
          className="skill-bar-fill h-full"
          style={{ width: `${lang.pct}%` }}
        />
      </div>
    </div>
  );
}

/* ───────── EXPERIENCE ───────── */
const quests = [
  {
    company: "SAP",
    role: "Lead Escalation Officer",
    period: "May 2020 - Present",
    location: "Budapest, Hungary",
    type: "LEGENDARY" as const,
    emoji: "👑",
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
    emoji: "⚡",
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
    emoji: "🎮",
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
    emoji: "🌟",
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
    emoji: "🔐",
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
    emoji: "🔄",
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
    emoji: "📊",
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
    emoji: "✈️",
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
    emoji: "🧑‍💻",
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
    emoji: "🖥️",
    desc: [
      "System rebuilds on desktops, laptops and VMs",
      "Re-occurring incident analysis",
      "First time fixes and analysis",
    ],
  },
];

const questStyles = {
  LEGENDARY: { bg: "from-sunshine/20 to-peach/20", border: "border-sunshine", badge: "bg-sunshine/20 text-sunshine", dot: "bg-sunshine" },
  EPIC: { bg: "from-lavender/20 to-pink/20", border: "border-lavender", badge: "bg-lavender/20 text-lavender", dot: "bg-lavender" },
  RARE: { bg: "from-sky/20 to-mint/20", border: "border-sky", badge: "bg-sky/20 text-sky", dot: "bg-sky" },
  UNCOMMON: { bg: "from-mint/20 to-sky/10", border: "border-mint", badge: "bg-mint/20 text-mint", dot: "bg-mint" },
  COMMON: { bg: "from-foreground/5 to-foreground/5", border: "border-foreground/20", badge: "bg-foreground/10 text-foreground/60", dot: "bg-foreground/40" },
};

function Experience() {
  return (
    <section id="quests" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <RevealSection>
          <SectionHeading emoji="🗂️">Experience</SectionHeading>
        </RevealSection>

        <RevealSection>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {(["LEGENDARY", "EPIC", "RARE", "UNCOMMON", "COMMON"] as const).map((t) => (
              <span key={t} className={`font-[family-name:var(--font-mono)] text-xs tracking-wider px-3 py-1 rounded-full ${questStyles[t].badge} flex items-center gap-2`}>
                <span className={`w-2 h-2 rounded-full ${questStyles[t].dot}`} />
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
  const styles = questStyles[quest.type];
  const isRight = index % 2 === 1;

  return (
    <div className={`relative flex flex-col md:flex-row items-start ${!isLast ? "mb-8" : ""}`}>
      {/* Timeline node */}
      <div className="absolute left-[18px] md:left-1/2 md:-translate-x-1/2 top-0 z-10">
        <div className={`w-[14px] h-[14px] rounded-full border-2 ${styles.border} bg-white shadow-md`} />
      </div>

      {/* Card */}
      <div className={`ml-12 md:ml-0 md:w-[calc(50%-32px)] ${isRight ? "md:ml-auto" : "md:mr-auto"}`}>
        <div className={`rounded-2xl p-6 bg-gradient-to-br ${styles.bg} border ${styles.border}/30 hover:shadow-lg hover:shadow-pink/5 transition-all duration-300`}>
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">{quest.emoji}</span>
            <div>
              <span className={`font-[family-name:var(--font-mono)] text-[10px] tracking-[0.3em] uppercase px-2 py-0.5 rounded-full ${styles.badge}`}>
                {quest.type}
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-lg md:text-xl font-semibold text-foreground/90 mt-1">
                {quest.role}
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4 ml-11">
            <span className="font-[family-name:var(--font-body)] text-sm text-lavender font-semibold">
              {quest.company}
            </span>
            <span className="text-foreground/20">|</span>
            <span className="font-[family-name:var(--font-mono)] text-xs text-foreground/40">
              {quest.period}
            </span>
          </div>

          {quest.location && (
            <p className="font-[family-name:var(--font-mono)] text-xs text-foreground/40 mb-4 ml-11 flex items-center gap-1.5">
              📍 {quest.location}
            </p>
          )}

          <ul className="space-y-1.5 ml-11">
            {quest.desc.map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm text-foreground/60 font-[family-name:var(--font-body)]">
                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${styles.dot} opacity-60`} />
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
      emoji: "🎓",
    },
    {
      school: "Berzsenyi Daniel Gimnazium",
      degree: "Secondary Education",
      field: "Mathematics and Statistics",
      period: "1998 - 2004",
      emoji: "📚",
    },
  ];

  return (
    <section id="education" className="py-24 md:py-32 px-6 bg-gradient-to-b from-transparent via-cream/50 to-transparent">
      <div className="max-w-4xl mx-auto">
        <RevealSection>
          <SectionHeading emoji="🎓">Education</SectionHeading>
        </RevealSection>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((e) => (
            <RevealSection key={e.school}>
              <div className="gradient-card rounded-2xl p-8 hover:shadow-lg hover:shadow-lavender/10 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{e.emoji}</span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground/90">
                      {e.school}
                    </h3>
                    <p className="font-[family-name:var(--font-body)] text-sm text-lavender mt-1">
                      {e.degree} &mdash; {e.field}
                    </p>
                    <p className="font-[family-name:var(--font-mono)] text-xs text-foreground/40 mt-2">
                      {e.period}
                    </p>
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

        <RevealSection>
          <div className="mt-8 text-center">
            <span className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-pink/10 to-lavender/10 border border-pink/20 font-[family-name:var(--font-mono)] text-xs tracking-wider text-foreground/60">
              ✅ Certified: Duolingo English Fluency &mdash; Expert
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
      emoji: "💌",
      color: "from-pink/10 to-peach/10 border-pink/20 hover:border-pink/50",
    },
    {
      label: "+36 30 3112433",
      href: "tel:+36303112433",
      emoji: "📱",
      color: "from-lavender/10 to-sky/10 border-lavender/20 hover:border-lavender/50",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ngocnguyenquang",
      emoji: "💼",
      color: "from-sky/10 to-mint/10 border-sky/20 hover:border-sky/50",
    },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <RevealSection>
          <SectionHeading emoji="💬">Get In Touch</SectionHeading>
        </RevealSection>

        <RevealSection>
          <p className="font-[family-name:var(--font-display)] text-lg text-foreground/50 mb-12 max-w-lg mx-auto italic">
            Ready for the next adventure? Looking for a seasoned incident commander?
            Slide into my DMs, bestie! 💅
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
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r ${l.color} border transition-all duration-300 w-full sm:w-auto justify-center hover:shadow-lg hover:-translate-y-1`}
              >
                <span className="text-xl">{l.emoji}</span>
                <span className="font-[family-name:var(--font-mono)] text-sm tracking-wider text-foreground/70">
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
    <footer className="py-12 px-6 border-t border-pink/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="section-divider mb-8" />
        <p className="text-4xl mb-4">🏳️‍🌈</p>
        <p className="font-[family-name:var(--font-mono)] text-xs text-foreground/30 tracking-wider">
          &copy; {new Date().getFullYear()} Ngoc Nguyen Quang &mdash; Fabulous & proud
        </p>
        <p className="font-[family-name:var(--font-mono)] text-[10px] text-foreground/20 tracking-wider mt-2">
          Made with 💖 and a lot of ☕
        </p>
      </div>
    </footer>
  );
}

/* ───────── MAIN PAGE ───────── */
export default function Home() {
  return (
    <>
      <Balloons />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <PhotoGallery />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
