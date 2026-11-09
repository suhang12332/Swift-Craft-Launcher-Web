import styled from 'styled-components';
import FooterDirectory from './FooterDirectory';
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

    :hover {
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

const ContributorsDivider = styled.hr`
  margin: 40px 0 0;
  border: 0;
  border-top: 1px solid var(--separator-color);
`;

const FooterMini = styled.section`
  padding-top: 34px;
  padding-bottom: calc(max(21px, env(safe-area-inset-bottom)));
  color: #86868b;
`;

const Disclaimer = styled.p`
  margin: 0 0 9px;
  color: var(--glyph-gray-tertiary);
`;

const FooterDivider = styled.div`
  margin-bottom: 7px;
  border-bottom: 1px solid #d2d2d7;
  border-color: var(--separator-color);
`;

const LegalLinks = styled.div`
  display: flex;
  flex-wrap: wrap;

  a {
    border-right: 1px solid #d2d2d7;
    margin-right: 7px;
    padding-right: 10px;
    display: inline-block;
    margin-top: 5px;
    white-space: nowrap;
    color: var(--glyph-gray-secondary-alt);
    border-color: var(--fill-gray-tertiary);

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

    :hover {
      text-decoration: underline;
    }
  }

  @media ${mediaQueries.sm} {
    flex-direction: column;
  }
`;

function Footer() {
  const { t } = useI18n();

  return (
    <FooterWrap
      id="footer"
      className="footer"
      role="contentinfo"
      aria-labelledby="footer-label"
    >
      <FooterContent>
        <ContributorsSection />
        <ContributorsDivider />
        <FooterDirectory />
        <FooterMini>
          <Disclaimer>{t.footer.disclaimer}</Disclaimer>
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
