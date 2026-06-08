import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import GlassCursor from "./GlassCursor";
import { Footer, MobileTopNav } from "./App";

function isTouchTablet() {
  const hasTouch = navigator.maxTouchPoints > 0 || "ontouchstart" in window;
  return hasTouch && window.innerWidth < 1400;
}

function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint || isTouchTablet());
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < breakpoint || isTouchTablet());
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    mq.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => { mq.removeEventListener("change", update); window.removeEventListener("resize", update); };
  }, [breakpoint]);
  return isMobile;
}

const ease = [0.22, 1, 0.36, 1];

/** Every image/video under public/images/play (flat order: creative-coding → Vid → fashion → graphic-design) */
const creativeCodingVidFolder = [
  "https://vz-53d1011b-a2d.b-cdn.net/0ba899cd-12d5-42f3-92cb-9a57df341a2e/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/aaaad5a7-459f-4123-a543-4c8c122ec616/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/8e0f970f-cb5d-4744-8663-455f824cf9eb/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/4cdf4459-eadf-4888-bfc4-c7d8265f364e/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/cecba5d2-e80d-49a1-af64-7368ee9a7d40/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/55007d68-77b9-4532-97ae-fabf8eeeee5f/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/98cb2b96-23d3-469c-8eb1-dfe24eb6ba13/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/5d73088f-782b-4b36-b078-f7bec1722f9d/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/8b0540ab-755f-4361-a790-4d65613a7f27/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/1d2b441e-9d45-4453-b934-24b3483c64a2/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/a270eeb2-1f2c-4967-bc97-fa7686131d90/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/4cfe2c71-a667-4369-9446-6795518cd39c/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/0c56c399-3878-43da-9a71-64a406215ee4/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/3a773f31-a4fd-4a03-9d3f-a3d5322eeb82/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/691c203a-24b1-4bbe-9743-76e8c5d2b934/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/47b9c008-3c8a-48e7-88e1-a852340e8b10/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/0366523b-427c-4f84-b908-3387dc08974f/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/18c1228a-4c3a-4420-b667-a561a6cadf87/play_1080p.mp4",
];

const fashionImages = [
  "https://queenie-works-images.b-cdn.net/Queenie-11_l2tz1q.jpg",
  "https://queenie-works-images.b-cdn.net/Queenie-15_qlkif2.jpg",
  "https://queenie-works-images.b-cdn.net/Queenie-16_t20ysa.jpg",
  "https://queenie-works-images.b-cdn.net/Queenie-17_iblugt.jpg",
  "https://queenie-works-images.b-cdn.net/Queenie-18_ekox40.jpg",
  "https://queenie-works-images.b-cdn.net/Queenie-19_riuidp.jpg",
  "https://queenie-works-images.b-cdn.net/Queenie-20_cbejv0.jpg",
  "https://queenie-works-images.b-cdn.net/Queenie-21_avosam.jpg",
  "https://queenie-works-images.b-cdn.net/Queenie-4_nujlbw.jpg",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-09-at-4.17.46-PM_ojywvp.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-09-at-4.23.52-PM_cekxvu.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-09-at-5.01.48-PM_bs5eyi.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-09-at-5.01.57-PM_bbwqi5.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-09-at-5.02.09-PM_cixkbv.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-09-at-5.03.08-PM_jsceon.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-09-at-5.03.16-PM_ompnuo.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-09-at-5.03.30-PM_i9o4ox.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-09-at-5.03.39-PM_x20lbz.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-09-at-5.03.54-PM_nfquy7.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-09-at-5.04.04-PM_tktw34.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-09-at-5.04.18-PM_bpb8jp.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-09-at-5.05.05-PM_fbjata.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-09-at-5.05.25-PM_il5jjw.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-09-at-5.05.55-PM_ouunhu.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-09-at-5.06.13-PM_kzgqx4.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-09-at-5.06.34-PM_yozcnt.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-09-at-5.06.48-PM_ftgdas.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-09-at-5.06.56-PM_h4cgvy.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-09-at-5.07.04-PM_kq9xdl.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-09-at-5.07.22-PM_rxdb6z.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-11-at-3.59.41-PM_gsn6yu.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-13-at-3.09.58-PM_bzv3d0.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-17-at-4.19.31-PM_peswut.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-17-at-4.19.42-PM_l1pckp.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-17-at-4.41.51-PM_umdl3j.png",
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-17-at-4.42.07-PM_ib1rxj.png",
  "https://queenie-works-images.b-cdn.net/XDwxKav2yVqvQ7VDBueuNb3ChHM-1_xk1qed.avif",
  "https://queenie-works-images.b-cdn.net/cPUhWtzYlRfwnqOqqeIYhN9Pas-1_arsvuc.avif",
  "https://queenie-works-images.b-cdn.net/zlI1FG63ZYMutiV532ToTlBVD4A-1_ze5bt0.avif",
];

const graphicDesignItems = [
  "https://queenie-works-images.b-cdn.net/23_p3q9ci.png",
  "https://queenie-works-images.b-cdn.net/all-artboard-4_qh8rfz.png",
  "https://vz-53d1011b-a2d.b-cdn.net/a2f582af-90e6-42a5-9568-a8f192f91430/play_1080p.mp4",
  "https://queenie-works-images.b-cdn.net/untitled-4_okpedv.png",
  "https://queenie-works-images.b-cdn.net/ux_lcyddc.png",
  "/images/play/graphic-design/winter-show-poster.png",
];

function galleryItemFromSrc(src, category) {
  const isImage = /\.(png|jpe?g|gif|webp|avif|bmp|svg)$/i.test(src);
  return isImage ? { src, type: "image", category } : { src, category };
}

const PLAY_FILTERS = [
  { id: "all", label: "All" },
  { id: "creative-coding", label: "Creative Coding" },
  { id: "fashion", label: "Fashion Design" },
  { id: "graphic-design", label: "Graphic Design" },
];

/** Loads and plays a video only when it enters the viewport */
function LazyGalleryVideo({ src, darkMode }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.src = src;
          el.load();
          el.play().catch(() => {});
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  return (
    <div style={{ position: "relative", width: "100%", minHeight: 80 }}>
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: darkMode ? "#1a1a1a" : "#e8e8e8",
            minHeight: 80,
          }}
        />
      )}
      <video
        ref={ref}
        className="w-full h-auto block"
        loop
        muted
        playsInline
        preload="none"
        onCanPlay={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }}
      />
    </div>
  );
}

const PILL_STYLE = {
  fontSize: 11,
  fontWeight: 500,
  lineHeight: 1.15,
  letterSpacing: "-0.1px",
  padding: "5px 9px",
  borderRadius: 999,
  color: "#fff",
  backgroundColor: "rgba(0,0,0,0.55)",
  backdropFilter: "blur(6px)",
};

/** Bottom-left overlay: numbered ID badge (for identifying images) + up to two pill tags */
function GalleryOverlay({ id, isMobile = false }) {
  const tags = PLAY_IMAGE_TAGS[id];
  if (!SHOW_ID_BADGES && (!tags || tags.length === 0)) return null;

  // Mobile: stacked vertically with the year above the (longer) title.
  if (isMobile) {
    if (!tags) return null;
    const [title, year] = tags;
    return (
      <motion.div
        className="absolute flex flex-col items-start gap-1 pointer-events-none"
        style={{ left: 8, bottom: 8, zIndex: 2, fontFamily: "'Instrument Sans', sans-serif", maxWidth: "calc(100% - 16px)" }}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.25, ease }}
      >
        {year && <span style={PILL_STYLE}>{year}</span>}
        {title && <span style={PILL_STYLE}>{title}</span>}
      </motion.div>
    );
  }

  return (
    <div
      className="absolute flex items-center gap-1.5 pointer-events-none"
      style={{ left: 10, bottom: 10, zIndex: 2, fontFamily: "'Instrument Sans', sans-serif", flexWrap: "wrap", maxWidth: "calc(100% - 20px)" }}
    >
      {SHOW_ID_BADGES && (
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            lineHeight: 1,
            padding: "4px 7px",
            borderRadius: 999,
            color: "#fff",
            backgroundColor: "rgba(255,0,80,0.92)",
          }}
        >
          #{id}
        </span>
      )}
      {tags &&
        tags.filter(Boolean).map((tag, i) => (
          <span key={i} style={PILL_STYLE}>
            {tag}
          </span>
        ))}
    </div>
  );
}

/** Mobile lightbox: enlarged image/video + caption (description and year on one line), swipeable */
function PlayLightbox({ item, onClose, onNext, onPrev }) {
  const tags = PLAY_IMAGE_TAGS[item.id];
  const [title, year] = tags || [];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const SWIPE_THRESHOLD = 60;
  const handleDragEnd = (_e, info) => {
    if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -400) onNext?.();
    else if (info.offset.x > SWIPE_THRESHOLD || info.velocity.x > 400) onPrev?.();
  };

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ zIndex: 200, backgroundColor: "rgba(0,0,0,0.94)", padding: 20 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute"
        style={{ top: 18, right: 18, width: 34, height: 34, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.12)", color: "#fff", border: "none" }}
        aria-label="Close"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      <motion.div
        className="flex flex-col items-center"
        style={{ maxWidth: "100%", touchAction: "pan-y" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        onDragEnd={handleDragEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          key={item.id}
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease }}
          style={{ maxWidth: "100%" }}
        >
          {item.type === "image" ? (
            <img src={item.src} alt="" draggable={false} style={{ maxWidth: "100%", maxHeight: "72vh", objectFit: "contain", borderRadius: 12, display: "block", pointerEvents: "none" }} />
          ) : (
            <video src={item.src} autoPlay loop muted playsInline style={{ maxWidth: "100%", maxHeight: "72vh", borderRadius: 12, display: "block", pointerEvents: "none" }} />
          )}
          {tags && (
            <div
              className="flex items-baseline justify-center"
              style={{ marginTop: 16, fontFamily: "'Instrument Sans', sans-serif", textAlign: "center", maxWidth: "90vw", flexWrap: "wrap", gap: 8 }}
            >
              {title && <span style={{ color: "#fff", fontSize: 16, fontWeight: 500, letterSpacing: "-0.2px" }}>{title}</span>}
              {year && <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, letterSpacing: "0.02em" }}>{year}</span>}
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

const creativeItems = [
  galleryItemFromSrc("https://vz-53d1011b-a2d.b-cdn.net/07c41375-1a9f-43a5-8391-eb8b2d73b0d9/play_1080p.mp4", "creative-coding"),
  ...creativeCodingVidFolder.map((src) => galleryItemFromSrc(src, "creative-coding")),
];
const fashionItems = fashionImages.map((src) => galleryItemFromSrc(src, "fashion"));
const graphicItems = graphicDesignItems.map((src) => galleryItemFromSrc(src, "graphic-design"));

/** Interleave all categories so they're visually mixed across columns */
function interleaveItems(...arrays) {
  const result = [];
  const maxLen = Math.max(...arrays.map((a) => a.length));
  for (let i = 0; i < maxLen; i++) {
    for (const arr of arrays) {
      if (i < arr.length) result.push(arr[i]);
    }
  }
  return result;
}
const playItems = interleaveItems(creativeItems, fashionItems, graphicItems).map(
  (item, i) => ({ ...item, id: i })
);

/**
 * Two pill tags shown at the bottom-left of each image.
 * Key = image id (the number badge shown on each image).
 * Fill in with: [id]: ["Tag one", "Tag two"],
 */
const PLAY_IMAGE_TAGS = {
  0: ["Experimenting with React Three Fiber", "2026"],
  1: ["Parsons Junior Fashion Design Project", "2022"],
  2: ["UXC NYU Branding Work", "2025"],
  3: ["Swift UI Eye Tracking", "2026"],
  4: ["Parsons Junior Fashion Design Project", "2022"],
  5: ["Color Design Concept", "2024"],
  6: ["News Fact Check Concept Exploration", "2025"],
  7: ["Parsons Junior Fashion Design Project", "2022"],
  8: ["After Effects Motion Design", "2024"],
  9: ["Swift UI Lottery Concept", "2025"],
  10: ["Parsons Junior Fashion Design Project", "2022"],
  11: ["Color Design", "2024"],
  12: ["Swift UI Core Motion App Concept", "2026"],
  13: ["Parsons Junior Fashion Design Project", "2022"],
  14: ["UXC NYU Branding Work", "2025"],
  15: ["Swift UI Concept", "2025"],
  16: ["Parsons Junior Fashion Design Project", "2022"],
  17: ["NYU Winter Show Poster", "2024"],
  18: ["Swift UI Mood Tracking App Concept", "2025"],
  19: ["Parsons Junior Fashion Design Project", "2022"],
  20: ["Pokemon Card Shader Swift UI", "2025"],
  21: ["Parsons Junior Fashion Design Project", "2022"],
  22: ["Gallery Concept", "2025"],
  23: ["Parsons Junior Fashion Design Project", "2022"],
  24: ["Exploration with Liquid Glass", "2025"],
  25: ["Sia Thau Parsons Thesis Project", "2023"],
  26: ["Pomodoro Clock Concept", "2025"],
  27: ["Sia Thau Parsons Thesis Project", "2023"],
  28: ["Exploration with Liquid Glass", "2025"],
  29: ["Sia Thau Parsons Thesis Project", "2023"],
  30: ["Ripple Effect on Swift UI", "2025"],
  31: ["Sia Thau Parsons Thesis Project", "2023"],
  32: ["Ripple Gallery with React", "2025"],
  33: ["Sia Thau Parsons Thesis Project", "2023"],
  34: ["Note App Concept", "2025"],
  35: ["Sia Thau Parsons Thesis Project", "2023"],
  36: ["What Remains... NYU Thesis Exploration", "2026"],
  37: ["Sia Thau Parsons Thesis Project", "2023"],
  38: ["Gallery Concept", "2025"],
  39: ["Sia Thau Parsons Thesis Project", "2023"],
  40: ["What Remains... NYU Thesis Vision Pro Exploration", "2026"],
  41: ["Sia Thau Parsons Thesis Project", "2023"],
  42: ["Motion Design Concept", "2026"],
  43: ["Sia Thau Parsons Thesis Project", "2023"],
  44: ["Sia Thau Parsons Thesis Project", "2023"],
  45: ["Sia Thau Parsons Thesis Project", "2023"],
  46: ["Sia Thau Parsons Thesis Project", "2023"],
  47: ["Sia Thau Parsons Thesis Project", "2023"],
  48: ["Sia Thau Parsons Thesis Project", "2023"],
  49: ["Sia Thau Parsons Thesis Project", "2023"],
  50: ["Sia Thau Parsons Thesis Project", "2023"],
  51: ["Sia Thau Parsons Thesis Project", "2023"],
  52: ["Sia Thau Parsons Thesis Project", "2023"],
  53: ["Sia Thau Parsons Thesis Project", "2023"],
  54: ["Sia Thau Parsons Thesis Project", "2023"],
  55: ["Sia Thau Parsons Thesis Project", "2023"],
  56: ["Sia Thau Parsons Thesis Project", "2023"],
  57: ["Jason Wu Ready-to-Wear", "Spring 2024"],
  58: ["Jason Wu Ready-to-Wear", "Spring 2024"],
  59: ["Private Policy Ready-to-Wear", "Spring 2023"],
  60: ["Private Policy Ready-to-Wear", "Spring 2023"],
  61: ["Jason Wu Ready-to-Wear", "Spring 2024"],
  62: ["Sia Thau Parsons Thesis Project", "2023"],
  63: ["Jason Wu Ready-to-Wear", "Spring 2024"],
};

/** Toggle to show/hide the numbered ID badge used to identify images. */
const SHOW_ID_BADGES = false;

const FORCE_RIGHT_MOBILE = new Set([
  "https://queenie-works-images.b-cdn.net/Screen-Shot-2023-09-09-at-5.02.09-PM_cixkbv.png",
]);

function splitIntoColumns(items, cols) {
  const forced = items.filter((item) => FORCE_RIGHT_MOBILE.has(item.src));
  const rest = items.filter((item) => !FORCE_RIGHT_MOBILE.has(item.src));
  const half = Math.ceil(rest.length / 2);
  const left = rest.slice(0, half);
  const right = [...forced, ...rest.slice(half)];
  return [left, right];
}

/** Hero loop clips from public/images/play/creative-coding/Vid */
const heroVideos = [
  "https://vz-53d1011b-a2d.b-cdn.net/0ba899cd-12d5-42f3-92cb-9a57df341a2e/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/aaaad5a7-459f-4123-a543-4c8c122ec616/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/8e0f970f-cb5d-4744-8663-455f824cf9eb/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/4cdf4459-eadf-4888-bfc4-c7d8265f364e/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/cecba5d2-e80d-49a1-af64-7368ee9a7d40/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/55007d68-77b9-4532-97ae-fabf8eeeee5f/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/98cb2b96-23d3-469c-8eb1-dfe24eb6ba13/play_1080p.mp4",
  "https://vz-53d1011b-a2d.b-cdn.net/5d73088f-782b-4b36-b078-f7bec1722f9d/play_1080p.mp4",
];

const CARD_W = 120;
const CARD_H = 176;
const CARD_W_MOBILE = 60;
const CARD_H_MOBILE = 88;
const RADIUS = 278;
const RADIUS_MOBILE = 130;
const NUM_CARDS = 8;
/** Only this many cards do the upward stack before the full ring forms */
const STACK_NUM = 4;
/** Vertical offset between card centers while stacked (overlap reads like Grove cluster) */
const STACK_STEP = 46;
const STACK_STEP_MOBILE = 24;
/** Bottom card (index 0) sits lowest; stack builds upward */
const STACK_BOTTOM_Y = 240;
const STACK_BOTTOM_Y_MOBILE = 120;

const STACK_DUR = 0.7;
const STACK_DELAY0 = 0.08;
const STACK_STAGGER = 0.1;
const CIRCLE_DUR = 0.9;
const CIRCLE_STAGGER = 0.04;
const PHASE_GAP = 0.15;

function getThumbnail(videoUrl) {
  const match = videoUrl.match(/b-cdn\.net\/([a-f0-9-]+)\//);
  if (match) return `https://vz-53d1011b-a2d.b-cdn.net/${match[1]}/thumbnail.jpg`;
  return undefined;
}

function RectangleVideoCard({ src, index, flipped, phase, isMobile }) {
  const radius = isMobile ? RADIUS_MOBILE : RADIUS;
  const angle = (index / NUM_CARDS) * Math.PI * 2 - Math.PI / 2;
  const xCircle = Math.cos(angle) * radius;
  const yCircle = Math.sin(angle) * radius;
  const w = isMobile ? CARD_W_MOBILE : CARD_W;
  const h = isMobile ? CARD_H_MOBILE : CARD_H;
  const rotationCircle = (angle * 180) / Math.PI + 90;
  const inStack = index < STACK_NUM;
  const stackY = (isMobile ? STACK_BOTTOM_Y_MOBILE : STACK_BOTTOM_Y) - index * (isMobile ? STACK_STEP_MOBILE : STACK_STEP);
  const offScreenY = isMobile ? window.innerHeight * 0.5 : 920;

  const isCircle = phase === "circle";

  return (
    <motion.div
      className="absolute"
      style={{
        width: w,
        height: h,
        left: "50%",
        top: "50%",
        marginLeft: -w / 2,
        marginTop: -h / 2,
      }}
      initial={{ x: 0, y: offScreenY, opacity: 0, scale: 0.6, rotate: 0 }}
      animate={
        isCircle
          ? { x: xCircle, y: yCircle, opacity: 1, scale: 1, rotate: rotationCircle }
          : inStack
            ? { x: 0, y: stackY, opacity: 1, scale: 1, rotate: 0 }
            : { x: 0, y: offScreenY, opacity: 0, scale: 0.6, rotate: 0 }
      }
      transition={
        isCircle
          ? {
              duration: CIRCLE_DUR,
              delay: index * CIRCLE_STAGGER,
              ease: [0.25, 0.1, 0.25, 1],
            }
          : inStack
            ? {
                duration: STACK_DUR,
                delay: STACK_DELAY0 + index * STACK_STAGGER,
                ease: [0.34, 1.2, 0.64, 1],
              }
            : { duration: 0 }
      }
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
        animate={{ scaleX: flipped ? [1, 0, 1] : 1 }}
        transition={flipped ? { duration: 0.5, times: [0, 0.45, 1], ease: [0.22, 1, 0.36, 1] } : { duration: 0.3 }}
      >
        <video
          src={src}
          poster={getThumbnail(src)}
          className="w-full h-full object-cover"
          style={{ display: "block" }}
          preload="metadata"
          autoPlay
          loop
          muted
          playsInline
        />
      </motion.div>
    </motion.div>
  );
}

function PlayCircleHero({ darkMode, onBack, onAnimationDone }) {
  const isMobile = useIsMobile();
  const [flippedIndex, setFlippedIndex] = useState(-1);
  const [settled, setSettled] = useState(false);
  const [phase, setPhase] = useState("stack");
  const flipTimerRef = useRef(null);

  useEffect(() => {
    const stackLastEnd = STACK_DELAY0 + (STACK_NUM - 1) * STACK_STAGGER + STACK_DUR;
    const toCircle = window.setTimeout(() => setPhase("circle"), (stackLastEnd + PHASE_GAP) * 1000);
    return () => window.clearTimeout(toCircle);
  }, []);

  useEffect(() => {
    if (phase !== "circle") return;
    const circleLastEnd = (NUM_CARDS - 1) * CIRCLE_STAGGER + CIRCLE_DUR;
    const spinTimer = window.setTimeout(() => {
      setSettled(true);
      onAnimationDone?.();
    }, (circleLastEnd + 0.08) * 1000);
    return () => window.clearTimeout(spinTimer);
  }, [phase]);

  useEffect(() => {
    if (!settled) return;

    const flipRandom = () => {
      const idx = Math.floor(Math.random() * NUM_CARDS);
      setFlippedIndex(idx);
      setTimeout(() => setFlippedIndex(-1), 600);
    };

    flipTimerRef.current = setInterval(flipRandom, 1900);
    return () => clearInterval(flipTimerRef.current);
  }, [settled]);

  const radius = isMobile ? RADIUS_MOBILE : RADIUS;
  const cardW = isMobile ? CARD_W_MOBILE : CARD_W;
  const cardH = isMobile ? CARD_H_MOBILE : CARD_H;

  return (
    <div
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ height: isMobile ? "60vh" : "100vh" }}
    >
      {!isMobile && (
        <motion.button
          className="absolute flex items-center gap-2 cursor-none z-10"
          style={{ color: darkMode ? "rgba(255,255,255,0.5)" : "#999", top: 40, left: 60 }}
          whileHover={{ color: darkMode ? "white" : "black" }}
          onClick={onBack}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.28, delay: 0.15 }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M10 2L4 8L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-xs uppercase tracking-[0.08em]">Back</span>
        </motion.button>
      )}

      <div
        className="relative"
        style={{
          width: radius * 2 + cardW + 48,
          height: radius * 2 + cardH + 48,
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={settled ? { rotate: 360 } : undefined}
          transition={settled ? { repeat: Infinity, duration: 26, ease: "linear" } : undefined}
        >
          {heroVideos.map((vid, i) => (
            <RectangleVideoCard
              key={vid}
              src={vid}
              index={i}
              flipped={flippedIndex === i}
              phase={phase}
              isMobile={isMobile}
            />
          ))}
        </motion.div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ zIndex: 10 }}
        >
          <motion.h1
            className="font-medium tracking-[-1.5px]"
            style={{
              fontSize: isMobile ? 26 : 52,
              color: darkMode ? "white" : "black",
              fontFamily: "'Instrument Sans', sans-serif",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={settled ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease }}
          >
            Playground
          </motion.h1>
          <motion.span
            className="tracking-[0.02em]"
            style={{
              fontSize: isMobile ? 12 : 15,
              color: darkMode ? "rgba(255,255,255,0.4)" : "#999",
              fontFamily: "'Instrument Sans', sans-serif",
              marginTop: 6,
            }}
            initial={{ opacity: 0 }}
            animate={settled ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
          >
            (2019 - 2026)
          </motion.span>
          <motion.div
            className="flex flex-col items-center gap-1 mt-6 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={settled ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            onClick={() => {
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
            }}
          >
            <span style={{ fontSize: isMobile ? 10 : 12, letterSpacing: "0.1em", color: darkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", fontFamily: "'Instrument Sans', sans-serif" }}>
              Scroll
            </span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", fontSize: isMobile ? 14 : 16 }}
            >
              ↓
            </motion.span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function PlayPage({ darkMode, onBack }) {
  const isMobile = useIsMobile();
  const [heroAnimDone, setHeroAnimDone] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTagId, setActiveTagId] = useState(null);
  const galleryItems =
    activeFilter === "all"
      ? playItems
      : playItems.filter((item) => item.category === activeFilter);
  const activeIndex = activeTagId != null ? galleryItems.findIndex((it) => it.id === activeTagId) : -1;
  const activeItem = activeIndex >= 0 ? galleryItems[activeIndex] : null;
  const goNext = () => {
    if (activeIndex < 0 || galleryItems.length === 0) return;
    setActiveTagId(galleryItems[(activeIndex + 1) % galleryItems.length].id);
  };
  const goPrev = () => {
    if (activeIndex < 0 || galleryItems.length === 0) return;
    setActiveTagId(galleryItems[(activeIndex - 1 + galleryItems.length) % galleryItems.length].id);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="min-h-screen"
      style={{
        backgroundColor: darkMode ? "#0F0F0F" : "#f7f7f7",
        backgroundImage: darkMode
          ? "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)"
          : "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        transition: "background-color 0.2s ease",
      }}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease }}
    >
      {isMobile && <MobileTopNav darkMode={darkMode} onBack={onBack} />}
      <div style={isMobile ? { paddingTop: 57 } : {}}>
        <PlayCircleHero darkMode={darkMode} onBack={onBack} onAnimationDone={() => setHeroAnimDone(true)} />
      </div>

        <motion.div
        className="w-full px-4 sm:px-6 md:px-10 lg:px-[60px] pt-[20px] pb-[20px]"
        initial={isMobile ? { opacity: 0 } : false}
        animate={isMobile ? (heroAnimDone ? { opacity: 1 } : { opacity: 0 }) : { opacity: 1 }}
        transition={{ duration: 0.6, ease }}
      >
        <div
          className="flex items-center mb-5"
          style={{ fontFamily: "'Instrument Sans', sans-serif", flexWrap: isMobile ? "nowrap" : "wrap", gap: isMobile ? 6 : 8 }}
        >
          {PLAY_FILTERS.map(({ id, label }) => {
            const active = activeFilter === id;
            return (
              <button
                key={id}
                onClick={() => setActiveFilter(id)}
                className="rounded-full transition-colors duration-200"
                style={{
                  fontSize: isMobile ? 10.5 : 13,
                  letterSpacing: "-0.2px",
                  whiteSpace: "nowrap",
                  padding: isMobile ? "5px 9px" : "6px 14px",
                  border: `1px solid ${active ? "transparent" : (darkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)")}`,
                  backgroundColor: active
                    ? (darkMode ? "#fff" : "#000")
                    : "transparent",
                  color: active
                    ? (darkMode ? "#000" : "#fff")
                    : (darkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"),
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
        {isMobile ? (
          <motion.div
            className="w-full flex gap-2"
            initial={{ opacity: 0, y: 30 }}
            animate={heroAnimDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            {splitIntoColumns(galleryItems, 2).map((col, ci) => (
              <div key={ci} className="flex-1 flex flex-col gap-2">
                {col.map((item, i) => (
                  <motion.div
                    key={`${item.src}-${ci}-${i}`}
                    className="relative rounded-[12px] overflow-hidden cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.03, ease }}
                    onClick={() => setActiveTagId((prev) => (prev === item.id ? null : item.id))}
                  >
                    {item.type === "image" ? (
                      <img className="w-full h-auto block" src={item.src} alt="" loading="lazy" />
                    ) : (
                      <LazyGalleryVideo src={item.src} darkMode={darkMode} />
                    )}
                  </motion.div>
                ))}
            </div>
            ))}
        </motion.div>
        ) : (
          <motion.div
            className="w-full"
            style={{ columnCount: 3, columnGap: 12 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            {galleryItems.map((item, i) => (
              <motion.div
                key={`${item.src}-${i}`}
                className="relative rounded-[12px] overflow-hidden"
                style={{ breakInside: "avoid", marginBottom: 12 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.03, ease }}
              >
                {item.type === "image" ? (
                  <img className="w-full h-auto block" src={item.src} alt="" loading="lazy" />
                ) : (
                  <video
                    className="w-full h-auto block"
                    src={item.src}
                    autoPlay loop muted playsInline
                  />
                )}
                <GalleryOverlay id={item.id} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      <div className={isMobile ? "px-5" : "px-[60px]"}>
        <Footer darkMode={darkMode} onNavigate={(href) => {
          const id = href.replace("#", "");
          if (id === "play") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
          try { sessionStorage.setItem("portfolio:mobileScrollSection", id); } catch {}
          onBack();
        }} />
      </div>
      <GlassCursor darkMode={darkMode} />

      <AnimatePresence>
        {isMobile && activeItem && (
          <PlayLightbox item={activeItem} onClose={() => setActiveTagId(null)} onNext={goNext} onPrev={goPrev} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
