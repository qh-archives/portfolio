import { useState, useCallback, useRef, useEffect } from "react";

const STRING_ANCHOR_X = 0;
const STRING_ANCHOR_Y = 0;
const STRING_REST_LENGTH = 60;
const BALL_RADIUS = 8;
const HOVER_NUDGE = 6;
const PULL_THRESHOLD = 100;

export default function PullString({ className, style, onPull, darkMode }) {
  const svgRef = useRef(null);
  const pullingRef = useRef(false);
  const crossedRef = useRef(false);
  const [endY, setEndY] = useState(STRING_REST_LENGTH);
  const [endX, setEndX] = useState(0);
  const velocityRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: STRING_REST_LENGTH });
  const rafRef = useRef(null);
  const nudgedRef = useRef(false);
  const onPullRef = useRef(onPull);
  onPullRef.current = onPull;

  useEffect(() => {
    const introTimer = setTimeout(() => {
      velocityRef.current.x = 10;
      velocityRef.current.y = 4;
    }, 2000);

    const springK = 0.08;
    const damping = 0.88;
    const restX = 0;
    const restY = STRING_REST_LENGTH;

    const animate = () => {
      if (!pullingRef.current) {
        const dx = restX - posRef.current.x;
        const dy = restY - posRef.current.y;

        velocityRef.current.x += dx * springK;
        velocityRef.current.y += dy * springK;
        velocityRef.current.x *= damping;
        velocityRef.current.y *= damping;

        posRef.current.x += velocityRef.current.x;
        posRef.current.y += velocityRef.current.y;

        setEndX(posRef.current.x);
        setEndY(posRef.current.y);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      clearTimeout(introTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handlePointerDown = useCallback((e) => {
    e.stopPropagation();
    pullingRef.current = true;
    crossedRef.current = false;
    velocityRef.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!pullingRef.current || !svgRef.current) return;
      const svg = svgRef.current;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const svgPt = pt.matrixTransform(svg.getScreenCTM().inverse());

      const dx = svgPt.x - STRING_ANCHOR_X;
      const dy = Math.max(svgPt.y - STRING_ANCHOR_Y, 20);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 160;
      const clampedDist = Math.min(dist, maxDist);
      const angle = Math.atan2(dy, dx);

      posRef.current = {
        x: Math.cos(angle) * clampedDist,
        y: Math.sin(angle) * clampedDist,
      };
      setEndX(posRef.current.x);
      setEndY(posRef.current.y);

      if (clampedDist > PULL_THRESHOLD) {
        crossedRef.current = true;
      }
    };

    const handlePointerUp = () => {
      if (pullingRef.current && crossedRef.current) {
        onPullRef.current?.();
      }
      pullingRef.current = false;
      crossedRef.current = false;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const handlePointerEnter = useCallback(() => {
    if (!pullingRef.current && !nudgedRef.current) {
      nudgedRef.current = true;
      velocityRef.current.x += (Math.random() > 0.5 ? 1 : -1) * HOVER_NUDGE;
      velocityRef.current.y += 2;
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    nudgedRef.current = false;
  }, []);

  const midX = endX * 0.3;
  const midY = endY * 0.6;
  const color = darkMode ? "white" : "black";

  return (
    <svg
      ref={svgRef}
      className={className}
      style={{ overflow: "visible", pointerEvents: "none", ...style }}
      width="60"
      height="200"
      viewBox="-30 0 60 200"
    >
      <path
        d={`M ${STRING_ANCHOR_X} ${STRING_ANCHOR_Y} Q ${midX} ${midY}, ${endX} ${endY}`}
        fill="none"
        stroke="transparent"
        strokeWidth="20"
        style={{ pointerEvents: "stroke", cursor: "none" }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      />
      <path
        d={`M ${STRING_ANCHOR_X} ${STRING_ANCHOR_Y} Q ${midX} ${midY}, ${endX} ${endY}`}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ pointerEvents: "none", transition: "stroke 0.2s ease" }}
      />
      <circle
        cx={endX}
        cy={endY}
        r={BALL_RADIUS}
        fill={color}
        style={{ cursor: "none", pointerEvents: "auto", touchAction: "none", transition: "fill 0.2s ease" }}
        onPointerDown={handlePointerDown}
      />
    </svg>
  );
}
