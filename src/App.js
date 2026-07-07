import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Highlights from './components/Highlights';
import Download from './components/Download';
import OpenSource from './components/OpenSource';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Features />
      <Highlights />
      <Download />
      <OpenSource />
      <Footer />
    </div>
  );
}

export default App;
