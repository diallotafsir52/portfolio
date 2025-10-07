import React from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { currentLanguage, switchLanguage } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    switchLanguage(lang);
    
    // Optional: Add analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'language_change', {
        event_category: 'User Interaction',
        event_label: lang,
      });
    }
  };

  return (
    <div className="language-toggle" role="group" aria-label="Language selection">
      <button
        className={`lang-btn ${currentLanguage === 'en' ? 'active' : ''}`}
        onClick={() => handleLanguageChange('en')}
        aria-pressed={currentLanguage === 'en'}
        aria-label="Switch to English"
        type="button"
      >
        <span className="lang-flag">🇺🇸</span>
        <span className="lang-text">EN</span>
      </button>
      <button
        className={`lang-btn ${currentLanguage === 'fr' ? 'active' : ''}`}
        onClick={() => handleLanguageChange('fr')}
        aria-pressed={currentLanguage === 'fr'}
        aria-label="Passer au français"
        type="button"
      >
        <span className="lang-flag">🇫🇷</span>
        <span className="lang-text">FR</span>
      </button>
    </div>
  );
};

export default LanguageToggle;