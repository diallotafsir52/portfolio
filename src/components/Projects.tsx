import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  challenge: string;
  solution: string;
  impact: string;
  techStack: string[];
  category: 'migration' | 'deployment' | 'optimization' | 'integration';
  timeline: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  images?: string[];
  demoUrl?: string;
  caseStudyUrl?: string;
}

interface ProjectCardProps {
  project: ProjectData;
  isActive: boolean;
  onClick: () => void;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isActive, onClick, delay = 0 }) => {
  const { t } = useLanguage();
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

  const getCategoryIcon = (category: string) => {
    const icons = {
      migration: '🔄',
      deployment: '🚀',
      optimization: '⚡',
      integration: '🔗'
    };
    return icons[category as keyof typeof icons] || '💼';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      migration: '#3b82f6',
      deployment: '#10b981',
      optimization: '#f59e0b',
      integration: '#8b5cf6'
    };
    return colors[category as keyof typeof colors] || '#6b7280';
  };

  return (
    <div 
      ref={cardRef}
      className={`project-card ${isVisible ? 'visible' : ''} ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="project-header">
        <div className="project-category">
          <span 
            className="category-icon"
            style={{ backgroundColor: getCategoryColor(project.category) }}
          >
            {getCategoryIcon(project.category)}
          </span>
          <span className="category-label">{project.timeline}</span>
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
      </div>

      <div className="project-content">
        <div className="project-section">
          <h4>{t('common.challenge')}</h4>
          <p>{project.challenge}</p>
        </div>

        <div className="project-section">
          <h4>{t('common.solution')}</h4>
          <p>{project.solution}</p>
        </div>

        <div className="project-section">
          <h4>{t('common.impact')}</h4>
          <p>{project.impact}</p>
        </div>

        {project.metrics && (
          <div className="project-metrics">
            {project.metrics.map((metric, index) => (
              <div key={index} className="metric-item">
                <div className="metric-value">{metric.value}</div>
                <div className="metric-label">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="tech-stack">
          {project.techStack.map((tech, index) => (
            <span key={index} className="tech-tag" style={{ borderColor: getCategoryColor(project.category) }}>
              {tech}
            </span>
          ))}
        </div>

        <div className="project-actions">
          {project.demoUrl && (
            <button className="btn-link">
              <span>🔗</span> Live Demo
            </button>
          )}
          {project.caseStudyUrl && (
            <button className="btn-link">
              <span>📋</span> Case Study
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectFilter: React.FC<{
  categories: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}> = ({ categories, activeFilter, onFilterChange }) => {
  const { currentLanguage } = useLanguage();

  const getFilterLabel = (category: string) => {
    const labels = {
      all: currentLanguage === 'fr' ? 'Tous' : 'All',
      migration: currentLanguage === 'fr' ? 'Migration' : 'Migration',
      deployment: currentLanguage === 'fr' ? 'Déploiement' : 'Deployment',
      optimization: currentLanguage === 'fr' ? 'Optimisation' : 'Optimization',
      integration: currentLanguage === 'fr' ? 'Intégration' : 'Integration'
    };
    return labels[category as keyof typeof labels] || category;
  };

  return (
    <div className="project-filters">
      {categories.map(category => (
        <button
          key={category}
          className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
          onClick={() => onFilterChange(category)}
        >
          {getFilterLabel(category)}
        </button>
      ))}
    </div>
  );
};

const Projects: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeProject, setActiveProject] = useState<string | null>(null);
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

  const projects: ProjectData[] = [
    {
      id: 'hemap',
      title: t('projects.hemap.title'),
      subtitle: t('projects.hemap.subtitle'),
      challenge: t('projects.hemap.challenge'),
      solution: t('projects.hemap.solution'),
      impact: t('projects.hemap.impact'),
      techStack: ['DHIS2', 'SSIS', 'ETL Pipelines', 'SQL Server', 'PowerShell'],
      category: 'migration',
      timeline: '2021-2023',
      metrics: [
        { 
          label: currentLanguage === 'fr' ? 'Données migrées' : 'Data Migrated', 
          value: '2.5M+ records' 
        },
        { 
          label: currentLanguage === 'fr' ? 'Temps d\'arrêt' : 'Downtime', 
          value: '0 hours' 
        },
        { 
          label: currentLanguage === 'fr' ? 'Amélioration perf.' : 'Performance Boost', 
          value: '75%' 
        }
      ]
    },
    {
      id: 'multicountry',
      title: t('projects.multicountry.title'),
      subtitle: t('projects.multicountry.subtitle'),
      challenge: t('projects.multicountry.challenge'),
      solution: t('projects.multicountry.solution'),
      impact: t('projects.multicountry.impact'),
      techStack: ['DHIS2', 'Docker', 'Kubernetes', 'Nginx', 'PostgreSQL'],
      category: 'deployment',
      timeline: '2019-2021',
      metrics: [
        { 
          label: currentLanguage === 'fr' ? 'Pays déployés' : 'Countries Deployed', 
          value: '11' 
        },
        { 
          label: currentLanguage === 'fr' ? 'Utilisateurs formés' : 'Users Trained', 
          value: '500+' 
        },
        { 
          label: currentLanguage === 'fr' ? 'Disponibilité' : 'Uptime', 
          value: '99.8%' 
        }
      ]
    },
    {
      id: 'pharmacy',
      title: t('projects.pharmacy.title'),
      subtitle: t('projects.pharmacy.subtitle'),
      challenge: t('projects.pharmacy.challenge'),
      solution: t('projects.pharmacy.solution'),
      impact: t('projects.pharmacy.impact'),
      techStack: ['DHIS2', 'React', 'Node.js', 'MongoDB', 'Socket.io'],
      category: 'optimization',
      timeline: '2022-2023',
      metrics: [
        { 
          label: currentLanguage === 'fr' ? 'Réduction ruptures' : 'Stockout Reduction', 
          value: '40%' 
        },
        { 
          label: currentLanguage === 'fr' ? 'Centres de santé' : 'Health Facilities', 
          value: '85' 
        },
        { 
          label: currentLanguage === 'fr' ? 'Économies' : 'Cost Savings', 
          value: '$250K+' 
        }
      ]
    },
    {
      id: 'surveillance',
      title: currentLanguage === 'fr' ? 'Système de surveillance épidémiologique' : 'Disease Surveillance System',
      subtitle: currentLanguage === 'fr' ? 'Surveillance en temps réel pour la Guinée' : 'Real-time surveillance for Guinea',
      challenge: currentLanguage === 'fr' 
        ? 'Développer un système de surveillance des maladies en temps réel pour détecter rapidement les épidémies.'
        : 'Develop a real-time disease surveillance system to rapidly detect outbreaks and epidemics.',
      solution: currentLanguage === 'fr'
        ? 'Implémenté DHIS2 Tracker avec modules de surveillance, alertes automatiques et tableaux de bord temps réel.'
        : 'Implemented DHIS2 Tracker with surveillance modules, automated alerts, and real-time dashboards.',
      impact: currentLanguage === 'fr'
        ? 'Réduit le temps de détection des épidémies de 60%, amélioré la réponse sanitaire nationale.'
        : 'Reduced outbreak detection time by 60%, improved national health response capabilities.',
      techStack: ['DHIS2 Tracker', 'PostgreSQL', 'OpenLMIS', 'SMS Gateway', 'GIS'],
      category: 'integration',
      timeline: '2017-2019',
      metrics: [
        { 
          label: currentLanguage === 'fr' ? 'Districts couverts' : 'Districts Covered', 
          value: '33' 
        },
        { 
          label: currentLanguage === 'fr' ? 'Alertes traitées' : 'Alerts Processed', 
          value: '1,200+' 
        },
        { 
          label: currentLanguage === 'fr' ? 'Délai de réponse' : 'Response Time', 
          value: '24h' 
        }
      ]
    }
  ];

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="container">
        <div className={`section-header ${isInView ? 'visible' : ''}`}>
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="section-subtitle">
            {currentLanguage === 'fr' 
              ? 'Solutions DHIS2 qui transforment les soins de santé humanitaires'
              : 'DHIS2 solutions transforming humanitarian healthcare delivery'
            }
          </p>
        </div>

        <ProjectFilter 
          categories={categories}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              isActive={activeProject === project.id}
              onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
              delay={index * 200}
            />
          ))}
        </div>

        <div className={`projects-cta ${isInView ? 'visible' : ''}`}>
          <div className="cta-content">
            <h3>
              {currentLanguage === 'fr' 
                ? 'Intéressé par une collaboration ?'
                : 'Interested in collaboration?'
              }
            </h3>
            <p>
              {currentLanguage === 'fr'
                ? 'Découvrez comment mes solutions DHIS2 peuvent transformer votre organisation de santé.'
                : 'Discover how my DHIS2 solutions can transform your health organization.'
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
                {currentLanguage === 'fr' ? 'Discutons' : 'Let\'s Discuss'}
              </button>
              <button className="btn btn-secondary">
                {currentLanguage === 'fr' ? 'Télécharger Portfolio' : 'Download Portfolio'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;