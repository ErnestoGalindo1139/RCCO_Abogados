import React, { useState } from 'react';
import {
  Handshake,
  ShieldCheck,
  Heart,
  UserCheck,
  HelpingHand,
} from 'lucide-react';

type Valor = {
  id: string;
  titulo: string;
  descripcion: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const VALORES: Valor[] = [
  {
    id: 'confianza',
    titulo: 'CONFIANZA',
    descripcion:
      'Generamos seguridad y certeza jurídica en cada interacción, comunicando con claridad y cumpliendo lo prometido.',
    Icon: ShieldCheck,
  },
  {
    id: 'lealtad',
    titulo: 'LEALTAD',
    descripcion:
      'Actuamos con compromiso genuino hacia nuestros clientes y sus objetivos, protegiendo siempre sus intereses.',
    Icon: Heart,
  },
  {
    id: 'honestidad',
    titulo: 'HONESTIDAD',
    descripcion:
      'Somos transparentes y frontales. Decimos lo que es viable y lo que no, con fundamentos y ética profesional.',
    Icon: UserCheck,
  },
  {
    id: 'responsabilidad',
    titulo: 'RESPONSABILIDAD',
    descripcion:
      'Asumimos cada asunto con disciplina, seguimiento puntual y rendición de cuentas en todo momento.',
    Icon: HelpingHand,
  },
];

const TEXTO_GENERAL =
  'Destacamos nuestro compromiso con la integridad, profesionalismo, responsabilidad y ética en cada servicio legal ofrecido.';

export const Valores: React.FC = () => {
  const [activo, setActivo] = useState<string | null>(null);
  const descripcionActual =
    VALORES.find((v) => v.id === activo)?.descripcion ?? TEXTO_GENERAL;

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      {/* Encabezado */}
      <header className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide text-[#123E7A]">
          NUESTROS VALORES
        </h2>
        <p className="mt-4 text-sm md:text-base text-neutral-700 max-w-3xl mx-auto min-h-[3rem]">
          {descripcionActual}
        </p>
      </header>

      {/* ==== Layout escritorio con grid 3x3 ==== */}
      <div className="hidden md:grid gap-6 place-items-center">
        {/* Esquina superior izquierda */}
        <div className="flex justify-around  w-full">
          <ValorCard
            valor={VALORES[0]}
            seleccionado={activo === VALORES[0].id}
            onClick={() => setActivo(VALORES[0].id)}
          />

          {/* <BotonCentro onReset={() => setActivo(null)} /> */}
          <CentroConLineasFuera sides={["left","right","bottom"]} setActivo={setActivo}/>

          {/* Esquina superior derecha */}
          <ValorCard
            valor={VALORES[1]}
            seleccionado={activo === VALORES[1].id}
            onClick={() => setActivo(VALORES[1].id)}
          />
        </div>

        <div className="flex justify-evenly w-full">
          <ValorCard
            valor={VALORES[2]}
            seleccionado={activo === VALORES[2].id}
            onClick={() => setActivo(VALORES[2].id)}
          />

          {/* Esquina inferior derecha */}
          <ValorCard
            valor={VALORES[3]}
            seleccionado={activo === VALORES[3].id}
            onClick={() => setActivo(VALORES[3].id)}
          />
        </div>
      </div>

      {/* ==== Layout móvil ==== */}
      <div className="md:hidden space-y-4">
        <div className="flex gap-3 flex-wrap justify-center">
          {VALORES.map((v) => (
            <ValorCard
              key={v.id}
              valor={v}
              seleccionado={activo === v.id}
              onClick={() => setActivo(v.id)}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <BotonCentro onReset={() => setActivo(null)} />
        </div>
      </div>
    </section>
  );
};

const BotonCentro: React.FC<{ onReset: () => void }> = ({ onReset }) => (
  <button
    type="button"
    onClick={onReset}
    className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-[#123E7A] text-white shadow-md transition-transform hover:scale-105"
  >
    <Handshake className="h-8 w-8 md:h-10 md:w-10" />
  </button>
);

const ValorCard: React.FC<{
  valor: Valor;
  seleccionado: boolean;
  onClick: () => void;
}> = ({ valor, seleccionado, onClick }) => {
  const { Icon } = valor;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-[200px] rounded-xl border bg-white p-3 text-left shadow-sm
                  transition-all hover:shadow-lg hover:-translate-y-0.5
                  ${seleccionado ? 'border-[#123E7A] ring-1 ring-[#123E7A]/40' : 'border-neutral-200'}`}
    >
      <div className={`flex items-center gap-2`}>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg
                      transition-transform group-hover:scale-110
                      ${seleccionado ? 'bg-[#123E7A] text-white' : 'bg-neutral-100 text-neutral-800'}`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span
            className={`font-semibold text-sm ${seleccionado ? 'text-[#123E7A]' : 'text-neutral-900'}`}
          >
            {valor.titulo}
          </span>
          {/* <span className="text-xs text-neutral-500 truncate">
            {seleccionado ? 'Seleccionado' : 'Haz clic para ver más'}
          </span> */}
        </div>
      </div>
    </button>
  );
};


type Side = "top" | "right" | "bottom" | "left";

type Props = {
  diameter?: number;   // px
  gap?: number;        // separación entre círculo y líneas
  lineWidth?: number;  // grosor de línea
  lineExtend?: number; // cuánto salen hacia afuera
  lineColor?: string;
  sides?: Side[];      // cuáles lados dibujar (default: todas)
  className?: string;
  setActivo?: React.Dispatch<React.SetStateAction<string | null>>
};

export const CentroConLineasFuera: React.FC<Props> = ({
  diameter = 112,
  gap = 8,
  lineWidth = 2,
  lineExtend = 80,
  lineColor = "rgba(0,0,0,0.28)",
  sides = ["top", "right", "bottom", "left"],
  className = "",
  setActivo,
}) => {
  // flags para CSS (0/1)
  const showTop = Number(sides.includes("top"));
  const showRight = Number(sides.includes("right"));
  const showBottom = Number(sides.includes("bottom"));
  const showLeft = Number(sides.includes("left"));

  const styleVars = {
    ["--d"]: `${diameter}px`,
    ["--gap"]: `${gap}px`,
    ["--w"]: `${lineWidth}px`,
    ["--extend"]: `${lineExtend}px`,
    ["--line"]: lineColor,
    ["--show-top"]: showTop,
    ["--show-right"]: showRight,
    ["--show-bottom"]: showBottom,
    ["--show-left"]: showLeft,
  } as React.CSSProperties;

  return (
    <div className={`cv-wrap relative inline-flex items-center justify-center ${className}`} style={styleVars}>
      {/* círculo (único nodo en el DOM) */}
      <div
        className="relative z-10 flex items-center justify-center rounded-full bg-[#123E7A] text-white shadow-md"
        style={{ width: "var(--d)", height: "var(--d)" }}
        aria-label="Centro valores"
      >

        {/* <Handshake style={{ width: "calc(var(--d)*0.42)", height: "calc(var(--d)*0.42)" }} /> */}
        <BotonCentro onReset={() => setActivo && setActivo(null)} />
      </div>

      {/* estilo del pseudo-elemento que dibuja las líneas */}
      <style>{`
        .cv-wrap::before{
          content:"";
          position:absolute;
          left:calc(var(--extend) * -1);
          right:calc(var(--extend) * -1);
          top:calc(var(--extend) * -1);
          bottom:calc(var(--extend) * -1);
          pointer-events:none;

          /* 4 capas: top, right, bottom, left */
          background:
            /* TOP (vertical arriba) */
            linear-gradient(var(--line), var(--line)) center top / 
              var(--w) calc(var(--show-top) * (50% - (var(--d)/2 + var(--gap)))) no-repeat,

            /* RIGHT (horizontal derecha) */
            linear-gradient(var(--line), var(--line)) right center /
              calc(var(--show-right) * (50% - (var(--d)/2 + var(--gap)))) var(--w) no-repeat,

            /* BOTTOM (vertical abajo) */
            linear-gradient(var(--line), var(--line)) center bottom /
              var(--w) calc(var(--show-bottom) * (50% - (var(--d)/2 + var(--gap)))) no-repeat,

            /* LEFT (horizontal izquierda) */
            linear-gradient(var(--line), var(--line)) left center /
              calc(var(--show-left) * (50% - (var(--d)/2 + var(--gap)))) var(--w) no-repeat;
        }
      `}</style>
    </div>
  );
};
