import React from 'react';
import { TarjetaMiembro } from './TarjetaMiembro';
import { useTranslation } from 'react-i18next';

type Miembro = {
  id: string;
  nombre: string;
  src: string;
  destacado?: boolean;
};

const miembros: Miembro[] = [
  {
    id: 'dionisio',
    nombre: 'DIONISIO PAZ DÍAZ',
    src: '/img/colaborador1.jpeg',
    destacado: true,
  },
  { id: 'jose', nombre: 'JOSÉ VALDEZ ZATARAIN', src: '/img/colaborador3.jpeg' },
  {
    id: 'felipe',
    nombre: 'FELIPE HERNÁNDEZ GARCÍA',
    src: '/img/colaborador5.jpeg',
  },
  {
    id: 'aurora',
    nombre: 'AURORA LIZÁRRAGA FERNÁNDEZ',
    src: '/img/colaborador2.jpeg',
  },
  { id: 'liz', nombre: 'LIZ LASCÁREZ CALDERÓN', src: '/img/colaborador6.jpeg' },
  { id: 'alfredo', nombre: 'ALFREDO SOTO VELA', src: '/img/colaborador4.jpeg' },
];

export const NuestroEquipo: React.FC = () => {
  const { t } = useTranslation('home');

  return (
    <section className="w-full bg-white pt-[3.5rem] pb-[7rem] px-4" id="equipo">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-[#0b2f79] text-3xl md:text-5xl font-bold mb-[4rem]">
          {t('equipo.title')}
        </h2>

        <div
          className="
            mt-10 grid
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
            gap-x-[1rem] gap-y-[3rem]
          "
        >
          {miembros.map((m) => (
            <TarjetaMiembro
              key={m.id}
              m={{
                ...m,
                cargo: t(`equipo.miembros.${m.id}.cargo`),
                subcargo:
                  t(`equipo.miembros.${m.id}.subcargo`, { defaultValue: '' }) ||
                  undefined,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
