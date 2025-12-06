import { Banner } from '../components/Banner';
import { LogoCarousel } from '../components/LogoCarousel';
import { Nosotros } from '../components/Nosotros';
import { NuestroEquipo } from '../components/NuestroEquipo';
import { Servicios } from '../components/Servicios';
import { Valores } from '../components/Valores';
import { UbicacionComponent } from '../components/Ubicacion';
import React from 'react';
import { AreasEspecializadas } from '../components/AreasEspecializadas';
import { ConstruccionJuridica } from '../components/ConstruccionJuridica';
import { EventoPopup } from '../components/EventoPopUp';
import { EventoEnero } from '../components/EventoEnero';

export const HomePage = (): React.JSX.Element => {
  return (
    <div className="w-full min-w-full overflow-x-hidden">

      {/* Popup del evento */}
      <EventoPopup />

      <Banner />

      <Nosotros />
      <EventoEnero />
      <ConstruccionJuridica />
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
        address="Av. del Mar 123, Mazatlán, Sinaloa, México"
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
