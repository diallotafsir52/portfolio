import React, { useEffect, useState, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface StatItemProps {
  number: string;
  label: string;
  delay?: number;
}

const StatItem: React.FC<StatItemProps> = ({ number, label, delay = 0 }) => {
  const [displayNumber, setDisplayNumber] = useState('0');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Animate number counting
      const targetNum = parseInt(number.replace(/\D/g, ''));
      const suffix = number.replace(/\d/g, '');
      let current = 0;
      const increment = targetNum / 20;
      
      const counter = setInterval(() => {
        current += increment;
        if (current >= targetNum) {
          setDisplayNumber(number);
          clearInterval(counter);
        } else {
          setDisplayNumber(Math.floor(current) + suffix);
        }
      }, 50);
      
      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [number, delay]);

  return (
    <div className={`stat-item ${isVisible ? 'visible' : ''}`}>
      <span className="stat-number">{displayNumber}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
};

const Hero: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const subtitle = t('hero.subtitle');

  // Typing effect
  useEffect(() => {
    setIsTyping(true);
    setTypedText('');
    
    let i = 0;
    const timer = setInterval(() => {
      if (i < subtitle.length) {
        setTypedText(subtitle.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [subtitle]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const handleDownloadResume = () => {
    // You can add a resume download link here
    const resumeUrl = '/assets/resume_mamadou_tafsir_diallo.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Mamadou_Tafsir_Diallo_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statsData = [
    { number: '9+', labelKey: 'hero.stats.years', delay: 0 },
    { number: '11+', labelKey: 'hero.stats.countries', delay: 200 },
    { number: '100+', labelKey: 'hero.stats.facilities', delay: 400 },
    { number: '3', labelKey: 'hero.stats.organizations', delay: 600 }
  ];

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-shape hero-shape-1"></div>
        <div className="hero-shape hero-shape-2"></div>
        <div className="hero-shape hero-shape-3"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-intro">
          <h1 className="hero-title">
            <span className="hero-greeting">
              {currentLanguage === 'fr' ? 'Bonjour, je suis' : 'Hello, I\'m'}
            </span>
            <span className="hero-name">{t('hero.title')}</span>
          </h1>
          
          <div className="hero-subtitle-container">
            <span className="hero-subtitle">
              {typedText}
              {(isTyping || showCursor) && <span className="cursor">|</span>}
            </span>
          </div>
          
          <div className="hero-description">
            <p>"{t('hero.description')}"</p>
          </div>
        </div>
        
        <div className="stats-bar">
          {statsData.map((stat, index) => (
            <StatItem
              key={index}
              number={stat.number}
              label={t(stat.labelKey)}
              delay={stat.delay}
            />
          ))}
        </div>
        
        <div className="cta-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => scrollToSection('projects')}
            aria-label={t('hero.cta.work')}
          >
            <span className="btn-icon">📊</span>
            <span>{t('hero.cta.work')}</span>
          </button>
          
          <button 
            className="btn btn-secondary"
            onClick={() => scrollToSection('contact')}
            aria-label={t('hero.cta.contact')}
          >
            <span className="btn-icon">💬</span>
            <span>{t('hero.cta.contact')}</span>
          </button>
          
          <button 
            className="btn btn-outline"
            onClick={handleDownloadResume}
            aria-label="Download Resume"
          >
            <span className="btn-icon">📄</span>
            <span>{currentLanguage === 'fr' ? 'Télécharger CV' : 'Download Resume'}</span>
          </button>
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-arrow">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p>{currentLanguage === 'fr' ? 'Défiler vers le bas' : 'Scroll down'}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;