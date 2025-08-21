import AreasEspecializadas from '../components/AreasEspecializadas';
import { Banner } from '../components/Banner';
import { Footer } from '../components/Footer';
import { LogoCarousel } from '../components/LogoCarousel';
import { Nosotros } from '../components/Nosotros';
import { NuestroEquipo } from '../components/NuestroEquipo';
import { Servicios } from '../components/Servicios';
import { Slogan } from '../components/Slogan';
import { Valores } from '../components/Valores';
import { UbicacionComponent } from '../components/Ubicacion';

export const HomePage = () => {
  return (
    <div>
      <Banner />
      <Servicios />
      <AreasEspecializadas />
      <Nosotros />
      <Valores />
      <Slogan />
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
      <UbicacionComponent
        title="Nuestra ubicación"
        address="Av. del Mar 123, Mazatlán, Sinaloa, México"
        lat={23.2377259}
        lng={-106.4303041}
        zoom={16}
        phone="+52 669 229 1634"
        hours="Lun – Vie 9:00 – 19:00"
        className="bg-background"
      />
    </div>
  );
};
