import { motion } from "framer-motion";
import { useEffect, useCallback } from "react";

const ease = [0.22, 1, 0.36, 1];

function HeroSection({ section }) {
  return (
    <div className="w-full h-[400px] 2xl:h-[480px] rounded-[19px] overflow-hidden">
      {section.video ? (
        <video
          className="w-full h-full object-cover"
          src={section.video}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          src={section.image}
          alt={section.alt || ""}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}

function TextSection({ section, darkMode }) {
  return (
    <div className="flex flex-col gap-3 px-2">
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

export default function ProjectModal({ project, darkMode, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  const sections = project.caseStudy || [];

  return (
    <motion.div
      className="fixed inset-0 z-[9000] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease }}
      onClick={handleBackdropClick}
    >
      <motion.div
        className="relative rounded-[16px] overflow-y-auto overflow-x-hidden"
        style={{
          width: "80%",
          maxWidth: "80%",
          height: "90vh",
          backgroundColor: darkMode ? "#1a1a1a" : "white",
        }}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease }}
      >
        <button
          onClick={onClose}
          className="sticky top-4 float-right mr-4 mt-4 z-10 w-8 h-8 flex items-center justify-center rounded-full cursor-none"
          style={{
            backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke={darkMode ? "white" : "black"}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="flex flex-col gap-10 px-[200px] pb-[200px] pt-[80px]">
          <div className="flex flex-col gap-6">
            <h2
              className="text-4xl font-medium tracking-[-0.72px] leading-[1.2]"
              style={{ color: darkMode ? "white" : "black", fontFamily: "'Instrument Sans', sans-serif" }}
            >
              {project.title}
            </h2>

            {project.meta && (
              <div className="flex justify-between mt-2">
                {project.meta.map((item, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span
                      className="text-base tracking-[-0.32px]"
                      style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#aaa" }}
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
              </div>
            )}
          </div>

          {sections.map((section, i) => {
            switch (section.type) {
              case "hero":
                return <HeroSection key={i} section={section} />;
              case "text":
                return <TextSection key={i} section={section} darkMode={darkMode} />;
              case "image":
                return <ImageSection key={i} section={section} />;
              case "split":
                return <SplitSection key={i} section={section} darkMode={darkMode} />;
              default:
                return null;
            }
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
