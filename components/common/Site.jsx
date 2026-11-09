import { createContext, useContext, useEffect, useState } from 'react';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import theme from '@/styles/theme';
import useWindowDimensions from '@/hooks/useWindowDimensions';

export const SiteContext = createContext({});

export const useSite = () => useContext(SiteContext);

const getSystemColorScheme = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

const Site = ({ children }) => {
  const windowDimensions = useWindowDimensions();
  const [colorScheme, setColorScheme] = useState('light');

  // Follow the system appearance. There is no manual theme override.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const applyColorScheme = () => {
      const scheme = getSystemColorScheme();

      setColorScheme(scheme);
      document.documentElement.setAttribute('data-color-scheme', scheme);
    };

    applyColorScheme();
    media.addEventListener('change', applyColorScheme);

    return () => media.removeEventListener('change', applyColorScheme);
  }, []);

  return (
    <SiteContext.Provider
      value={{
        colorScheme,
        windowDimensions,
        breakpoint: windowDimensions.breakpoint,
      }}
    >
      <StyleSheetManager
        enableVendorPrefixes
        shouldForwardProp={(propName, elementToBeRendered) =>
          typeof elementToBeRendered === 'string'
            ? isPropValid(propName)
            : true
        }
      >
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </StyleSheetManager>
    </SiteContext.Provider>
  );
};

export default Site;
