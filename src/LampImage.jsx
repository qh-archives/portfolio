import { useEffect, useRef, useState } from "react";

export default function LampImage({ darkMode, className, style }) {
  const [src, setSrc] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const threshold = 240;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (r > threshold && g > threshold && b > threshold) {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setSrc(canvas.toDataURL("image/png"));
    };
    img.src = "/images/shared/ui/lamp.png";
  }, []);

  if (!src) return null;

  return (
    <img
      src={src}
      alt=""
      className={className}
      style={{
        ...style,
        filter: darkMode ? "invert(1)" : "none",
        transition: "filter 0.2s ease",
      }}
    />
  );
}
