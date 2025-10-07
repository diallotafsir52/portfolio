import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface SocialLink {
  name: string;
  icon: string;
  url: string;
  label: string;
}

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  titleKey: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const socialLinks: SocialLink[] = [
    {
      name: 'linkedin',
      icon: '💼',
      url: 'https://www.linkedin.com/in/diallotafsir52/',
      label: 'LinkedIn Profile'
    },
    {
      name: 'email',
      icon: '📧',
      url: 'mailto:diallotafsir52@gmail.com',
      label: 'Email Contact'
    },
    {
      name: 'phone',
      icon: '📱',
      url: 'tel:+221781453881',
      label: 'WhatsApp Contact'
    },
    {
      name: 'location',
      icon: '📍',
      url: 'https://maps.google.com/?q=Dakar,Senegal',
      label: 'Location'
    }
  ];

  const footerSections: FooterSection[] = [
    {
      titleKey: 'footer.services.title',
      links: [
        {
          label: currentLanguage === 'fr' ? 'Architecture DHIS2' : 'DHIS2 Architecture',
          href: '#projects'
        },
        {
          label: currentLanguage === 'fr' ? 'Migration de données' : 'Data Migration',
          href: '#projects'
        },
        {
          label: currentLanguage === 'fr' ? 'Intégration systèmes' : 'System Integration',
          href: '#projects'
        },
        {
          label: currentLanguage === 'fr' ? 'Formation & support' : 'Training & Support',
          href: '#contact'
        }
      ]
    },
    {
      titleKey: 'footer.expertise.title',
      links: [
        {
          label: 'DHIS2',
          href: '#skills'
        },
        {
          label: currentLanguage === 'fr' ? 'Cloud Computing' : 'Cloud Computing',
          href: '#skills'
        },
        {
          label: currentLanguage === 'fr' ? 'Pipelines ETL' : 'ETL Pipelines',
          href: '#skills'
        },
        {
          label: 'DevOps & CI/CD',
          href: '#skills'
        }
      ]
    },
    {
      titleKey: 'footer.resources.title',
      links: [
        {
          label: currentLanguage === 'fr' ? 'Portfolio complet' : 'Full Portfolio',
          href: '#projects'
        },
        {
          label: currentLanguage === 'fr' ? 'Études de cas' : 'Case Studies',
          href: '#projects',
          external: true
        },
        {
          label: currentLanguage === 'fr' ? 'Certifications' : 'Certifications',
          href: '#skills'
        },
        {
          label: 'CV (PDF)',
          href: '/cv-tafsir-diallo.pdf',
          external: true
        }
      ]
    }
  ];

  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Main Footer Content */}
          <div className="footer-main">
            {/* Brand Section */}
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-icon">🏥</span>
                <span className="logo-text">Mamadou Tafsir Diallo</span>
              </div>
              <p className="footer-tagline">
                {currentLanguage === 'fr' 
                  ? 'Architecte de Solutions DHIS2 | Expert en Systèmes d\'Information de Santé'
                  : 'DHIS2 Solution Architect | Health Information Systems Expert'
                }
              </p>
              <p className="footer-description">
                {currentLanguage === 'fr'
                  ? 'Transformant les données de santé en informations exploitables pour améliorer les soins humanitaires à travers le monde.'
                  : 'Transforming health data into actionable insights to improve humanitarian care worldwide.'
                }
              </p>

              {/* Quick Stats */}
              <div className="footer-stats">
                <div className="stat-item">
                  <span className="stat-number">9+</span>
                  <span className="stat-label">
                    {currentLanguage === 'fr' ? 'Années' : 'Years'}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">11+</span>
                  <span className="stat-label">
                    {currentLanguage === 'fr' ? 'Pays' : 'Countries'}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">3</span>
                  <span className="stat-label">
                    {currentLanguage === 'fr' ? 'ONG Internationales' : 'International NGOs'}
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div className="social-links">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <span className="social-icon">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Sections */}
            <div className="footer-sections">
              {footerSections.map((section, index) => (
                <div key={index} className="footer-section">
                  <h4 className="section-title">
                    {section.titleKey === 'footer.services.title' && (currentLanguage === 'fr' ? 'Services' : 'Services')}
                    {section.titleKey === 'footer.expertise.title' && (currentLanguage === 'fr' ? 'Expertise' : 'Expertise')}
                    {section.titleKey === 'footer.resources.title' && (currentLanguage === 'fr' ? 'Ressources' : 'Resources')}
                  </h4>
                  <ul className="section-links">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noopener noreferrer' : undefined}
                          className="footer-link"
                          onClick={(e) => {
                            if (!link.external && link.href.startsWith('#')) {
                              e.preventDefault();
                              const element = document.querySelector(link.href);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                              }
                            }
                          }}
                        >
                          {link.label}
                          {link.external && <span className="external-icon">↗</span>}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="footer-cta">
            <div className="cta-content">
              <h3 className="cta-title">
                {currentLanguage === 'fr' 
                  ? 'Prêt à démarrer votre projet ?'
                  : 'Ready to start your project?'
                }
              </h3>
              <p className="cta-description">
                {currentLanguage === 'fr'
                  ? 'Contactez-moi pour discuter de vos besoins en systèmes d\'information de santé.'
                  : 'Get in touch to discuss your health information system needs.'
                }
              </p>
              <div className="cta-buttons">
                <a 
                  href="mailto:diallotafsir52@gmail.com"
                  className="btn btn-primary"
                >
                  📧 {currentLanguage === 'fr' ? 'Contactez-moi' : 'Contact Me'}
                </a>
                <a 
                  href="https://calendly.com/diallotafsir52/30min"
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📅 {currentLanguage === 'fr' ? 'Planifier un appel' : 'Schedule Call'}
                </a>
              </div>
            </div>
          </div>

          {/* Certifications & Credentials */}
          <div className="footer-credentials">
            <h4 className="credentials-title">
              {currentLanguage === 'fr' ? 'Certifications & Accréditations' : 'Certifications & Credentials'}
            </h4>
            <div className="credentials-list">
              <div className="credential-item">
                <span className="credential-icon">🏆</span>
                <span className="credential-text">Google Cloud Certified - Associate Cloud Engineer</span>
              </div>
              <div className="credential-item">
                <span className="credential-icon">🎓</span>
                <span className="credential-text">DHIS2 Level 1 Certified - Oslo University</span>
              </div>
              <div className="credential-item">
                <span className="credential-icon">📱</span>
                <span className="credential-text">DHIS2 Android Implementation Certified</span>
              </div>
              <div className="credential-item">
                <span className="credential-icon">🔬</span>
                <span className="credential-text">DHIS2 Disease Surveillance Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>
                &copy; {currentYear} Mamadou Tafsir Diallo. 
                {currentLanguage === 'fr' 
                  ? ' Tous droits réservés. Fait avec passion pour la santé mondiale.'
                  : ' All rights reserved. Made with passion for global health.'
                }
              </p>
            </div>

            <div className="footer-meta">
              <div className="availability-status">
                <span className="status-indicator online"></span>
                <span className="status-text">
                  {currentLanguage === 'fr' ? 'Disponible pour nouveaux projets' : 'Available for new projects'}
                </span>
              </div>

              <button 
                className="back-to-top"
                onClick={scrollToTop}
                aria-label={currentLanguage === 'fr' ? 'Retour en haut' : 'Back to top'}
              >
                <span className="back-to-top-icon">↑</span>
                <span className="back-to-top-text">
                  {currentLanguage === 'fr' ? 'Haut' : 'Top'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="footer-bg-elements">
          <div className="bg-shape bg-shape-1"></div>
          <div className="bg-shape bg-shape-2"></div>
          <div className="bg-shape bg-shape-3"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;