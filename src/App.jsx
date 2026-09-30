import { I18nProvider } from './i18n';
import { ThemeProvider } from './components/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import OpenSource from './components/OpenSource';
import Footer from './components/Footer';

function App() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <div className="App">
          <Navbar />
          <Hero />
          <Features />
          <OpenSource />
          <Footer />
        </div>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
