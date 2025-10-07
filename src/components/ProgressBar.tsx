import React, { useState, useEffect } from 'react';

interface ProgressBarProps {
  className?: string;
  showPercentage?: boolean;
  height?: number;
  color?: string;
  backgroundColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  className = '',
  showPercentage = false,
  height = 3,
  color = 'linear-gradient(90deg, #2563eb, #7c3aed)',
  backgroundColor = 'rgba(0,0,0,0.1)'
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Calculate the maximum scroll distance
      const maxScroll = documentHeight - windowHeight;
      
      if (maxScroll > 0) {
        const progress = (scrollTop / maxScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
        
        // Show progress bar when user starts scrolling
        setIsVisible(scrollTop > 50);
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          calculateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial calculation
    calculateScrollProgress();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateScrollProgress, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateScrollProgress);
    };
  }, []);

  const progressBarStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: `${height}px`,
    backgroundColor,
    zIndex: 9999,
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none'
  };

  const progressFillStyle: React.CSSProperties = {
    height: '100%',
    width: `${scrollProgress}%`,
    background: color,
    transition: 'width 0.1s ease',
    borderRadius: height > 4 ? `${height / 2}px` : '0'
  };

  const percentageStyle: React.CSSProperties = {
    position: 'fixed',
    top: `${height + 5}px`,
    right: '20px',
    background: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    zIndex: 9999,
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none'
  };

  return (
    <>
      <div 
        className={`scroll-progress-bar ${className}`}
        style={progressBarStyle}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      >
        <div 
          className="scroll-progress-fill"
          style={progressFillStyle}
        />
      </div>
      
      {showPercentage && (
        <div 
          className="scroll-progress-percentage"
          style={percentageStyle}
        >
          {Math.round(scrollProgress)}%
        </div>
      )}
    </>
  );
};

export default ProgressBar;