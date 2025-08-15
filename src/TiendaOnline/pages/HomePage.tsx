import AreasEspecializadas from '../components/AreasEspecializadas';
import { Footer } from '../components/Footer';
import { LogoCarousel } from '../components/LogoCarousel';
import { NuestroEquipo } from '../components/NuestroEquipo';
import { Servicios } from '../components/Servicios';

export const HomePage = () => {
  return (
    <>
      <Servicios />
      <AreasEspecializadas />
      <NuestroEquipo />
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
