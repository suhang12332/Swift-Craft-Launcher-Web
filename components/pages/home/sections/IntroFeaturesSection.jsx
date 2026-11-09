import Image from 'next/image';
import styled from 'styled-components';
import Typography from '@/components/common/Typography';
import { Section, Stack } from '@/components/common/layout';
import { useI18n } from '@/i18n';
import { mediaQueries } from '@/styles/breakpoints';

const FEATURES = [
  'native',
  'account',
  'skins',
  'modLoaders',
  'instances',
  'updates',
];

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;

  @media ${mediaQueries.sm} {
    gap: 56px;
  }
`;

const FeatureImage = styled.div`
  margin-top: 16px;

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const IntroFeaturesSection = () => {
  const { t } = useI18n();

  return (
    <Section contained gutterBottom={20}>
      <FeatureList>
        {FEATURES.map((key) => (
          <Stack key={key} gap={2}>
            <Typography variant="eyebrow-reduced" as="h3" color="tertiary">
              {t.features[key].category}
            </Typography>
            <Typography variant="headline-reduced" as="h2">
              {t.features[key].title}
            </Typography>
            <Typography variant="body" color="tertiary">
              {t.features[key].body}
            </Typography>
            <FeatureImage>
              <Image
                src={`/features/${key.toLowerCase()}.png`}
                alt={t.features[key].title}
                width={1920}
                height={1263}
                sizes="(max-width: 767px) calc(100vw - 32px), 936px"
              />
            </FeatureImage>
          </Stack>
        ))}
      </FeatureList>
    </Section>
  );
};

export default IntroFeaturesSection;
