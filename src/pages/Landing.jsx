import Hero from '../components/Hero';
import Registration from '../components/Registration';
import InfoSections from '../components/InfoSections';

export default function Landing() {
  return (
    <main className="bg-tech-bg min-h-screen flex flex-col">
      <Hero />
      <Registration />
      <InfoSections />
      
      {/* FOOTER */}
<footer className="w-full py-8 text-center border-t border-white/10 bg-surreal-bg relative z-10 mt-auto">
  <p className="text-gray-500 text-sm font-medium tracking-wide">
    &copy; {new Date().getFullYear()} Todos os direitos reservados a Milani Corporation.
  </p>
</footer>
    </main>
  );
}