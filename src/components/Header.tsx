import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest('.nav-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Approximate header height
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      setIsMobileMenuOpen(false);
    }
  };

  const navigationItems = [
    { id: 'home', key: 'nav.home' },
    { id: 'about', key: 'nav.about' },
    { id: 'projects', key: 'nav.projects' },
    { id: 'skills', key: 'nav.skills' },
    { id: 'experience', key: 'nav.experience' },
    { id: 'contact', key: 'nav.contact' }
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`} style={{padding: isScrolled ? '0.5rem 0' : '0.5rem 0'}}>
      <div className="nav-container">
        {/* Logo remplacé par un espace vide pour garder l'alignement */}
        <div className="logo" style={{ minWidth: 40 }}></div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-menu">
            {navigationItems.map(({ id, key }) => (
              <li key={id}>
                <a 
                  href={`#${id}`} 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    scrollToSection(id); 
                  }}
                >
                  {id === 'home' ? t('nav.home') : t(key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={(e) => {
            e.stopPropagation();
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="mobile-nav">
            <ul className="mobile-nav-menu">
              {navigationItems.map(({ id, key }) => (
                <li key={id}>
                  <a 
                    href={`#${id}`} 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      scrollToSection(id); 
                    }}
                  >
                    {id === 'home' ? t('nav.home') : t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;