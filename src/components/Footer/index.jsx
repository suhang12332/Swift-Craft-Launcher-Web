import { useI18n, getDocsUrl } from '../../i18n';
import { RELEASES_URL, GITHUB_REPO, ISSUES_URL, LICENSE_URL, PRIVACY_URL } from '../../constants/urls';

export default function Footer() {
  const { t, locale } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="ac-globalfooter">
      <div className="ac-globalfooter-content">
        <div className="ac-globalfooter-directory">
          <div className="ac-globalfooter-directory-column">
            <h3 className="ac-globalfooter-directory-headline">{t.footer.product}</h3>
            <ul className="ac-globalfooter-directory-list">
              <li><a href={RELEASES_URL} target="_blank" rel="noopener noreferrer">{t.footer.download}</a></li>
              <li><a href={getDocsUrl(locale)} target="_blank" rel="noopener noreferrer">{t.footer.userGuide}</a></li>
              <li><a href={RELEASES_URL} target="_blank" rel="noopener noreferrer">{t.footer.changelog}</a></li>
            </ul>
          </div>
          <div className="ac-globalfooter-directory-column">
            <h3 className="ac-globalfooter-directory-headline">{t.footer.community}</h3>
            <ul className="ac-globalfooter-directory-list">
              <li><a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="#">{t.footer.qqGroup}</a></li>
              <li><a href="#">Discord</a></li>
              <li><a href="#">{t.footer.bilibili}</a></li>
            </ul>
          </div>
          <div className="ac-globalfooter-directory-column">
            <h3 className="ac-globalfooter-directory-headline">{t.footer.feedback}</h3>
            <ul className="ac-globalfooter-directory-list">
              <li><a href={ISSUES_URL} target="_blank" rel="noopener noreferrer">{t.footer.reportIssue}</a></li>
            </ul>
          </div>
          <div className="ac-globalfooter-directory-column">
            <h3 className="ac-globalfooter-directory-headline">{t.footer.legal}</h3>
            <ul className="ac-globalfooter-directory-list">
              <li><a href={LICENSE_URL} target="_blank" rel="noopener noreferrer">{t.footer.license}</a></li>
              <li><a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">{t.footer.privacy}</a></li>
            </ul>
          </div>
        </div>

        <div className="ac-globalfooter-bottom">
          <p className="ac-globalfooter-copyright">
            Copyright © 2025-{year} Swift Craft Launcher. {t.footer.copyright}
          </p>
          <p className="ac-globalfooter-disclaimer">
            {t.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
