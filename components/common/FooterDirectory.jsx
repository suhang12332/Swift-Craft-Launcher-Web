import styled from 'styled-components';
import { useI18n } from '@/i18n';
import { mediaQueries } from '@/styles/breakpoints';
import config from '@/data/config.json';

const Directory = styled.nav`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 34px 0 12px;

  @media ${mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);
    padding-top: 24px;
  }
`;

const Headline = styled.h3`
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--label-primary-color);
`;

const LinkList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    margin-bottom: 8px;
  }

  a {
    color: var(--label-tertiary-color);
    transition: color 0.2s;

    &:hover {
      color: var(--label-primary-color);
      text-decoration: underline;
    }
  }
`;

const FooterDirectory = () => {
  const { t } = useI18n();

  const columns = [
    {
      title: t.footer.product,
      links: [
        { label: t.footer.download, href: config.links.latestRelease },
        { label: t.footer.userGuide, href: config.links.githubWiki },
        { label: t.footer.changelog, href: config.links.releases },
      ],
    },
    {
      title: t.footer.community,
      links: [
        { label: 'GitHub', href: config.links.githubRepo },
        { label: t.footer.discussions, href: config.links.githubDiscussions },
        { label: t.footer.qqGroup, href: config.links.qq },
        { label: 'Discord', href: config.links.discord },
        { label: t.footer.bilibili, href: config.links.bilibili },
      ],
    },
    {
      title: t.footer.feedback,
      links: [
        { label: t.footer.reportIssue, href: config.links.githubIssues },
      ],
    },
    {
      title: t.footer.legal,
      links: [{ label: t.footer.license, href: config.links.license }],
    },
  ];

  return (
    <Directory>
      {columns.map((column) => (
        <div key={column.title}>
          <Headline>{column.title}</Headline>
          <LinkList>
            {column.links.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </LinkList>
        </div>
      ))}
    </Directory>
  );
};

export default FooterDirectory;
