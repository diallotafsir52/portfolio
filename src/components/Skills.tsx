import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  years: number;
  description?: string;
  certifications?: string[];
  projects?: string[];
}

interface SkillCategory {
  id: string;
  titleKey: string;
  icon: string;
  color: string;
  skills: Skill[];
}

interface SkillItemProps {
  skill: Skill;
  categoryColor: string;
  delay?: number;
}

const SkillItem: React.FC<SkillItemProps> = ({ skill, categoryColor, delay = 0 }) => {
  const { currentLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.5 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, [delay]);

  const getLevelPercentage = (level: string) => {
    const percentages = { Expert: 95, Advanced: 80, Intermediate: 65 };
    return percentages[level as keyof typeof percentages] || 50;
  };

  const getLevelColor = (level: string) => {
    const colors = { Expert: '#10b981', Advanced: '#3b82f6', Intermediate: '#f59e0b' };
    return colors[level as keyof typeof colors] || '#6b7280';
  };

  const getLevelText = (level: string) => {
    if (currentLanguage === 'fr') {
      const french = { Expert: 'Expert', Advanced: 'Avancé', Intermediate: 'Intermédiaire' };
      return french[level as keyof typeof french] || level;
    }
    return level;
  };

  return (
    <li 
      ref={itemRef}
      className={`skill-item ${isVisible ? 'visible' : ''}`}
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="skill-header">
        <div className="skill-info">
          <span className="skill-name">{skill.name}</span>
          <span className="skill-years">
            {skill.years} {currentLanguage === 'fr' ? 'ans' : 'years'}
          </span>
        </div>
        <div className="skill-level-container">
          <span 
            className="skill-level"
            style={{ color: getLevelColor(skill.level) }}
          >
            {getLevelText(skill.level)}
          </span>
          <button className="skill-toggle">
            <span className={`chevron ${showDetails ? 'open' : ''}`}>▼</span>
          </button>
        </div>
      </div>

      <div className="skill-progress">
        <div 
          className="progress-bar"
          style={{ 
            width: isVisible ? `${getLevelPercentage(skill.level)}%` : '0%',
            backgroundColor: categoryColor 
          }}
        />
      </div>

      {showDetails && (
        <div className="skill-details">
          {skill.description && (
            <p className="skill-description">{skill.description}</p>
          )}
          
          {skill.certifications && skill.certifications.length > 0 && (
            <div className="skill-certifications">
              <h5>{currentLanguage === 'fr' ? 'Certifications:' : 'Certifications:'}</h5>
              <ul>
                {skill.certifications.map((cert, index) => (
                  <li key={index}>🏆 {cert}</li>
                ))}
              </ul>
            </div>
          )}

          {skill.projects && skill.projects.length > 0 && (
            <div className="skill-projects">
              <h5>{currentLanguage === 'fr' ? 'Projets utilisés:' : 'Used in projects:'}</h5>
              <div className="project-tags">
                {skill.projects.map((project, index) => (
                  <span key={index} className="project-tag">{project}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </li>
  );
};

const SkillCategoryCard: React.FC<{
  category: SkillCategory;
  isActive: boolean;
  onClick: () => void;
  delay?: number;
}> = ({ category, isActive, onClick, delay = 0 }) => {
  const { currentLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.3 }
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

  const getCategoryTitle = (titleKey: string) => {
    const titles = {
      'skills.health.title': currentLanguage === 'fr' ? 'Systèmes d\'Information de Santé' : 'Health Information Systems',
      'skills.cloud.title': currentLanguage === 'fr' ? 'Cloud & Infrastructure' : 'Cloud & Infrastructure',
      'skills.data.title': currentLanguage === 'fr' ? 'Données & Intégration' : 'Data & Integration',
      'skills.development.title': currentLanguage === 'fr' ? 'Développement' : 'Development'
    };
    return titles[titleKey as keyof typeof titles] || titleKey;
  };

  return (
    <div 
      ref={cardRef}
      className={`skill-category ${isVisible ? 'visible' : ''} ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="category-header">
        <div 
          className="category-icon"
          style={{ backgroundColor: category.color }}
        >
          <span>{category.icon}</span>
        </div>
        <h3>{getCategoryTitle(category.titleKey)}</h3>
        <div className="skill-count">
          {category.skills.length} {category.skills.length === 1 ? 'skill' : 'skills'}
        </div>
      </div>

      <div className="category-content">
        <ul className="skill-list">
          {category.skills.map((skill, index) => (
            <SkillItem
              key={index}
              skill={skill}
              categoryColor={category.color}
              delay={index * 100}
            />
          ))}
        </ul>
      </div>

      <div className="category-footer">
        <div className="expertise-indicator">
          <div className="indicator-bar">
            <div 
              className="indicator-fill"
              style={{ 
                width: `${(category.skills.filter(s => s.level === 'Expert').length / category.skills.length) * 100}%`,
                backgroundColor: category.color 
              }}
            />
          </div>
          <span className="expertise-text">
            {Math.round((category.skills.filter(s => s.level === 'Expert').length / category.skills.length) * 100)}% Expert Level
          </span>
        </div>
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
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

  const skillCategories: SkillCategory[] = [
    {
      id: 'health',
      titleKey: 'skills.health.title',
      icon: '🏥',
      color: '#10b981',
      skills: [
        {
          name: 'DHIS2 Architecture & Configuration',
          level: 'Expert',
          years: 9,
          description: currentLanguage === 'fr' 
            ? 'Architecture complète des systèmes DHIS2, configuration avancée, développement d\'applications personnalisées'
            : 'Complete DHIS2 system architecture, advanced configuration, custom app development',
          certifications: ['DHIS2 Level 1 Certified', 'DHIS2 Tracker Certified', 'DHIS2 Android Implementation'],
          projects: ['HeMAP Migration', 'ALIMA Multi-country', 'Guinea National HIS']
        },
        {
          name: 'OpenMRS & CommCare',
          level: 'Advanced',
          years: 5,
          description: currentLanguage === 'fr'
            ? 'Intégration et configuration d\'OpenMRS, développement d\'applications CommCare pour la collecte de données'
            : 'OpenMRS integration and configuration, CommCare app development for data collection',
          projects: ['EVISTA Ebola Response', 'OPTIMA Nutrition Program']
        },
        {
          name: 'Health Data Standards (FHIR, HL7)',
          level: 'Advanced',
          years: 4,
          description: currentLanguage === 'fr'
            ? 'Implémentation des standards FHIR et HL7 pour l\'interopérabilité des systèmes de santé'
            : 'FHIR and HL7 standards implementation for health system interoperability'
        },
        {
          name: 'Medical Database Design',
          level: 'Expert',
          years: 8,
          description: currentLanguage === 'fr'
            ? 'Conception de bases de données médicales optimisées, modélisation des workflows cliniques'
            : 'Optimized medical database design, clinical workflow modeling'
        }
      ]
    },
    {
      id: 'cloud',
      titleKey: 'skills.cloud.title',
      icon: '☁️',
      color: '#3b82f6',
      skills: [
        {
          name: 'Google Cloud Platform',
          level: 'Expert',
          years: 6,
          description: currentLanguage === 'fr'
            ? 'Architecture cloud GCP, déploiement Kubernetes, services managés, sécurité cloud'
            : 'GCP cloud architecture, Kubernetes deployment, managed services, cloud security',
          certifications: ['Google Cloud Associate Cloud Engineer'],
          projects: ['ALIMA Infrastructure', 'ICRC Cloud Migration']
        },
        {
          name: 'AWS & Azure',
          level: 'Advanced',
          years: 4,
          description: currentLanguage === 'fr'
            ? 'Déploiement multi-cloud, migration de workloads, optimisation des coûts'
            : 'Multi-cloud deployment, workload migration, cost optimization'
        },
        {
          name: 'Kubernetes & OpenShift',
          level: 'Advanced',
          years: 5,
          description: currentLanguage === 'fr'
            ? 'Orchestration de conteneurs, déploiement automatisé, scaling horizontal'
            : 'Container orchestration, automated deployment, horizontal scaling'
        },
        {
          name: 'Docker & DevOps',
          level: 'Expert',
          years: 7,
          description: currentLanguage === 'fr'
            ? 'Conteneurisation d\'applications, pipelines CI/CD, infrastructure as code'
            : 'Application containerization, CI/CD pipelines, infrastructure as code'
        }
      ]
    },
    {
      id: 'data',
      titleKey: 'skills.data.title',
      icon: '📊',
      color: '#8b5cf6',
      skills: [
        {
          name: 'ETL Pipelines (SSIS, Apache Airflow)',
          level: 'Expert',
          years: 8,
          description: currentLanguage === 'fr'
            ? 'Développement de pipelines ETL complexes, transformation de données massives, monitoring'
            : 'Complex ETL pipeline development, big data transformation, monitoring',
          projects: ['HeMAP Data Migration', 'Multi-source Integration']
        },
        {
          name: 'API Development & Integration',
          level: 'Expert',
          years: 7,
          description: currentLanguage === 'fr'
            ? 'APIs RESTful, intégration de systèmes tiers, authentification et sécurité'
            : 'RESTful APIs, third-party system integration, authentication and security'
        },
        {
          name: 'OpenHIM & OpenFN',
          level: 'Advanced',
          years: 4,
          description: currentLanguage === 'fr'
            ? 'Médiation de données de santé, workflows d\'intégration, monitoring des échanges'
            : 'Health data mediation, integration workflows, exchange monitoring'
        },
        {
          name: 'Database Management',
          level: 'Expert',
          years: 9,
          description: currentLanguage === 'fr'
            ? 'Administration PostgreSQL/MySQL, optimisation des performances, haute disponibilité'
            : 'PostgreSQL/MySQL administration, performance optimization, high availability'
        }
      ]
    },
    {
      id: 'development',
      titleKey: 'skills.development.title',
      icon: '💻',
      color: '#f59e0b',
      skills: [
        {
          name: 'JavaScript, Python, PHP',
          level: 'Expert',
          years: 8,
          description: currentLanguage === 'fr'
            ? 'Développement full-stack, automatisation, scripting, applications web complexes'
            : 'Full-stack development, automation, scripting, complex web applications'
        },
        {
          name: 'React & AngularJS',
          level: 'Advanced',
          years: 5,
          description: currentLanguage === 'fr'
            ? 'Applications web modernes, state management, interfaces utilisateur réactives'
            : 'Modern web applications, state management, reactive user interfaces'
        },
        {
          name: 'CI/CD (Azure DevOps)',
          level: 'Expert',
          years: 6,
          description: currentLanguage === 'fr'
            ? 'Pipelines de déploiement automatisé, tests automatisés, release management'
            : 'Automated deployment pipelines, automated testing, release management'
        },
        {
          name: 'Git & Version Control',
          level: 'Expert',
          years: 9,
          description: currentLanguage === 'fr'
            ? 'Workflows Git avancés, stratégies de branching, collaboration en équipe'
            : 'Advanced Git workflows, branching strategies, team collaboration'
        }
      ]
    }
  ];

  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  const expertSkills = skillCategories.reduce((acc, cat) => 
    acc + cat.skills.filter(skill => skill.level === 'Expert').length, 0
  );

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="container">
        <div className={`section-header ${isInView ? 'visible' : ''}`}>
          <h2 className="section-title">
            {currentLanguage === 'fr' ? 'Expertise Technique' : 'Technical Expertise'}
          </h2>
          <p className="section-subtitle">
            {currentLanguage === 'fr' 
              ? 'Une expertise technique approfondie au service de la santé mondiale'
              : 'Deep technical expertise in service of global health'
            }
          </p>
          
          <div className="skills-overview">
            <div className="overview-stat">
              <span className="stat-number">{totalSkills}</span>
              <span className="stat-label">
                {currentLanguage === 'fr' ? 'Compétences techniques' : 'Technical Skills'}
              </span>
            </div>
            <div className="overview-stat">
              <span className="stat-number">{expertSkills}</span>
              <span className="stat-label">
                {currentLanguage === 'fr' ? 'Niveau expert' : 'Expert Level'}
              </span>
            </div>
            <div className="overview-stat">
              <span className="stat-number">4</span>
              <span className="stat-label">
                {currentLanguage === 'fr' ? 'Domaines d\'expertise' : 'Expertise Areas'}
              </span>
            </div>
          </div>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <SkillCategoryCard
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(
                activeCategory === category.id ? null : category.id
              )}
              delay={index * 200}
            />
          ))}
        </div>

        <div className={`skills-cta ${isInView ? 'visible' : ''}`}>
          <div className="cta-content">
            <h3>
              {currentLanguage === 'fr' 
                ? 'Besoin d\'une expertise DHIS2 ?'
                : 'Need DHIS2 expertise?'
              }
            </h3>
            <p>
              {currentLanguage === 'fr'
                ? 'Avec 9+ années d\'expérience, je peux vous aider à optimiser vos systèmes de santé.'
                : 'With 9+ years of experience, I can help optimize your health systems.'
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
              {currentLanguage === 'fr' ? 'Discutons de votre projet' : 'Let\'s discuss your project'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;