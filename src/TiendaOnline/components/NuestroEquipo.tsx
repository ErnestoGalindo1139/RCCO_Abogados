// sections/NuestroEquipo.tsx
import React, { useMemo, useState } from 'react';
import { TarjetaMiembro } from './TarjetaMiembro';
import { useTranslation } from 'react-i18next';
import { ModalInfoMiembro } from './ModalInfoMiembro';

type Miembro = {
  id: string;
  nombre: string;
  src: string;
  destacado?: boolean;
  srcImgColor: string;
};

const miembros: Miembro[] = [
  {
    id: 'dionisio',
    nombre: 'DIONISIO PAZ DÍAZ',
    src: '/img/colaborador1.jpg',
    destacado: true,
    srcImgColor: '/img/colaborador1-2.jpg',
  },
  {
    id: 'jose',
    nombre: 'JOSÉ VALDEZ ZATARAIN',
    src: '/img/colaborador3.jpeg',
    srcImgColor: '/img/colaborador3-2.jpg',
  },
  {
    id: 'felipe',
    nombre: 'FELIPE HERNÁNDEZ GARCÍA',
    src: '/img/colaborador5.jpeg',
    srcImgColor: '/img/colaborador5-2.jpg',
  },
  {
    id: 'alfredo',
    nombre: 'ALFREDO SOTO VELA',
    src: '/img/colaborador4.jpeg',
    srcImgColor: '/img/colaborador4-2.jpg',
  },
  {
    id: 'aurora',
    nombre: 'ÁURORA LIZÁRRAGA FERNÁNDEZ',
    src: '/img/colaborador2.jpeg',
    srcImgColor: '/img/colaborador2-2.jpg',
  },
  {
    id: 'liz',
    nombre: 'LIZ LASCAREZ CALDERÓN',
    src: '/img/colaborador6.jpeg',
    srcImgColor: '/img/colaborador6-2.jpg',
  },
];

export const NuestroEquipo: React.FC = () => {
  const { t } = useTranslation('home');
  const [openId, setOpenId] = useState<string | null>(null);

  // Construye objetos traducidos (cargo, subcargo y experiencia[] desde i18n)
  const data = useMemo(() => {
    return miembros.map((m) => {
      const cargo = t(`equipo.miembros.${m.id}.cargo`);
      const subcargo =
        t(`equipo.miembros.${m.id}.subcargo`, { defaultValue: '' }) ||
        undefined;
      // experiencia como arreglo en i18n:
      // home.json:
      // "equipo": { "miembros": { "jose": { "experiencia": ["Punto 1", "Punto 2"] } } }
      const experiencia = t(`equipo.miembros.${m.id}.experiencia`, {
        returnObjects: true,
        defaultValue: [],
      }) as unknown as string[];

      return { ...m, cargo, subcargo, experiencia };
    });
  }, [t]);

  const selected = data.find((x) => x.id === openId);

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
          {data.map((m) => (
            <TarjetaMiembro key={m.id} m={m} onClick={() => setOpenId(m.id)} />
          ))}
        </div>
      </div>

      <ModalInfoMiembro
        open={!!openId}
        onClose={() => setOpenId(null)}
        member={selected ?? null}
      />
    </section>
  );
};
