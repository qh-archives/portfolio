import { motion } from "framer-motion";
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
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145379/track_lscvkf.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145370/2_ofieiu.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145369/3_pwkyji.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145369/5_rrdttw.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145369/6_mc7xue.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145368/7_jpicnc.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145368/8_eg3gps.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145377/9_fhfxw8.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145376/10_iwrmro.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145375/11_mxznsj.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145375/12_zf6ihe.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145379/13_v7k9yo.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145374/14_lph1c8.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145372/16_ohcl1b.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145375/17_aoumzl.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145375/12_zf6ihe.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145371/19_znhiyb.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145379/track_lscvkf.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145366/Test_oh08am.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145379/track_lscvkf.mp4",
];

const fashionImages = [
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150816/Queenie-11_l2tz1q.jpg",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150815/Queenie-15_qlkif2.jpg",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150815/Queenie-16_t20ysa.jpg",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150815/Queenie-17_iblugt.jpg",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150817/Queenie-18_ekox40.jpg",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150817/Queenie-19_riuidp.jpg",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150816/Queenie-20_cbejv0.jpg",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150817/Queenie-21_avosam.jpg",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150816/Queenie-4_nujlbw.jpg",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150815/Screen-Shot-2023-09-09-at-4.17.46-PM_ojywvp.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150816/Screen-Shot-2023-09-09-at-4.23.52-PM_cekxvu.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150818/Screen-Shot-2023-09-09-at-5.01.48-PM_bs5eyi.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150816/Screen-Shot-2023-09-09-at-5.01.57-PM_bbwqi5.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150816/Screen-Shot-2023-09-09-at-5.02.09-PM_cixkbv.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150817/Screen-Shot-2023-09-09-at-5.03.08-PM_jsceon.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150818/Screen-Shot-2023-09-09-at-5.03.16-PM_ompnuo.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150816/Screen-Shot-2023-09-09-at-5.03.30-PM_i9o4ox.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150816/Screen-Shot-2023-09-09-at-5.03.39-PM_x20lbz.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150815/Screen-Shot-2023-09-09-at-5.03.54-PM_nfquy7.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150818/Screen-Shot-2023-09-09-at-5.04.04-PM_tktw34.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150818/Screen-Shot-2023-09-09-at-5.04.18-PM_bpb8jp.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150814/Screen-Shot-2023-09-09-at-5.05.05-PM_fbjata.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150816/Screen-Shot-2023-09-09-at-5.05.25-PM_il5jjw.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150818/Screen-Shot-2023-09-09-at-5.05.55-PM_ouunhu.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150817/Screen-Shot-2023-09-09-at-5.06.13-PM_kzgqx4.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150814/Screen-Shot-2023-09-09-at-5.06.34-PM_yozcnt.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150817/Screen-Shot-2023-09-09-at-5.06.48-PM_ftgdas.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150817/Screen-Shot-2023-09-09-at-5.06.56-PM_h4cgvy.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150815/Screen-Shot-2023-09-09-at-5.07.04-PM_kq9xdl.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150815/Screen-Shot-2023-09-09-at-5.07.22-PM_rxdb6z.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150818/Screen-Shot-2023-09-11-at-3.59.41-PM_gsn6yu.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150816/Screen-Shot-2023-09-13-at-3.09.58-PM_bzv3d0.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150817/Screen-Shot-2023-09-17-at-4.19.31-PM_peswut.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150817/Screen-Shot-2023-09-17-at-4.19.42-PM_l1pckp.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150818/Screen-Shot-2023-09-17-at-4.41.51-PM_umdl3j.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150817/Screen-Shot-2023-09-17-at-4.42.07-PM_ib1rxj.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150815/XDwxKav2yVqvQ7VDBueuNb3ChHM-1_xk1qed.avif",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150818/cPUhWtzYlRfwnqOqqeIYhN9Pas-1_arsvuc.avif",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775150816/zlI1FG63ZYMutiV532ToTlBVD4A-1_ze5bt0.avif",
];

const graphicDesignItems = [
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775151167/23_p3q9ci.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775151167/all-artboard-4_qh8rfz.png",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775151168/comp-1_sotpdc.mp4",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775151168/untitled-4_okpedv.png",
  "https://res.cloudinary.com/dugdaifzh/image/upload/v1775151169/ux_lcyddc.png",
  "/images/play/graphic-design/winter-show-poster.png",
];

function galleryItemFromSrc(src) {
  const isImage = /\.(png|jpe?g|gif|webp|avif|bmp|svg)$/i.test(src);
  return isImage ? { src, type: "image" } : { src };
}

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

const creativeItems = [
  galleryItemFromSrc("https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775146692/1_vty7jm.mp4"),
  ...creativeCodingVidFolder.map(galleryItemFromSrc),
];
const fashionItems = fashionImages.map(galleryItemFromSrc);
const graphicItems = graphicDesignItems.map(galleryItemFromSrc);

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
const playItems = interleaveItems(creativeItems, fashionItems, graphicItems);

/** Hero loop clips from public/images/play/creative-coding/Vid */
const heroVideos = [
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145379/track_lscvkf.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145370/2_ofieiu.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145369/3_pwkyji.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145369/5_rrdttw.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145369/6_mc7xue.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145368/7_jpicnc.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145368/8_eg3gps.mp4",
  "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145377/9_fhfxw8.mp4",
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

const STACK_DUR = 0.52;
const STACK_DELAY0 = 0.06;
const STACK_STAGGER = 0.07;
const CIRCLE_DUR = 0.62;
const CIRCLE_STAGGER = 0.022;
const PHASE_GAP = 0.1;

function getThumbnail(videoUrl) {
  return videoUrl.replace("/video/upload/q_auto,f_auto/", "/video/upload/so_0,w_240,c_fill/").replace(/\.mp4$/, ".png");
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
  const offScreenY = isMobile ? window.innerHeight * 0.4 : 920;

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
      initial={{ x: 0, y: offScreenY, opacity: 0, scale: 0.5, rotate: 0 }}
      animate={
        isCircle
          ? { x: xCircle, y: yCircle, opacity: 1, scale: 1, rotate: rotationCircle }
          : inStack
            ? { x: 0, y: stackY, opacity: 1, scale: 1, rotate: 0 }
            : { x: 0, y: offScreenY, opacity: 0, scale: 0.5, rotate: 0 }
      }
      transition={
        isCircle
          ? {
              duration: CIRCLE_DUR,
              delay: index * CIRCLE_STAGGER,
              ease: [0.22, 1, 0.36, 1],
            }
          : inStack
            ? {
                duration: STACK_DUR,
                delay: STACK_DELAY0 + index * STACK_STAGGER,
                ease: [0.16, 1, 0.3, 1],
              }
            : { duration: 0 }
      }
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transformOrigin: "center center",
          perspective: 900,
        }}
      >
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            borderRadius: 0,
            overflow: "hidden",
          }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <video
              src={src}
              poster={getThumbnail(src)}
              className="w-full h-full object-cover"
              style={{ display: "block" }}
              preload="auto"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <video
              src={src}
              className="w-full h-full object-cover"
              style={{ display: "block", filter: "hue-rotate(28deg) saturate(1.15) contrast(1.05)" }}
              preload="none"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </motion.div>
      </div>
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.12, ease }}
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
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.28, ease }}
          >
            (2019 - 2026)
          </motion.span>
          <motion.div
            className="flex flex-col items-center gap-1 mt-6 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5, ease }}
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
  const galleryItems = playItems;
  const [heroAnimDone, setHeroAnimDone] = useState(false);

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
        <motion.div
          className="w-full"
          style={{ columnCount: isMobile ? 2 : 3, columnGap: isMobile ? 8 : 12 }}
            initial={{ opacity: 0, y: 30 }}
            animate={(!isMobile || heroAnimDone) ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
          {galleryItems.map((item, i) => (
              <motion.div
              key={`${item.src}-${i}`}
                className="rounded-[12px] overflow-hidden"
                style={{ breakInside: "avoid", marginBottom: 12 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.03, ease }}
              >
                {item.type === "image" ? (
                  <img
                    className="w-full h-auto block"
                    src={item.src}
                    alt=""
                    loading="lazy"
                  />
              ) : isMobile ? (
                <LazyGalleryVideo src={item.src} darkMode={darkMode} />
                ) : (
                  <video
                    className="w-full h-auto block"
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
      </motion.div>

      <div className={isMobile ? "px-5" : "px-[60px]"}>
        <Footer darkMode={darkMode} />
      </div>
      <GlassCursor darkMode={darkMode} />
    </motion.div>
  );
}
