import AreasEspecializadas from '../components/AreasEspecializadas';
import { Footer } from '../components/Footer';
import { LogoCarousel } from '../components/LogoCarousel';

export const HomePage = () => {
  return (
    <>
      <AreasEspecializadas />
      <LogoCarousel
        height={128}
        gap={1}
        speed={1.8}
        direction="left"
        pauseOnHover
        grayscaleOnIdle
        title="Nuestros Clientes confían en nosotros"
      />
      <Footer />
    </>
  );
};
