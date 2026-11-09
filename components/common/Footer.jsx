import styled from 'styled-components';
// import FooterDirectory from './FooterDirectory';
import ContributorsSection from './ContributorsSection';
import { useI18n } from '@/i18n';
import { mediaQueries } from '@/styles/breakpoints';
import config from '@/data/config.json';

const FooterWrap = styled.footer`
  font-size: 12px;
  line-height: 1.33337;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: hidden;
  position: relative;
  z-index: 1;
  background-color: var(--background-tertiary-color);
  color: var(--label-tertiary-color);
  box-sizing: content-box;

  a {
    color: var(--label-tertiary-color);

    &:hover {
      text-decoration: underline;
    }
  }
`;

const FooterContent = styled.div`
  margin: 0 auto;
  max-width: 980px;
  padding: 0 22px;
  padding-left: calc(max(22px, env(safe-area-inset-left)));
  padding-right: calc(max(22px, env(safe-area-inset-right)));
`;

const FooterMini = styled.section`
  padding-top: 34px;
  padding-bottom: calc(max(21px, env(safe-area-inset-bottom)));
`;

const FooterTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;

  @media ${mediaQueries.sm} {
    flex-direction: column;
    gap: 8px;
  }
`;

const Disclaimer = styled.p`
  margin: 0;
  max-width: 640px;
  color: var(--glyph-gray-tertiary);
  font-weight: 300;
`;

const FollowUs = styled.p`
  flex-shrink: 0;
  margin: 0;
  padding-left: 16px;
  border-left: 1px solid var(--separator-color);
  color: var(--glyph-gray-tertiary);
  font-weight: 300;
  white-space: nowrap;

  a {
    color: var(--glyph-blue);
    font-weight: 300;

    &:hover {
      text-decoration: underline;
    }
  }

  @media ${mediaQueries.sm} {
    padding-top: 8px;
    padding-left: 0;
    border-top: 1px solid var(--separator-color);
    border-left: 0;
    white-space: normal;
  }
`;

const FooterDivider = styled.div`
  margin: 12px 0 7px;
  border-bottom: 1px solid var(--separator-color);
`;

const LegalLinks = styled.div`
  display: flex;
  flex-wrap: wrap;

  a {
    border-right: 1px solid var(--fill-gray-tertiary);
    margin-right: 7px;
    padding-right: 10px;
    display: inline-block;
    margin-top: 5px;
    white-space: nowrap;
    color: var(--glyph-gray-secondary-alt);

    &:last-child {
      border: 0;
      margin-right: 0;
      padding-right: 0;
    }
  }
`;

const MiniFooterBottom = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    color: var(--glyph-gray-secondary-alt);

    &:hover {
      text-decoration: underline;
    }
  }

  @media ${mediaQueries.sm} {
    flex-direction: column;
  }
`;

function Footer() {
  const { t } = useI18n();

  const followLinks = [
    { label: t.footer.bilibili, href: config.links.bilibili },
    { label: t.footer.qqGroup, href: config.links.qq },
    { label: 'Discord', href: config.links.discord },
    { label: 'GitHub', href: config.links.githubRepo },
  ];

  return (
    <FooterWrap id="footer" role="contentinfo">
      <FooterContent>
        <ContributorsSection />
        {/* <FooterDirectory /> */}
        <FooterMini>
          <FooterTop>
            <Disclaimer>{t.footer.disclaimer}</Disclaimer>
            <FollowUs>
              {t.footer.followUs}{' '}
              {followLinks.map((link, index) => (
                <span key={link.href}>
                  {index > 0 && (
                    <span aria-hidden="true">
                      {index === followLinks.length - 1
                        ? t.footer.followLastSeparator
                        : t.footer.followSeparator}
                    </span>
                  )}
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </span>
              ))}
            </FollowUs>
          </FooterTop>
          <FooterDivider />
          <MiniFooterBottom>
            <div>
              {t.footer.copyright} <a href={config.host}>{config.title}</a>.
            </div>
            <LegalLinks>
              <a href={config.links.license}>{t.footer.license}</a>
            </LegalLinks>
          </MiniFooterBottom>
        </FooterMini>
      </FooterContent>
    </FooterWrap>
  );
}

export default Footer;
