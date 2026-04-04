import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import GlassCursor from "./GlassCursor";
import { Footer, MobileTopNav } from "./App";


function isTouchTablet() {
  const hasTouch = navigator.maxTouchPoints > 0 || "ontouchstart" in window;
  return hasTouch && window.innerWidth < 1400;
}

function useIsMobile(bp = 1024) {
  const [v, setV] = useState(() => window.innerWidth < bp || isTouchTablet());
  useEffect(() => {
    const update = () => setV(window.innerWidth < bp || isTouchTablet());
    const mq = window.matchMedia(`(max-width: ${bp - 1}px)`);
    const h = (e) => update();
    mq.addEventListener("change", h);
    window.addEventListener("resize", update);
    return () => { mq.removeEventListener("change", h); window.removeEventListener("resize", update); };
  }, [bp]);
  return v;
}


const ease = [0.22, 1, 0.36, 1];
const CASE_STUDY_PASSWORD = "secret123";

function PasswordGate({ darkMode, onUnlock, isMobile }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === CASE_STUDY_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  const borderColor = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const mutedText = darkMode ? "rgba(255,255,255,0.4)" : "#999";

  return (
    <div
      className="w-full rounded-[12px] flex flex-col items-center justify-center text-center gap-6"
      style={{
        minHeight: isMobile ? 320 : 480,
        backgroundColor: darkMode ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.018)",
        border: `1px solid ${borderColor}`,
        padding: isMobile ? "48px 24px" : "80px 60px",
        fontFamily: "'Instrument Sans', sans-serif",
      }}
    >
      <div
        className="rounded-full flex items-center justify-center"
        style={{
          width: isMobile ? 56 : 64,
          height: isMobile ? 56 : 64,
          backgroundColor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
          border: `1px solid ${borderColor}`,
        }}
      >
        <svg width={isMobile ? 20 : 24} height={isMobile ? 20 : 24} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="11" width="18" height="11" rx="2" stroke={mutedText} strokeWidth="1.5" />
          <path d="M7 11V7C7 4.24 9.24 2 12 2C14.76 2 17 4.24 17 7V11" stroke={mutedText} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      </div>

      <div className="flex flex-col gap-3">
        <h3
          style={{
            fontSize: isMobile ? 22 : 24,
            fontWeight: 500,
            letterSpacing: "-0.44px",
            color: darkMode ? "white" : "black",
          }}
        >
          This work is confidential
      </h3>
      <p
          style={{
            fontSize: isMobile ? 16 : 16,
            letterSpacing: "-0.2px",
            lineHeight: 1.6,
            color: mutedText,
          }}
        >
          Please{" "}
          <a
            href="mailto:queenie2000824@gmail.com"
            className="transition-opacity duration-200 active:opacity-60"
            style={{ color: darkMode ? "white" : "black", textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            email me
          </a>{" "}
          or enter the password below to view the full case study.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3 mt-2 w-full justify-center" style={{ maxWidth: isMobile ? "100%" : 380 }}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="flex-1 rounded-full outline-none text-center"
          style={{
            fontSize: isMobile ? 16 : 14,
            padding: isMobile ? "14px 16px" : "12px 16px",
            backgroundColor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
            border: error ? "1.5px solid #ff4444" : `1.5px solid ${borderColor}`,
            color: darkMode ? "white" : "black",
            fontFamily: "'Instrument Sans', sans-serif",
          }}
        />
        <button
          type="submit"
          className="rounded-full font-medium transition-all duration-200 active:opacity-70"
          style={{
            fontSize: isMobile ? 16 : 14,
            padding: isMobile ? "14px 24px" : "12px 24px",
            backgroundColor: darkMode ? "white" : "black",
            color: darkMode ? "black" : "white",
            fontFamily: "'Instrument Sans', sans-serif",
          }}
        >
          Submit
        </button>
      </form>
      {error && (
        <p style={{ fontSize: 13, marginTop: 4, color: "#ff4444" }}>
          Incorrect password. Please try again.
        </p>
      )}
    </div>
  );
}

function VideoEmbedSection({ section, darkMode }) {
  return (
    <div className="flex flex-col gap-10">
      {section.heading && (
        <h3
          className="text-xs font-medium uppercase tracking-[0.1em] leading-[1.3]"
          style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999" }}
        >
          {section.heading}
        </h3>
      )}
      <div className="w-full rounded-[16px] overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
        <iframe
          src={section.url}
          title={section.heading || "Video"}
          className="w-full h-full"
          style={{ border: "none" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

function TryItSection({ section, darkMode }) {
  return (
    <div className="flex flex-col gap-6">
      {section.heading && (
        <h3
          className="text-xs font-medium uppercase tracking-[0.1em] leading-[1.3]"
          style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999" }}
        >
          {section.heading}
        </h3>
      )}
      <a
        href={section.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full rounded-[12px] py-20 px-12 flex flex-col items-center justify-center gap-4 cursor-none transition-all duration-300"
        style={{
          backgroundColor: "#f8a4c8",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#f490bb";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#f8a4c8";
        }}
      >
        <div className="flex items-center gap-4">
          <h2
            className="text-4xl font-medium tracking-[-0.8px]"
            style={{ color: "black" }}
          >
            {section.label}
          </h2>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ marginTop: 4 }}>
            <path
              d="M7 17L17 7M17 7H8M17 7V16"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </a>
    </div>
  );
}

function getTimelineLabels(sections, unlocked) {
  return sections
    .filter((s) => s.type !== "hero" && !s.timelineHidden && (unlocked || !s.locked))
    .map((s) => {
      if (s.type === "safeguards") return "Safeguards";
      if (s.heading) return s.heading;
      if (s.leftHeading) return s.leftHeading;
      if (s.type === "image") return "Image";
      if (s.type === "polaroid-spread") return "Gallery";
      if (s.type === "columns") return s.heading || "Details";
      if (s.type === "two-column-video") return s.leftHeading || "Solution";
      if (s.type === "framework-cards") return s.heading || "Framework";
      if (s.type === "concept-collage") return s.heading || "Concepts";
      if (s.type === "reflection") return s.heading || "Reflection";
      if (s.type === "split") return "Details";
      return "Section";
    });
}

function getNonHeroIndices(sections, unlocked) {
  return sections.reduce((acc, s, i) => {
    if (s.type !== "hero" && !s.timelineHidden && (unlocked || !s.locked)) acc.push(i);
    return acc;
  }, []);
}

function Timeline({ labels, activeIndex, onClickItem, darkMode }) {
  return (
    <div className="flex flex-col gap-0" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
      {labels.map((label, i) => {
        const isActive = i === activeIndex;
        return (
          <div key={i} className="flex flex-col">
            <button
              onClick={() => onClickItem(i)}
              className="flex items-center gap-4 cursor-none group"
              style={{ paddingTop: i === 0 ? 0 : 8, paddingBottom: i === labels.length - 1 ? 0 : 5 }}
            >
              <div
                className="rounded-full transition-all duration-200 shrink-0"
                style={{
                  width: isActive ? 7 : 5,
                  height: isActive ? 7 : 5,
                  backgroundColor: isActive
                    ? darkMode ? "white" : "#333"
                    : darkMode ? "rgba(255,255,255,0.2)" : "#ccc",
                }}
              />
              <span
                className="text-xs uppercase tracking-[0.08em] transition-colors duration-200"
                style={{
                  color: isActive
                    ? darkMode ? "white" : "#333"
                    : darkMode ? "rgba(255,255,255,0.25)" : "#ccc",
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {label}
              </span>
            </button>
            {i < labels.length - 1 && (
              <div
                className="transition-colors duration-200"
                style={{
                  width: 1,
                  height: 12,
                  backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "#e5e5e5",
                  marginLeft: 3,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function HeroSection({ section }) {
  const hasFixedHeight = section.height && section.height !== "auto";
  return (
    <motion.div
      className={`w-full rounded-[12px] overflow-hidden ${!hasFixedHeight && !section.heroAspect ? "h-[460px] 2xl:h-[550px]" : ""}`}
      style={{
        ...(hasFixedHeight ? { height: section.height } : undefined),
        ...(section.heroAspect ? { aspectRatio: section.heroAspect } : undefined),
      }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      {section.video ? (
        <video
          className="w-full h-full object-cover"
          src={section.video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          src={section.image}
          alt={section.alt || ""}
          className="w-full h-full object-cover"
        />
      )}
    </motion.div>
  );
}

function TextSection({ section, darkMode, isMobile }) {
  return (
    <div className="flex flex-col gap-3">
      {section.heading && (
        <h3
          className="text-xs font-medium uppercase tracking-[0.1em] leading-[1.3]"
          style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999", fontFamily: "'Instrument Sans', sans-serif" }}
        >
          {section.heading}
        </h3>
      )}
      {section.body && (
        <p
          className="font-medium leading-[1.4] tracking-[-0.44px]"
          style={{ fontSize: isMobile ? 22 : 24, color: darkMode ? "white" : "black", fontFamily: "'Instrument Sans', sans-serif" }}
        >
          {section.body}
        </p>
      )}
      {section.subtext && (
        <div className="flex flex-col gap-4 mt-2">
          {section.subtext.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-base leading-[1.6] tracking-[-0.32px]"
              style={{ color: darkMode ? "rgba(255,255,255,0.7)" : "#555" }}
            >
              {para}
            </p>
          ))}
        </div>
      )}
      {section.image && (
        <motion.img
          src={section.image}
          alt=""
          className="w-full rounded-[12px] mt-4"
          style={{ objectFit: "cover" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </div>
  );
}

function TwoColumnVideoSection({ section, darkMode, isMobile }) {
  const isRight = section.videoSide === "right";

  const frameColor = section.frameColor || "#000";

  const videoEl = (mobile = false) => (
    <div
      className="overflow-hidden flex items-center justify-center"
      style={section.videoFrame ? {
        backgroundColor: frameColor,
        padding: mobile ? "24px" : "40px",
        flex: (!mobile && !section.centered) ? 1 : undefined,
        width: mobile ? "100%" : (section.videoWidth || undefined),
        borderRadius: mobile ? 12 : (section.videoRadius || 12),
      } : {
        flex: (!mobile && !section.videoWidth) ? 1 : undefined,
        width: mobile ? "100%" : (section.videoWidth || undefined),
        borderRadius: mobile ? 12 : (section.videoRadius || 12),
      }}
    >
      <video
        className="block"
        style={section.videoFrame
          ? { width: section.videoWidth ? "100%" : (mobile ? "60%" : "50%"), borderRadius: mobile ? 12 : (section.videoRadius || 8) }
          : { width: "100%", borderRadius: mobile ? 12 : (section.videoRadius || 12) }
        }
        src={section.video}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
    </div>
  );

  const textEl = (mobile = false) => (
    <div className={`${(!mobile && section.centered) ? "" : "flex-1"} flex flex-col gap-4 justify-center`} style={(!mobile && section.centered) ? { maxWidth: 300 } : undefined}>
      {section.rightHeading && (
        <h3
          style={{
            fontSize: mobile ? 22 : 30,
            fontWeight: 500,
            letterSpacing: mobile ? "-0.44px" : "-0.6px",
            lineHeight: 1.4,
            color: darkMode ? "white" : "black",
            fontFamily: "'Instrument Sans', sans-serif",
          }}
        >
          {section.rightHeading}
        </h3>
      )}
      {section.rightBody && (
        <p
          className="text-base leading-[1.6] tracking-[-0.32px]"
          style={{ color: darkMode ? "rgba(255,255,255,0.7)" : "#555", whiteSpace: "pre-line" }}
        >
          {section.rightBody}
        </p>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div className="flex flex-col gap-5">
        {section.leftHeading && (
          <h3
            className="text-[10px] font-medium uppercase tracking-[0.1em] leading-[1.3]"
            style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999", fontFamily: "'Instrument Sans', sans-serif" }}
          >
            {section.leftHeading}
          </h3>
        )}
        {textEl(true)}
        {videoEl(true)}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {section.leftHeading && (
        <h3
          className="text-xs font-medium uppercase tracking-[0.1em] leading-[1.3]"
          style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999", fontFamily: "'Instrument Sans', sans-serif" }}
        >
          {section.leftHeading}
        </h3>
      )}
      <div className={`flex gap-20 ${section.centered ? "justify-center items-center" : ""}`}>
        {isRight ? <>{textEl()}{videoEl()}</> : <>{videoEl()}{textEl()}</>}
      </div>
    </div>
  );
}

function ReflectionSection({ section, darkMode, isMobile }) {
  return (
    <div className="flex flex-col gap-6">
      {section.heading && (
        <h3
          className="text-xs font-medium uppercase tracking-[0.1em] leading-[1.3]"
          style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999", fontFamily: "'Instrument Sans', sans-serif" }}
        >
          {section.heading}
        </h3>
      )}
      <div className={isMobile ? "flex flex-col gap-4" : "flex gap-4"}>
        {section.cards.map((card, i) => (
          <div
            key={i}
            className="flex flex-col rounded-[16px] p-8"
            style={{
              border: darkMode ? "1px solid rgba(255,255,255,0.2)" : "1px solid black",
              flex: isMobile ? undefined : 1,
              minHeight: isMobile ? undefined : 400,
            }}
          >
            <div style={{ height: 32 }}>
              <img
                src={darkMode ? (card.iconDark || card.icon) : card.icon}
                alt=""
                className="w-8 h-8 object-contain"
              />
            </div>

            <div className="flex items-end" style={{ height: isMobile ? undefined : 100, marginTop: isMobile ? 16 : 0 }}>
              <h4
                className="text-xl font-semibold tracking-[-0.4px] leading-[1.3]"
                style={{ color: darkMode ? "white" : "black", fontFamily: "'Instrument Sans', sans-serif" }}
              >
                {card.title}
              </h4>
            </div>
            <div
              className="w-full mt-3 mb-3"
              style={{ height: 1, backgroundColor: darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)" }}
            />
            <div className="flex flex-col gap-3">
              {card.points.map((point, j) => (
                <p
                  key={j}
                  className="text-sm leading-[1.6] tracking-[-0.28px]"
                  style={{ color: darkMode ? "rgba(255,255,255,0.6)" : "#777" }}
                >
                  {point}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PersonaStrokeSVG({ gradientStops, gidCW, gidCCW, cardH, sw, buildCWPath, buildCCWPath, delay, isMobile }) {
  const ref = useRef(null);
  const [w, setW] = useState(381);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const r = 12;
  const cwPath = buildCWPath(w, cardH, r);
  const ccwPath = buildCCWPath(w, cardH, r);

  const pathProps = isMobile
    ? {
        initial: { pathLength: 0 },
        animate: { pathLength: 1 },
        transition: { duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] },
      }
    : {
        pathLength: 1,
        initial: { pathLength: 0 },
        whileInView: { pathLength: 1 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <svg
      ref={ref}
      className="absolute inset-0 w-full h-full"
      viewBox={`0 0 ${w} ${cardH}`}
      fill="none"
    >
      <defs>
        <linearGradient id={gidCW} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={gradientStops.from} />
          <stop offset="100%" stopColor={gradientStops.to} />
        </linearGradient>
        <linearGradient id={gidCCW} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={gradientStops.from} />
          <stop offset="100%" stopColor={gradientStops.to} />
        </linearGradient>
      </defs>
      <motion.path
        d={cwPath}
        stroke={`url(#${gidCW})`}
        strokeWidth={sw}
        strokeLinecap="round"
        fill="none"
        {...pathProps}
      />
      <motion.path
        d={ccwPath}
        stroke={`url(#${gidCCW})`}
        strokeWidth={sw}
        strokeLinecap="round"
        fill="none"
        {...pathProps}
      />
    </svg>
  );
}

function PersonaSection({ section, darkMode, isMobile }) {
  return (
    <div className="flex flex-col gap-10">
      {section.heading && (
        <h3
          className="text-xs font-medium uppercase tracking-[0.1em] leading-[1.3]"
          style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999", fontFamily: "'Instrument Sans', sans-serif" }}
        >
          {section.heading}
        </h3>
      )}
      <p
        className="font-medium leading-[1.4] tracking-[-0.48px]"
        style={{ fontSize: isMobile ? 22 : 24, marginTop: section.heading ? -24 : 0, color: darkMode ? "white" : "black", fontFamily: "'Instrument Sans', sans-serif", whiteSpace: "pre-line" }}
      >
        {section.body}
      </p>
      {section.images && (() => {
        const gradientStops = [
          { from: "#A8B545", to: "#FE2772" },
          { from: "#FE2772", to: "#B8AFF2" },
          { from: "#86AEFF", to: "#F5A623" },
        ];
        const cardH = isMobile ? 220 : 295;
        const sw = 4;
        const o = sw / 2;

        function buildCWPath(w, h, r) {
          const ix = o, iy = o, iw = w - sw, ih = h - sw;
          return `M ${ix},${iy + r}
            A ${r} ${r} 0 0 1 ${ix + r},${iy}
            L ${ix + iw - r},${iy}
            A ${r} ${r} 0 0 1 ${ix + iw},${iy + r}
            L ${ix + iw},${iy + ih - r}
            A ${r} ${r} 0 0 1 ${ix + iw - r},${iy + ih}
            L ${ix + iw / 2},${iy + ih}`;
        }

        function buildCCWPath(w, h, r) {
          const ix = o, iy = o, iw = w - sw, ih = h - sw;
          return `M ${ix},${iy + r}
            L ${ix},${iy + ih - r}
            A ${r} ${r} 0 0 0 ${ix + r},${iy + ih}
            L ${ix + iw / 2},${iy + ih}`;
        }

        return (
          <div className={isMobile ? "flex flex-col gap-4 mt-2" : "flex gap-8 mt-2"}>
            {section.images.map((img, i) => {
              const gidCW = `persona-cw-${i}`;
              const gidCCW = `persona-ccw-${i}`;
              return (
                <motion.div
              key={i}
                  className={isMobile ? "relative w-full" : "flex-1 relative"}
                  style={{ height: cardH }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PersonaStrokeSVG
                    gradientStops={gradientStops[i]}
                    gidCW={gidCW}
                    gidCCW={gidCCW}
                    cardH={cardH}
                    sw={sw}
                    buildCWPath={buildCWPath}
                    buildCCWPath={buildCCWPath}
                    delay={i * 0.15 + 0.3}
                    isMobile={isMobile}
                  />
                  <div
                    className="absolute rounded-[12px] flex items-center justify-center overflow-hidden"
                    style={{
                      inset: sw,
                      backgroundColor: darkMode ? "#1a1a1a" : "#f5f5f5",
                    }}
                  >
                    <img
              src={darkMode ? img.dark : img.light}
              alt=""
                      className="object-contain pointer-events-none"
                      style={{ height: 200 }}
            />
        </div>
                </motion.div>
              );
            })}
          </div>
        );
      })()}
      {section.flower && (
        <div
          className={isMobile ? "flex flex-col gap-6 mt-4" : "flex gap-60 items-center mt-16"}
          style={isMobile ? undefined : { paddingLeft: "10%" }}
        >
          <div className="shrink-0" style={{ width: isMobile ? "60%" : "30%", marginLeft: isMobile ? "auto" : undefined, marginRight: isMobile ? "auto" : undefined }}>
            <img
              src={darkMode ? section.flower.dark : section.flower.light}
              alt=""
              className="w-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-4" style={isMobile ? undefined : { maxWidth: 550 }}>
            <p
              className="font-medium leading-[1.4] tracking-[-0.44px]"
              style={{ fontSize: isMobile ? 22 : 24, color: darkMode ? "white" : "black", fontFamily: "'Instrument Sans', sans-serif" }}
            >
              {section.flower.heading}
            </p>
            <p
              className="text-base leading-[1.7] tracking-[-0.32px]"
              style={{ color: darkMode ? "rgba(255,255,255,0.7)" : "#555", fontFamily: "'Instrument Sans', sans-serif", whiteSpace: "pre-line" }}
            >
              {section.flower.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function StatsSection({ section, darkMode, isMobile }) {
  if (section.cards) {
  return (
      <div className="flex flex-col gap-7">
        {section.heading && (
          <h3
            className="text-xs font-medium uppercase tracking-[0.1em] leading-[1.3]"
            style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999", fontFamily: "'Instrument Sans', sans-serif" }}
          >
            {section.heading}
          </h3>
        )}
        <div className={isMobile ? "flex flex-col gap-4" : "flex gap-6"}>
          {section.cards.map((card, i) => (
            <motion.div
              key={i}
              className={isMobile ? "relative overflow-hidden rounded-[12px] w-full" : "flex-1 relative overflow-hidden rounded-[12px]"}
              style={{ height: isMobile ? 320 : "clamp(380px, 36vw, 502px)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={card.bg}
                alt=""
                className="absolute pointer-events-none"
                style={{ maxWidth: "none", ...card.bgStyle }}
              />
              {card.illustration && (
                <img
                  src={card.illustration}
                  alt=""
                  className="absolute pointer-events-none"
                  style={{
                    width: isMobile ? card.illustrationStyle?.width * 0.7 : card.illustrationStyle?.width,
                    height: isMobile ? card.illustrationStyle?.height * 0.7 : card.illustrationStyle?.height,
                    top: isMobile ? 36 : "10%",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                />
              )}
              <p
                className="absolute font-medium leading-[1.4] tracking-[-0.44px]"
                style={{
                  fontSize: isMobile ? 20 : "clamp(16px, 1.6vw, 24px)",
                  left: isMobile ? 24 : 28,
                  right: isMobile ? 24 : 28,
                  bottom: 28,
                  color: "black",
                  fontFamily: "'Instrument Sans', sans-serif"
                }}
                dangerouslySetInnerHTML={{ __html: card.text }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {section.heading && (
        <h3
          className="text-xs font-medium uppercase tracking-[0.1em] leading-[1.3]"
          style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999", fontFamily: "'Instrument Sans', sans-serif" }}
        >
          {section.heading}
        </h3>
      )}
      {section.intro && (
        <p
          className="font-medium leading-[1.4] tracking-[-0.44px]"
          style={{ fontSize: isMobile ? 22 : 24, color: darkMode ? "white" : "black", fontFamily: "'Instrument Sans', sans-serif" }}
        >
          {section.intro}
        </p>
      )}
      <div className={section.grid ? (isMobile ? "flex flex-col gap-3" : "grid grid-cols-3 gap-4") : "flex flex-col gap-6"}>
        {section.stats.map((stat, i) => (
          <motion.div
            key={i}
            className={section.grid ? "flex flex-col gap-4 rounded-[12px] px-8 py-8" : "flex items-center gap-10 rounded-[12px] px-10 py-8"}
            style={{
              backgroundColor: darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
              border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
            }}
            initial={{ opacity: 0, y: section.grid ? 20 : 0, x: section.grid ? 0 : -20 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className={section.grid ? "text-5xl font-bold" : "text-7xl font-bold shrink-0"}
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                color: stat.color || (darkMode ? "#4ADE80" : "#16A34A"),
                lineHeight: 1,
                minWidth: section.grid ? undefined : 180,
              }}
            >
              {stat.number}
            </span>
            {section.grid && (
              <div className="w-full" style={{ height: 1, backgroundColor: stat.color || (darkMode ? "#4ADE80" : "#16A34A"), opacity: 0.4 }} />
            )}
            <p
              className={section.grid ? "text-sm leading-[1.5] tracking-[-0.2px]" : "text-xl font-medium leading-[1.4] tracking-[-0.4px]"}
              style={{ color: darkMode ? "rgba(255,255,255,0.7)" : "#555", fontFamily: "'Instrument Sans', sans-serif" }}
            >
              {stat.text}
            </p>
          </motion.div>
        ))}
      </div>
      {section.subtext && (
        <p
          className="text-base leading-[1.7] tracking-[-0.32px]"
          style={{ color: darkMode ? "rgba(255,255,255,0.5)" : "#777", fontFamily: "'Instrument Sans', sans-serif" }}
        >
          {section.subtext}
        </p>
      )}
    </div>
  );
}

function MediaCollageSection({ section, darkMode, isMobile }) {
  const W = 1347;
  const H = 669;
  const pctX = (n) => `${(n / W) * 100}%`;
  const pctY = (n) => `${(n / H) * 100}%`;

  return (
    <div className="flex flex-col gap-5">
      {section.text && (
        <div className="flex flex-col gap-1">
          <p
            className="font-medium leading-[1.4] tracking-[-0.44px]"
            style={{ fontSize: isMobile ? 22 : 24, color: darkMode ? "white" : "black", fontFamily: "'Instrument Sans', sans-serif" }}
          >
            {section.text.heading}
          </p>
          <p
            className="text-base leading-[1.6] tracking-[-0.32px]"
            style={{ color: darkMode ? "rgba(255,255,255,0.7)" : "#555", fontFamily: "'Instrument Sans', sans-serif" }}
          >
            {section.text.body}
          </p>
        </div>
      )}
      {isMobile ? (
        <div
          className="relative w-full overflow-hidden rounded-[24px] flex items-center justify-center"
          style={{ aspectRatio: "3 / 4", background: "#f4e7d8" }}
        >
          <img
            src={section.bgImage}
            alt=""
            className="absolute inset-0 w-full h-full pointer-events-none object-cover"
          />
          <div style={{ width: "55%", borderRadius: "14%", overflow: "hidden", flexShrink: 0, position: "relative", zIndex: 1 }}>
            {section.pairingVideo ? (
              <video
                src={section.pairingVideo}
                className="w-full h-auto block"
                autoPlay loop muted playsInline preload="metadata"
              />
            ) : (
              <img src={section.pairingImage} alt="" className="w-full h-auto pointer-events-none block" />
            )}
        </div>
        </div>
      ) : (
      <div
        className="relative w-full overflow-hidden rounded-[24px]"
        style={{ aspectRatio: `${W} / ${H}` }}
      >
        <img
          src={section.bgImage}
          alt=""
          className="absolute inset-0 w-full h-full pointer-events-none object-cover"
        />
        <div
          className="absolute inset-0 flex items-center justify-end shrink-0"
          style={{ gap: 20, paddingRight: "max(16px, 2.5%)" }}
        >
          <div
            className="flex flex-col items-center justify-center overflow-hidden shrink-0"
            style={{
              width: pctX(231.389),
              height: pctY(213),
              background: "#f4e7d8",
              border: "1px solid black",
              borderRadius: "clamp(6px, 0.9vw, 12px)",
            }}
          >
            <img
              src={section.diagramImage}
              alt=""
              className="pointer-events-none w-full h-full object-contain"
            />
          </div>
          <div
            className="overflow-hidden shrink-0"
            style={{
              width: pctX(233.633 * 1.28),
              height: pctY(489 * 1.28),
              borderRadius: "14%",
            }}
          >
            {section.pairingVideo ? (
              <video
                src={section.pairingVideo}
                className="w-full h-full object-cover"
                autoPlay loop muted playsInline preload="metadata"
              />
            ) : (
              <img src={section.pairingImage} alt="" className="pointer-events-none w-full h-full object-cover" />
            )}
          </div>
          <div
            className="overflow-hidden shrink-0"
            style={{
              width: pctX(254),
              height: pctY(201.003),
              border: "1px solid black",
              borderRadius: "clamp(6px, 1vw, 12px)",
            }}
          >
            <img src={section.screenshotImage} alt="" className="pointer-events-none w-full h-full object-cover" />
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

function TextWithVideoSection({ section, darkMode, isMobile }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <p
          className="font-medium leading-[1.4] tracking-[-0.44px]"
          style={{ fontSize: isMobile ? 22 : 24, color: darkMode ? "white" : "black", fontFamily: "'Instrument Sans', sans-serif", whiteSpace: "pre-line" }}
        >
          {section.heading}
        </p>
        <p
          className="text-base leading-[1.6] tracking-[-0.32px]"
          style={{ color: darkMode ? "rgba(255,255,255,0.7)" : "#555", fontFamily: "'Instrument Sans', sans-serif" }}
        >
          {section.body}
        </p>
      </div>
      {isMobile && section.mobileVideoBg ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "3.8 / 4",
            overflow: "hidden",
            borderRadius: 12,
            backgroundColor: section.mobileVideoBg,
          }}
        >
          <video
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            src={section.video}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        </div>
      ) : (
        <div
          className="w-full overflow-hidden flex items-center justify-center"
          style={{
            borderRadius: 12,
            backgroundColor: section.videoBg || "transparent",
            ...(section.videoBg ? { aspectRatio: "16 / 9" } : {}),
          }}
        >
          <video
            className={section.videoBg ? "object-contain block" : "w-full h-auto block"}
            style={section.videoBg ? { height: "90%" } : undefined}
            src={section.video}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        </div>
      )}
      {isMobile && section.mobileImageAfter && (
        <img src={section.mobileImageAfter} alt="" className="w-full rounded-[12px]" style={{ marginTop: 8 }} />
      )}
    </div>
  );
}

function SafeguardsSection({ section, darkMode, isMobile }) {
  return (
    <div className="flex flex-col gap-10">
      {section.heading && (
        <h3
          className="text-xs font-medium uppercase tracking-[0.1em] leading-[1.3]"
          style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999" }}
        >
          {section.heading}
        </h3>
      )}
      <div className={isMobile ? "flex flex-col gap-4" : "grid grid-cols-2"} style={isMobile ? undefined : { gap: 16, gridAutoRows: "1fr" }}>
        {section.items.map((item, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center overflow-hidden rounded-[12px]"
            style={{
              backgroundColor: darkMode ? "rgba(243,231,215,0.08)" : "#F3E7D7",
              padding: isMobile ? 24 : 32,
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-2 w-full">
              <h4
                className="font-medium leading-[1.4] tracking-[-0.44px]"
                style={{
                  fontSize: isMobile ? 20 : 24,
                  color: darkMode ? "white" : "black",
                  fontFamily: "'Instrument Sans', sans-serif",
                }}
            >
              {item.question}
            </h4>
            <p
                className="text-base leading-[1.6] tracking-[-0.32px]"
                style={{
                  color: darkMode ? "rgba(255,255,255,0.7)" : "#555",
                  fontFamily: "'Instrument Sans', sans-serif",
                }}
            >
              {item.answer}
            </p>
          </div>
            {item.image && (
              <motion.img
                src={item.image}
                alt=""
                className="object-contain pointer-events-none"
                style={{ width: isMobile ? 120 : 180, height: isMobile ? 120 : 180, marginTop: "auto" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.08 + 0.2, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SolutionCardsSection({ section, isMobile }) {
  const itemColors = ["#f8a4c8", "#b8aff2", "#aac472"];
  return (
    <div className={isMobile ? "flex flex-col gap-3" : "flex gap-6"}>
      {/* Gradient card */}
      <div
        className="relative overflow-hidden rounded-[12px]"
        style={{
          width: isMobile ? "100%" : 314,
          height: isMobile ? 160 : 534,
          flexShrink: isMobile ? undefined : 0,
          background: "radial-gradient(ellipse at 72% 12%, rgba(134,174,255,1) 0%, rgba(191,169,228,1) 50%, rgba(248,164,200,1) 100%)",
        }}
      >
        <p
          className="absolute font-bold text-white"
          style={{
            fontSize: isMobile ? 28 : "clamp(24px, 2.8vw, 40px)",
            lineHeight: 1.05,
            left: 26,
            right: 26,
            top: "50%",
            transform: "translateY(-50%)",
            letterSpacing: "-0.48px",
            fontFamily: "'Instrument Sans', sans-serif"
          }}
        >
          What if<br />Jackie could...
        </p>
        {!isMobile && section.decorImages?.map((img, i) => (
          <img key={i} src={img.src} alt="" className="absolute pointer-events-none" style={{ maxWidth: "none", ...img.style }} />
        ))}
      </div>
      {/* Numbered cards */}
      <div className={isMobile ? "flex flex-col gap-3" : "flex flex-col justify-between flex-1"} style={isMobile ? undefined : { height: 534 }}>
        {section.items.map((item, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-4 rounded-[12px]"
            style={{ minHeight: isMobile ? 80 : 164, backgroundColor: itemColors[i], padding: isMobile ? "20px 24px" : "20px 28px" }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-sm font-medium shrink-0" style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'Instrument Sans', sans-serif" }}>
              {i + 1}
            </span>
            <p
              className="font-medium leading-[1.4] tracking-[-0.44px]"
              style={{ fontSize: isMobile ? 18 : "clamp(14px, 1.6vw, 24px)", color: "black", fontFamily: "'Instrument Sans', sans-serif" }}
              dangerouslySetInnerHTML={{ __html: item }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function WhatIfSection({ section, darkMode, isMobile }) {
  return (
    <div className="flex flex-col gap-10" style={{ marginTop: section.heading ? 0 : -80 }}>
      {section.heading && (
        <h3
          className="text-xs font-medium uppercase tracking-[0.1em] leading-[1.3]"
          style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999" }}
        >
          {section.heading}
        </h3>
      )}
      {section.title && (
        <p
          className="font-medium leading-[1.4] tracking-[-0.44px]"
          style={{
            fontSize: isMobile ? 22 : 24,
            color: darkMode ? "white" : "black",
            whiteSpace: "pre-line",
          }}
        >
          {section.title}
        </p>
      )}
      <div className="flex flex-col gap-4">
        {(() => {
          const colors = ["#AEDFF7", "#AEDFF7", "#AEDFF7"];
          const colorsDark = ["rgba(174,223,247,0.15)", "rgba(174,223,247,0.15)", "rgba(174,223,247,0.15)"];
          return section.items.map((item, i) => (
          <motion.div
            key={i}
              className="rounded-[12px] px-8 py-5 flex items-start gap-4"
            style={{
                backgroundColor: darkMode ? colorsDark[i % colorsDark.length] : colors[i % colors.length],
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
                className="text-sm font-medium shrink-0 mt-1"
                style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)" }}
            >
              {i + 1}
            </span>
            <p
                className="font-medium leading-[1.4] tracking-[-0.48px]"
                style={{ fontSize: isMobile ? 18 : 24, color: darkMode ? "white" : "black" }}
              dangerouslySetInnerHTML={{ __html: item }}
            />
          </motion.div>
          ));
        })()}
      </div>
    </div>
  );
}

function FrameworkCardsSection({ section, darkMode, isMobile }) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        {section.heading && (
          <h3
            className="text-xs font-medium uppercase tracking-[0.1em] leading-[1.3]"
            style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999", fontFamily: "'Instrument Sans', sans-serif" }}
          >
            {section.heading}
          </h3>
        )}
        {section.body && (
          <p
            className="font-medium leading-[1.4] tracking-[-0.44px]"
            style={{ fontSize: isMobile ? 22 : 30, color: darkMode ? "white" : "black", fontFamily: "'Instrument Sans', sans-serif" }}
          >
            {section.body}
          </p>
        )}
        {section.subtext && (
          <div className="flex flex-col gap-4 mt-2">
            {section.subtext.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-base leading-[1.6] tracking-[-0.32px]"
                style={{ color: darkMode ? "rgba(255,255,255,0.7)" : "#555" }}
              >
                {para}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className={isMobile ? "flex flex-col gap-4" : "flex gap-6"}>
      {section.cards.map((card, i) => (
        <div
          key={i}
          className="flex-1 rounded-[16px] p-8 flex flex-col gap-6"
          style={{
            backgroundColor: darkMode ? "rgba(255,255,255,0.04)" : "white",
            border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex flex-col gap-1 items-center text-center">
            <h4
              className="text-xl font-semibold tracking-[-0.4px] leading-[1.3]"
              style={{ color: darkMode ? "white" : "black", fontFamily: "'Instrument Sans', sans-serif" }}
            >
              {card.title}
            </h4>
            <span
              className="text-sm tracking-[-0.28px]"
              style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999" }}
            >
              ({card.subtitle})
            </span>
          </div>

          <div className="flex justify-center">
            <span
              className="px-5 py-2 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: card.badgeColor }}
            >
              {card.badge}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span
              className="text-xs font-semibold uppercase tracking-[0.08em]"
              style={{ color: darkMode ? "rgba(255,255,255,0.5)" : "#888", fontFamily: "'Instrument Sans', sans-serif" }}
            >
              Message Types
            </span>
            <ol className="flex flex-col gap-1.5 pl-5" style={{ listStyleType: "decimal" }}>
              {card.messages.map((msg, j) => (
                <li
                  key={j}
                  className="text-sm leading-[1.6] tracking-[-0.28px]"
                  style={{ color: darkMode ? "rgba(255,255,255,0.7)" : "#555" }}
                >
                  {msg}
                </li>
              ))}
            </ol>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

function ConceptCollage({ section, darkMode, isMobile }) {
  const positions = [
    { width: "42%", top: 0, left: 0, zIndex: 3, rotate: -1 },
    { width: "50%", top: 40, right: 0, zIndex: 2, rotate: 1.5 },
    { width: "18%", top: 400, left: "0%", zIndex: 5, rotate: -2 },
    { width: "20%", top: 280, left: "25%", zIndex: 4, rotate: 1 },
    { width: "20%", top: 300, right: "15%", zIndex: 6, rotate: -1.5 },
    { width: "20%", top: 500, left: "20%", zIndex: 3, rotate: 2 },
    { width: "15%", top: 400, left: "48%", zIndex: 5, rotate: -0.5 },
    { width: "14%", top: 400, right: "5%", zIndex: 10, rotate: 1.5 },
    { width: "18%", top: 340, right: "2%", zIndex: 10, rotate: -2.5 },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        {section.heading && (
          <h3
            className="text-xs font-medium uppercase tracking-[0.1em] leading-[1.3]"
            style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999", fontFamily: "'Instrument Sans', sans-serif" }}
          >
            {section.heading}
          </h3>
        )}
        {section.body && (
          <p
            className="font-medium leading-[1.4] tracking-[-0.44px]"
            style={{ fontSize: isMobile ? 22 : 30, color: darkMode ? "white" : "black", fontFamily: "'Instrument Sans', sans-serif" }}
          >
            {section.body}
          </p>
        )}
        {section.subtext && (
          <div className="flex flex-col gap-4 mt-2">
            {section.subtext.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-base leading-[1.6] tracking-[-0.32px]"
                style={{ color: darkMode ? "rgba(255,255,255,0.7)" : "#555" }}
              >
                {para}
              </p>
            ))}
          </div>
        )}
      </div>
      {isMobile ? (
        <div className="flex flex-col gap-4">
          {section.images.filter((img) => !img.desktopOnly).map((img, i) => (
            <PreviewCard key={i} image={img.src} name={img.name} darkMode={darkMode} naturalRatio />
          ))}
        </div>
      ) : (
      <div className="w-full relative" style={{ height: 900 }}>
        {section.images.map((img, i) => {
          const p = positions[i] || positions[0];
          return (
            <div
              key={i}
              className="absolute"
              style={{
                width: p.width,
                top: p.top,
                left: p.left,
                right: p.right,
                zIndex: p.zIndex,
                transform: `rotate(${p.rotate}deg)`,
                filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.12))",
              }}
            >
              <PreviewCard image={img.src} name={img.name} darkMode={darkMode} naturalRatio />
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
}

function ShapeDecoration({ shape, color }) {
  if (shape === "rings") {
    return (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="30" stroke={color} strokeWidth="3" opacity="0.8" />
        <circle cx="40" cy="40" r="18" stroke={color} strokeWidth="3" opacity="0.5" />
        <circle cx="40" cy="40" r="6" fill={color} opacity="0.9" />
      </svg>
    );
  }
  if (shape === "dots") {
    return (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <circle cx="20" cy="20" r="6" fill={color} opacity="0.7" />
        <circle cx="50" cy="15" r="4" fill={color} opacity="0.5" />
        <circle cx="35" cy="42" r="8" fill={color} opacity="0.8" />
        <circle cx="60" cy="38" r="5" fill={color} opacity="0.6" />
        <circle cx="25" cy="60" r="5" fill={color} opacity="0.5" />
        <circle cx="55" cy="62" r="7" fill={color} opacity="0.7" />
      </svg>
    );
  }
  if (shape === "waves") {
    return (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <path d="M5 30 Q20 15 40 30 Q60 45 75 30" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.8" fill="none" />
        <path d="M5 45 Q20 30 40 45 Q60 60 75 45" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.5" fill="none" />
        <path d="M5 60 Q20 45 40 60 Q60 75 75 60" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.3" fill="none" />
      </svg>
    );
  }
  return null;
}

function UserJourneySection({ section, darkMode }) {
  return (
    <div className="grid grid-cols-2 gap-5">
      {section.journeys.map((journey, ji) => (
        <motion.div
          key={ji}
          className="rounded-[20px] px-10 pt-10 pb-14"
          style={{
            backgroundColor: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.05)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: ji * 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col">
            <h4
              className="text-2xl font-bold tracking-[-0.5px] mb-20"
              style={{ color: darkMode ? "white" : "black" }}
            >
              {journey.label}
            </h4>
            <div className="flex">
              {journey.phases.map((phase, pi) => (
                <span
                  key={pi}
                  className="text-xl font-bold tracking-[-0.4px]"
                  style={{ color: darkMode ? "white" : "black", flex: 1 }}
                >
                  {phase.name}
                </span>
              ))}
            </div>

            <div className="flex w-full mt-4" style={{ height: 6, borderRadius: 3, overflow: "hidden" }}>
              {journey.phases.map((phase, pi) => (
                <div key={pi} style={{ flex: 1, backgroundColor: phase.color }} />
              ))}
            </div>

            <div className="flex relative" style={{ minHeight: 180, marginTop: 0 }}>
              {journey.phases.map((phase, pi) => {
                const totalGoals = phase.goals.length;
                return (
                  <div key={pi} className="flex-1 relative">
                    {phase.goals.map((goal, gi) => {
                      const xOffset = gi * 40;
                      const yTop = 30 + gi * 60;
                      return (
                        <React.Fragment key={gi}>
                          <div
                            className="absolute"
                            style={{
                              top: 0,
                              left: xOffset,
                              width: 1,
                              height: yTop,
                              borderLeft: darkMode ? "1px dashed rgba(255,255,255,0.15)" : "1px dashed rgba(0,0,0,0.15)",
                              zIndex: 0,
                            }}
                          />
                          <div
                            className="absolute"
                            style={{ top: yTop, left: xOffset, zIndex: gi + 10 }}
                          >
                            <div
                              className="rounded-[8px] px-4 py-3 text-xs leading-[1.4]"
                              style={{
                                backgroundColor: darkMode ? "#1a1a1a" : "white",
                                border: darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
                                color: darkMode ? "rgba(255,255,255,0.75)" : "#444",
                                boxShadow: darkMode ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.06)",
                              }}
                            >
                              {goal}
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                );
              })}
            </div>

          </div>
        </motion.div>
      ))}
    </div>
  );
}

function BeforeAfterSection({ section, darkMode }) {
  return (
    <div className="flex flex-col gap-6">
      {section.heading && (
        <h3
          className="text-xs font-medium uppercase tracking-[0.1em] leading-[1.3]"
          style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999", fontFamily: "'Inter', sans-serif" }}
        >
          {section.heading}
        </h3>
      )}
      <div
        className="rounded-[20px] overflow-hidden flex items-center gap-12 p-12"
        style={{
          backgroundColor: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
          border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex gap-8 items-end shrink-0">
          {section.images.map((img, i) => (
            <div key={i} className="flex flex-col gap-3 items-center">
              <span
                className="text-xs font-medium uppercase tracking-[0.1em]"
                style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999" }}
              >
                {img.label}
              </span>
              <div style={{ width: img.width || 190 }}>
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-4">
          {section.points.map((point, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div
                className="mt-[7px] shrink-0"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: darkMode ? "rgba(255,255,255,0.4)" : "#999",
                }}
              />
              <p
                className="text-base leading-[1.6]"
                style={{ color: darkMode ? "rgba(255,255,255,0.7)" : "#555" }}
              >
                {point}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureGridSection({ section, darkMode, isMobile }) {
  const cards = section.cards || [];
  const introHeading = section.introHeading;
  const introBody = section.introBody;
  const cta = section.cta;
  const kicker = section.kicker;
  const useProcessLayout = !!(kicker || introHeading || introBody || cta?.label);

  if (!useProcessLayout) {
  return (
      <div className={isMobile ? "flex flex-col gap-3" : "grid grid-cols-2 gap-5"}>
        {cards.map((card, i) => (
        <motion.div
          key={i}
            className="rounded-[12px] relative overflow-hidden"
          style={{
            backgroundColor: darkMode ? "#1a1a1a" : "#fff",
            border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
            boxShadow: darkMode ? "none" : "0 2px 16px rgba(0,0,0,0.04)",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="p-10 flex flex-col gap-5" style={{ minHeight: 240 }}>
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-bold"
                style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999", fontFamily: "'Inter', sans-serif" }}
              >
                0{i + 1}
              </span>
            </div>
            <h4
              className="text-2xl font-bold leading-[1.25] tracking-[-0.5px]"
              style={{ color: darkMode ? "white" : "black" }}
            >
              {card.title}
            </h4>
            <div className="mt-auto">
              <p
                className="text-base leading-[1.6] tracking-[-0.32px]"
                style={{ color: darkMode ? "rgba(255,255,255,0.55)" : "#777" }}
              >
                {card.body}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

  return (
    <div
      className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16 xl:gap-20"
    >
      <div className="flex flex-col gap-10" style={{ width: isMobile ? "100%" : "clamp(200px, 35vw, 550px)", flexShrink: 0 }}>
        {kicker && (
        <h3
          className="text-xs font-medium uppercase tracking-[0.1em] leading-[1.3]"
            style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999", fontFamily: "'Instrument Sans', sans-serif" }}
        >
            {kicker}
        </h3>
      )}
        {introHeading && (
          <p
            className="font-medium leading-[1.4] tracking-[-0.48px]"
            style={{
              fontSize: "clamp(16px, 1.8vw, 24px)",
              color: darkMode ? "white" : "black",
              fontFamily: "'Instrument Sans', sans-serif",
              whiteSpace: "pre-line",
            }}
          >
            {introHeading}
          </p>
        )}
        {introBody && (
          <p
            className="text-base leading-[1.7] tracking-[-0.32px]"
            style={{
              color: darkMode ? "rgba(255,255,255,0.7)" : "#555",
              fontFamily: "'Instrument Sans', sans-serif",
              whiteSpace: "pre-line",
            }}
          >
            {introBody}
          </p>
        )}
        {cta?.label && (
          <div className="pt-1">
            {cta.href ? (
              <a
                href={cta.href}
                className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors cursor-none"
                style={{
                  backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "#f0f0f0",
                  color: darkMode ? "white" : "#111",
                  fontFamily: "'Instrument Sans', sans-serif",
                }}
              >
                {cta.label}
              </a>
            ) : (
              <span
                className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium"
                style={{
                  backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "#f0f0f0",
                  color: darkMode ? "white" : "#111",
                  fontFamily: "'Instrument Sans', sans-serif",
                }}
              >
                {cta.label}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-3">
          {cards.map((card, i) => (
          <motion.div
            key={i}
              className="rounded-[14px] px-6 py-6 sm:px-8 sm:py-7"
            style={{
                backgroundColor: darkMode ? "rgba(255,255,255,0.03)" : "#ffffff",
              border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex justify-between items-start gap-6">
                <h3
                  className="text-lg sm:text-xl font-semibold leading-snug tracking-[-0.03em]"
                  style={{ color: darkMode ? "white" : "#111", fontFamily: "'Instrument Sans', sans-serif" }}
                >
                  {card.title}
                </h3>
              <span
                  className="text-sm shrink-0 tabular-nums pt-0.5"
                  style={{ color: darkMode ? "rgba(255,255,255,0.35)" : "#aaa", fontFamily: "'Instrument Sans', sans-serif" }}
              >
                  {i + 1}
              </span>
              </div>
              <p
                className="mt-4 text-base leading-[1.65] tracking-[-0.02em]"
                style={{ color: darkMode ? "rgba(255,255,255,0.55)" : "#555", fontFamily: "'Instrument Sans', sans-serif" }}
              >
                {card.body}
              </p>
            </motion.div>
          ))}
            </div>
    </div>
  );
}

function PersonaCardsSection({ section, darkMode, isMobile }) {
  return (
    <div className="flex flex-col gap-10">
      {section.heading && (
        <h3
          className="text-xs font-medium uppercase tracking-[0.1em] leading-[1.3]"
          style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999" }}
        >
          {section.heading}
        </h3>
      )}
      <div className={isMobile ? "flex flex-col gap-4" : "grid grid-cols-2 gap-6"}>
        {section.cards.map((card, i) => (
          <motion.div
            key={i}
            className="rounded-[12px] flex flex-col"
            style={{
              backgroundColor: "#fff",
              border: "1px solid rgba(0,0,0,0.06)",
              padding: isMobile ? "24px" : "40px",
              gap: isMobile ? 20 : 40,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {isMobile ? (
              <>
                <div className="flex items-center gap-4">
                  <img src={card.image} alt="" style={{ width: 72, height: 72, objectFit: "contain", borderRadius: 8 }} />
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium uppercase tracking-[0.1em]" style={{ color: "#FF522A" }}>{card.role}</span>
                    <h4 className="text-base font-bold tracking-[-0.3px]" style={{ color: "black" }}>{card.name}</h4>
                    {card.details && <p className="text-xs leading-[1.5]" style={{ color: "#999", whiteSpace: "pre-line" }}>{card.details}</p>}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {card.pointsLabel && <h5 className="text-sm font-bold tracking-[-0.3px]" style={{ color: "black" }}>{card.pointsLabel}</h5>}
                  <ul className="flex flex-col gap-2">
                    {card.points.map((point, j) => (
                      <li key={j} className="text-sm leading-[1.6] tracking-[-0.28px] flex gap-3 items-start" style={{ color: "#555" }}>
                        <span className="shrink-0 mt-1.5 w-[5px] h-[5px] rounded-full" style={{ backgroundColor: "#FF522A" }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="flex gap-10">
                <div className="flex flex-col items-center gap-4 shrink-0" style={{ width: 160 }}>
                  <span className="text-xs font-medium uppercase tracking-[0.1em]" style={{ color: "#FF522A" }}>{card.role}</span>
                  <img src={card.image} alt="" className="w-full h-auto object-contain" />
                  <h4 className="text-base font-bold tracking-[-0.3px] text-center" style={{ color: "black" }}>{card.name}</h4>
                  {card.details && <p className="text-xs leading-[1.5] text-center" style={{ color: "#999", whiteSpace: "pre-line" }}>{card.details}</p>}
                </div>
                <div className="flex-1 flex flex-col gap-4 justify-center">
                  {card.pointsLabel && <h5 className="text-base font-bold tracking-[-0.3px]" style={{ color: "black" }}>{card.pointsLabel}</h5>}
              <ul className="flex flex-col gap-3">
                {card.points.map((point, j) => (
                      <li key={j} className="text-sm leading-[1.6] tracking-[-0.28px] flex gap-3 items-start" style={{ color: "#555" }}>
                    <span className="shrink-0 mt-1.5 w-[5px] h-[5px] rounded-full" style={{ backgroundColor: "#FF522A" }} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function InsightCardsSection({ section, darkMode, isMobile }) {
  return (
    <div className="flex flex-col gap-10">
      {section.title && (
        <p
          className="text-base leading-[1.6] tracking-[-0.32px]"
          style={{ color: darkMode ? "rgba(255,255,255,0.7)" : "#555" }}
        >
          {section.title}
        </p>
      )}
      <div className={isMobile ? "flex flex-col gap-3" : "grid grid-cols-3 gap-4"}>
      {section.cards.map((card, i) => (
        <motion.div
          key={i}
          className="rounded-[12px] flex flex-col"
          style={{
            backgroundColor: "#fff",
            border: "1px solid rgba(0,0,0,0.06)",
            padding: isMobile ? "24px" : "40px",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {isMobile ? (
            <div className="flex items-center gap-4">
              {card.icon && <img src={card.icon} alt="" className="h-[48px] w-auto object-contain shrink-0" />}
              <div className="flex flex-col gap-1">
                <h4 className="text-xl font-bold leading-[1.2] tracking-[-0.4px]" style={{ color: "black" }}>{card.title}</h4>
                <p className="text-sm leading-[1.5] tracking-[-0.2px]" style={{ color: "#666" }}>{card.body}</p>
              </div>
            </div>
          ) : (
            <>
              <h4 className="text-3xl font-bold leading-[1.2] tracking-[-0.6px]" style={{ color: "black", whiteSpace: "pre-line" }}>{card.title}</h4>
          <div className="flex justify-center mt-10 mb-12">
            {card.icon ? (
              <img src={card.icon} alt="" className="h-[90px] w-auto object-contain" />
            ) : (
              <ShapeDecoration shape={card.shape} color={card.shapeColor} />
            )}
          </div>
              <p className="text-xl leading-[1.5] tracking-[-0.3px]" style={{ color: "#666" }}>{card.body}</p>
            </>
          )}
        </motion.div>
      ))}
      </div>
    </div>
  );
}

function ColumnsSection({ section, darkMode, isMobile }) {
  return (
    <div className="flex flex-col gap-6">
      {section.heading && (
        <h3
          className="text-xs font-medium uppercase tracking-[0.1em] leading-[1.3]"
          style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999", fontFamily: "'Instrument Sans', sans-serif" }}
        >
          {section.heading}
        </h3>
      )}
      <div className={isMobile ? "flex flex-col gap-3" : "flex items-stretch gap-4"}>
        {section.items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 rounded-[12px]"
            style={{
              border: darkMode ? "1px solid rgba(255,255,255,0.2)" : "1px solid black",
              flex: isMobile ? undefined : 1,
              padding: isMobile ? 20 : "clamp(16px, 1.8vw, 24px)",
            }}
          >
            <h4
              className="font-medium tracking-[-0.4px] leading-[1.4]"
              style={{ fontSize: isMobile ? 18 : "clamp(13px, 1.4vw, 20px)", color: darkMode ? "white" : "black", fontFamily: "'Instrument Sans', sans-serif" }}
            >
              {item.title}
            </h4>
            <p
              className="leading-[1.6] tracking-[-0.28px]"
              style={{ fontSize: isMobile ? 14 : "clamp(11px, 1vw, 14px)", color: darkMode ? "rgba(255,255,255,0.5)" : "#777" }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImageSection({ section }) {
  return (
    <div className="w-full rounded-[12px] overflow-hidden">
      <img
        src={section.image}
        alt={section.alt || ""}
        className="w-full h-auto object-cover"
      />
    </div>
  );
}

function TwoColumnSection({ section, darkMode, isMobile }) {
  if (section.layout === "stacked") {
    if (isMobile) {
  return (
    <>
          {section.leftHeading && (
            <h3
              className="text-[10px] font-medium uppercase tracking-[0.1em] leading-[1.3]"
              style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999", fontFamily: "'Instrument Sans', sans-serif" }}
            >
              {section.leftHeading}
            </h3>
          )}
          <div className="flex flex-col gap-5 mt-3">
            {section.leftBody && (
              <p
                className="text-[22px] font-medium leading-[1.4] tracking-[-0.44px]"
                style={{ color: darkMode ? "white" : "black", fontFamily: "'Instrument Sans', sans-serif" }}
              >
                {section.leftBody}
              </p>
            )}
            {section.rightBody && (
              <div className="flex flex-col gap-4">
                {section.rightBody.split("\n\n").map((para, i) => (
                  <p key={i} className="text-sm leading-[1.7] tracking-[-0.28px]" style={{ color: darkMode ? "rgba(255,255,255,0.7)" : "#555" }}>
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div
            className="w-full"
            style={{ height: 1, backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "#e5e5e5", marginTop: 40 }}
          />
        </>
      );
    }
    return (
      <>
        {section.leftHeading && (
          <h3
            className="text-xs font-medium uppercase tracking-[0.1em] leading-[1.3]"
            style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999", fontFamily: "'Instrument Sans', sans-serif" }}
          >
            {section.leftHeading}
          </h3>
        )}
        <div className="flex gap-16 mt-3">
          <div className="w-[400px] shrink-0">
            {section.leftBody && (
              <p
                className="text-base font-medium leading-[1.6] tracking-[-0.32px]"
                style={{ color: darkMode ? "white" : "black", fontFamily: "'Instrument Sans', sans-serif" }}
              >
                {section.leftBody}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4" style={{ maxWidth: 500, marginLeft: "auto" }}>
            {section.rightBody.split("\n\n").map((para, i) => (
              <p key={i} className="text-base leading-[1.6] tracking-[-0.32px]" style={{ color: darkMode ? "rgba(255,255,255,0.7)" : "#555" }}>
                {para}
              </p>
            ))}
          </div>
        </div>
        <div
          className="w-full"
          style={{ height: 1, backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "#e5e5e5", marginTop: 60 }}
        />
      </>
    );
  }

  const imageCard = Boolean(section.leftImage);

  if (imageCard && isMobile) {
    return (
      <div className="flex flex-col gap-5 rounded-[12px] overflow-hidden" style={{ backgroundColor: "#fff", padding: "24px" }}>
        <div className="w-full rounded-[8px] overflow-hidden">
          <img src={section.leftImage} alt="" className="w-full h-auto object-cover" />
        </div>
        {(section.rightHeading || section.rightBody) && (
          <p className="text-xl font-medium leading-[1.4] tracking-[-0.4px]" style={{ color: "black", fontFamily: "'Instrument Sans', sans-serif" }}>
            {section.rightHeading && <span className="font-bold">{section.rightHeading} </span>}
            {section.rightBody}
          </p>
        )}
      </div>
    );
  }

  return (
    <>
    <div
      className={`flex gap-16 items-center ${imageCard ? "justify-center w-full" : "justify-center"}`}
      style={
        imageCard
          ? {
              backgroundColor: "#fff",
              borderRadius: 24,
              padding: "48px 40px 48px 120px",
              minHeight: 520,
              width: "100%",
            }
          : undefined
      }
    >
      {section.leftImage ? (
        <div className="rounded-[12px] overflow-hidden" style={{ width: "clamp(160px, 28vw, 350px)", flexShrink: 0 }}>
          <img src={section.leftImage} alt="" className="w-full h-auto object-cover" />
        </div>
      ) : (
      <div className="w-[400px] shrink-0 flex flex-col gap-3">
        {section.leftHeading && (
          <h3
            className="text-xs font-medium uppercase tracking-[0.1em] leading-[1.3]"
            style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999", fontFamily: "'Instrument Sans', sans-serif" }}
          >
            {section.leftHeading}
          </h3>
        )}
        {section.leftBody && (
          <p
            className="text-3xl font-medium leading-[1.4] tracking-[-0.6px]"
            style={{ color: darkMode ? "white" : "black", fontFamily: "'Instrument Sans', sans-serif" }}
          >
            {section.leftBody}
          </p>
        )}
      </div>
      )}
      <div className="flex flex-col gap-4 justify-center" style={{ paddingTop: section.leftImage ? 0 : (section.leftHeading ? 28 : 0), flex: 1, minWidth: 0 }}>
        {section.rightHeading && !section.leftImage && (
          <h3
            className="font-bold tracking-[-1px] leading-[1]"
            style={{ fontSize: "clamp(32px, 4vw, 48px)", color: darkMode ? "white" : "black", fontFamily: "'Instrument Sans', sans-serif" }}
          >
            {section.rightHeading}
          </h3>
        )}
        {section.leftImage && section.rightHeading ? (
          <p
            className="font-medium leading-[1.4] tracking-[-0.6px]"
            style={{ fontSize: "clamp(16px, 2vw, 30px)", color: "black", fontFamily: "'Instrument Sans', sans-serif" }}
          >
            <span className="font-bold">{section.rightHeading}</span> {section.rightBody}
          </p>
        ) : (
          section.rightBody.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-base leading-[1.6] tracking-[-0.32px]"
              style={{ color: darkMode ? "rgba(255,255,255,0.7)" : "#555" }}
            >
              {para}
            </p>
          ))
        )}
      </div>
    </div>
    {!section.leftImage && (
      <div
        className="w-full"
        style={{
          height: 1,
          backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "#e5e5e5",
          marginTop: 60,
        }}
      />
    )}
  </>
  );
}

function PreviewCard({ image, name, darkMode, naturalRatio }) {
  const filename = name || image.split("/").pop();
  return (
    <div
      className="rounded-[10px] overflow-hidden flex-1"
      style={{
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <div
        className="flex items-center px-3 h-[32px] relative"
        style={{
          backgroundColor: darkMode ? "#2a2a2a" : "#e8e8e8",
          borderBottom: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex gap-[6px]">
          <div className="w-[10px] h-[10px] rounded-full" style={{ backgroundColor: "#FF5F57" }} />
          <div className="w-[10px] h-[10px] rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
          <div className="w-[10px] h-[10px] rounded-full" style={{ backgroundColor: "#28C840" }} />
        </div>
        <div
          className="absolute left-1/2 -translate-x-1/2 text-[10px] tracking-[-0.2px]"
          style={{
            color: darkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
            fontFamily: "'Instrument Sans', sans-serif",
          }}
        >
          {filename}
        </div>
      </div>
      <div style={{ backgroundColor: "white" }}>
        <img
          src={image}
          alt=""
          className="w-full h-auto block"
          style={naturalRatio ? { objectFit: "contain" } : { aspectRatio: "4 / 3", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}

function PreviewWindow({ section, darkMode, isMobile }) {
  const layouts = [
    { width: "58%", top: 0, left: 0, zIndex: 2 },
    { width: "48%", top: 60, right: 0, zIndex: 3 },
    { width: "42%", top: 340, left: "35%", zIndex: 4 },
  ];

  const [topZ, setTopZ] = useState(10);
  const zRefs = useRef(layouts.map((l) => l.zIndex));

  const bringToFront = (i) => {
    const next = topZ + 1;
    zRefs.current[i] = next;
    setTopZ(next);
  };

  const constraintsRef = useRef(null);

  if (isMobile) {
    return (
      <div className="w-full flex flex-col gap-4">
        {section.images.map((img, i) => (
          <PreviewCard key={i} image={img.src || img} name={img.name} darkMode={darkMode} />
        ))}
        <div className="w-full" style={{ height: 1, backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "#e5e5e5", marginTop: 8 }} />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-0">
      <div className="w-full relative" style={{ height: 900 }} ref={constraintsRef}>
        {section.images.map((img, i) => {
          const l = layouts[i] || layouts[0];
          return (
            <motion.div
              key={i}
              className="absolute cursor-none"
              drag
              dragConstraints={constraintsRef}
              dragMomentum={false}
              onDragStart={() => bringToFront(i)}
              style={{
                width: l.width,
                top: l.top,
                left: l.left,
                right: l.right,
                zIndex: zRefs.current[i],
              }}
            >
              <PreviewCard image={img.src || img} name={img.name} darkMode={darkMode} />
            </motion.div>
          );
        })}
      </div>
      <div
        className="w-full"
        style={{
          height: 1,
          backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "#e5e5e5",
        }}
      />
    </div>
  );
}

function SplitSection({ section, darkMode }) {
  return (
    <div className="flex gap-8 items-start">
      <div className="flex-1 flex flex-col gap-3">
        {section.heading && (
          <h3
            className="text-2xl font-medium tracking-[-0.48px] leading-[1.3]"
            style={{ color: darkMode ? "white" : "black", fontFamily: "'Instrument Sans', sans-serif" }}
          >
            {section.heading}
          </h3>
        )}
        {section.body && (
          <p
            className="text-base leading-[1.6] tracking-[-0.32px]"
            style={{ color: darkMode ? "rgba(255,255,255,0.7)" : "#555" }}
          >
            {section.body}
          </p>
        )}
      </div>
      {section.image && (
        <div className="flex-1 rounded-[12px] overflow-hidden">
          <img
            src={section.image}
            alt={section.alt || ""}
            className="w-full h-auto object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default function ProjectPage({ project, darkMode, onBack }) {
  const isMobile = useIsMobile();
  const sections = project.caseStudy || [];
  const [unlocked, setUnlocked] = useState(false);
  const labels = getTimelineLabels(sections, unlocked);
  const nonHeroIndices = getNonHeroIndices(sections, unlocked);
  const sectionRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionToTimeline = React.useMemo(() => {
    const map = {};
    let currentTimeline = 0;
    sections.forEach((s, i) => {
      if (s.type === "hero") return;
      if (s.locked && !unlocked) return;
      if (!s.timelineHidden) {
        currentTimeline = nonHeroIndices.indexOf(i);
      }
      map[i] = currentTimeline;
    });
    return map;
  }, [sections, unlocked, nonHeroIndices]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 3;
      let closest = 0;
      let closestDist = Infinity;
      sections.forEach((s, i) => {
        if (s.type === "hero") return;
        if (s.locked && !unlocked) return;
        const el = sectionRefs.current[i];
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - viewportCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = sectionToTimeline[i] ?? 0;
        }
      });
      setActiveIndex(prev => prev === closest ? prev : closest);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, unlocked, sectionToTimeline]);

  const scrollToSection = useCallback((timelineIdx) => {
    const sectionIdx = nonHeroIndices[timelineIdx];
    const el = sectionRefs.current[sectionIdx];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [nonHeroIndices]);

  const activeLabel = labels[activeIndex] ?? null;

  const renderSections = () => (
    <div className="flex flex-col" style={{ gap: isMobile ? 80 : 128 }}>
      {sections.map((section, i) => {
        if (section.locked && !unlocked) {
          const isFirstLocked = !sections.slice(0, i).some((s) => s.locked);
          if (isFirstLocked) {
            return (
              <div key={i} ref={(el) => (sectionRefs.current[i] = el)}>
                <PasswordGate darkMode={darkMode} onUnlock={() => {
                  setUnlocked(true);
                  if (isMobile) {
                    requestAnimationFrame(() => setTimeout(() => {
                      const el = sectionRefs.current[i];
                      if (el) {
                        const top = el.getBoundingClientRect().top + window.scrollY - 100;
                        window.scrollTo({ top, behavior: "smooth" });
                      }
                    }, 80));
                  }
                }} isMobile={isMobile} />
              </div>
            );
          }
          return null;
        }
        return (
          <div
            key={i}
            id={section.sectionId || undefined}
            ref={(el) => (sectionRefs.current[i] = el)}
            className={section.sectionId ? "scroll-mt-28" : undefined}
            style={(section.marginTop || section.mobileMarginTop !== undefined) ? { marginTop: isMobile ? (section.mobileMarginTop !== undefined ? section.mobileMarginTop : Math.max(-60, section.marginTop)) : section.marginTop } : undefined}
          >
            {section.type === "hero" && <HeroSection section={section} />}
            {section.type === "text" && <TextSection section={section} darkMode={darkMode} isMobile={isMobile} />}
            {section.type === "image" && <ImageSection section={section} />}
            {section.type === "split" && <SplitSection section={section} darkMode={darkMode} />}
            {section.type === "two-column" && <TwoColumnSection section={section} darkMode={darkMode} isMobile={isMobile} />}
            {section.type === "polaroid-spread" && <PreviewWindow section={section} darkMode={darkMode} isMobile={isMobile} />}
            {section.type === "columns" && <ColumnsSection section={section} darkMode={darkMode} isMobile={isMobile} />}
            {section.type === "two-column-video" && <TwoColumnVideoSection section={section} darkMode={darkMode} isMobile={isMobile} />}
            {section.type === "framework-cards" && <FrameworkCardsSection section={section} darkMode={darkMode} isMobile={isMobile} />}
            {section.type === "concept-collage" && <ConceptCollage section={section} darkMode={darkMode} isMobile={isMobile} />}
            {section.type === "reflection" && <ReflectionSection section={section} darkMode={darkMode} isMobile={isMobile} />}
            {section.type === "persona" && <PersonaSection section={section} darkMode={darkMode} isMobile={isMobile} />}
            {section.type === "stats" && <StatsSection section={section} darkMode={darkMode} isMobile={isMobile} />}
            {section.type === "media-collage" && <MediaCollageSection section={section} darkMode={darkMode} isMobile={isMobile} />}
            {section.type === "text-with-video" && <TextWithVideoSection section={section} darkMode={darkMode} isMobile={isMobile} />}
            {section.type === "what-if" && <WhatIfSection section={section} darkMode={darkMode} isMobile={isMobile} />}
            {section.type === "solution-cards" && <SolutionCardsSection section={section} isMobile={isMobile} />}
            {section.type === "safeguards" && <SafeguardsSection section={section} darkMode={darkMode} isMobile={isMobile} />}
            {section.type === "insight-cards" && <InsightCardsSection section={section} darkMode={darkMode} isMobile={isMobile} />}
            {section.type === "persona-cards" && <PersonaCardsSection section={section} darkMode={darkMode} isMobile={isMobile} />}
            {section.type === "feature-grid" && <FeatureGridSection section={section} darkMode={darkMode} isMobile={isMobile} />}
            {section.type === "before-after" && <BeforeAfterSection section={section} darkMode={darkMode} />}
            {section.type === "user-journey" && <UserJourneySection section={section} darkMode={darkMode} />}
            {section.type === "try-it" && <TryItSection section={section} darkMode={darkMode} />}
            {section.type === "video-embed" && <VideoEmbedSection section={section} darkMode={darkMode} />}
          </div>
        );
      })}
    </div>
  );

  if (isMobile) {
    return (
      <motion.div
        className="min-h-screen"
        style={{ backgroundColor: darkMode ? "#0F0F0F" : "#f7f7f7" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease }}
      >
        {/* Mobile top bar */}
        <MobileTopNav darkMode={darkMode} onBack={() => { window.scrollTo({ top: 0, behavior: "instant" }); onBack(project); }} />

        {/* Content */}
        <div className="px-5 pb-24" style={{ paddingTop: "calc(57px + 32px)" }}>
          <div className="flex flex-col gap-6 mb-10">
            <motion.h1
              className="text-[28px] font-medium tracking-[-0.56px] leading-[1.2]"
              style={{ color: darkMode ? "white" : "black", fontFamily: "'Instrument Sans', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
            >
              {project.title}
            </motion.h1>
            {project.meta && (
              <motion.div
                className="flex flex-col gap-3 mt-1"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
              >
                {project.meta.map((item, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <span
                      className="text-[9px] uppercase tracking-[0.1em]"
                      style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999", fontFamily: "'Instrument Sans', sans-serif" }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="text-sm tracking-[-0.28px] leading-[1.5]"
                      style={{ color: darkMode ? "white" : "black" }}
                    >
                      {item.value.replace(/\n/g, ", ")}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {renderSections()}
        </div>

        <div className="px-5">
          <Footer darkMode={darkMode} onNavigate={(href) => {
            const id = href.replace("#", "");
            if (id === "play") { window.location.hash = "#play"; return; }
            onBack(project);
            const tryScroll = (attempts = 0) => {
              if (id === "home") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: "smooth" });
              else if (attempts < 10) setTimeout(() => tryScroll(attempts + 1), 100);
            };
            setTimeout(tryScroll, 700);
          }} />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen"
      style={{
        backgroundColor: darkMode ? "#0F0F0F" : "#f7f7f7",
      }}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease }}
    >
      <div className="flex">
        <motion.div
          className="shrink-0"
          style={{ width: "clamp(160px, 16vw, 240px)", overflow: "visible" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
        >
          <div className="sticky top-0 flex flex-col gap-6" style={{ padding: "clamp(20px, 2.8vw, 40px) clamp(16px, 2.8vw, 40px)", fontFamily: "'Instrument Sans', sans-serif" }}>
            <motion.button
              onClick={() => onBack(project)}
              className="flex items-center gap-2 cursor-none shrink-0"
              style={{ color: darkMode ? "rgba(255,255,255,0.5)" : "#999", whiteSpace: "nowrap" }}
              whileHover={{ color: darkMode ? "white" : "black" }}
              transition={{ duration: 0.2 }}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 2L4 8L10 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs uppercase tracking-[0.08em] whitespace-nowrap">
                Back to projects
              </span>
            </motion.button>

            <div className="flex flex-col gap-1">
              <span
                className="text-[10px] uppercase tracking-[0.08em]"
                style={{ color: darkMode ? "rgba(255,255,255,0.35)" : "#aaa" }}
              >
                Case Study
              </span>
              <span
                className="text-sm font-medium tracking-[-0.28px]"
                style={{ color: darkMode ? "white" : "black" }}
              >
                {project.title}
              </span>
            </div>

            <div className="mt-10">
              <Timeline
                labels={labels}
                activeIndex={activeIndex}
                onClickItem={scrollToSection}
                darkMode={darkMode}
              />
            </div>
          </div>
        </motion.div>

        <div className="flex-1 pt-[40px] pb-[200px]" style={{ paddingLeft: "clamp(32px, 9vw, 140px)", paddingRight: "clamp(32px, 9vw, 140px)" }}>

          <div className="flex flex-col gap-10 mb-16">
            <motion.h1
              className="font-medium tracking-[-0.96px] leading-[1.2]"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)", color: darkMode ? "white" : "black", fontFamily: "'Instrument Sans', sans-serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
            >
              {project.title}
            </motion.h1>

            {project.meta && (
                <motion.div
                  className="flex flex-wrap mt-2"
                  style={{ gap: "clamp(16px, 4vw, 80px)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25, ease }}
                >
                  {project.meta.map((item, i) => (
                    <div key={i} className="flex flex-col gap-1" style={{ minWidth: "clamp(80px, 10vw, 140px)" }}>
                      <span
                        className="text-xs uppercase tracking-[0.1em]"
                        style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999", fontFamily: "'Instrument Sans', sans-serif" }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="text-base tracking-[-0.32px] leading-[1.5]"
                        style={{ color: darkMode ? "white" : "black", whiteSpace: "pre-line" }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
          </div>

          {renderSections()}
                    </div>
          </div>
      <div style={{ padding: "0 clamp(24px, 4vw, 60px)" }}>
        <Footer darkMode={darkMode} onNavigate={(href) => {
          const id = href.replace("#", "");
          if (id === "play") { window.location.hash = "#play"; return; }
          onBack(project);
          const tryScroll = (attempts = 0) => {
            if (id === "home") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
            else if (attempts < 10) setTimeout(() => tryScroll(attempts + 1), 100);
          };
          setTimeout(tryScroll, 700);
        }} />
        </div>
      <GlassCursor darkMode={darkMode} />
    </motion.div>
  );
}
