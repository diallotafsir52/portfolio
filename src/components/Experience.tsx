import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface Achievement {
  text: string;
  metric?: string;
}

interface ExperienceData {
  id: string;
  period: string;
  title: string;
  company: string;
  location: string;
  description: string;
  achievements: Achievement[];
  technologies: string[];
  type: 'current' | 'past';
  companyLogo?: string;
  companyWebsite?: string;
}

interface TimelineItemProps {
  experience: ExperienceData;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  experience, 
  index, 
  isActive, 
  onClick 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 300);
        }
      },
      { threshold: 0.3 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, [index]);

  return (
    <div className="timeline-item" ref={itemRef}>
      <div className={`timeline-marker ${experience.type}`}>
        <div className="marker-dot">
          {experience.type === 'current' ? '🏢' : '📍'}
        </div>
      </div>
      
      <div 
        className={`timeline-content ${isVisible ? 'visible' : ''} ${isActive ? 'active' : ''}`}
        onClick={onClick}
      >
        <div className="timeline-header">
          <div className="timeline-period">
            <span className="period-text">{experience.period}</span>
            {experience.type === 'current' && (
              <span className="current-badge">Current</span>
            )}
          </div>
          
          <div className="timeline-company-info">
            <h3 className="timeline-title">{experience.title}</h3>
            <div className="timeline-company">
              <span className="company-name">{experience.company}</span>
              <span className="company-location">📍 {experience.location}</span>
            </div>
          </div>

          <button className="expand-btn">
            <span className={`chevron ${isActive ? 'rotated' : ''}`}>▼</span>
          </button>
        </div>

        <div className="timeline-description">
          <p>{experience.description}</p>
        </div>

        {isActive && (
          <div className="timeline-details">
            <div className="achievements-section">
              <h4>Key Achievements</h4>
              <ul className="achievements-list">
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="achievement-item">
                    <span className="achievement-text">{achievement.text}</span>
                    {achievement.metric && (
                      <span className="achievement-metric">{achievement.metric}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="technologies-section">
              <h4>Technologies & Tools</h4>
              <div className="tech-tags">
                {experience.technologies.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            {experience.companyWebsite && (
              <div className="company-links">
                <a 
                  href={experience.companyWebsite} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="company-link"
                >
                  🔗 Visit {experience.company}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ExperienceStats: React.FC<{ experiences: ExperienceData[] }> = ({ experiences }) => {
  const { currentLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const totalYears = new Date().getFullYear() - 2015;
  const companies = experiences.length;
  const allTechnologies = [...new Set(experiences.flatMap(exp => exp.technologies))];
  const totalAchievements = experiences.reduce((acc, exp) => acc + exp.achievements.length, 0);

  const stats = [
    {
      value: `${totalYears}+`,
      label: currentLanguage === 'fr' ? 'Années d\'expérience' : 'Years Experience',
      icon: '🎯'
    },
    {
      value: companies.toString(),
      label: currentLanguage === 'fr' ? 'Organisations' : 'Organizations',
      icon: '🏢'
    },
    {
      value: allTechnologies.length.toString(),
      label: currentLanguage === 'fr' ? 'Technologies' : 'Technologies',
      icon: '💻'
    },
    {
      value: totalAchievements.toString(),
      label: currentLanguage === 'fr' ? 'Réalisations clés' : 'Key Achievements',
      icon: '🏆'
    }
  ];

  return (
    <div ref={statsRef} className={`experience-stats ${isVisible ? 'visible' : ''}`}>
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-content">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Experience: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const [activeExperience, setActiveExperience] = useState<string | null>(null);
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

  const experiences: ExperienceData[] = [
    {
      id: 'icrc',
      period: '2021 - Present',
      title: t('experience.icrc.title'),
      company: t('experience.icrc.company'),
      location: 'Geneva, Switzerland (Remote)',
      description: t('experience.icrc.description'),
      achievements: [
        {
          text: currentLanguage === 'fr' 
            ? 'Migration réussie de HeMAP avec zéro perte de données'
            : 'Successfully migrated HeMAP with zero data loss',
          metric: '2.5M+ records'
        },
        {
          text: currentLanguage === 'fr'
            ? 'Amélioration des performances du système de 75%'
            : 'Improved system performance by 75%',
          metric: '75% faster'
        },
        {
          text: currentLanguage === 'fr'
            ? 'Déploiement de pipelines CI/CD réduisant les temps de déploiement'
            : 'Deployed CI/CD pipelines reducing deployment time',
          metric: '90% reduction'
        },
        {
          text: currentLanguage === 'fr'
            ? 'Formation de 50+ utilisateurs sur les nouveaux systèmes'
            : 'Trained 50+ users on new systems',
          metric: '50+ users'
        }
      ],
      technologies: ['DHIS2', 'SSIS', 'Azure DevOps', 'OpenShift', 'PostgreSQL', 'Docker', 'Kubernetes'],
      type: 'current',
      companyWebsite: 'https://www.icrc.org'
    },
    {
      id: 'it4life',
      period: '2019 - 2021',
      title: t('experience.it4life.title'),
      company: t('experience.it4life.company'),
      location: 'Dakar, Senegal',
      description: t('experience.it4life.description'),
      achievements: [
        {
          text: currentLanguage === 'fr'
            ? 'Déploiement DHIS2 dans 11 pays africains'
            : 'Deployed DHIS2 across 11 African countries',
          metric: '11 countries'
        },
        {
          text: currentLanguage === 'fr'
            ? 'Formation de 500+ professionnels de santé'
            : 'Trained 500+ health professionals',
          metric: '500+ trained'
        },
        {
          text: currentLanguage === 'fr'
            ? 'Développement d\'applications CommCare pour la réponse Ebola'
            : 'Developed CommCare apps for Ebola response',
          metric: '99.8% uptime'
        },
        {
          text: currentLanguage === 'fr'
            ? 'Mise en place de systèmes COVID-19 en temps réel'
            : 'Implemented real-time COVID-19 tracking systems',
          metric: '24/7 monitoring'
        }
      ],
      technologies: ['DHIS2', 'CommCare', 'Google Cloud', 'Docker', 'PostgreSQL', 'React', 'Python'],
      type: 'past',
      companyWebsite: 'https://www.it4life.org'
    },
    {
      id: 'rti',
      period: '2015 - 2019',
      title: t('experience.rti.title'),
      company: t('experience.rti.company'),
      location: 'Conakry, Guinea',
      description: t('experience.rti.description'),
      achievements: [
        {
          text: currentLanguage === 'fr'
            ? 'Conception du système national d\'information sanitaire de la Guinée'
            : 'Designed Guinea\'s national health information system',
          metric: '33 districts'
        },
        {
          text: currentLanguage === 'fr'
            ? 'Réduction du temps de détection des épidémies de 60%'
            : 'Reduced outbreak detection time by 60%',
          metric: '60% faster'
        },
        {
          text: currentLanguage === 'fr'
            ? 'Gestion de la base de données de réponse Ebola'
            : 'Managed Ebola response database',
          metric: '1,200+ alerts'
        },
        {
          text: currentLanguage === 'fr'
            ? 'Audit et modernisation de l\'infrastructure IT du Ministère'
            : 'Audited and modernized Ministry IT infrastructure',
          metric: '100+ facilities'
        }
      ],
      technologies: ['DHIS2', 'OpenLMIS', 'PostgreSQL', 'Ubuntu', 'Moodle', 'KoboToolbox', 'GIS'],
      type: 'past',
      companyWebsite: 'https://www.rti.org'
    }
  ];

  return (
    <section id="experience" className="experience" ref={sectionRef}>
      <div className="container">
        <div className={`section-header ${isInView ? 'visible' : ''}`}>
          <h2 className="section-title">{t('experience.title')}</h2>
          <p className="section-subtitle">
            {currentLanguage === 'fr' 
              ? 'Une progression continue au service de la santé mondiale'
              : 'A continuous journey in service of global health'
            }
          </p>
        </div>

        <ExperienceStats experiences={experiences} />

        <div className="timeline-container">
          <div className="timeline">
            {experiences.map((experience, index) => (
              <TimelineItem
                key={experience.id}
                experience={experience}
                index={index}
                isActive={activeExperience === experience.id}
                onClick={() => setActiveExperience(
                  activeExperience === experience.id ? null : experience.id
                )}
              />
            ))}
          </div>
        </div>

        <div className={`experience-cta ${isInView ? 'visible' : ''}`}>
          <div className="cta-content">
            <h3>
              {currentLanguage === 'fr' 
                ? 'Prêt pour de nouveaux défis'
                : 'Ready for new challenges'
              }
            </h3>
            <p>
              {currentLanguage === 'fr'
                ? 'Avec une expertise éprouvée dans 3 organisations internationales, je suis prêt à contribuer à votre mission de santé.'
                : 'With proven expertise across 3 international organizations, I\'m ready to contribute to your health mission.'
              }
            </p>
            <div className="cta-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {currentLanguage === 'fr' ? 'Discutons' : 'Let\'s Connect'}
              </button>
              <button className="btn btn-secondary">
                {currentLanguage === 'fr' ? 'Télécharger CV' : 'Download Resume'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;