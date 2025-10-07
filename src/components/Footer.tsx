import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface SocialLink {
  name: string;
  icon: string;
  url: string;
  label: string;
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

  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <style>{`
        .streamlined-footer {
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          color: white;
          position: relative;
          overflow: hidden;
          padding: 3rem 0 1.5rem;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .footer-main {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 2rem;
          align-items: start;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .footer-profile-image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          object-position: center;
          border: 3px solid rgba(255, 255, 255, 0.3);
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.1),
            0 8px 25px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          filter: brightness(1.1) contrast(1.05);
        }

        .footer-profile-image:hover {
          transform: scale(1.05);
          border-color: rgba(255, 255, 255, 0.5);
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.2),
            0 12px 35px rgba(0, 0, 0, 0.4);
        }

        .footer-profile-info {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .footer-name {
          font-size: 1.4rem;
          font-weight: 700;
          color: white;
          margin: 0;
          line-height: 1.2;
        }

        .footer-title {
          font-size: 0.9rem;
          color: #94a3b8;
          font-weight: 500;
          margin: 0;
          line-height: 1.2;
        }

        .footer-tagline {
          font-size: 1rem;
          color: #94a3b8;
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }

        .footer-description {
          color: #cbd5e1;
          line-height: 1.6;
          font-size: 0.9rem;
          max-width: 400px;
        }

        .credentials-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .credentials-title {
          font-size: 1rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.5rem;
        }

        .credentials-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .credential-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: #cbd5e1;
        }

        .credential-icon {
          font-size: 1rem;
          flex-shrink: 0;
        }

        .quick-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .quick-links-title {
          font-size: 1rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.5rem;
        }

        .links-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .quick-link {
          color: #cbd5e1;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          padding: 0.2rem 0;
        }

        .quick-link:hover {
          color: #60a5fa;
          transform: translateX(3px);
        }

        .social-links {
          display: flex;
          gap: 0.8rem;
          margin-top: 1.5rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1.1rem;
        }

        .social-link:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .copyright {
          color: #94a3b8;
          font-size: 0.85rem;
        }

        .footer-meta {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .availability-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          animation: pulse-availability 2s infinite;
        }

        @keyframes pulse-availability {
          0% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }

        .status-text {
          color: #cbd5e1;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .back-to-top {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.85rem;
        }

        .back-to-top:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .back-to-top-icon {
          font-size: 0.9rem;
          font-weight: bold;
        }

        /* Background Elements */
        .footer-bg-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }

        .bg-shape {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          animation: float-shape 20s ease-in-out infinite;
        }

        .bg-shape-1 {
          width: 150px;
          height: 150px;
          top: 20%;
          right: 10%;
          animation-delay: 0s;
        }

        .bg-shape-2 {
          width: 100px;
          height: 100px;
          bottom: 30%;
          left: 15%;
          animation-delay: 7s;
        }

        @keyframes float-shape {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
          }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .footer-main {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          
          .credentials-section {
            grid-column: span 2;
          }
        }

        @media (max-width: 768px) {
          .streamlined-footer {
            padding: 2rem 0 1rem;
          }
          
          .footer-main {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }
          
          .footer-meta {
            flex-direction: column;
            gap: 1rem;
          }
          
          .social-links {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .footer-container {
            padding: 0 1rem;
          }
          
          .footer-profile {
            justify-content: center;
            text-align: center;
            flex-direction: column;
            gap: 0.8rem;
          }
          
          .footer-profile-image {
            width: 50px;
            height: 50px;
          }
          
          .footer-name {
            font-size: 1.2rem;
          }
          
          .footer-title {
            font-size: 0.8rem;
          }
          
          .footer-brand {
            text-align: center;
          }
        }
      `}</style>

      <footer className="streamlined-footer">
        <div className="footer-container">
          <div className="footer-main">
            {/* Brand Section with Photo */}
            <div className="footer-brand">
              <div className="footer-profile">
                <img 
                  src="/profile.jpg" 
                  alt="Mamadou Tafsir Diallo - DHIS2 Solution Architect"
                  className="footer-profile-image"
                  loading="lazy"
                />
                <div className="footer-profile-info">
                  <h3 className="footer-name">Mamadou Tafsir Diallo</h3>
                  <p className="footer-title">
                    {currentLanguage === 'fr' 
                      ? 'Architecte de Solutions DHIS2'
                      : 'DHIS2 Solution Architect'
                    }
                  </p>
                </div>
              </div>
              <p className="footer-tagline">
                {currentLanguage === 'fr'
                  ? 'Expert en Systèmes d\'Information de Santé | 10+ années d\'expérience'
                  : 'Health Information Systems Expert | 10+ years experience'
                }
              </p>
              <p className="footer-description">
                {currentLanguage === 'fr'
                  ? 'Transformant les données de santé en informations exploitables pour améliorer les soins humanitaires à travers le monde.'
                  : 'Transforming health data into actionable insights to improve humanitarian care worldwide.'
                }
              </p>

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
                    <span>{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="quick-links">
              <h4 className="quick-links-title">
                {currentLanguage === 'fr' ? 'Navigation' : 'Quick Links'}
              </h4>
              <div className="links-list">
                <a href="#about" className="quick-link">
                  {currentLanguage === 'fr' ? 'À Propos' : 'About'}
                </a>
                <a href="#projects" className="quick-link">
                  {currentLanguage === 'fr' ? 'Projets' : 'Projects'}
                </a>
                <a href="#skills" className="quick-link">
                  {currentLanguage === 'fr' ? 'Compétences' : 'Skills'}
                </a>
                <a href="#experience" className="quick-link">
                  {currentLanguage === 'fr' ? 'Expérience' : 'Experience'}
                </a>
                <a href="#contact" className="quick-link">
                  {currentLanguage === 'fr' ? 'Contact' : 'Contact'}
                </a>
              </div>
            </div>

            {/* Certifications */}
            <div className="credentials-section">
              <h4 className="credentials-title">
                {currentLanguage === 'fr' ? 'Certifications' : 'Certifications'}
              </h4>
              <div className="credentials-list">
                <div className="credential-item">
                  <span className="credential-icon">🏆</span>
                  <span>Google Cloud ACE Certified</span>
                </div>
                <div className="credential-item">
                  <span className="credential-icon">🎓</span>
                  <span>DHIS2 Level 1 Certified</span>
                </div>
                <div className="credential-item">
                  <span className="credential-icon">📱</span>
                  <span>DHIS2 Android Implementation</span>
                </div>
                <div className="credential-item">
                  <span className="credential-icon">🔬</span>
                  <span>DHIS2 Disease Surveillance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="copyright">
              <p>
                &copy; {currentYear} Mamadou Tafsir Diallo. 
                {currentLanguage === 'fr' 
                  ? ' Tous droits réservés.'
                  : ' All rights reserved.'
                }
              </p>
            </div>

            <div className="footer-meta">
              <div className="availability-status">
                <span className="status-indicator"></span>
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
                <span>{currentLanguage === 'fr' ? 'Haut' : 'Top'}</span>
              </button>
            </div>
          </div>

          {/* Background Elements */}
          <div className="footer-bg-elements">
            <div className="bg-shape bg-shape-1"></div>
            <div className="bg-shape bg-shape-2"></div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;