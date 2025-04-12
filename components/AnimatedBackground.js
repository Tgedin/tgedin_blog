import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  // Only run after component is mounted to avoid SSR issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="background-container">
      <div className="pattern-grid"></div>
      <div className="blueprint-lines"></div>
      <div className="data-dots"></div>

      <style jsx>{`
        .background-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
          opacity: 0.08;
        }

        .pattern-grid {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(
              var(--color-border) 1px,
              transparent 1px
            ),
            linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .blueprint-lines {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(
            45deg,
            var(--color-primary) 10%,
            transparent 10%,
            transparent 50%,
            var(--color-primary) 50%,
            var(--color-primary) 60%,
            transparent 60%,
            transparent 100%
          );
          background-size: 40px 40px;
          opacity: 0.08;
        }

        .data-dots {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(
            var(--color-primary) 1px,
            transparent 1px
          );
          background-size: 40px 40px;
          opacity: 0.1;
        }

        /* Adjust for dark mode */
        :global([data-theme="dark"]) .background-container {
          opacity: 0.05;
        }
      `}</style>
    </div>
  );
}
