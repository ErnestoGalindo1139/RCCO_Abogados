import React from 'react';
import { TarjetaMiembro } from './TarjetaMiembro';

type Miembro = {
  id: string;
  nombre: string;
  cargo: string; // línea 1 debajo del nombre
  subcargo?: string; // línea 2 opcional
  src: string; // ruta de la imagen
  destacado?: boolean; // si true: sin gris y título/cargo en color
};

const miembros: Miembro[] = [
  {
    id: 'dionisio',
    nombre: 'DIONISIO PAZ DÍAZ',
    cargo: 'Director General de RCCO',
    src: '/img/colaborador1.jpeg',
    destacado: true,
  },
  {
    id: 'jose',
    nombre: 'JOSÉ VALDEZ ZATARAIN',
    cargo: 'Presidente del Consejo de',
    subcargo: 'Administración',
    src: '/img/colaborador3.jpeg',
  },
  {
    id: 'felipe',
    nombre: 'FELIPE HERNÁNDEZ GARCÍA',
    cargo: 'Socio Abogado de la firma',
    src: '/img/colaborador5.jpeg',
  },
  {
    id: 'aurora',
    nombre: 'AURORA LIZÁRRAGA FERNÁNDEZ',
    cargo: 'Abogada Jr.',
    src: '/img/colaborador2.jpeg',
  },
  {
    id: 'liz',
    nombre: 'LIZ LASCÁREZ CALDERÓN',
    cargo: 'Abogada',
    src: '/img/colaborador6.jpeg',
  },
  {
    id: 'alfredo',
    nombre: 'ALFREDO SOTO VELA',
    cargo: 'Abogado Sr.',
    src: '/img/colaborador4.jpeg',
  },
];

export const NuestroEquipo = (): React.JSX.Element => {
  return (
    <section className="w-full bg-white pt-[3.5rem] pb-[7rem] px-4" id='nosotros'>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-[#0b2f79] text-3xl md:text-5xl font-bold mb-[4rem]">
          Nuestro equipo
        </h2>

        <div
          className="
            mt-10 grid
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
            gap-x-[1rem] gap-y-[3rem]
          "
        >
          {miembros.map((m) => (
            <TarjetaMiembro key={m.id} m={m} />
          ))}
        </div>
      </div>
    </section>
  );
};
