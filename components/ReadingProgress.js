import { useState, useEffect } from 'react';

export default function ReadingProgress() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      
      if (scrollHeight) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', updateScrollCompletion);
    
    // Initialize on mount
    updateScrollCompletion();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', updateScrollCompletion);
  }, []);
  
  return (
    <div className="reading-progress-container">
      <div 
        className="reading-progress-bar" 
        style={{ width: `${completion}%` }}
        role="progressbar"
        aria-valuenow={completion}
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  );
}
