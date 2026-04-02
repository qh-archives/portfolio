import { motion } from "framer-motion";
import { useState, useCallback, useRef, useEffect } from "react";
import { TITLE_VIEWBOX, TITLE_LETTERS, LETTER_SPACING } from "./titlePaths";

const ease = [0.22, 1, 0.36, 1];
const REVEAL_RADIUS = 130;

function parsePath(d) {
  const commands = [];
  const regex = /([MLQCZHVSAZ])([-\d.,\s]*)/gi;
  let match;
  while ((match = regex.exec(d)) !== null) {
    const type = match[1];
    const rawArgs = match[2].trim();
    const args = rawArgs.length ? rawArgs.split(/[\s,]+/).map(Number) : [];
    commands.push({ type, args: [...args] });
  }
  return commands;
}

function buildPath(commands) {
  return commands.map((c) => `${c.type}${c.args.join(" ")}`).join("");
}

function extractPoints(commands) {
  const points = [];
  let lastAnchorX = 0;
  let lastAnchorY = 0;

  for (let ci = 0; ci < commands.length; ci++) {
    const cmd = commands[ci];
    const t = cmd.type.toUpperCase();
    if (t === "Z") continue;

    if (t === "M" || t === "L") {
      lastAnchorX = cmd.args[0];
      lastAnchorY = cmd.args[1];
      points.push({
        ci, ai: 0,
        x: cmd.args[0], y: cmd.args[1],
        isAnchor: true,
      });
    } else if (t === "Q") {
      points.push({
        ci, ai: 0,
        x: cmd.args[0], y: cmd.args[1],
        isAnchor: false,
        handleFromX: lastAnchorX, handleFromY: lastAnchorY,
        handleToX: cmd.args[2], handleToY: cmd.args[3],
      });
      lastAnchorX = cmd.args[2];
      lastAnchorY = cmd.args[3];
      points.push({
        ci, ai: 2,
        x: cmd.args[2], y: cmd.args[3],
        isAnchor: true,
      });
    } else if (t === "C") {
      points.push({
        ci, ai: 0,
        x: cmd.args[0], y: cmd.args[1],
        isAnchor: false,
        handleFromX: lastAnchorX, handleFromY: lastAnchorY,
      });
      points.push({
        ci, ai: 2,
        x: cmd.args[2], y: cmd.args[3],
        isAnchor: false,
        handleToX: cmd.args[4], handleToY: cmd.args[5],
      });
      lastAnchorX = cmd.args[4];
      lastAnchorY = cmd.args[5];
      points.push({
        ci, ai: 4,
        x: cmd.args[4], y: cmd.args[5],
        isAnchor: true,
      });
    }
  }
  return points;
}

function getOpacity(px, py, mousePos) {
  if (!mousePos) return 0;
  const dx = px - mousePos.x;
  const dy = py - mousePos.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const inner = REVEAL_RADIUS * 0.4;
  if (dist < inner) return 1;
  if (dist < REVEAL_RADIUS) {
    const t = 1 - (dist - inner) / (REVEAL_RADIUS - inner);
    return t * t;
  }
  return 0;
}

function HandleLine({ x1, y1, x2, y2, opacity, pointSize }) {
  if (opacity < 0.02) return null;
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="#0055FF"
      strokeWidth={pointSize * 0.3}
      opacity={opacity * 0.6}
      pointerEvents="none"
    />
  );
}

function DraggablePoint({ point, svgRef, onDrag, pointSize, opacity, xOffset = 0 }) {
  const [dragging, setDragging] = useState(false);

  const handlePointerDown = useCallback((e) => {
    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId);
    setDragging(true);
  }, []);

  const handlePointerMove = useCallback(
    (e) => {
      if (!dragging || !svgRef.current) return;
      const svg = svgRef.current;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const svgPt = pt.matrixTransform(svg.getScreenCTM().inverse());
      onDrag(point.ci, point.ai, svgPt.x - xOffset, svgPt.y);
    },
    [dragging, svgRef, onDrag, point.ci, point.ai, xOffset]
  );

  const handlePointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  const r = point.isAnchor ? pointSize : pointSize * 0.4;
  const size = dragging ? r * 2.8 : r * 2;
  const visible = opacity > 0.02;

  if (!visible && !dragging) return null;

  if (!point.isAnchor) {
    return (
      <rect
        x={point.x - size / 2}
        y={point.y - size / 2}
        width={size}
        height={size}
        fill="white"
        stroke="black"
        strokeWidth={0.8}
        opacity={dragging ? 1 : opacity}
        cursor="none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ touchAction: "none" }}
      />
    );
  }

  return (
    <circle
      cx={point.x}
      cy={point.y}
      r={dragging ? r * 1.4 : r}
      fill="#0055FF"
      stroke="white"
      strokeWidth={1.8}
      opacity={dragging ? 1 : opacity}
      cursor="none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ touchAction: "none" }}
    />
  );
}

function LetterGroup({ letter, index, svgRef, mousePos, darkMode, xOffset = 0 }) {
  const [commands, setCommands] = useState(() => parsePath(letter.path));

  const pathD = buildPath(commands);
  const points = extractPoints(commands);

  const handleDrag = useCallback((ci, ai, x, y) => {
    setCommands((prev) => {
      const next = prev.map((c) => ({ ...c, args: [...c.args] }));
      next[ci].args[ai] = Math.round(x * 100) / 100;
      next[ci].args[ai + 1] = Math.round(y * 100) / 100;
      return next;
    });
  }, []);

  const pointSize = 6.5;

  return (
    <g transform={xOffset ? `translate(${xOffset}, 0)` : undefined}>
      <path d={pathD} fill={darkMode ? "white" : "black"} style={{ transition: "fill 0.2s ease" }} />

      {mousePos && points.map((pt, pi) => {
        const op = getOpacity(pt.x + xOffset, pt.y, mousePos);

        if (!pt.isAnchor) {
          const lineFromOp = pt.handleFromX != null
            ? Math.max(op, getOpacity(pt.handleFromX + xOffset, pt.handleFromY, mousePos))
            : 0;
          const lineToOp = pt.handleToX != null
            ? Math.max(op, getOpacity(pt.handleToX + xOffset, pt.handleToY, mousePos))
            : 0;

          return (
            <g key={pi}>
              {pt.handleFromX != null && (
                <HandleLine
                  x1={pt.handleFromX} y1={pt.handleFromY}
                  x2={pt.x} y2={pt.y}
                  opacity={lineFromOp}
                  pointSize={pointSize}
                />
              )}
              {pt.handleToX != null && (
                <HandleLine
                  x1={pt.x} y1={pt.y}
                  x2={pt.handleToX} y2={pt.handleToY}
                  opacity={lineToOp}
                  pointSize={pointSize}
                />
              )}
              <DraggablePoint
                point={pt}
                svgRef={svgRef}
                onDrag={handleDrag}
                pointSize={pointSize}
                opacity={op}
                xOffset={xOffset}
              />
            </g>
          );
        }

        return (
          <DraggablePoint
            key={pi}
            point={pt}
            svgRef={svgRef}
            onDrag={handleDrag}
            pointSize={pointSize}
            opacity={op}
            xOffset={xOffset}
          />
        );
      })}
    </g>
  );
}

export default function VectorTitle({ darkMode, skipIntro = false }) {
  const svgRef = useRef(null);
  const [mousePos, setMousePos] = useState(null);
  const [revealed, setRevealed] = useState(() => skipIntro);

  useEffect(() => {
    if (skipIntro) setRevealed(true);
  }, [skipIntro]);

  const handleMouseMove = useCallback((e) => {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgPt = pt.matrixTransform(svg.getScreenCTM().inverse());
    setMousePos({ x: svgPt.x, y: svgPt.y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
  }, []);

  return (
    <div className={`${revealed ? "overflow-visible" : "overflow-hidden"} w-[calc(100%+6px)] ml-[-3px] relative`} data-vector-title>
      <motion.div
        initial={skipIntro ? false : { y: "100%" }}
        animate={{ y: "0%" }}
        transition={skipIntro ? { duration: 0 } : { duration: 0.5, delay: 0, ease }}
        className="overflow-visible"
        onAnimationComplete={() => setRevealed(true)}
      >
      <svg
        ref={svgRef}
        viewBox={(() => {
          const parts = TITLE_VIEWBOX.split(" ");
          const glyphCount = TITLE_LETTERS.filter(l => l.path).length;
          const adjustedWidth = Number(parts[2]) + (glyphCount - 1) * LETTER_SPACING;
          return `${parts[0]} ${parts[1]} ${adjustedWidth} ${parts[3]}`;
        })()}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block overflow-visible"
        preserveAspectRatio="xMinYMid meet"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-vector-title
      >
        {(() => {
          let glyphIndex = 0;
          return TITLE_LETTERS.map((letter, i) => {
            if (!letter.path) return null;
            const offset = glyphIndex * LETTER_SPACING;
            glyphIndex++;
            return (
              <LetterGroup
                key={`${letter.char}-${i}`}
                letter={letter}
                index={i}
                svgRef={svgRef}
                mousePos={mousePos}
                darkMode={darkMode}
                xOffset={offset}
              />
            );
          });
        })()}
      </svg>
      </motion.div>
    </div>
  );
}
