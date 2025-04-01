import { useEffect, useState } from 'react';

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  
  // Only run animation after component is mounted to avoid SSR issues
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="animated-background">
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>
      
      <style jsx>{`
        .animated-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
          opacity: 0.2;
        }
        
        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
        }
        
        .orb-1 {
          top: 20%;
          left: 10%;
          width: 50vw;
          height: 50vw;
          background: var(--color-primary);
          animation: float 20s ease-in-out infinite alternate;
        }
        
        .orb-2 {
          bottom: 10%;
          right: 15%;
          width: 40vw;
          height: 40vw;
          background: #0F9D58;
          animation: float 15s ease-in-out 2s infinite alternate-reverse;
        }
        
        .orb-3 {
          top: 60%;
          left: 40%;
          width: 30vw;
          height: 30vw;
          background: #DB4437;
          animation: float 18s ease-in-out 1s infinite alternate;
        }
        
        @keyframes float {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(5%, 5%) scale(1.05);
          }
          100% {
            transform: translate(-5%, -5%) scale(0.95);
          }
        }
        
        /* Adjust for dark mode */
        :global([data-theme="dark"]) .animated-background {
          opacity: 0.12;
        }
      `}</style>
    </div>
  );
}
