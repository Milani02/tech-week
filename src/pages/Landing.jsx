import Hero from '../components/Hero';
import Registration from '../components/Registration';
import InfoSections from '../components/InfoSections';

export default function Landing() {
  return (
    <main className="bg-tech-bg min-h-screen">
      <Hero />
      <Registration />
      <InfoSections />
    </main>
  );
}