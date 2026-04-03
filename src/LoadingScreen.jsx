import { useEffect, useRef } from "react";

const GRID = 20;

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function hash(x, y) {
  let h = x * 374761393 + y * 668265263;
  h = (h ^ (h >> 13)) * 1274126177;
  return ((h ^ (h >> 16)) >>> 0) / 4294967296;
}

export default function LoadingScreen({ onDone }) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const dpr    = window.devicePixelRatio || 1;
    const W = window.innerWidth;
    const H = window.innerHeight;

    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + "px";
    canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);

    const cols = Math.ceil(W / GRID) + 1;
    const rows = Math.ceil(H / GRID) + 1;
    const cx = W / 2;
    const cy = H / 2;
    const maxDist = Math.hypot(cx, cy);

    const n = cols * rows;
    const dotType    = new Uint8Array(n);    // 0=gray, 1=blue-early, 2=blue-late
    const dotReveal  = new Float32Array(n);  // 0–1 normalized reveal time
    const dotDrift   = new Float32Array(n);  // slide distance multiplier
    const dotRowJit  = new Float32Array(n);  // per-dot vertical jitter for drawing

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const idx = c * rows + r;
        const rnd = hash(c, r);

        if (rnd < 0.16) dotType[idx] = 1;
        else if (rnd < 0.34) dotType[idx] = 2;

        const colFrac = c / (cols - 1);
        const rowWobble = (hash(c + 97, r + 31) - 0.5) * 0.28;
        const noise = (hash(c * 7 + 3, r * 13 + 7) - 0.5) * 0.18;
        dotReveal[idx] = Math.max(0, Math.min(1,
          colFrac * 0.7 + Math.abs(r / rows - 0.5) * 0.15 + rowWobble + noise
        ));

        dotDrift[idx] = 0.4 + hash(c + 11, r + 53) * 1.8;
        dotRowJit[idx] = (hash(c + 41, r + 67) - 0.5) * 3;
      }
    }

    const isMobileViewport = W < 768;
    const T_SWEEP   = isMobileViewport ? 1500 : 1800;
    const T_BREATHE = isMobileViewport ? 2100 : 2700;
    const T_MORE    = isMobileViewport ? 2700 : 3400;
    const T_SETTLE  = isMobileViewport ? 3100 : 3800;
    const T_FADE    = isMobileViewport ? 3400 : 4150;
    const DOT_FADE_IN = 0.12;

    const RING_INTERVAL = isMobileViewport ? 500 : 1100;
    const RING_SPEED = isMobileViewport ? 200 : 400;
    const RING_WIDTH = isMobileViewport ? 80 : 120;
    const RING_TAIL = isMobileViewport ? 120 : 200;
    /** Only two ripple waves from the center (second starts after RING_INTERVAL ms). */
    const MAX_RINGS = 2;

    const startTime = performance.now();
    let animId;
    let triggered = false;

    const draw = (now) => {
      const elapsed = now - startTime;

      if (elapsed >= T_FADE && !triggered) {
        triggered = true;
        cancelAnimationFrame(animId);
        onDone();
        return;
      }

      const fadeT = elapsed < T_SETTLE ? 0
        : Math.min((elapsed - T_SETTLE) / (T_FADE - T_SETTLE), 1);

      ctx.clearRect(0, 0, W, H);

      const sweepProgress = Math.min(elapsed / T_SWEEP, 1);
      const sweepEased = easeInOut(sweepProgress);

      const moreBlueFrac = elapsed < T_BREATHE ? 0
        : elapsed < T_MORE ? (elapsed - T_BREATHE) / (T_MORE - T_BREATHE)
        : 1;

      const settleT = elapsed < T_MORE ? 0
        : Math.min((elapsed - T_MORE) / (T_SETTLE - T_MORE), 1);

      for (let c = 0; c < cols; c++) {
        const finalX = c * GRID;

        for (let r = 0; r < rows; r++) {
          const y   = r * GRID;
          const idx = c * rows + r;

          const reveal = dotReveal[idx];
          const localProgress = Math.max(0, Math.min(1, (sweepEased - reveal) / DOT_FADE_IN));
          if (localProgress <= 0) continue;

          const eased = localProgress < 0.5
            ? 2 * localProgress * localProgress
            : 1 - Math.pow(-2 * localProgress + 2, 2) / 2;

          const sv = sweepProgress < 1 ? eased : 1;
          const drift = dotDrift[idx];
          const drawX = sweepProgress < 1
            ? finalX - (1 - eased) * GRID * 5 * drift
            : finalX;
          const drawY = sweepProgress < 1
            ? y + (1 - eased) * dotRowJit[idx] * 2
            : y;

          const type = dotType[idx];
          let blueStr = 0;
          if (type === 1) blueStr = 1;
          else if (type === 2) blueStr = Math.min(moreBlueFrac * 2.5, 1);

          const dist = Math.hypot(finalX - cx, y - cy);
          const dampen = 1 - Math.max(settleT, fadeT);

          let ringHit = 0;
          for (let ri = 0; ri < MAX_RINGS; ri++) {
            const ringAge = elapsed - ri * RING_INTERVAL;
            if (ringAge < 0) continue;
            const ringRadius = ringAge * (RING_SPEED / 1000);
            const delta = dist - ringRadius;
            if (delta > RING_WIDTH || delta < -RING_TAIL) continue;
            let intensity;
            if (delta >= 0) {
              const t = 1 - delta / RING_WIDTH;
              intensity = t * t;
            } else {
              const t = 1 + delta / RING_TAIL;
              intensity = t * t * t * 0.6;
            }
            const ageFade = Math.max(0, 1 - ringAge / (maxDist / (RING_SPEED / 1000) + RING_TAIL));
            ringHit = Math.max(ringHit, intensity * ageFade);
          }
          ringHit *= sv * dampen;

          let sz = 0.9 + ringHit * 1.2;
          if (settleT > 0) sz = sz + (0.9 - sz) * settleT;

          const alphaBoost = 1 + ringHit * 1.5;

          const TARGET_A = 0.07;
          let alpha, gi = 0, bi = 0;
          if (blueStr > 0) {
            gi    = Math.round(85  * blueStr * (1 - settleT));
            bi    = Math.round(255 * blueStr * (1 - settleT));
            alpha = sv * (0.88 * blueStr * (1 - settleT) + TARGET_A * settleT) * alphaBoost;
          } else {
            alpha = sv * (0.38 + (TARGET_A - 0.38) * settleT) * alphaBoost;
          }

          if (fadeT > 0) {
            gi = Math.round(gi * (1 - fadeT));
            bi = Math.round(bi * (1 - fadeT));
            alpha = alpha + (TARGET_A - alpha) * fadeT;
          }
          if (alpha < 0.004) continue;
          ctx.fillStyle = `rgba(0,${gi},${bi},${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(drawX, drawY, sz, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [onDone]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#F7F7F7",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
