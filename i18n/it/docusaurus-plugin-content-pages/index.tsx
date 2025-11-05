import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from '@site/src/pages/index.module.css';

// Import the Italian HomepageFeatures component
import HomepageFeatures from '@site/i18n/it/docusaurus-theme-classic/components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const homeTitle = translate({id: 'homepage.title', message: 'Documentazione NethVoice'});
  const homeTagline = translate({id: 'homepage.tagline', message: 'NethVoice è una soluzione VoIP completa e flessibile per NethServer'});
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {homeTitle}
        </Heading>
        <p className="hero__subtitle">{homeTagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/it/docs/tutorial/">
            Tutorial di avvio rapido - 10min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const homeTitle = translate({id: 'homepage.title', message: 'Documentazione NethVoice'});
  const homeTagline = translate({id: 'homepage.tagline', message: 'NethVoice è una soluzione VoIP completa e flessibile per NethServer'});
  return (
    <Layout
      title={homeTitle}
      description={homeTagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
