import React from 'react';

type Miembro = {
  id: string;
  nombre: string;
  cargo: string;
  subcargo?: string;
  src: string;
  srcImgColor: string;
  destacado?: boolean;
};

type Props = {
  m: Miembro;
  onClick?: () => void;
};

export const TarjetaMiembro: React.FC<Props> = ({ m, onClick }) => {
  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
      aria-label={`Ver experiencia de ${m.nombre}`}
      className="
        group w-full max-w-[16rem] mx-auto flex flex-col items-center
        cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d91c1c]
      "
    >
      {/* Foto */}
      <div
        className="
          w-full aspect-[1/1] overflow-hidden rounded-2xl relative
          ring-1 ring-black/5 bg-neutral-200 drop-shadow-md
        "
      >
        {/* Imagen base (gris) */}
        <img
          src={m.src}
          alt={m.nombre}
          className="
            h-full w-full object-cover
            absolute inset-0
            grayscale
            transition-opacity duration-300
            opacity-100 group-hover:opacity-0
          "
          loading="lazy"
        />

        {/* Imagen al pasar el mouse (a color) */}
        <img
          src={m.srcImgColor}
          alt={`${m.nombre} en color`}
          className="
            h-full w-full object-cover
            absolute inset-0
            transition-opacity duration-300
            opacity-0 group-hover:opacity-100
          "
          loading="lazy"
        />
      </div>

      {/* Texto */}
      <div className="mt-3 text-center">
        <h3
          className="
            text-sm sm:text-base font-bold tracking-wide uppercase
            text-neutral-800 transition-colors duration-200
            group-hover:text-[#d91c1c]
          "
        >
          {m.nombre}
        </h3>

        <p
          className="
            mt-1 text-[13px] sm:text-sm font-semibold
            text-neutral-900 transition-colors duration-200
            group-hover:text-[#d91c1c]
          "
        >
          {m.cargo}
        </p>

        {m.subcargo && (
          <p className="text-[13px] sm:text-sm font-semibold text-neutral-900">
            {m.subcargo}
          </p>
        )}
      </div>
    </article>
  );
};
