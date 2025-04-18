import { useEffect, useRef } from "react";

export default function BricksToBytes({ className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Set canvas dimensions in CSS
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Get theme colors based on current theme
    const isDarkMode =
      document.documentElement.getAttribute("data-theme") === "dark";

    // Colors
    const brickColor = isDarkMode ? "#e57373" : "#9c4a3a"; // Brick red, lighter in dark mode
    const dataColor = isDarkMode ? "#64b5f6" : "#4a7c9c"; // Data blue, lighter in dark mode
    const backgroundColor = isDarkMode ? "#121212" : "#F5F1E9"; // From theme

    // Clear canvas
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Draw the transition
    const drawTransition = () => {
      const width = rect.width;
      const height = rect.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw bricks on the left side
      const brickWidth = width / 20;
      const brickHeight = brickWidth / 2;
      const rows = Math.ceil(height / brickHeight);
      const cols = Math.ceil(width / 2 / brickWidth);

      ctx.fillStyle = brickColor;

      for (let row = 0; row < rows; row++) {
        const offset = row % 2 === 0 ? 0 : brickWidth / 2;
        for (let col = 0; col < cols; col++) {
          const x = col * brickWidth + offset;
          const y = row * brickHeight;

          // Only draw if within the left half with some transition
          const transitionPoint = width * 0.4;
          const transitionWidth = width * 0.2;

          if (x < transitionPoint) {
            // Full brick
            ctx.fillRect(x, y, brickWidth * 0.9, brickHeight * 0.9);
          } else if (x < transitionPoint + transitionWidth) {
            // Transition area - break the brick into pixels
            const progress = (x - transitionPoint) / transitionWidth;
            const pixelSize = brickHeight * 0.2 * (1 + progress);
            const pixelsPerBrick = Math.floor((brickWidth * 0.9) / pixelSize);

            for (let px = 0; px < pixelsPerBrick; px++) {
              for (
                let py = 0;
                py < Math.floor((brickHeight * 0.9) / pixelSize);
                py++
              ) {
                const pixelX = x + px * pixelSize;
                const pixelY = y + py * pixelSize;

                // Randomly skip some pixels based on progress
                if (Math.random() > progress * 0.7) {
                  ctx.fillRect(
                    pixelX,
                    pixelY,
                    pixelSize * 0.8,
                    pixelSize * 0.8
                  );
                }
              }
            }
          }
        }
      }

      // Draw data elements on the right side
      ctx.fillStyle = dataColor;

      const dataStartX = width * 0.5;
      const dataWidth = width * 0.5;
      const pixelSize = width / 80;
      const pixelsPerRow = Math.ceil(dataWidth / pixelSize);
      const pixelRows = Math.ceil(height / pixelSize);

      for (let row = 0; row < pixelRows; row++) {
        for (let col = 0; col < pixelsPerRow; col++) {
          const x = dataStartX + col * pixelSize;
          const y = row * pixelSize;

          // Create a pattern that looks like data/binary
          const transitionPoint = width * 0.6;
          const transitionWidth = width * 0.2;

          if (x > transitionPoint) {
            // Full data region
            if (Math.random() > 0.7) {
              ctx.fillRect(x, y, pixelSize * 0.8, pixelSize * 0.8);
            }
          } else if (x > transitionPoint - transitionWidth) {
            // Transition area
            const progress = (transitionPoint - x) / transitionWidth;

            if (Math.random() > 0.7 - progress * 0.3) {
              const size = pixelSize * (0.8 - progress * 0.3);
              ctx.fillRect(
                x + (pixelSize - size) / 2,
                y + (pixelSize - size) / 2,
                size,
                size
              );
            }
          }
        }
      }
    };

    // Initial draw
    drawTransition();

    // Handle resize
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      drawTransition();
    };

    // Handle theme changes
    const handleThemeChange = () => {
      drawTransition();
    };

    window.addEventListener("resize", handleResize);

    // Add listener for theme toggle if available
    const themeToggle = document.querySelector(".theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", handleThemeChange);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (themeToggle) {
        themeToggle.removeEventListener("click", handleThemeChange);
      }
    };
  }, []);

  return (
    <div className="bricks-canvas-wrapper">
      <canvas
        ref={canvasRef}
        className={`w-full rounded-lg shadow-md ${className || ""}`}
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: "2 / 1",
          maxWidth: 600,
        }}
        aria-label="Visual representation of transition from civil engineering to data science"
      />
      <style jsx>{`
        .bricks-canvas-wrapper {
          width: 100%;
          max-width: 600px;
          margin: 0 auto 2rem auto;
        }
        canvas {
          width: 100% !important;
          height: auto !important;
          max-width: 600px;
          border-radius: 1rem;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          display: block;
        }
        @media (max-width: 700px) {
          .bricks-canvas-wrapper {
            max-width: 98vw;
          }
          canvas {
            max-width: 98vw;
            aspect-ratio: 1.5 / 1;
            min-height: 140px;
          }
        }
      `}</style>
    </div>
  );
}
