import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export interface LanguageContextProps {
  currentLanguage: Language;
  switchLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.title': 'DHIS2 Solution Architect & Health Information Systems Expert',
    'hero.subtitle': 'Transforming health data into actionable insights across humanitarian settings',
    'hero.cta.work': 'View My Work',
    'hero.cta.contact': 'Get In Touch',

    // About Section
    'about.title': 'About Me',
    'about.who.title': 'Who I Am',
    'about.who.description': 'Seasoned IT professional with over 9 years of experience in health information systems, technical leadership, and digital operations within international humanitarian institutions.',
    'about.what.title': 'What I Do',
    'about.what.description': 'I specialize in DHIS2 architecture, cloud infrastructure, and health data integration. My expertise spans from system design and implementation to training and capacity building.',
    'about.impact.title': 'My Impact',
    'about.impact.description': 'I\'ve successfully deployed health information systems across 11+ countries, migrated critical medical databases, and built solutions that directly support humanitarian health operations.',

    // Projects Section
    'projects.title': 'Featured Projects',
    'projects.hemap.title': 'HeMAP Migration',
    'projects.hemap.subtitle': 'Medical Activity Database Transformation',
    'projects.hemap.challenge': 'Migrate legacy Lotus Notes medical databases to modern DHIS2 platform for ICRC\'s Health Monitoring and Analysis Platform.',
    'projects.hemap.solution': 'Led complete system migration with zero data loss, implemented ETL pipelines, and ensured seamless transition for field operations.',
    'projects.hemap.impact': 'Streamlined health monitoring across all ICRC operations, improved data accessibility, and enhanced analytical capabilities.',
    'projects.multicountry.title': 'Multi-Country DHIS2 Deployment',
    'projects.multicountry.subtitle': 'ALIMA Health System Standardization',
    'projects.multicountry.challenge': 'Deploy unified DHIS2 infrastructure across 11 African countries while maintaining local customization requirements.',
    'projects.multicountry.solution': 'Designed scalable architecture, implemented standardized configurations, and provided comprehensive training programs.',
    'projects.multicountry.impact': 'Achieved unified health data collection across West Africa, improved inter-country collaboration and reporting consistency.',
    'projects.pharmacy.title': 'Pharmacy Stock Management',
    'projects.pharmacy.subtitle': 'Supply Chain Optimization System',
    'projects.pharmacy.challenge': 'Improve pharmaceutical supply chain visibility and reduce stockouts in humanitarian healthcare settings.',
    'projects.pharmacy.solution': 'Built real-time stock monitoring system with automated alerts, order calculations, and predictive analytics.',
    'projects.pharmacy.impact': 'Reduced stockouts by 40%, improved patient care continuity, and optimized inventory management processes.',

    // Skills Section
    'skills.title': 'Technical Expertise',
    'skills.health.title': 'Health Information Systems',
    'skills.cloud.title': 'Cloud & Infrastructure',
    'skills.data.title': 'Data & Integration',
    'skills.development.title': 'Development',

    // Experience Section
    'experience.title': 'Professional Journey',
    'experience.icrc.title': 'Solution Architect - DHIS2 Technical Leader',
    'experience.icrc.company': 'International Committee of Red Cross (ICRC)',
    'experience.icrc.description': 'Leading technical initiatives for health operations, including HeMAP migration project, pharmacy stock management system, and server infrastructure modernization.',
    'experience.it4life.title': 'Health Information Systems Specialist',
    'experience.it4life.company': 'IT4LIFE',
    'experience.it4life.description': 'Managed DHIS2 deployment across 11 countries for ALIMA, developed CommCare applications for Ebola response, and led COVID-19 patient database systems implementation.',
    'experience.rti.title': 'DHIS2 Technical Lead / IT Specialist',
    'experience.rti.company': 'Research Triangle Institute (RTI)',
    'experience.rti.description': 'Designed and implemented national health information system for Guinea, developed disease surveillance modules, and managed Ebola response database.',

    // Contact Section
    'contact.title': 'Let\'s Work Together',
    'contact.description': 'Ready to transform your health information system? Let\'s discuss how I can help you achieve your goals.',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.location.value': 'Dakar, Senegal',
    'contact.availability.value': 'Remote work globally',

    // Common
    'common.challenge': 'Challenge',
    'common.solution': 'Solution',
    'common.impact': 'Impact',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.projects': 'Projets',
    'nav.skills': 'Compétences',
    'nav.experience': 'Expérience',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.title': 'Architecte de Solutions DHIS2 & Expert en Systèmes d\'Information de Santé',
    'hero.subtitle': 'Transformer les données de santé en informations exploitables dans les contextes humanitaires',
    'hero.cta.work': 'Voir Mon Travail',
    'hero.cta.contact': 'Me Contacter',

    // About Section
    'about.title': 'À Propos de Moi',
    'about.who.title': 'Qui Je Suis',
    'about.who.description': 'Professionnel IT expérimenté avec plus de 9 ans d\'expérience dans les systèmes d\'information de santé, le leadership technique et les opérations numériques au sein d\'institutions humanitaires internationales.',
    'about.what.title': 'Ce Que Je Fais',
    'about.what.description': 'Je me spécialise dans l\'architecture DHIS2, l\'infrastructure cloud et l\'intégration de données de santé. Mon expertise s\'étend de la conception et mise en œuvre de systèmes à la formation et au renforcement des capacités.',
    'about.impact.title': 'Mon Impact',
    'about.impact.description': 'J\'ai déployé avec succès des systèmes d\'information de santé dans plus de 11 pays, migré des bases de données médicales critiques et construit des solutions qui soutiennent directement les opérations de santé humanitaire.',

    // Projects Section
    'projects.title': 'Projets Phares',
    'projects.hemap.title': 'Migration HeMAP',
    'projects.hemap.subtitle': 'Transformation de Base de Données d\'Activités Médicales',
    'projects.hemap.challenge': 'Migrer les bases de données médicales héritées de Lotus Notes vers la plateforme DHIS2 moderne pour la Plateforme de Surveillance et d\'Analyse de la Santé du CICR.',
    'projects.hemap.solution': 'Dirigé la migration complète du système sans perte de données, implémenté des pipelines ETL et assuré une transition fluide pour les opérations de terrain.',
    'projects.hemap.impact': 'Rationalisé la surveillance de la santé dans toutes les opérations du CICR, amélioré l\'accessibilité des données et renforcé les capacités analytiques.',
    'projects.multicountry.title': 'Déploiement DHIS2 Multi-Pays',
    'projects.multicountry.subtitle': 'Standardisation du Système de Santé ALIMA',
    'projects.multicountry.challenge': 'Déployer une infrastructure DHIS2 unifiée dans 11 pays africains tout en maintenant les exigences de personnalisation locale.',
    'projects.multicountry.solution': 'Conçu une architecture évolutive, implémenté des configurations standardisées et fourni des programmes de formation complets.',
    'projects.multicountry.impact': 'Réalisé une collecte unifiée de données de santé en Afrique de l\'Ouest, amélioré la collaboration inter-pays et la cohérence des rapports.',
    'projects.pharmacy.title': 'Gestion de Stock Pharmacie',
    'projects.pharmacy.subtitle': 'Système d\'Optimisation de Chaîne d\'Approvisionnement',
    'projects.pharmacy.challenge': 'Améliorer la visibilité de la chaîne d\'approvisionnement pharmaceutique et réduire les ruptures de stock dans les contextes de soins de santé humanitaires.',
    'projects.pharmacy.solution': 'Construit un système de surveillance de stock en temps réel avec alertes automatisées, calculs de commandes et analyses prédictives.',
    'projects.pharmacy.impact': 'Réduit les ruptures de stock de 40%, amélioré la continuité des soins aux patients et optimisé les processus de gestion d\'inventaire.',

    // Skills Section
    'skills.title': 'Expertise Technique',
    'skills.health.title': 'Systèmes d\'Information de Santé',
    'skills.cloud.title': 'Cloud & Infrastructure',
    'skills.data.title': 'Données & Intégration',
    'skills.development.title': 'Développement',

    // Experience Section
    'experience.title': 'Parcours Professionnel',
    'experience.icrc.title': 'Architecte de Solutions - Leader Technique DHIS2',
    'experience.icrc.company': 'Comité International de la Croix-Rouge (CICR)',
    'experience.icrc.description': 'Diriger les initiatives techniques pour les opérations de santé, incluant le projet de migration HeMAP, le système de gestion de stock pharmaceutique et la modernisation de l\'infrastructure serveur.',
    'experience.it4life.title': 'Spécialiste en Systèmes d\'Information de Santé',
    'experience.it4life.company': 'IT4LIFE',
    'experience.it4life.description': 'Géré le déploiement DHIS2 dans 11 pays pour ALIMA, développé des applications CommCare pour la réponse Ebola et dirigé l\'implémentation de systèmes de base de données patients COVID-19.',
    'experience.rti.title': 'Lead Technique DHIS2 / Spécialiste IT',
    'experience.rti.company': 'Research Triangle Institute (RTI)',
    'experience.rti.description': 'Conçu et implémenté le système national d\'information de santé pour la Guinée, développé des modules de surveillance des maladies et géré la base de données de réponse Ebola.',

    // Contact Section
    'contact.title': 'Travaillons Ensemble',
    'contact.description': 'Prêt à transformer votre système d\'information de santé ? Discutons de la façon dont je peux vous aider à atteindre vos objectifs.',
    'contact.email': 'Email',
    'contact.phone': 'Téléphone',
    'contact.location': 'Localisation',
    'contact.location.value': 'Dakar, Sénégal',
    'contact.availability.value': 'Travail à distance mondial',

    // Common
    'common.challenge': 'Défi',
    'common.solution': 'Solution',
    'common.impact': 'Impact',
  }
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const switchLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || key;
  };

  const value: LanguageContextProps = {
    currentLanguage,
    switchLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};