import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface AboutCardProps {
  title: string;
  description: string;
  icon: string;
  delay?: number;
}

const AboutCard: React.FC<AboutCardProps> = ({ title, description, icon, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className={`about-card ${isVisible ? 'visible' : ''}`}
    >
      <div className="about-card-header">
        <div className="about-icon">
          <span>{icon}</span>
        </div>
        <h3>{title}</h3>
      </div>
      <div className="about-card-content">
        <p>{description}</p>
      </div>
      <div className="about-card-footer">
        <div className="card-decoration"></div>
      </div>
    </div>
  );
};

interface QuickFactProps {
  label: string;
  value: string;
  icon: string;
}

const QuickFact: React.FC<QuickFactProps> = ({ label, value, icon }) => (
  <div className="quick-fact">
    <div className="fact-icon">{icon}</div>
    <div className="fact-content">
      <div className="fact-value">{value}</div>
      <div className="fact-label">{label}</div>
    </div>
  </div>
);

const About: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'journey' | 'values'>('overview');
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
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

  const aboutCards = [
    {
      title: t('about.who.title'),
      description: t('about.who.description'),
      icon: '👨‍💻',
      delay: 0
    },
    {
      title: t('about.what.title'),
      description: t('about.what.description'),
      icon: '🏥',
      delay: 200
    },
    {
      title: t('about.impact.title'),
      description: t('about.impact.description'),
      icon: '🌍',
      delay: 400
    }
  ];

  const quickFacts = [
    {
      label: currentLanguage === 'fr' ? 'Localisation' : 'Location',
      value: 'Dakar, Senegal 🇸🇳',
      icon: '📍'
    },
    {
      label: currentLanguage === 'fr' ? 'Spécialisation' : 'Specialization',
      value: 'DHIS2 & Health IT',
      icon: '⚕️'
    },
    {
      label: currentLanguage === 'fr' ? 'Expérience' : 'Experience',
  value: '10+ Years',
      icon: '🎯'
    },
    {
      label: currentLanguage === 'fr' ? 'Langues' : 'Languages',
      value: 'English | Français',
      icon: '🗣️'
    }
  ];

  const tabContent = {
    overview: {
      title: currentLanguage === 'fr' ? 'Vue d\'ensemble' : 'Professional Overview',
      content: currentLanguage === 'fr' 
        ? 'Expert en systèmes d\'information de santé avec une spécialisation en DHIS2, j\'ai consacré ma carrière à améliorer les services de santé dans les contextes humanitaires. Mon approche combine expertise technique approfondie et compréhension des défis de terrain.'
        : 'As a health information systems expert specializing in DHIS2, I\'ve dedicated my career to improving healthcare delivery in humanitarian contexts. My approach combines deep technical expertise with an understanding of real-world field challenges.'
    },
    journey: {
      title: currentLanguage === 'fr' ? 'Mon Parcours' : 'My Journey',
      content: currentLanguage === 'fr'
        ? 'De mes débuts en Guinée avec RTI International au leadership technique au CICR, chaque étape de mon parcours a renforcé ma passion pour l\'utilisation de la technologie au service de la santé publique. J\'ai eu le privilège de travailler dans 11 pays différents, chacun m\'apportant des perspectives uniques.'
        : 'From my early days in Guinea with RTI International to my current technical leadership role at ICRC, every step of my journey has reinforced my passion for leveraging technology in service of public health. I\'ve had the privilege of working across 11 different countries, each bringing unique perspectives.'
    },
    values: {
      title: currentLanguage === 'fr' ? 'Mes Valeurs' : 'My Values',
      content: currentLanguage === 'fr'
        ? 'L\'innovation au service de l\'humanité, la collaboration interculturelle, et l\'excellence technique sont au cœur de mes valeurs. Je crois fermement que la technologie doit être accessible, fiable et adaptée aux besoins des communautés qu\'elle sert.'
        : 'Innovation in service of humanity, cross-cultural collaboration, and technical excellence are at the core of my values. I firmly believe that technology should be accessible, reliable, and tailored to the needs of the communities it serves.'
    }
  };

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">
        <div className={`section-header ${isInView ? 'visible' : ''}`}>
          <h2 className="section-title">{t('about.title')}</h2>
          <p className="section-subtitle">
            {currentLanguage === 'fr' 
              ? 'Passionné par la transformation numérique des systèmes de santé'
              : 'Passionate about digital transformation of health systems'
            }
          </p>
        </div>

        {/* Quick Facts */}
        <div className={`quick-facts ${isInView ? 'visible' : ''}`}>
          {quickFacts.map((fact, index) => (
            <QuickFact key={index} {...fact} />
          ))}
        </div>

        {/* Tabbed Content */}
        <div className="about-tabs">
          <div className="tab-navigation">
            {Object.keys(tabContent).map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab as typeof activeTab)}
              >
                {tabContent[tab as keyof typeof tabContent].title}
              </button>
            ))}
          </div>
          
          <div className="tab-content">
            <div className="tab-panel">
              <p>{tabContent[activeTab].content}</p>
            </div>
          </div>
        </div>

        {/* About Cards */}
        <div className="about-grid">
          {aboutCards.map((card, index) => (
            <AboutCard key={index} {...card} />
          ))}
        </div>

        {/* Call to Action */}
        <div className={`about-cta ${isInView ? 'visible' : ''}`}>
          <div className="cta-content">
            <h3>
              {currentLanguage === 'fr' 
                ? 'Prêt à collaborer ?' 
                : 'Ready to collaborate?'
              }
            </h3>
            <p>
              {currentLanguage === 'fr'
                ? 'Discutons de votre prochain projet de système d\'information de santé.'
                : 'Let\'s discuss your next health information system project.'
              }
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {currentLanguage === 'fr' ? 'Commençons' : 'Let\'s Start'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;