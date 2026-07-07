import React, { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`globalnav ${scrolled ? 'globalnav--scrolled' : ''}`}>
      <div className="globalnav-content">
        <a href="#hero" className="globalnav-link globalnav-link-apple" aria-label="SwiftCraft">
          <svg width="14" height="44" viewBox="0 0 100 100" fill="none">
            <rect x="4" y="4" width="92" height="92" rx="20" fill="url(#g)"/>
            <path d="M58 20L38 52h16L42 80l28-36H54L66 20H58z" fill="#fff"/>
            <defs><linearGradient id="g" x1="0" y1="0" x2="100" y2="100"><stop stopColor="#2997ff"/><stop offset=".5" stopColor="#bf5af2"/><stop offset="1" stopColor="#ff375f"/></linearGradient></defs>
          </svg>
          <span className="globalnav-link-text-compact">SwiftCraft</span>
        </a>

        <div className={`globalnav-list ${menuOpen ? 'globalnav-list--open' : ''}`}>
          <a href="#features" className="globalnav-link" onClick={() => setMenuOpen(false)}>
            <span className="globalnav-link-text">功能</span>
          </a>
          <a href="#highlights" className="globalnav-link" onClick={() => setMenuOpen(false)}>
            <span className="globalnav-link-text">亮点</span>
          </a>
          <a href="#download" className="globalnav-link" onClick={() => setMenuOpen(false)}>
            <span className="globalnav-link-text">下载</span>
          </a>
          <a href="https://github.com/suhang12332/SwiftCraftLauncher" className="globalnav-link" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
            <span className="globalnav-link-text">GitHub</span>
          </a>
        </div>

        <button className="globalnav-menubutton" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            {menuOpen ? (
              <>
                <line x1="3" y1="3" x2="15" y2="15" stroke="#f5f5f7" strokeWidth="1.2"/>
                <line x1="15" y1="3" x2="3" y2="15" stroke="#f5f5f7" strokeWidth="1.2"/>
              </>
            ) : (
              <>
                <line x1="2" y1="5" x2="16" y2="5" stroke="#f5f5f7" strokeWidth="1.2"/>
                <line x1="2" y1="9" x2="16" y2="9" stroke="#f5f5f7" strokeWidth="1.2"/>
                <line x1="2" y1="13" x2="16" y2="13" stroke="#f5f5f7" strokeWidth="1.2"/>
              </>
            )}
          </svg>
        </button>
      </div>
    </nav>
  );
}
