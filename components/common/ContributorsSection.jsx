import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Typography from '@/components/common/Typography';
import { Section } from '@/components/common/layout';
import { useI18n } from '@/i18n';
import { mediaQueries } from '@/styles/breakpoints';

const GITHUB_CONTRIBUTORS_URL =
  'https://swift-craft-launcher-api.pages.dev/api/contributors';
const CORE_CONTRIBUTORS_URL =
  'https://swift-craft-launcher-contributors.pages.dev/contributors.json';
const DEFAULT_AVATAR =
  'https://mc-heads.net/avatar/9dde22a18d5f488fb48e849335b748e9/50';

const getAvatar = (url) => {
  if (!url || !url.startsWith('http')) return DEFAULT_AVATAR;
  return url;
};

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Group = styled.div`
  &:not(:last-child) {
    margin-bottom: 40px;
  }
`;

const ContributorList = styled.div`
  display: grid;
  grid-template-columns: repeat(13, 64px);
  justify-content: space-between;
  row-gap: 24px;
  margin-top: 24px;

  @media ${mediaQueries.md} {
    grid-template-columns: repeat(auto-fit, 64px);
  }
`;

const ContributorItem = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
    text-decoration: none;
  }
`;

const ContributorAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--separator-color);
  transition: border-color 0.2s;

  ${ContributorItem}:hover & {
    border-color: var(--link-color);
  }

  @media ${mediaQueries.sm} {
    width: 32px;
    height: 32px;
  }
`;

const ContributorName = styled.span`
  width: 64px;
  font-size: 12px;
  line-height: 1.33337;
  letter-spacing: -0.01em;
  color: var(--label-tertiary-color);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.2s;

  ${ContributorItem}:hover & {
    color: var(--label-primary-color);
  }
`;

const Spinner = styled.div`
  width: 24px;
  height: 24px;
  margin: 20px auto;
  border: 2.5px solid var(--separator-color);
  border-top-color: var(--label-tertiary-color);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const ContributorsSection = () => {
  const { t } = useI18n();
  const [githubContributors, setGithubContributors] = useState([]);
  const [coreContributors, setCoreContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      fetch(GITHUB_CONTRIBUTORS_URL, { cache: 'no-store' })
        .then((res) => res.json())
        .then((data) => {
          if (cancelled) return;

          if (Array.isArray(data)) {
            setGithubContributors(data);
          } else if (Array.isArray(data.contributors)) {
            setGithubContributors(data.contributors);
          }
        })
        .catch(() => {}),
      fetch(CORE_CONTRIBUTORS_URL, { cache: 'no-store' })
        .then((res) => res.json())
        .then((data) => {
          if (cancelled) return;

          if (Array.isArray(data.contributors)) {
            setCoreContributors(data.contributors);
          }
        })
        .catch(() => {}),
    ]).finally(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Section id="contributors" gutterX={0} gutterTop={4} gutterBottom={0}>
      <Group>
        <Typography variant="eyebrow-reduced" as="h3">
          {t.contributors.github}
        </Typography>
        <ContributorList>
          {loading ? (
            <Spinner aria-label={t.contributors.loading} />
          ) : (
            githubContributors.map((user) => (
              <ContributorItem
                key={user.login}
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${user.login} (${user.contributions} ${t.contributors.contributions})`}
              >
                <ContributorAvatar
                  src={user.avatar_url}
                  alt={user.login}
                  loading="lazy"
                />
                <ContributorName>{user.login}</ContributorName>
              </ContributorItem>
            ))
          )}
        </ContributorList>
      </Group>

      {coreContributors.length > 0 && (
        <Group>
          <Typography variant="eyebrow-reduced" as="h3">
            {t.contributors.core}
          </Typography>
          <ContributorList>
            {coreContributors.map((user) => {
              const hasUrl = Boolean(user.url);

              return (
                <ContributorItem
                  key={user.name}
                  as={hasUrl ? 'a' : 'div'}
                  {...(hasUrl
                    ? {
                        href: user.url,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      }
                    : {})}
                  title={user.name}
                >
                  <ContributorAvatar
                    src={getAvatar(user.avatar)}
                    alt={user.name}
                    loading="lazy"
                  />
                  <ContributorName>{user.name}</ContributorName>
                </ContributorItem>
              );
            })}
          </ContributorList>
        </Group>
      )}
    </Section>
  );
};

export default ContributorsSection;
