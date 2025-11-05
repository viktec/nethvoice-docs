import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Facile da configurare',
    Svg: require('@site/static/img/easy.svg').default,
    description: (
      <>
        NethVoice è una soluzione PBX progettata per la semplicità, che ti permette di configurare le funzionalità telefoniche
        rapidamente e intuitivamente. La sua interfaccia user-friendly e la configurazione guidata la rendono facile da distribuire e gestire, anche senza competenze tecniche avanzate.
      </>
    ),
    },
    {
    title: 'Supporto Multi-canale',
    Svg: require('@site/static/img/multichannel.svg').default,
    description: (
      <>
        NethVoice supporta più canali di comunicazione predefiniti:
        telefoni SIP, WebRTC e applicazioni mobili.

        Rimani connesso da qualsiasi luogo e su qualsiasi dispositivo.
      </>
    ),
  },
  {
    title: 'Open Source',
    Svg: require('@site/static/img/open_source.svg').default,
    description: (
      <>
        NethVoice è open source, offrendoti piena trasparenza e flessibilità.
        Contribuisci al progetto, personalizzalo secondo le tue esigenze e beneficia di una comunità vibrante.
      </>
    ),
  }
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
