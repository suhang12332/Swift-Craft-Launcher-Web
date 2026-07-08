import React from 'react';
import { useI18n } from '../../i18n';

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="ac-globalfooter">
      <div className="ac-globalfooter-content">
        <div className="ac-globalfooter-directory">
          <div className="ac-globalfooter-directory-column">
            <h3 className="ac-globalfooter-directory-headline">{t.footer.product}</h3>
            <ul className="ac-globalfooter-directory-list">
              <li><a href="#download">{t.footer.download}</a></li>
              <li><a href="#docs">{t.footer.userGuide}</a></li>
              <li><a href="#changelog">{t.footer.changelog}</a></li>
            </ul>
          </div>
          <div className="ac-globalfooter-directory-column">
            <h3 className="ac-globalfooter-directory-headline">{t.footer.community}</h3>
            <ul className="ac-globalfooter-directory-list">
              <li><a href="https://github.com/suhang12332/SwiftCraftLauncher" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="#">QQ群</a></li>
              <li><a href="#">Discord</a></li>
              <li><a href="#">Bilibili</a></li>
            </ul>
          </div>
          <div className="ac-globalfooter-directory-column">
            <h3 className="ac-globalfooter-directory-headline">{t.footer.feedback}</h3>
            <ul className="ac-globalfooter-directory-list">
              <li><a href="https://github.com/suhang12332/SwiftCraftLauncher/issues" target="_blank" rel="noopener noreferrer">{t.footer.reportIssue}</a></li>
            </ul>
          </div>
          <div className="ac-globalfooter-directory-column">
            <h3 className="ac-globalfooter-directory-headline">{t.footer.legal}</h3>
            <ul className="ac-globalfooter-directory-list">
              <li><a href="https://github.com/suhang12332/SwiftCraftLauncher/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">{t.footer.license}</a></li>
              <li><a href="https://github.com/suhang12332/SwiftCraftLauncher/blob/main/PRIVACY.md" target="_blank" rel="noopener noreferrer">{t.footer.privacy}</a></li>
            </ul>
          </div>
        </div>

        <div className="ac-globalfooter-bottom">
          <p className="ac-globalfooter-copyright">
            Copyright © {year} Swift Craft Launcher. {t.footer.copyright}
          </p>
          <p className="ac-globalfooter-disclaimer">
            {t.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
