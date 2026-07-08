import React, { useState, useEffect, useCallback } from 'react';
import { useI18n } from '../../i18n';

export default function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const MENU_ITEMS = [
    { label: t.navbar.docs, href: '#docs' },
    { label: t.navbar.changelog, href: '#changelog' },
    { label: 'GitHub', href: 'https://github.com/suhang12332/SwiftCraftLauncher', external: true },
    { label: 'Wiki', href: 'https://github.com/suhang12332/SwiftCraftLauncher/wiki', external: true },
    { label: t.navbar.reportIssue, href: 'https://github.com/suhang12332/SwiftCraftLauncher/issues', external: true },
    { label: 'ZreadAI', href: 'https://zreadai.com', external: true },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div className={`globalnav-wrapper ${menuOpen ? 'globalnav-wrapper--open' : ''}`}>
      <nav className={`globalnav ${scrolled ? 'globalnav--scrolled' : ''}`}>
        <div className="globalnav-content">
          <a href="#hero" className="globalnav-link globalnav-link-apple" aria-label="Swift Craft Launcher">
            <span className="globalnav-link-text-compact globalnav-link-text-full">Swift Craft Launcher</span>
            <span className="globalnav-link-text-compact globalnav-link-text-short">SCL</span>
          </a>

          <div className="globalnav-list">
            {MENU_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="globalnav-link"
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                <span className="globalnav-link-text">{item.label}</span>
              </a>
            ))}
          </div>

          <button
            className="globalnav-menubutton"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`globalnav-menubutton-icon ${menuOpen ? 'open' : ''}`}>
              <span />
              <span />
            </span>
          </button>
        </div>
      </nav>

      <div
        className={`globalnav-overlay ${menuOpen ? 'globalnav-overlay--open' : ''}`}
        onClick={closeMenu}
      />

      <div className={`globalnav-mobile ${menuOpen ? 'globalnav-mobile--open' : ''}`}>
        <div className="globalnav-mobile-inner">
          {MENU_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="globalnav-mobile-link"
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
