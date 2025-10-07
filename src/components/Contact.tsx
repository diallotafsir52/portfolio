import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ContactMethod {
  id: string;
  icon: string;
  label: string;
  value: string;
  href: string;
  description: string;
  primary?: boolean;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
  timeline: string;
}

interface FormErrors {
  [key: string]: string;
}

const ContactForm: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
    timeline: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = currentLanguage === 'fr' ? 'Le nom est requis' : 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = currentLanguage === 'fr' ? 'L\'email est requis' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = currentLanguage === 'fr' ? 'Email invalide' : 'Invalid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = currentLanguage === 'fr' ? 'Le message est requis' : 'Message is required';
    } else if (formData.message.length < 20) {
      newErrors.message = currentLanguage === 'fr' 
        ? 'Le message doit contenir au moins 20 caractères' 
        : 'Message must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        message: '',
        timeline: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const projectTypes = [
    { value: '', label: currentLanguage === 'fr' ? 'Sélectionnez un type' : 'Select project type' },
    { value: 'dhis2-implementation', label: currentLanguage === 'fr' ? 'Implémentation DHIS2' : 'DHIS2 Implementation' },
    { value: 'data-migration', label: currentLanguage === 'fr' ? 'Migration de données' : 'Data Migration' },
    { value: 'system-integration', label: currentLanguage === 'fr' ? 'Intégration système' : 'System Integration' },
    { value: 'training', label: currentLanguage === 'fr' ? 'Formation & support' : 'Training & Support' },
    { value: 'consulting', label: currentLanguage === 'fr' ? 'Conseil technique' : 'Technical Consulting' },
    { value: 'other', label: currentLanguage === 'fr' ? 'Autre' : 'Other' }
  ];

  const budgetRanges = [
    { value: '', label: currentLanguage === 'fr' ? 'Sélectionnez un budget' : 'Select budget range' },
    { value: 'under-25k', label: '< $25,000' },
    { value: '25k-50k', label: '$25,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: '100k-250k', label: '$100,000 - $250,000' },
    { value: 'over-250k', label: '> $250,000' },
    { value: 'discuss', label: currentLanguage === 'fr' ? 'À discuter' : 'Let\'s discuss' }
  ];

  const timelines = [
    { value: '', label: currentLanguage === 'fr' ? 'Sélectionnez un délai' : 'Select timeline' },
    { value: 'asap', label: currentLanguage === 'fr' ? 'Dès que possible' : 'ASAP' },
    { value: '1-3-months', label: currentLanguage === 'fr' ? '1-3 mois' : '1-3 months' },
    { value: '3-6-months', label: currentLanguage === 'fr' ? '3-6 mois' : '3-6 months' },
    { value: '6-12-months', label: currentLanguage === 'fr' ? '6-12 mois' : '6-12 months' },
    { value: 'flexible', label: currentLanguage === 'fr' ? 'Flexible' : 'Flexible' }
  ];

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">
            {currentLanguage === 'fr' ? 'Nom complet' : 'Full Name'} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            placeholder={currentLanguage === 'fr' ? 'Votre nom' : 'Your name'}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            {currentLanguage === 'fr' ? 'Adresse email' : 'Email Address'} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            placeholder={currentLanguage === 'fr' ? 'votre@email.com' : 'your@email.com'}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="company">
            {currentLanguage === 'fr' ? 'Organisation' : 'Organization'}
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder={currentLanguage === 'fr' ? 'Nom de votre organisation' : 'Your organization name'}
          />
        </div>

        <div className="form-group">
          <label htmlFor="projectType">
            {currentLanguage === 'fr' ? 'Type de projet' : 'Project Type'}
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
          >
            {projectTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="budget">
            {currentLanguage === 'fr' ? 'Budget estimé' : 'Estimated Budget'}
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
          >
            {budgetRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="timeline">
            {currentLanguage === 'fr' ? 'Délai souhaité' : 'Desired Timeline'}
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
          >
            {timelines.map(timeline => (
              <option key={timeline.value} value={timeline.value}>{timeline.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message">
          {currentLanguage === 'fr' ? 'Décrivez votre projet' : 'Describe your project'} *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={errors.message ? 'error' : ''}
          placeholder={currentLanguage === 'fr' 
            ? 'Décrivez vos besoins, défis, et objectifs...'
            : 'Describe your needs, challenges, and objectives...'
          }
          rows={5}
        />
        {errors.message && <span className="error-message">{errors.message}</span>}
      </div>

      <div className="form-submit">
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span>
              <span className="spinner"></span>
              {currentLanguage === 'fr' ? 'Envoi...' : 'Sending...'}
            </span>
          ) : (
            <span>
              📧 {currentLanguage === 'fr' ? 'Envoyer le message' : 'Send Message'}
            </span>
          )}
        </button>

        {submitStatus === 'success' && (
          <div className="success-message">
            ✅ {currentLanguage === 'fr' 
              ? 'Message envoyé ! Je vous répondrai sous 24h.'
              : 'Message sent! I\'ll respond within 24 hours.'
            }
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="error-message">
            ❌ {currentLanguage === 'fr' 
              ? 'Erreur lors de l\'envoi. Veuillez réessayer.'
              : 'Error sending message. Please try again.'
            }
          </div>
        )}
      </div>
    </form>
  );
};

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

  const contactMethods: ContactMethod[] = [
    {
      id: 'email',
      icon: '📧',
      label: t('contact.email'),
      value: 'diallotafsir52@gmail.com',
      href: 'mailto:diallotafsir52@gmail.com',
      description: currentLanguage === 'fr' 
        ? 'Réponse garantie sous 24h'
        : 'Guaranteed response within 24h',
      primary: true
    },
    {
      id: 'phone',
      icon: '📱',
      label: t('contact.phone'),
      value: '+221 781453881',
      href: 'tel:+221781453881',
      description: currentLanguage === 'fr' 
        ? 'WhatsApp disponible'
        : 'WhatsApp available'
    },
    {
      id: 'linkedin',
      icon: '💼',
      label: 'LinkedIn',
      value: 'diallotafsir52',
      href: 'https://www.linkedin.com/in/diallotafsir52/',
      description: currentLanguage === 'fr' 
        ? 'Reseau professionnel'
        : 'Professional network'
    },
    {
      id: 'location',
      icon: '📍',
      label: t('contact.location'),
      value: t('contact.location.value'),
      href: 'https://maps.google.com/?q=Dakar,Senegal',
      description: currentLanguage === 'fr' 
        ? 'Disponible à distance'
        : 'Available remotely'
    }
  ];

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

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <a
                  key={method.id}
                  href={method.href}
                  className={`contact-method ${method.primary ? 'primary' : ''}`}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <div className="method-icon">{method.icon}</div>
                  <div className="method-content">
                    <div className="method-label">{method.label}</div>
                    <div className="method-value">{method.value}</div>
                    <div className="method-description">{method.description}</div>
                  </div>
                  <div className="method-arrow">→</div>
                </a>
              ))}
            </div>

            <div className="availability-info">
              <h3>
                {currentLanguage === 'fr' ? 'Disponibilité' : 'Availability'}
              </h3>
              <div className="availability-grid">
                <div className="availability-item">
                  <span className="availability-icon">🕒</span>
                  <div>
                    <div className="availability-label">
                      {currentLanguage === 'fr' ? 'Heures de travail' : 'Working Hours'}
                    </div>
                    <div className="availability-value">{availability.hours}</div>
                    <div className="availability-note">{availability.timezone}</div>
                  </div>
                </div>

                <div className="availability-item">
                  <span className="availability-icon">⚡</span>
                  <div>
                    <div className="availability-label">
                      {currentLanguage === 'fr' ? 'Temps de réponse' : 'Response Time'}
                    </div>
                    <div className="availability-value">{availability.response}</div>
                  </div>
                </div>

                <div className="availability-item">
                  <span className="availability-icon">🌍</span>
                  <div>
                    <div className="availability-label">
                      {currentLanguage === 'fr' ? 'Langues' : 'Languages'}
                    </div>
                    <div className="availability-value">{availability.languages}</div>
                  </div>
                </div>

                <div className="availability-item">
                  <span className="availability-icon">🚀</span>
                  <div>
                    <div className="availability-label">
                      {currentLanguage === 'fr' ? 'Disponibilité' : 'Availability'}
                    </div>
                    <div className="availability-value">
                      {t('contact.availability.value')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <div className="form-header">
              <h3>
                {currentLanguage === 'fr' 
                  ? 'Démarrons votre projet'
                  : 'Let\'s start your project'
                }
              </h3>
              <p>
                {currentLanguage === 'fr'
                  ? 'Partagez les détails de votre projet et recevez une réponse personnalisée sous 24h.'
                  : 'Share your project details and receive a personalized response within 24h.'
                }
              </p>
            </div>
            
            <ContactForm />
          </div>
        </div>

        <div className={`contact-cta ${isInView ? 'visible' : ''}`}>
          <div className="cta-background">
            <div className="cta-shape"></div>
          </div>
          <div className="cta-content">
            <h3>
              {currentLanguage === 'fr' 
                ? 'Prêt à transformer vos systèmes de santé ?'
                : 'Ready to transform your health systems?'
              }
            </h3>
            <p>
              {currentLanguage === 'fr'
                ? 'Avec 9+ années d\'expertise DHIS2 et des déploiements dans 11+ pays, je peux vous aider à atteindre vos objectifs de santé numérique.'
                : 'With 9+ years of DHIS2 expertise and deployments across 11+ countries, I can help you achieve your digital health goals.'
              }
            </p>
            
            <div className="quick-contact">
              <a href="mailto:diallotafsir52@gmail.com" className="btn btn-primary">
                📧 {currentLanguage === 'fr' ? 'Email direct' : 'Direct Email'}
              </a>
              <a href="https://calendly.com/diallotafsir52" className="btn btn-secondary">
                📅 {currentLanguage === 'fr' ? 'Planifier un appel' : 'Schedule a Call'}
              </a>
            </div>

            <div className="social-proof">
              <div className="proof-item">
                <span className="proof-icon">⭐</span>
                <span className="proof-text">
                  {currentLanguage === 'fr' ? 'Satisfaction client 100%' : '100% Client Satisfaction'}
                </span>
              </div>
              <div className="proof-item">
                <span className="proof-icon">🚀</span>
                <span className="proof-text">
                  {currentLanguage === 'fr' ? 'Projets livrés à temps' : 'On-time Project Delivery'}
                </span>
              </div>
              <div className="proof-item">
                <span className="proof-icon">🔒</span>
                <span className="proof-text">
                  {currentLanguage === 'fr' ? 'Confidentialité garantie' : 'Confidentiality Guaranteed'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;