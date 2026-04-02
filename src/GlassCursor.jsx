import { useEffect, useRef, useState } from "react";

const CROSSHAIR_SIZE = 36;

export default function GlassCursor({ darkMode }) {
  const crosshairRef = useRef(null);
  const selectionRef = useRef(null);
  const posRef = useRef({ x: -300, y: -300 });
  const targetRef = useRef({ x: -300, y: -300 });
  const rafRef = useRef(null);
  const dragStartRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    const handleMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      if (crosshairRef.current) crosshairRef.current.style.display = "none";
      document.elementFromPoint(e.clientX, e.clientY);
      if (crosshairRef.current) crosshairRef.current.style.display = "";
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });

      if (dragStartRef.current) {
        const sx = dragStartRef.current.x;
        const sy = dragStartRef.current.y;
        setSelection({
          x: Math.min(sx, e.clientX),
          y: Math.min(sy, e.clientY),
          w: Math.abs(e.clientX - sx),
          h: Math.abs(e.clientY - sy),
        });
      }
    };

    const handleDown = (e) => {
      const el = e.target;
      if (el.closest("a, button, [data-vector-title], video, input, textarea")) return;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      setSelection(null);
    };

    const handleUp = () => {
      dragStartRef.current = null;
      setTimeout(() => setSelection(null), 300);
    };

    const handleLeave = () => {
      setVisible(false);
      dragStartRef.current = null;
      setSelection(null);
    };

    const animate = () => {
      const dx = targetRef.current.x - posRef.current.x;
      const dy = targetRef.current.y - posRef.current.y;
      posRef.current.x = targetRef.current.x;
      posRef.current.y = targetRef.current.y;

      if (crosshairRef.current) {
        const x = posRef.current.x - CROSSHAIR_SIZE / 2;
        const y = posRef.current.y - CROSSHAIR_SIZE / 2;
        crosshairRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  const ch = CROSSHAIR_SIZE / 2;
  const color = "#0055FF";

  return (
    <>
      <div
        ref={crosshairRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: CROSSHAIR_SIZE,
          height: CROSSHAIR_SIZE,
          pointerEvents: "none",
          zIndex: 10000,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s ease",
          willChange: "transform",
        }}
      >
        <svg width={CROSSHAIR_SIZE} height={CROSSHAIR_SIZE} viewBox={`0 0 ${CROSSHAIR_SIZE} ${CROSSHAIR_SIZE}`} overflow="visible">
          <line x1={0} y1={ch} x2={CROSSHAIR_SIZE} y2={ch} stroke={color} strokeWidth="1" />
          <line x1={ch} y1={0} x2={ch} y2={CROSSHAIR_SIZE} stroke={color} strokeWidth="1" />
          <circle cx={ch} cy={ch} r={10} fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
          <circle cx={ch} cy={ch} r="1.5" fill={color} />

          <text x={CROSSHAIR_SIZE + 6} y={ch + 1} fill={color} fontSize="9" fontFamily="'SF Mono', 'Menlo', monospace" dominantBaseline="middle" opacity="0.7">
            X: {coords.x}
          </text>
          <text x={ch} y={CROSSHAIR_SIZE + 12} fill={color} fontSize="9" fontFamily="'SF Mono', 'Menlo', monospace" textAnchor="middle" opacity="0.7">
            Y: {coords.y}
          </text>
        </svg>
      </div>

      {selection && selection.w > 2 && selection.h > 2 && (
        <div
          ref={selectionRef}
          style={{
            position: "fixed",
            left: selection.x,
            top: selection.y,
            width: selection.w,
            height: selection.h,
            backgroundColor: "rgba(0, 85, 255, 0.08)",
            border: "1px solid rgba(0, 85, 255, 0.5)",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        />
      )}
    </>
  );
}
