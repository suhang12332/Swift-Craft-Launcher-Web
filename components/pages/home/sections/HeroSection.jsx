import Image from 'next/image';
import styled from 'styled-components';
import { Parallax } from 'react-parallax';
import Typography from '@/components/common/Typography';
import { Row, Column, Section, Stack } from '@/components/common/layout';
import Button from '@/components/common/Button';
import useDownload from '@/hooks/useDownload';
import { useI18n } from '@/i18n';
import HeroImage from '../HeroImage';
import HomebrewInstall from '../HomebrewInstall';
import config from '@/data/config.json';

const HeroHeadline = styled(Typography)`
  font-size: 40px;
  line-height: 1.1;
  letter-spacing: 0em;
`;

const HeroDescription = styled(Typography)`
  font-size: 21px;
  line-height: 1.381002381;
  font-weight: 400;
  letter-spacing: 0.011em;
  font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Helvetica,
    Arial, sans-serif;
`;

const ProductIconWrap = styled.div`
  width: 128px;
  margin-left: auto;
  margin-right: auto;

  img {
    display: block;
    transform: scale(0.805);
    transform-origin: center;
  }
`;

const HeroSection = ({ versionNumber }) => {
  const { t } = useI18n();
  const {
    downloadUrl,
    version: latestVersion,
    minimumSystemVersion,
    loading: downloadLoading,
    systemSupported,
  } = useDownload();

  const displayVersion = latestVersion || versionNumber;
  const downloadDisabled = downloadLoading || !systemSupported;
  const downloadTitle =
    !downloadLoading && !systemSupported
      ? t.common.requiresMacOS.replace(
          '{version}',
          minimumSystemVersion.split('.')[0]
        )
      : undefined;

  return (
    <Parallax
      style={{ overflow: 'visible' }}
      renderLayer={(percentage) => {
        return (
          <Section contained gutterTop>
            <Row align="center" style={{ position: 'relative', zIndex: 1 }}>
              <Column width={{ md: 12, lg: 12 }}>
                <Stack gap={2} align="center">
                  <ProductIconWrap>
                    <Image
                      width={128}
                      height={128}
                      src={config.assets.appIcon128}
                      alt="Swift Craft Launcher app icon"
                      priority
                    />
                  </ProductIconWrap>
                  <HeroHeadline variant="headline-elevated">
                    {t.hero.headline}
                  </HeroHeadline>
                  <HeroDescription
                    variant="intro-elevated"
                    color="primary"
                    gutterBottom
                  >
                    {t.hero.description}
                  </HeroDescription>
                  <Button
                    size="lg"
                    href={downloadDisabled ? undefined : downloadUrl}
                    $disabled={downloadDisabled}
                    aria-disabled={downloadDisabled}
                    title={downloadTitle}
                    onClick={
                      downloadDisabled
                        ? (event) => event.preventDefault()
                        : undefined
                    }
                  >
                    {t.common.download}
                    {displayVersion ? ` v${displayVersion}` : ''}
                  </Button>
                  {!downloadDisabled && <HomebrewInstall />}
                </Stack>
              </Column>
            </Row>
            <Row align="center">
              <Column>
                <HeroImage percentage={percentage} />
              </Column>
            </Row>
          </Section>
        );
      }}
    />
  );
};

export default HeroSection;
