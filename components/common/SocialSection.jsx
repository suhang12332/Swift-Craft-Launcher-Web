import styled from 'styled-components';
import { MessageCircle, Video } from 'react-feather';
import Typography from '@/components/common/Typography';
import { Grid, GridItem, Section, Stack } from '@/components/common/layout';
import DiscordSvg from '@/assets/discord-icon.svg';
import GitHubSvg from '@/assets/github-icon.svg';
import { useI18n } from '@/i18n';
import config from '@/data/config.json';

const DiscordIcon = styled(DiscordSvg)`
  width: 48px;
  height: 48px;
`;

const GitHubIcon = styled(GitHubSvg)`
  width: 48px;
  height: 48px;
`;

const SocialSection = () => {
  const { t } = useI18n();

  return (
    <Section gutterX={0} gutterY>
      <Grid columns={{ xs: 1, md: 2, lg: 4 }} gap>
        <GridItem>
          <Stack gap={1} align="center" style={{ textAlign: 'center' }}>
            <DiscordIcon />
            <Typography variant="headline-body">
              {t.social.discord.title}
            </Typography>
            <Typography variant="body-reduced">
              {t.social.discord.body}
            </Typography>
            <Typography variant="body-reduced">
              <a href={config.links.discord}>{t.social.discord.action}</a>
            </Typography>
          </Stack>
        </GridItem>
        <GridItem>
          <Stack gap={1} align="center" style={{ textAlign: 'center' }}>
            <GitHubIcon />
            <Typography variant="headline-body">
              {t.social.github.title}
            </Typography>
            <Typography variant="body-reduced">
              {t.social.github.body}
            </Typography>
            <Typography variant="body-reduced">
              <a href={config.links.githubRepo}>{t.social.github.action}</a>
            </Typography>
          </Stack>
        </GridItem>
        <GridItem>
          <Stack gap={1} align="center" style={{ textAlign: 'center' }}>
            <MessageCircle size={48} />
            <Typography variant="headline-body">
              {t.social.qq.title}
            </Typography>
            <Typography variant="body-reduced">{t.social.qq.body}</Typography>
            <Typography variant="body-reduced">
              <a href={config.links.qq}>{t.social.qq.action}</a>
            </Typography>
          </Stack>
        </GridItem>
        <GridItem>
          <Stack gap={1} align="center" style={{ textAlign: 'center' }}>
            <Video size={48} />
            <Typography variant="headline-body">
              {t.social.bilibili.title}
            </Typography>
            <Typography variant="body-reduced">
              {t.social.bilibili.body}
            </Typography>
            <Typography variant="body-reduced">
              <a href={config.links.bilibili}>{t.social.bilibili.action}</a>
            </Typography>
          </Stack>
        </GridItem>
      </Grid>
    </Section>
  );
};

export default SocialSection;
