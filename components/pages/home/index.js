import HeroSection from './sections/HeroSection';
import IntroFeaturesSection from './sections/IntroFeaturesSection';

export default function HomePage(props) {
  return (
    <>
      <HeroSection {...props} />
      <IntroFeaturesSection />
    </>
  );
}
