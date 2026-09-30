import { useI18n, getDocsUrl } from '../../i18n';
import { RELEASES_URL, GITHUB_REPO, ISSUES_URL, LICENSE_URL, DISCUSSIONS_URL, QQ_GROUP_URL, DISCORD_URL, BILIBILI_URL } from '../../constants/urls';

export default function Footer() {
  const { t, locale } = useI18n();
  const year = new Date().getFullYear();
  const communityLinks = [
    { label: 'GitHub', url: GITHUB_REPO },
    { label: t.footer.discussions, url: DISCUSSIONS_URL },
    { label: t.footer.qqGroup, url: QQ_GROUP_URL },
    { label: 'Discord', url: DISCORD_URL },
    { label: t.footer.bilibili, url: BILIBILI_URL },
  ].filter((link) => link.url);
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
              {communityLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                </li>
              ))}
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
