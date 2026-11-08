import Head from 'next/head';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Site from '@/components/common/Site';
import { I18nProvider, useI18n } from '@/i18n';
import '@/styles/globals.css';
import config from '@/data/config.json';

function AppContent({ Component, pageProps }) {
  const { t } = useI18n();
  const { title, description } = t.meta;

  return (
    <Site>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${config.host}/app-window-light.png`} />
        <meta property="og:url" content={config.host} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${config.host}/app-window-light.png`} />
      </Head>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </Site>
  );
}

function App({ Component, pageProps }) {
  return (
    <I18nProvider>
      <AppContent Component={Component} pageProps={pageProps} />
    </I18nProvider>
  );
}

export default App;
