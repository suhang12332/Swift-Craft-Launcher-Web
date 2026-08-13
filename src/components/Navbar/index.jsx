import { useState, useEffect, useCallback } from 'react';
import { useI18n, getDocsUrl } from '../../i18n';
import { RELEASES_URL, GITHUB_REPO, WIKI_URL, ISSUES_URL } from '../../constants/urls';

export default function Navbar() {
  const { t, locale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const MENU_ITEMS = [
    { label: t.navbar.docs, href: getDocsUrl(locale), external: true },
    { label: t.navbar.changelog, href: RELEASES_URL, external: true },
    { label: 'GitHub', href: GITHUB_REPO, external: true },
    { label: 'Wiki', href: WIKI_URL, external: true },
    { label: t.navbar.reportIssue, href: ISSUES_URL, external: true },
    { label: 'ZreadAI', href: 'https://zread.ai/suhang12332/Swift-Craft-Launcher', external: true },
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
            <span className="globalnav-link-text-compact globalnav-link-text-full">SCL</span>
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
