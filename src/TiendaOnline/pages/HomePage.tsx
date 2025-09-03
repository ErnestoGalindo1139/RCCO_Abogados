import { Banner } from '../components/Banner';
import { LogoCarousel } from '../components/LogoCarousel';
import { Nosotros } from '../components/Nosotros';
import { NuestroEquipo } from '../components/NuestroEquipo';
import { Servicios } from '../components/Servicios';
import { Valores } from '../components/Valores';
import { UbicacionComponent } from '../components/Ubicacion';
import React from 'react';
import { AreasEspecializadas } from '../components/AreasEspecializadas';

export const HomePage = (): React.JSX.Element => {
  return (
    <div className="w-full min-w-full overflow-x-hidden">
      
      <Banner />
      
        <Nosotros />
        <Valores />
        <Servicios />
        <AreasEspecializadas />
        <NuestroEquipo />
        <LogoCarousel
          height={160}
          gap={1}
          speed={2}
          direction="left"
          title="logos.trustHeadline"
        />
        <UbicacionComponent
          title="ubicacion.title"
          address="C. Guelatao 909, María Fernanda, 82147 Mazatlán, Sin."
          lat={23.2377259}
          lng={-106.4303041}
          zoom={16}
          phone="+52 669 229 1634"
          hours="ubicacion.schedule.week"
          className="bg-background w-full"
        />
      </div>
    
  );
};

