import { Banner } from '../components/Banner';
import { LogoCarousel } from '../components/LogoCarousel';
import { Nosotros } from '../components/Nosotros';
import { NuestroEquipo } from '../components/NuestroEquipo';
import { Servicios } from '../components/Servicios';
import { Slogan } from '../components/Slogan';
import { Valores } from '../components/Valores';
import { UbicacionComponent } from '../components/Ubicacion';
import React from 'react';
import { AreasEspecializadas } from '../components/AreasEspecializadas';

export const HomePage = (): React.JSX.Element => {
  return (
    <div>
      <Banner />
      <Nosotros />
      <Valores />
      <Slogan />
      <NuestroEquipo />
      <Servicios />
      <AreasEspecializadas />
      <LogoCarousel
        height={128}
        gap={1}
        speed={1.8}
        direction="left"
        pauseOnHover
        grayscaleOnIdle
        title="logos.trustHeadline"
      />
      <UbicacionComponent
        title="ubicacion.title"
        address="Av. del Mar 123, Mazatlán, Sinaloa, México"
        lat={23.2377259}
        lng={-106.4303041}
        zoom={16}
        phone="+52 669 229 1634"
        hours="ubicacion.schedule.week"
        className="bg-background"
      />
    </div>
  );
};
