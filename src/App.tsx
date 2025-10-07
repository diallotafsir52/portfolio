import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import LanguageToggle from './components/LanguageToggle';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProgressBar from './components/ProgressBar';
import './App.css';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="App">
  <ProgressBar />
  <LanguageToggle />
  <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;