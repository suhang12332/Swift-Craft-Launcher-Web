import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import { Container } from '@/components/common/layout';
import useDownload from '@/hooks/useDownload';
import { useI18n } from '@/i18n';
import { breakpoints, mediaQueries } from '@/styles/breakpoints';
import config from '@/data/config.json';

const Nav = styled.nav`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 52px;
  z-index: 9997;
  position: sticky;

  * {
    box-sizing: content-box;
  }

  @media ${mediaQueries.sm} {
    height: 48px;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  min-height: 100%;
  z-index: 1;
  background-color: var(--material-background-color);
  backdrop-filter: var(--material-filters);
  box-shadow: 0 1px 0 0 var(--material-separator-color);
`;

const HeaderContainer = styled(Container)`
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${mediaQueries.sm} {
    flex-direction: column;
    justify-content: stretch;
    align-items: flex-start;
  }
`;

const Title = styled.h2`
  font-size: 22px;
  line-height: 1.14286;
  font-weight: 600;
  letter-spacing: -0.033em;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: default;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 10px 0;
  white-space: nowrap;
  color: var(--glyph-gray);

  @media ${mediaQueries.sm} {
    padding: 10px 0;
    font-size: 19px;
    margin-left: 0;
  }

  a {
    display: inline-flex;
    align-items: center;
    letter-spacing: inherit;
    line-height: inherit;
    margin: 0;
    text-decoration: none;
    white-space: nowrap;
    color: var(--glyph-gray);
    opacity: 0.92;
  }

  img {
    margin-left: -3px;
    padding-right: 10px;
    cursor: pointer;
    transform: scale(0.805);
    transform-origin: center;

    @media ${mediaQueries.sm} {
      margin-left: -2px;
      padding-right: 8px;
      width: 28px;
      height: auto;
    }
  }

  span {
    cursor: pointer;
  }
`;

const Menu = styled.div`
  font-size: 12px;
  line-height: 1;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  display: flex;
  align-items: center;
  gap: 24px;

  @media ${mediaQueries.sm} {
    width: 100%;
  }
`;

const MenuTray = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media ${mediaQueries.sm} {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    gap: 0;
    padding-bottom: 16px;
  }
`;

const MenuItems = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;

  @media ${mediaQueries.sm} {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }
`;

const MenuItem = styled.li`
  margin-left: 24px;
  float: left;
  list-style: none;
  display: flex;
  gap: 4px;
  align-items: center;

  @media ${mediaQueries.sm} {
    margin-left: 0;
    border-top: 1px solid var(--separator-color);
  }
`;

const MenuLink = styled.a`
  color: var(--foreground-color);
  display: inline-flex;
  align-items: center;
  line-height: 22px;
  padding: 15px 0;
  white-space: nowrap;
  opacity: 0.88;

  &:hover {
    color: var(--glyph-blue);
  }

  @media ${mediaQueries.sm} {
    width: 100%;
    padding: 12px 0;
  }

  ${({ $current }) =>
    $current
      ? `
        color: var(--foreground-color) !important;
        opacity: 1;
      `
      : ``}
`;

const Actions = styled.div`
  display: flex;
  align-items: center;

  @media ${mediaQueries.sm} {
    right: 0;
    padding: 9px 16px;
    position: absolute;
    top: 0;
    z-index: 1;
  }
`;

const Action = styled.div``;

const MenuToggle = styled.button`
  margin: 0 6px 0 0;
  padding: 0;
  background: none;
  border: 0;
  cursor: pointer;
  display: none;
  overflow: hidden;
  width: 40px;
  height: 30px;
  -webkit-tap-highlight-color: transparent;

  @media ${mediaQueries.sm} {
    display: block;
  }
`;

const MenuChevron = styled.span`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.8;

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 18px;
    width: 11px;
    height: 1px;
    z-index: 1;
    background: #000;
    transition: transform 0.2s;
  }

  &:before {
    right: 50%;
    border-radius: 0.5px 0 0 0.5px;
    transform-origin: 100% 100%;
    transform: rotate(40deg) scaleY(1.1);
  }

  &:after {
    left: 50%;
    border-radius: 0 0.5px 0.5px 0;
    transform-origin: 0% 100%;
    transform: rotate(-40deg) scaleY(1.1);
  }

  ${({ $open }) =>
    $open
      ? `
        &:before {
          transform: rotate(-40deg) scaleY(1.1);
        }

        &:after {
          transform: rotate(40deg) scaleY(1.1);
        }
      `
      : ``}

  html[data-color-scheme='dark'] &::before,
  html[data-color-scheme='dark'] &::after {
    background: var(--glyph-gray);
  }
`;

const isExternalHref = (href) => /^(https?:\/\/)/.test(href);

const NAV_LABEL_KEYS = {
  '/': 'overview',
  [config.links.githubWiki]: 'documentation',
  [config.links.githubRepo]: 'github',
};

function Header() {
  const { downloadUrl, loading: downloadLoading } = useDownload();
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu when the viewport grows back to desktop size.
  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${breakpoints.sm + 1}px)`);
    const handleChange = () => {
      if (media.matches) setMenuOpen(false);
    };

    media.addEventListener('change', handleChange);

    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <Nav role="navigation">
      <Wrapper>
        <HeaderContainer>
          <Link href="/">
            <Title>
              <Image
                width={32}
                height={32}
                src={config.assets.appIcon32}
                alt="Swift Craft Launcher app icon"
                priority
              />
              <span>SCL</span>
            </Title>
          </Link>
          <Menu>
            <MenuTray id="mobile-navigation" $open={menuOpen}>
              <MenuItems>
                {config.navigation.map((href) => {
                  const isExternal = isExternalHref(href);
                  const item = config.pages[href] ?? { title: href };
                  const labelKey = NAV_LABEL_KEYS[href];
                  const label = labelKey ? t.nav[labelKey] : item.title;
                  const isCurrent = href === '/';

                  return (
                    <MenuItem key={href}>
                      <MenuLink
                        href={href}
                        $current={isCurrent}
                        onClick={() => setMenuOpen(false)}
                        {...(isExternal
                          ? { target: '_blank', rel: 'noreferrer' }
                          : {})}
                      >
                        {label}
                      </MenuLink>
                    </MenuItem>
                  );
                })}
              </MenuItems>
            </MenuTray>
            <Actions>
              <Action>
                <MenuToggle
                  type="button"
                  aria-label={
                    menuOpen ? t.common.closeMenu : t.common.openMenu
                  }
                  aria-expanded={menuOpen}
                  aria-controls="mobile-navigation"
                  onClick={() => setMenuOpen((open) => !open)}
                >
                  <MenuChevron $open={menuOpen} />
                </MenuToggle>
              </Action>
              <Action>
                <Button
                  size="sm"
                  href={downloadLoading ? undefined : downloadUrl}
                  aria-disabled={downloadLoading}
                  onClick={
                    downloadLoading
                      ? (event) => event.preventDefault()
                      : undefined
                  }
                >
                  {t.common.download}
                </Button>
              </Action>
            </Actions>
          </Menu>
        </HeaderContainer>
      </Wrapper>
    </Nav>
  );
}

export default Header;
