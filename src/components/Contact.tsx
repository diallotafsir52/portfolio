import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';



const Contact: React.FC = () => {
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


  const availability = {
    timezone: 'GMT+0 (Dakar)',
    hours: currentLanguage === 'fr' ? '9h00 - 18h00' : '9:00 AM - 6:00 PM',
    response: currentLanguage === 'fr' ? 'Réponse sous 24h' : 'Response within 24h',
    languages: 'Français | English'
  };

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="container">
        <div className={`section-header ${isInView ? 'visible' : ''}`}>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-subtitle">
            {t('contact.description')}
          </p>
        </div>


        <div style={{
          maxWidth: 600,
          margin: '0 auto',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 20,
          boxShadow: '0 4px 24px rgba(44,62,80,0.10)',
          padding: '2.2rem 1.5rem 2rem',
          textAlign: 'center',
          color: '#fff',
        }}>
          <h3 style={{marginBottom: '1.2rem', color: '#fff', fontWeight: 700, fontSize: '2rem', letterSpacing: '-1px'}}>
            {currentLanguage === 'fr' ? 'Contact' : 'Contact'}
          </h3>
          <p style={{color: '#fff', fontSize: '1.1rem', marginBottom: '2rem', fontWeight: 500}}>
            {currentLanguage === 'fr'
              ? "Prêt à transformer votre système d'information de santé ? Discutons de la façon dont je peux vous aider à atteindre vos objectifs."
              : "Ready to transform your health information system? Let's discuss how I can help you achieve your goals."}
          </p>
          <div style={{marginBottom: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <a
              href="mailto:diallotafsir52@gmail.com"
              style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: 24,
                padding: '0.9rem 2.2rem',
                fontWeight: 700,
                fontSize: '1.1rem',
                boxShadow: '0 2px 8px rgba(44,62,80,0.10)',
                cursor: 'pointer',
                transition: 'background 0.2s',
                textDecoration: 'none',
                display: 'inline-block',
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              📧 {currentLanguage === 'fr' ? 'Contactez-moi' : 'Contact Me'}
            </a>
            <a
              href="https://calendly.com/diallotafsir52/30min"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#fff',
                color: '#2563eb',
                border: 'none',
                borderRadius: 24,
                padding: '0.9rem 2.2rem',
                fontWeight: 700,
                fontSize: '1.1rem',
                boxShadow: '0 2px 8px rgba(44,62,80,0.10)',
                cursor: 'pointer',
                transition: 'background 0.2s',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              📅 {currentLanguage === 'fr' ? 'Prendre rendez-vous' : 'Schedule a Call'}
            </a>
          </div>
          <div style={{color: '#e0e7ff', fontSize: '0.98rem', marginTop: 8, marginBottom: 8}}>
            {currentLanguage === 'fr' ? 'Réponse garantie sous 24h' : 'Guaranteed response within 24h'}
          </div>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, color: '#e0e7ff', fontSize: '1.05rem', textAlign: 'left'}}>
            <li style={{marginBottom: 6}}><b>{currentLanguage === 'fr' ? 'Heures de travail' : 'Working Hours'}:</b> {availability.hours} <span style={{color: '#c7d2fe'}}>{availability.timezone}</span></li>
            <li style={{marginBottom: 6}}><b>{currentLanguage === 'fr' ? 'Temps de réponse' : 'Response Time'}:</b> {availability.response}</li>
            <li style={{marginBottom: 6}}><b>{currentLanguage === 'fr' ? 'Langues' : 'Languages'}:</b> {availability.languages}</li>
            <li><b>{currentLanguage === 'fr' ? 'Disponibilité' : 'Availability'}:</b> {t('contact.availability.value')}</li>
          </ul>
        </div>


      </div>
    </section>
  );
};

export default Contact;