import { useMemo } from 'react';
import {
  Zap,
  User,
  Smile,
  Package,
  Layers,
  RefreshCw,
} from 'react-feather';
import Typography from '@/components/common/Typography';
import { Grid, GridItem, Section, Stack } from '@/components/common/layout';
import { useSite } from '@/components/common/Site';
import { useI18n } from '@/i18n';

const FEATURES = [
  { key: 'native', Icon: Zap },
  { key: 'account', Icon: User },
  { key: 'skins', Icon: Smile },
  { key: 'modLoaders', Icon: Package },
  { key: 'instances', Icon: Layers },
  { key: 'updates', Icon: RefreshCw },
];

const IntroFeaturesSection = () => {
  const { breakpoint } = useSite();
  const { t } = useI18n();

  const gap = useMemo(() => (breakpoint === 'xs' ? 24 : 40), [breakpoint]);

  return (
    <Section contained gutterBottom={20}>
      <Grid columns={{ xs: 1, lg: 2 }} gap={{ xs: 6, lg: 12 }}>
        {FEATURES.map(({ key, Icon }) => (
          <GridItem key={key}>
            <Stack>
              <Icon size={gap} />
              <Typography variant="intro" gutterTop>
                {t.features[key].title}
              </Typography>
              <Typography variant="intro" style={{ opacity: 0.5 }}>
                {t.features[key].body}
              </Typography>
            </Stack>
          </GridItem>
        ))}
      </Grid>
    </Section>
  );
};

export default IntroFeaturesSection;
