"use client";
import { useEffect, useMemo, useState, ReactNode } from "react";

type Lang = "en" | "it";

const strings: Record<Lang, any> = {
  en: {
    nav: {
      home: "Home",
      discog: "Discography",
      graphics: "Graphics & Advertising",
      photo: "Photography",
      writing: "Writing",
      contact: "Contact",
      lang: "EN",
    },
    hero: {
      title: "We create effects that transform reality",
      subtitle: "Professional FX, extreme creativity, unique visual experiences",
      cta1: "Discography",
      cta2: "Graphics & Advertising",
    },
    discog: { title: "Discography" },
    graphics: {
      title: "Graphics & Advertising",
      body:
        "Brand identities, campaign visuals, album covers, social kits, motion stingers and more.",
    },
    photo: {
      title: "Photography",
      body:
        "Editorial, product and live performances. Color-accurate pipelines and fast delivery.",
    },
    writing: {
      title: "Writing",
      body:
        "Fiction, lyrics, copy and long-form content crafted for clarity, pace and emotional punch.",
    },
    contact: {
      title: "Get in touch",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Submit",
    },
  },
  it: {
    nav: {
      home: "Home",
      discog: "Discografia",
      graphics: "Grafica e Pubblicità",
      photo: "Fotografia",
      writing: "Scrittura",
      contact: "Contatti",
      lang: "IT",
    },
    hero: {
      title: "Creiamo effetti che trasformano la realtà",
      subtitle: "FX professionali, creatività estrema, esperienze visive uniche",
      cta1: "Discografia",
      cta2: "Grafica e Pubblicità",
    },
    discog: { title: "Discografia" },
    graphics: {
      title: "Grafica e Pubblicità",
      body:
        "Identità di brand, visual per campagne, copertine, kit social, motion stingers e altro.",
    },
    photo: {
      title: "Fotografia",
      body:
        "Editoriale, prodotto e live. Workflow colore accurato e consegna rapida.",
    },
    writing: {
      title: "Scrittura",
      body:
        "Narrativa, testi, copy e long‑form con chiarezza, ritmo ed impatto emotivo.",
    },
    contact: {
      title: "Contattami",
      name: "Nome",
      email: "Email",
      message: "Messaggio",
      send: "Invia",
    },
  },
};

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error("i18n test failed: " + msg);
}
function validateI18n() {
  (["en", "it"] as Lang[]).forEach((l) => {
    const t = strings[l];
    assert(!!t, `missing ${l}`);
    assert(
      t.nav &&
        t.nav.home &&
        t.nav.discog &&
        t.nav.graphics &&
        t.nav.photo &&
        t.nav.writing &&
        t.nav.contact,
      `${l}.nav`
    );
    assert(t.hero && t.hero.title && t.hero.subtitle, `${l}.hero`);
    assert(t.contact && t.contact.title && t.contact.name && t.contact.email && t.contact.message && t.contact.send, `${l}.contact`);
  });
}

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const url = new URL(window.location.href);
    const qpRaw = url.searchParams.get("lang");
    const qp = qpRaw === "en" || qpRaw === "it" ? (qpRaw as Lang) : null;
    const m = document.cookie ? document.cookie.match(/(?:^|; )lang=([^;]+)/) : null;
    const ck = m && (m[1] === "en" || m[1] === "it") ? (m[1] as Lang) : null;
    return qp || ck || "en";
  } catch {
    return "en";
  }
}

function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = Array.prototype.slice.call(document.querySelectorAll(".reveal")) as HTMLElement[];
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("show"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("show");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const container = "max-w-[72rem] mx-auto px-4";
const sectionCls = "py-16 md:py-24 border-t border-white/10";
const btn =
  "inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 hover:bg-white/10 transition";
const pTxt = "text-base leading-relaxed text-neutral-300";
const h1 = "text-3xl md:text-5xl font-semibold tracking-tight";
const h2 = "text-2xl md:text-3xl font-semibold tracking-tight";
const navLink = "text-sm uppercase tracking-wide hover:opacity-80 transition";

function Navbar({ t, onToggleLang }: { t: any; onToggleLang: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled ? "backdrop-blur bg-black/40" : "bg-transparent"
      }`}
    >
      <div className={`${container} flex items-center justify-between py-3`}>
        <a href="#home" className="flex items-center gap-3">
          <span className="text-sm tracking-widest uppercase text-neutral-400">
            Ainz FX
          </span>
        </a>
        <nav className="hidden md:flex gap-6 items-center">
          <a className={navLink} href="#home">{t.nav.home}</a>
          <a className={navLink} href="#discog">{t.nav.discog}</a>
          <a className={navLink} href="#graphics">{t.nav.graphics}</a>
          <a className={navLink} href="#photo">{t.nav.photo}</a>
          <a className={navLink} href="#writing">{t.nav.writing}</a>
          <a className={navLink} href="#contact">{t.nav.contact}</a>
          <button onClick={onToggleLang} className="ml-4 text-xs uppercase tracking-widest rounded-md border border-white/20 px-2 py-1 hover:bg-white/10" aria-label="Switch language" title="Switch language">{t.nav.lang}</button>
        </nav>
      </div>
    </header>
  );
}

function Section({ id, title, subtitle, children }: { id: string; title?: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`${sectionCls} reveal`}>
      <div className={container}>
        {title && <h2 className={`${h2} mb-3`}>{title}</h2>}
        {subtitle && <p className={`${pTxt} mb-8 max-w-3xl`}>{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

function DiscographyGrid({ t, count }: { t: any; count?: number }) {
  const envCountRaw = (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_DISCOG_COUNT) || "";
  const envCount = parseInt(envCountRaw as string, 10);
  const total = Number.isFinite(envCount) && envCount > 0 ? envCount : (typeof count === 'number' && count > 0 ? count : 46);
  const covers = Array.from({ length: total }).map((_, i) => ({ src: "/discography/" + (i + 1) + ".jpg", alt: "Cover " + (i + 1) }));
  return (
    <Section id="discog" title={t.discog.title}>
      <div className="sticky top-20 z-10 flex flex-wrap items-center gap-3 mb-6 bg-[#0a0a0a]/70 backdrop-blur px-2 py-2 rounded-md border border-white/10">
        <a href="https://open.spotify.com/artist/6yIxoCzbUHZAwHnyVdfzjK?si=-9bTbKhqS4K0WkLZR806bA" target="_blank" rel="noreferrer" className={`${btn} !px-3 !py-2`} aria-label="Spotify">
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" fill="currentColor">
            <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm4.49 14.13a.75.75 0 0 1-1.03.25c-2.82-1.72-6.38-2.11-10.56-1.17a.75.75 0 1 1-.32-1.46c4.56-1 8.47-.56 11.6 1.33.36.22.48.69.25 1.05zm1.42-3.06a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.42a.94.94 0 1 1-.54-1.8c4.27-1.29 9.7-.64 13.38 1.57.44.27.58.86.31 1.34zm.14-3.22c-3.7-2.2-9.83-2.4-13.3-1.33a1.12 1.12 0 1 1-.65-2.15c4.02-1.22 10.93-.97 15.22 1.6a1.12 1.12 0 0 1-1.27 1.88z"/>
          </svg>
          <span>Spotify</span>
        </a>
        <a href="https://music.amazon.it/artists/B0FGKQTC1M/ainzcreative85?marketplaceId=APJ6JRA9NG5V4&musicTerritory=IT&ref=dm_sh_2K5GJvt5pb0dv4r2EDxtlBnrZ" target="_blank" rel="noreferrer" className={`${btn} !px-3 !py-2`} aria-label="Amazon Music">
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" fill="currentColor">
            <path d="M20.8 16.8c-3.4 2.4-7.6 3.3-12.5 2.6-.7-.1-1.2.4-1.3 1.1-.1.7.4 1.2 1.1 1.3 5.4.8 10.1-.3 13.9-3 .6-.4.7-1.2.3-1.8-.4-.6-1.2-.7-1.8-.2z"/>
            <path d="M6.6 17.4c-1.4-.4-2.8-1-4.2-1.7-.6-.3-1.3 0-1.6.6-.3.6 0 1.3.6 1.6 1.5.8 3.1 1.5 4.7 1.9.7.2 1.3-.3 1.5-1 .1-.7-.4-1.3-1-1.4z"/>
          </svg>
          <span>Amazon Music</span>
        </a>
        <a href="https://youtube.com/channel/UCNLsA9dc5i2N6tys6ZTSZzA?si=9LN1A5GOZh__mQYD" target="_blank" rel="noreferrer" className={`${btn} !px-3 !py-2`} aria-label="YouTube">
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" fill="currentColor">
            <path d="M23.5 7.1s-.2-1.7-.9-2.5c-.8-.9-1.7-.9-2.1-1C17.7 3.2 12 3.2 12 3.2h0s-5.7 0-8.5.4c-.4 0-1.3.1-2.1 1-.7.8-.9 2.5-.9 2.5S0 9.2 0 11.2v1.6c0 2 .2 4.1.2 4.1s.2 1.7.9 2.5c.8.9 1.8.9 2.2 1 1.6.2 8.4.4 8.4.4s5.7 0 8.5-.4c.4-.1 1.3-.1 2.1-1 .7-.8.9-2.5.9-2.5s.2-2.1.2-4.1v-1.6c0-2-.2-4.1-.2-4.1zM9.6 14.6V7.9l6.3 3.4-6.3 3.3z"/>
          </svg>
          <span>YouTube</span>
        </a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {covers.map((c, i) => (
          <img key={i} src={c.src} alt={c.alt} className="w-full aspect-square object-cover rounded-lg border border-white/10" loading="lazy" decoding="async" />
        ))}
      </div>
    </Section>
  );
}

function Graphics({ t }: { t: any }) {
  return (
    <Section id="graphics" title={t.graphics.title} subtitle={t.graphics.body}>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border border-white/10 rounded-lg h-40 flex items-center justify-center text-neutral-400">Brand / Logo</div>
        <div className="border border-white/10 rounded-lg h-40 flex items-center justify-center text-neutral-400">Covers / Social Kits</div>
        <div className="border border-white/10 rounded-lg h-40 flex items-center justify-center text-neutral-400">Motion Stingers</div>
      </div>
    </Section>
  );
}

function Photo({ t }: { t: any }) {
  return (
    <Section id="photo" title={t.photo.title} subtitle={t.photo.body}>
      <div className="mb-6">
        <a href="https://overlord85.wixsite.com/cris-manzi-ph-advert" target="_blank" rel="noreferrer" className={btn}>Photography Portfolio</a>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border border-white/10 rounded-lg h-40 flex items-center justify-center text-neutral-400">Editorial</div>
        <div className="border border-white/10 rounded-lg h-40 flex items-center justify-center text-neutral-400">Product</div>
        <div className="border border-white/10 rounded-lg h-40 flex items-center justify-center text-neutral-400">Live</div>
      </div>
    </Section>
  );
}

function Writing({ t }: { t: any }) {
  return (
    <Section id="writing" title={t.writing.title} subtitle={t.writing.body}>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border border-white/10 rounded-lg h-40 flex items-center justify-center text-neutral-400">Fiction</div>
        <div className="border border-white/10 rounded-lg h-40 flex items-center justify-center text-neutral-400">Lyrics</div>
        <div className="border border-white/10 rounded-lg h-40 flex items-center justify-center text-neutral-400">Copy</div>
      </div>
    </Section>
  );
}

function ContactForm({ t }: { t: any }) {
  return (
    <Section id="contact" title={t.contact.title}>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="flex flex-wrap items-center gap-3">
          <a className={`${btn} !px-3 !py-2`} href="https://www.instagram.com/ainz_fx_cristiano_manzi?igsh=MXM0YW02YXh0NnNoeQ==" target="_blank" rel="noreferrer" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="17" cy="7" r="1.5" fill="currentColor"/>
            </svg>
            <span>Instagram</span>
          </a>
          <a className={`${btn} !px-3 !py-2`} href="https://www.tiktok.com/@ainz_fx_cristiano_manzi?_r=1&_t=ZN-91JKC9eh8KM" target="_blank" rel="noreferrer" aria-label="TikTok">
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" fill="currentColor">
              <path d="M9 7v8.5a3.5 3.5 0 1 1-2-3.16V7h2zm6-.5a5 5 0 0 0 3 1v2a7 7 0 0 1-3-1v6.5a3.5 3.5 0 1 1-2-3.16V6.5h2z"/>
            </svg>
            <span>TikTok</span>
          </a>
          <a className={`${btn} !px-3 !py-2`} href="https://t.me/CristianoManziPH" target="_blank" rel="noreferrer" aria-label="Telegram">
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" fill="currentColor">
              <path d="M21 4L3 11l6 2 1 6 3-4 5 3 3-14z"/>
            </svg>
            <span>Telegram</span>
          </a>
          <a className={`${btn} !px-3 !py-2`} href="https://www.threads.com/@ainz_fx_cristiano_manzi" target="_blank" rel="noreferrer" aria-label="Threads">
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="9"/>
              <path d="M15.5 12c-1-3-6-3-6 0 0 3 4 3 4 0h-2"/>
            </svg>
            <span>Threads</span>
          </a>
          <a className={`${btn} !px-3 !py-2`} href="https://www.facebook.com/share/19tpG2uBzr/" target="_blank" rel="noreferrer" aria-label="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" fill="currentColor">
              <path d="M14 9h3V6h-3a4 4 0 0 0-4 4v2H7v3h3v5h3v-5h3l1-3h-4v-2a1 1 0 0 1 1-1z"/>
            </svg>
            <span>Facebook</span>
          </a>
        </div>
        <form className="space-y-4" action="https://formspree.io/f/your-id" method="POST">
          <div>
            <label className="block mb-2">{t.contact.name} *</label>
            <input required name="name" placeholder="Your name" className="w-full bg-transparent border border-white/20 rounded-md px-3 py-2 outline-none focus:border-white/40" />
          </div>
          <div>
            <label className="block mb-2">{t.contact.email} *</label>
            <input required type="email" name="email" placeholder="you@example.com" className="w-full bg-transparent border border-white/20 rounded-md px-3 py-2 outline-none focus:border-white/40" />
          </div>
          <div>
            <label className="block mb-2">{t.contact.message} *</label>
            <textarea required name="message" rows={6} placeholder="How can I help?" className="w-full bg-transparent border border-white/20 rounded-md px-3 py-2 outline-none focus:border-white/40" />
          </div>
          <button className={btn} type="submit">{t.contact.send}</button>
        </form>
      </div>
    </Section>
  );
}

export default function Page() {
  useReveal();
  useEffect(() => { try { validateI18n(); } catch (e) { console.error(e); } }, []);

  const [lang, setLang] = useState<Lang>(getInitialLang());
  const t = useMemo(() => strings[lang], [lang]);
  const toggleLang = () => setLang((p) => (p === "en" ? "it" : "en"));
  useEffect(() => { try { document.cookie = "lang=" + lang + "; path=/; max-age=31536000"; } catch {} }, [lang]);

  return (
    <main className="bg-[#0a0a0a] text-[#fafafa] min-h-screen">
      <style>{`
        html { scroll-behavior: smooth; }
        .reveal { opacity: 0; transform: translateY(16px); transition: opacity .6s ease, transform .6s ease; }
        .reveal.show { opacity: 1; transform: none; }
        .hero-wrap { position: relative; overflow: hidden; }
        .hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .45; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,.2), rgba(0,0,0,.6)); }
      `}</style>

      <Navbar t={t} onToggleLang={toggleLang} />

      <section id="home" className={`${sectionCls} pt-28 hero-wrap`}>
        <video className="hero-video" src="/video/intro.mp4" autoPlay muted loop playsInline poster="/discography/1.jpg" />
        <div className="hero-overlay" />
        <div className={`${container} relative z-10`}>
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <h1 className={`${h1} mb-4`}>{t.hero.title}</h1>
              <p className={`${pTxt} mb-6 max-w-2xl`}>{t.hero.subtitle}</p>
              <div className="flex gap-3">
                <a className={btn} href="#discog">{t.hero.cta1}</a>
                <a className={btn} href="#graphics">{t.hero.cta2}</a>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
                <img src="/discography/1.jpg" alt="hero" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <DiscographyGrid t={t} />

      <Graphics t={t} />

      <Photo t={t} />

      <Writing t={t} />

      <ContactForm t={t} />

      <footer className={`${sectionCls} reveal`}>
        <div className={`${container} text-sm text-neutral-400 flex items-center justify-between`}>
          <span>© {new Date().getFullYear()} Ainz FX</span>
          <span>Built for speed</span>
        </div>
      </footer>
    </main>
  );
}
