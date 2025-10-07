import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="home" className="hero" ref={sectionRef}>
      <div className="hero-content">
        {/* Profile Image Section */}
        <div className="hero-profile">
          <div className="profile-image-container">
            <img 
              src="/profile.jpg" 
              alt="Mamadou Tafsir Diallo - DHIS2 Solution Architect"
              className="profile-image"
              loading="eager"
            />
            <div className="profile-badge">
              <span className="status-indicator"></span>
              <span className="status-text">
                {currentLanguage === 'fr' ? 'Disponible' : 'Available'}
              </span>
            </div>
          </div>
        </div>

        <h1>Mamadou Tafsir Diallo</h1>
        
        <div className={`hero-text ${isInView ? 'visible' : ''}`}>
          <div className="hero-subtitle">{t('hero.title')}</div>
          <div className="hero-description">"{t('hero.subtitle')}"</div>
          
          <div className="stats-bar">
            <div className="stat-item">
              <span className="stat-number">10+</span>
              <span className="stat-label">
                {currentLanguage === 'fr' ? 'Années d\'Expérience' : 'Years Experience'}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-number">11+</span>
              <span className="stat-label">
                {currentLanguage === 'fr' ? 'Pays Déployés' : 'Countries Deployed'}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">
                {currentLanguage === 'fr' ? 'Centres de Santé' : 'Health Facilities'}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3</span>
              <span className="stat-label">
                {currentLanguage === 'fr' ? 'Grandes Organisations' : 'Major Organizations'}
              </span>
            </div>
          </div>
          
          <div className="cta-buttons">
            <a href="#projects" className="btn btn-primary">{t('hero.cta.work')}</a>
            <a href="#contact" className="btn btn-secondary">{t('hero.cta.contact')}</a>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="hero-decorations">
          <div className="floating-icon icon-1">🏥</div>
          <div className="floating-icon icon-2">📊</div>
          <div className="floating-icon icon-3">☁️</div>
          <div className="floating-icon icon-4">🌍</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;