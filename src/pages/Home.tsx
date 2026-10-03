import { useEffect, useRef, type ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FRAME_COUNT = 150;
const frameSrc = (i: number) =>
  `${import.meta.env.BASE_URL}frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;

/* ---------- small helpers ---------- */

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      if (ref.current) ref.current.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <span ref={ref}>0</span>;
}

const Icon = ({ children }: { children: ReactNode }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const Star = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17l-6.1 3.4 1.5-6.8L2.2 9l6.9-.7z" />
  </svg>
);

const Check = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.5l2.7 2.7L16 9.5" />
  </svg>
);

/* ---------- content ---------- */

type Feature = {
  side: "left" | "right";
  num: string;
  title: [string, string];
  text: string;
  chips: string[];
  button?: string;
  icon: ReactNode;
};

const FEATURES: Feature[] = [
  {
    side: "left",
    num: "01",
    title: ["Instant Disease", "Detection"],
    text: "Upload a photo of a leaf or plant and our AI identifies the disease in seconds, so you can act before it spreads.",
    chips: ["Photo upload", "AI diagnosis", "Instant results"],
    button: "Scan Your Plant",
    icon: (
      <Icon>
        <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" />
        <path d="M12 16c-3 0-4-2-4-4 3 0 4 1 4 4zm0 0c0-3 1-4 4-4 0 2-1 4-4 4z" />
      </Icon>
    ),
  },
  {
    side: "right",
    num: "02",
    title: ["Clear Treatment", "Solutions"],
    text: "Get step-by-step remedies for every diagnosis, from organic fixes to recommended treatments, tailored to your plant.",
    chips: ["Organic remedies", "Step-by-step", "Dosage guide"],
    icon: (
      <Icon>
        <path d="M10.5 20.5a5 5 0 0 1-7-7l7-7a5 5 0 0 1 7 7z" />
        <path d="M8.5 8.5l7 7" />
      </Icon>
    ),
  },
  {
    side: "left",
    num: "03",
    title: ["Plant Health", "Tracking"],
    text: "Follow each plant's recovery and growth over time with scan history and health scores, and get reminders for the next check.",
    chips: ["Scan history", "Health score", "Reminders"],
    icon: (
      <Icon>
        <path d="M3 12h4l3-8 4 16 3-8h4" />
      </Icon>
    ),
  },
  {
    side: "right",
    num: "04",
    title: ["Fertilizer", "Shop"],
    text: "Buy fertilizers and care products matched to your plant's diagnosis, all in one place and delivered to your door.",
    chips: ["Fertilizers", "Plant care", "Home delivery"],
    button: "Go to Store",
    icon: (
      <Icon>
        <path d="M6 7h12l1 13H5z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </Icon>
    ),
  },
];

const REVIEWS = [
  {
    name: "Elena Rostova",
    role: "Houseplant Collector (80+ plants)",
    quote:
      "I uploaded a photo of my Fiddle Leaf Fig’s brown spots and had a diagnosis in seconds. The treatment steps were easy to follow, and new leaves appeared within three weeks.",
  },
  {
    name: "Marcus Vance",
    role: "Rare Aroid Enthusiast",
    quote:
      "The health tracker lets me compare scans week by week. I caught early root rot on my Thai Constellation and saved it before it spread. It’s now part of my routine.",
  },
  {
    name: "Sarah Jenkins",
    role: "Interior Landscape Designer",
    quote:
      "The store suggested the exact fertilizer for my calatheas’ diagnosis, so there was no guesswork. They’re finally lush and the crispy edges are gone.",
  },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap');
.sp-root{font-family:'Space Grotesk',system-ui,-apple-system,'Segoe UI',sans-serif;background:#000;color:#fff;color-scheme:dark}
.font-head{font-family:'Fraunces',Georgia,'Times New Roman',serif;letter-spacing:-.01em}
.glass{border-radius:1.5rem;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);
  -webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);box-shadow:inset 0 1px 0 rgba(255,255,255,.1);
  transition:transform .3s ease,border-color .3s ease}
.glass:hover{transform:translateY(-4px);border-color:rgba(255,255,255,.32)}
.glass.glass-flat:hover{transform:none;border-color:rgba(255,255,255,.15)}
`;

/* ---------- page ---------- */

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll-driven frame animation (fixed size, no zoom)
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const VA = 0.2; // vertical position: 0 = top edge shown, 1 = bottom edge shown
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const imgs: HTMLImageElement[] = [];
    let W = 0, H = 0, target = 0, cur = 0, last = 0;
    let running = false, ready = false, raf = 0, lastW = window.innerWidth;

    const progress = () => {
      const el = contentRef.current;
      const end = el
        ? el.getBoundingClientRect().bottom + window.scrollY // bottom of the reviews section
        : document.documentElement.scrollHeight;
      const max = end - window.innerHeight;
      return max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    };
    const ok = (i: number) => !!imgs[i] && imgs[i].complete && imgs[i].naturalWidth > 0;
    const nearest = (i: number) => {
      for (let k = i; k >= 0; k--) if (ok(k)) return k;
      for (let k = i; k < FRAME_COUNT; k++) if (ok(k)) return k;
      return -1;
    };

    const put = (i: number, alpha: number) => {
      const k = nearest(i);
      if (k < 0) return;
      const im = imgs[k];
      const iw = im.naturalWidth, ih = im.naturalHeight;
      const s = Math.max(W / iw, H / ih);
      const w = iw * s, h = ih * s;
      ctx.globalAlpha = alpha;
      ctx.drawImage(im, (W - w) / 2, (H - h) * VA, w, h);
    };

    const draw = (p: number) => {
      if (!W) return;
      const f = p * (FRAME_COUNT - 1);
      const i = Math.floor(f);
      const t = f - i;
      put(i, 1);
      if (t > 0.01 && i + 1 < FRAME_COUNT) put(i + 1, t); // blend neighbours for extra smoothness
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.width = Math.round(cv.clientWidth * dpr);
      H = cv.height = Math.round(cv.clientHeight * dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      draw(cur);
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000 || 0.016, 0.05);
      last = now;
      target = progress();
      cur += (target - cur) * (reduce ? 1 : 1 - Math.exp(-dt * 7));
      if (Math.abs(target - cur) < 0.00005) cur = target;
      draw(cur);
      if (cur !== target) raf = requestAnimationFrame(loop);
      else running = false;
    };
    const kick = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const onResize = () => {
      if (window.innerWidth === lastW) return; // ignore phone address-bar height changes
      lastW = window.innerWidth;
      resize();
      kick();
    };

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize);

    for (let i = 0; i < FRAME_COUNT; i++) {
      const im = new Image();
      im.decoding = "async";
      im.onload = () => {
        im.decode?.().catch(() => { });
        if (!ready && i === 0) {
          ready = true;
          cur = target = progress();
          resize();
          cv.style.opacity = "1";
        } else if (ready) {
          draw(cur);
        }
      };
      im.src = frameSrc(i);
      imgs.push(im);
    }
    resize();

    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="sp-root relative">
      <Navbar />

      <style>{CSS}</style>

      {/* Background animation + readability tint */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, width: "100%", height: "100lvh", zIndex: 0, opacity: 0, transition: "opacity .8s ease" }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "linear-gradient(to bottom,rgba(0,0,0,.45),rgba(0,0,0,.2) 45%,rgba(0,0,0,.5))",
        }}
      />

      {/* Hero */}
      <div ref={contentRef}>
        <section className="relative z-10 min-h-[100svh] overflow-hidden text-white">
          <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col px-5 pb-8 pt-5 md:flex-row md:items-end md:justify-between md:px-10 md:py-10">
            <div className="contents md:mb-36 md:block md:max-w-2xl">
              <div>
                <h1 className="font-head text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
                  Detect Plant Disease<br />Before It Spreads
                </h1>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70 md:mt-5">
                  Upload a photo of your plant and get an instant diagnosis, a clear treatment plan, and ongoing health tracking, with a fertilizer shop for everything it needs.
                </p>
              </div>

              {/* empty middle on phones so the background stays clear */}
              <div className="min-h-[36svh] flex-1 md:hidden" aria-hidden="true" />

              <a
                href="#"
                className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#42d369] px-6 py-3 text-sm font-semibold text-black transition hover:bg-lime-200 md:mb-0 md:mt-7"
              >
                Scan Your Plant
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4 14h6l-1 8 9-12h-6z" /></svg>
              </a>
            </div>

            <div className="w-full space-y-3 md:w-[420px]">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-4 text-center md:p-5">
                  <div className="text-3xl font-bold md:text-4xl"><CountUp to={95} />%</div>
                  <div className="mt-1 text-xs text-white/70">Detection<br />Accuracy</div>
                </div>
                <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-4 text-center md:p-5">
                  <div className="text-3xl font-bold md:text-4xl"><CountUp to={40} />%</div>
                  <div className="mt-1 text-xs text-white/70">Faster<br />Plant Recovery</div>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-full border border-white/15 bg-white/[0.04] px-4 py-3">
                <div className="flex -space-x-2">
                  <span className="h-9 w-9 rounded-full border-2 border-black bg-neutral-300" />
                  <span className="h-9 w-9 rounded-full border-2 border-black bg-neutral-500" />
                  <span className="h-9 w-9 rounded-full border-2 border-black bg-neutral-400" />
                  <span className="h-9 w-9 rounded-full border-2 border-black bg-neutral-600" />
                </div>
                <div>
                  <div className="flex gap-0.5 text-yellow-300" aria-label="5 stars">
                    {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                  </div>
                  <div className="text-sm font-medium">10K+ Happy Growers</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature cards (alternating left / right) */}
        <section className="relative z-10 overflow-hidden px-5 py-12 text-white md:px-10 md:py-20">
          <div className="relative mx-auto flex max-w-7xl flex-col gap-12 md:gap-20">
            {FEATURES.map((f) => (
              <article
                key={f.num}
                className={`${f.side === "left" ? "mr-auto" : "ml-auto"} w-full sm:w-[70%] md:w-[40%] md:max-w-lg`}
              >
                <h3 className="font-head text-3xl font-bold leading-[1.08] sm:text-4xl lg:text-[2.75rem] xl:text-5xl">
                  {f.title[0]}<br />{f.title[1]}
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-white/80 sm:text-base">{f.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {f.chips.map((c) => (
                    <span key={c} className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/85">{c}</span>
                  ))}
                </div>
                {f.button && (
                  <a
                    href="#"
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#42d369] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-lime-200"
                  >
                    {f.button} <Arrow />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Testimonials (one glass card) */}
        <section className="relative z-10 px-5 pb-5 text-white md:px-10 md:pb-6">
          <div className="glass glass-flat mx-auto max-w-6xl p-6 sm:p-8 md:p-12">
            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-l[#42d369]">Verified Cultivators</p>
              <h2 className="font-head mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">Trusted by Plant Lovers</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/70">
                Real results from collectors, conservatory growers, and domestic enthusiasts.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-3">
              {REVIEWS.map((r) => (
                <figure key={r.name} className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <div>
                    <div className="flex gap-0.5 text-[#42d369]" aria-label="5 stars">
                      {[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}
                    </div>
                    <blockquote className="mt-4 text-sm italic leading-relaxed text-white/85">“{r.quote}”</blockquote>
                  </div>
                  <figcaption className="mt-5 flex items-end justify-between gap-3 border-t border-white/10 pt-4">
                    <div>
                      <div className="text-sm font-semibold">{r.name}</div>
                      <div className="text-xs text-white/60">{r.role}</div>
                    </div>
                    <span className="flex shrink-0 items-center gap-1 text-xs text-[#42d369]"><Check /> Verified</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </div>
      {/* ↑ the animation ends here */}

      <div className="relative z-10 bg-black">
        <Footer />
      </div>
    </div>



  );
}
