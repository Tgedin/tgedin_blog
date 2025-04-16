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
      {/* Removed old pattern divs */}
      {/* Add three orb divs */}
      <div className="orb orb1"></div>
      <div className="orb orb2"></div>
      <div className="orb orb3"></div>

      <style jsx>{`
        /* Define orb movement animations */
        @keyframes moveOrb1 {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(10vw, 15vh);
          }
          100% {
            transform: translate(0, 0);
          }
        }
        @keyframes moveOrb2 {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-15vw, -10vh);
          }
          100% {
            transform: translate(0, 0);
          }
        }
        @keyframes moveOrb3 {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(5vw, -20vh);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        .background-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
          /* Base opacity for the container - can be adjusted */
          opacity: 1;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          /* Large blur effect */
          filter: blur(100px);
          /* Increased base opacity for light mode */
          opacity: 0.5;
          /* Changed blend mode for light mode */
          mix-blend-mode: overlay;
          will-change: transform; /* Optimize animation */
        }

        /* Orb 1: Primary color, top left */
        .orb1 {
          width: 400px;
          height: 400px;
          top: -100px;
          left: -100px;
          /* Slightly stronger color for light mode */
          background-color: rgba(var(--color-primary-rgb), 0.6);
          animation: moveOrb1 45s ease-in-out infinite alternate;
        }

        /* Orb 2: Secondary color, bottom right */
        .orb2 {
          width: 500px;
          height: 500px;
          bottom: -150px;
          right: -150px;
          /* Stronger accent color for light mode */
          background-color: rgba(139, 90, 43, 0.4);
          animation: moveOrb2 60s ease-in-out infinite alternate;
        }

        /* Orb 3: Tertiary color, center-ish */
        .orb3 {
          width: 350px;
          height: 350px;
          top: 30%;
          left: 40%;
          /* Stronger tertiary color for light mode */
          background-color: rgba(100, 180, 200, 0.5);
          animation: moveOrb3 50s ease-in-out infinite alternate;
        }

        /* Adjust for dark mode */
        :global([data-theme="dark"]) .orb {
          /* Use screen or lighten blend mode for dark */
          mix-blend-mode: screen;
          opacity: 0.4; /* Slightly more visible in dark mode */
        }

        /* Adjust specific orb colors/opacity for dark mode if needed */
        :global([data-theme="dark"]) .orb1 {
          background-color: rgba(var(--color-primary-rgb), 0.3);
        }
        :global([data-theme="dark"]) .orb2 {
          /* Use a lighter/different accent for dark mode */
          background-color: rgba(122, 182, 255, 0.2);
          opacity: 0.3;
        }
        :global([data-theme="dark"]) .orb3 {
          background-color: rgba(80, 150, 170, 0.3);
        }

        /* Reduce motion preference */
        @media (prefers-reduced-motion) {
          .orb {
            animation: none;
            /* Optionally make them static but visible */
            opacity: 0.1;
          }
          :global([data-theme="dark"]) .orb {
            opacity: 0.15;
          }
        }
      `}</style>
    </div>
  );
}
