import React from 'react';
import { I18nProvider } from './i18n';
import { ThemeProvider } from './components/ThemeToggle/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OpenSource from './components/OpenSource';
import Footer from './components/Footer';
import LanguageSwitcher from './components/LanguageSwitcher';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <div className="App">
          <Navbar />
          <Hero />
          <OpenSource />
          <Footer />
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
