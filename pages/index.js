export { default } from '@/components/pages/home';

// Static release info. No network request is made at build time.
export function getStaticProps() {
  return {
    props: {
      versionNumber: '1.3.8',
    },
  };
}
