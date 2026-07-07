import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Button } from "@/component/ui/button";
import {
  Sparkles, PenLine, BookOpen, Users, Share2, Wand2,
  ArrowRight, Quote, Feather, Github, Twitter, Mail,
} from "lucide-react";

/* ── brand ── */
const BRAND = "dz-story";
const LOGO = "/Story-Website/logo.svg"; // matches Navbar + Vite base path

/* ── motion helpers (respect reduced-motion; declared per-component) ── */
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/* Small serif eyebrow used to label sections. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-orange-1">
      <span className="h-px w-6 bg-orange-1/60" />
      {children}
    </span>
  );
}

const GENRES = [
  "Fantasy", "Science Fiction", "Romance", "Mystery", "Adventure",
  "Horror", "Historical", "Poetry", "Folk Tales", "Thriller",
];

const FEATURES = [
  { icon: Wand2, title: "Draft with AI", desc: "Give a prompt and let Gemini spin a full first draft in seconds — genre, tone and characters, your call." },
  { icon: PenLine, title: "A calm place to write", desc: "A distraction-free editor with rich formatting, so the words come easily and the page stays out of your way." },
  { icon: BookOpen, title: "Read & discover", desc: "Browse stories by genre, follow writers you love, and never lose your place in a good tale." },
  { icon: Share2, title: "Share anywhere", desc: "Publish to your profile and share a link — your readers are one tap away from the next chapter." },
];

const STEPS = [
  { icon: Sparkles, title: "Pick a genre", desc: "Fantasy, sci-fi, romance — or invent your own." },
  { icon: Feather, title: "Add your idea", desc: "A sentence or a paragraph. A spark is enough." },
  { icon: Wand2, title: "Generate a draft", desc: "Get a complete, editable story instantly." },
  { icon: PenLine, title: "Edit & publish", desc: "Make it yours, then share it with the world." },
];

const Landing = () => {
  const reduce = useReducedMotion();
  const marqueeRef = useRef<HTMLDivElement>(null);

  // When reduced-motion is on, reveals appear immediately (no transform).
  const revealProps = reduce
    ? {}
    : {
        variants: rise,
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, margin: "-80px" },
      };

  return (
    <div className="min-h-screen bg-white-4 font-sans text-black-2 antialiased">
      {/* ─────────── Header ─────────── */}
      <header className="sticky top-0 z-40 border-b border-black-2/5 bg-white-4/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={LOGO} width={30} height={30} alt="" />
            <span className="font-display text-xl font-semibold tracking-tight text-black-1">{BRAND}</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-black-2/70 md:flex">
            <a href="#features" className="transition-colors hover:text-black-1">Features</a>
            <a href="#how" className="transition-colors hover:text-black-1">How it works</a>
            <Link to="/browse" className="transition-colors hover:text-black-1">Browse</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="text-black-2 hover:bg-orange-2">
              <Link to="/signin">Sign in</Link>
            </Button>
            <Button asChild size="sm" className="bg-orange-1 text-white-1 hover:bg-orange-1/90">
              <Link to="/signin">Start writing</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ─────────── Hero ─────────── */}
      <section className="relative overflow-hidden">
        {/* soft purple glow */}
        <div aria-hidden className="pointer-events-none absolute -top-32 right-0 h-[480px] w-[480px] rounded-full bg-orange-1/20 blur-[120px]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <motion.div
            initial={reduce ? undefined : "hidden"}
            animate={reduce ? undefined : "show"}
            variants={stagger}
          >
            <motion.div variants={reduce ? undefined : rise}>
              <Eyebrow>Write · Read · Share</Eyebrow>
            </motion.div>
            <motion.h1
              variants={reduce ? undefined : rise}
              className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-black-1 md:text-6xl"
            >
              Where your next
              <span className="relative whitespace-nowrap text-orange-1"> story </span>
              begins.
            </motion.h1>
            <motion.p variants={reduce ? undefined : rise} className="mt-6 max-w-md text-lg leading-relaxed text-black-2/70">
              Turn a single idea into a finished story with AI, refine it in a calm editor,
              and share it with readers who love the same worlds you do.
            </motion.p>
            <motion.div variants={reduce ? undefined : rise} className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-orange-1 text-white-1 hover:bg-orange-1/90">
                <Link to="/signin">Start writing free <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-black-2/15 bg-transparent hover:bg-white-1">
                <Link to="/browse">Browse stories</Link>
              </Button>
            </motion.div>
            <motion.p variants={reduce ? undefined : rise} className="mt-6 text-sm text-black-2/50">
              No credit card. Your first draft is a prompt away.
            </motion.p>
          </motion.div>

          {/* Signature visual: a writing card with a live typewriter line */}
          <HeroVisual reduce={!!reduce} />
        </div>

        {/* Genre marquee */}
        <div className="relative border-y border-black-2/5 bg-white-1/60 py-4" ref={marqueeRef}>
          <div className={`flex w-max gap-8 whitespace-nowrap px-4 ${reduce ? "" : "animate-[marquee_36s_linear_infinite]"}`}>
            {[...GENRES, ...GENRES].map((g, i) => (
              <span key={i} className="flex items-center gap-8 text-sm font-medium text-black-2/50">
                {g} <span className="text-orange-1">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Features ─────────── */}
      <section id="features" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
        <motion.div {...revealProps} className="max-w-2xl">
          <Eyebrow>Everything a storyteller needs</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-black-1">
            From a spark to a shared story.
          </h2>
          <p className="mt-4 text-lg text-black-2/70">
            {BRAND} handles the blank-page problem so you can focus on the part that matters — the telling.
          </p>
        </motion.div>

        <motion.div
          variants={reduce ? undefined : stagger}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={reduce ? undefined : rise}
              className="group rounded-2xl border border-black-2/8 bg-white-1 p-6 transition-all hover:-translate-y-1 hover:border-orange-1/40 hover:shadow-[0_12px_40px_-12px_rgba(130,102,201,0.35)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-2 text-orange-1 transition-colors group-hover:bg-orange-1 group-hover:text-white-1">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-black-1">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-black-2/65">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─────────── How it works ─────────── */}
      <section id="how" className="border-y border-black-2/5 bg-white-3">
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-8">
          <motion.div {...revealProps} className="max-w-2xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-black-1">
              Four steps. One story.
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-5 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                {...revealProps}
                transition={reduce ? undefined : { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl bg-white-1 p-6"
              >
                <span className="absolute right-5 top-5 font-display text-3xl font-semibold text-orange-1/25">
                  0{i + 1}
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-1 text-white-1">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-black-1">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black-2/65">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Editorial quote band ─────────── */}
      <section className="mx-auto max-w-4xl px-5 py-24 text-center md:px-8">
        <motion.div {...revealProps}>
          <Quote className="mx-auto h-8 w-8 text-orange-1/50" />
          <p className="mt-6 font-display text-3xl font-medium leading-snug text-black-1 md:text-4xl">
            “Everyone has a story in them. {BRAND} just hands you the pen — and helps you fill the first page.”
          </p>
        </motion.div>
      </section>

      {/* ─────────── Final CTA ─────────── */}
      <section className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <motion.div
          {...revealProps}
          className="relative overflow-hidden rounded-3xl bg-black-1 px-8 py-16 text-center md:py-20"
        >
          <div aria-hidden className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-orange-1/40 blur-[100px]" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-4xl font-semibold tracking-tight text-white-1 md:text-5xl">
              Start telling your story today.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white-1/70">
              Your imagination, a finished draft in minutes, and readers waiting to turn the page.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-orange-1 text-white-1 hover:bg-orange-1/90">
                <Link to="/signin">Get started for free <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white-1/25 bg-transparent text-white-1 hover:bg-white-1/10 hover:text-white-1">
                <Link to="/browse">Read a story first</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─────────── Footer ─────────── */}
      <footer className="border-t border-black-2/8 bg-white-4">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
          <div>
            <div className="flex items-center gap-2.5">
              <img src={LOGO} width={26} height={26} alt="" />
              <span className="font-display text-lg font-semibold text-black-1">{BRAND}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-black-2/60">
              An AI-assisted home for writing, reading and sharing stories.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-black-1">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-black-2/65">
              <li><a href="#features" className="transition-colors hover:text-orange-1">Features</a></li>
              <li><a href="#how" className="transition-colors hover:text-orange-1">How it works</a></li>
              <li><Link to="/browse" className="transition-colors hover:text-orange-1">Browse stories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-black-1">Connect</h4>
            <div className="mt-4 flex gap-3">
              {[Github, Twitter, Mail].map((Icon, i) => (
                <a key={i} href="#" aria-label="social link"
                   className="flex h-9 w-9 items-center justify-center rounded-full border border-black-2/10 text-black-2/60 transition-colors hover:border-orange-1 hover:text-orange-1">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-black-2/8 py-6 text-center text-sm text-black-2/50">
          © {new Date().getFullYear()} {BRAND}. Written with imagination.
        </div>
      </footer>
    </div>
  );
};

/* ── Hero signature visual: a manuscript card with a live typewriter line ── */
function HeroVisual({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, scale: 0.96, y: 20 }}
      animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="relative mx-auto w-full max-w-sm"
    >
      {/* back card */}
      <div className="absolute -right-4 -top-4 h-full w-full rotate-3 rounded-2xl border border-black-2/8 bg-orange-2" />
      {/* main manuscript card */}
      <div className="relative rounded-2xl border border-black-2/10 bg-white-1 p-7 shadow-[0_24px_70px_-24px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-2 text-xs font-medium text-orange-1">
          <Sparkles className="h-3.5 w-3.5" /> AI DRAFT · FANTASY
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold leading-snug text-black-1">
          The Lantern Keeper
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-black-2/70">
          Once upon a time, in a city that forgot how to sleep,
          a girl lit lanterns for travellers who had lost their way
          <span className={`ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-orange-1 ${reduce ? "" : "animate-[blink_1s_step-end_infinite]"}`} />
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-black-2/8 pt-4">
          <div className="flex items-center gap-2 text-xs text-black-2/50">
            <Users className="h-3.5 w-3.5" /> 2.4k readers
          </div>
          <span className="rounded-full bg-orange-2 px-3 py-1 text-xs font-medium text-orange-1">Draft ready</span>
        </div>
      </div>
    </motion.div>
  );
}

export default Landing;
