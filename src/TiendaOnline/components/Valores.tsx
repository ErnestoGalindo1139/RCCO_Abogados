import React, { useMemo, useState } from 'react';
import {
  Handshake,
  ShieldCheck,
  Heart,
  UserCheck,
  HelpingHand,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Valor = {
  id: 'confianza' | 'lealtad' | 'honestidad' | 'responsabilidad';
  titulo: string;
  descripcion: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const ICONS: Record<Valor['id'], Valor['Icon']> = {
  confianza: ShieldCheck,
  lealtad: Heart,
  honestidad: UserCheck,
  responsabilidad: HelpingHand,
};

export const Valores: React.FC = () => {
  const { t } = useTranslation('home');
  const [activo, setActivo] = useState<Valor['id'] | null>(null);

  // Construimos los valores desde i18n para no hardcodear textos
  const valores: Valor[] = useMemo(
    () =>
      (
        [
          'confianza',
          'lealtad',
          'honestidad',
          'responsabilidad',
        ] as Valor['id'][]
      ).map((id) => ({
        id,
        titulo: t(`valores.items.${id}.title`),
        descripcion: t(`valores.items.${id}.desc`),
        Icon: ICONS[id],
      })),
    [t]
  );

  const textoGeneral = t('valores.general');
  const descripcionActual =
    (activo ? valores.find((v) => v.id === activo)?.descripcion : undefined) ??
    textoGeneral;

  return (
    <section
      id="valores"
      className="mx-auto max-w-5xl px-4 py-10 mb-[6rem] mt-[1rem]"
    >
      {/* Encabezado */}
      <header className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide text-[#123E7A]">
          {t('valores.title')}
        </h2>
        <p className="mt-4 text-sm md:text-base text-neutral-700 max-w-3xl mx-auto min-h-[3rem]">
          {descripcionActual}
        </p>
      </header>

      {/* ==== Layout escritorio con grid ==== */}
      <div className="hidden md:grid gap-6 place-items-center">
        {/* fila 1 */}
        <div className="flex justify-around items-center w-full">
          <ValorCard
            valor={valores[0]}
            seleccionado={activo === valores[0].id}
            onClick={() => setActivo(valores[0].id)}
          />

          <CentroConLineasFuera
            diameter={100}
            gap={10}
            lineWidth={2}
            lineExtend={90}
            lineColor="rgba(0,0,0,.22)"
            sides={['left', 'right', 'bottom']}
            setActivo={
              setActivo as React.Dispatch<React.SetStateAction<string | null>>
            }
            ariaLabel={t('valores.centerAria')}
          />

          <ValorCard
            valor={valores[1]}
            seleccionado={activo === valores[1].id}
            onClick={() => setActivo(valores[1].id)}
          />
        </div>

        {/* fila 2 */}
        <div className="flex justify-evenly w-full">
          <ValorCard
            valor={valores[2]}
            seleccionado={activo === valores[2].id}
            onClick={() => setActivo(valores[2].id)}
          />

          <ValorCard
            valor={valores[3]}
            seleccionado={activo === valores[3].id}
            onClick={() => setActivo(valores[3].id)}
          />
        </div>
      </div>

      {/* ==== Layout móvil ==== */}
      <div className="md:hidden space-y-4">
        <div className="flex gap-3 flex-wrap justify-center">
          {valores.map((v) => (
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
    aria-label="reset valores"
  >
    <Handshake className="h-8 w-8 md:h-10 md:w-10" />
  </button>
);

const ValorCard: React.FC<{
  valor: Valor;
  seleccionado: boolean;
  onClick: () => void;
  heightClass?: string;
}> = ({ valor, seleccionado, onClick, heightClass = 'h-16 md:h-20' }) => {
  const { Icon } = valor;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group relative w-[210px] ${heightClass}
        flex items-center
        rounded-xl border bg-white px-4
        text-left shadow-sm transition-all
        hover:shadow-lg hover:-translate-y-0.5
        ${seleccionado ? 'border-[#123E7A] ring-1 ring-[#123E7A]/40' : 'border-neutral-200'}
      `}
      aria-pressed={seleccionado}
    >
      <div className="flex items-center gap-2 w-full">
        <div
          className={`
            flex h-10 w-10 items-center justify-center rounded-lg
            transition-transform group-hover:scale-110 shrink-0
            ${seleccionado ? 'bg-[#123E7A] text-white' : 'bg-neutral-100 text-neutral-800'}
          `}
        >
          <Icon className="h-6 w-6" />
        </div>

        <div className="flex flex-col overflow-hidden">
          <span
            className={`font-semibold text-sm ${seleccionado ? 'text-[#123E7A]' : 'text-neutral-900'}`}
          >
            {valor.titulo}
          </span>
        </div>
      </div>
    </button>
  );
};

type Side = 'top' | 'right' | 'bottom' | 'left';

type CentroProps = {
  diameter?: number;
  gap?: number;
  lineWidth?: number;
  lineExtend?: number;
  lineColor?: string;
  sides?: Side[];
  className?: string;
  setActivo?: React.Dispatch<React.SetStateAction<string | null>>;
  ariaLabel?: string;
};

export const CentroConLineasFuera: React.FC<CentroProps> = ({
  diameter = 112,
  gap = 8,
  lineWidth = 2,
  lineExtend = 80,
  lineColor = 'rgba(0,0,0,0.28)',
  sides = ['top', 'right', 'bottom', 'left'],
  className = '',
  setActivo,
  ariaLabel = 'Centro valores',
}) => {
  const showTop = Number(sides.includes('top'));
  const showRight = Number(sides.includes('right'));
  const showBottom = Number(sides.includes('bottom'));
  const showLeft = Number(sides.includes('left'));

  const styleVars = {
    ['--d']: `${diameter}px`,
    ['--gap']: `${gap}px`,
    ['--w']: `${lineWidth}px`,
    ['--extend']: `${lineExtend}px`,
    ['--line']: lineColor,
    ['--show-top']: showTop,
    ['--show-right']: showRight,
    ['--show-bottom']: showBottom,
    ['--show-left']: showLeft,
  } as React.CSSProperties;

  return (
    <div
      className={`cv-wrap relative inline-flex items-center justify-center ${className}`}
      style={styleVars}
    >
      {/* círculo */}
      <div
        className="relative z-10 flex items-center justify-center rounded-full bg-[#123E7A] text-white shadow-md"
        style={{ width: 'var(--d)', height: 'var(--d)' }}
        aria-label="Centro valores"
      >
        {' '}
        {/* <Handshake style={{ width: "calc(var(--d)*0.42)", height: "calc(var(--d)*0.42)" }} /> */}{' '}
        <BotonCentro onReset={() => setActivo && setActivo(null)} />{' '}
      </div>

      {/* líneas (pseudo-elemento) */}
      <style>{`
        .cv-wrap::before{
          content:"";
          position:absolute;
          left:calc(var(--extend) * -1);
          right:calc(var(--extend) * -1);
          top:calc(var(--extend) * -1);
          bottom:calc(var(--extend) * -1);
          pointer-events:none;

          background:
            linear-gradient(var(--line), var(--line)) center top /
              var(--w) calc(var(--show-top) * (50% - (var(--d)/2 + var(--gap)))) no-repeat,
            linear-gradient(var(--line), var(--line)) right center /
              calc(var(--show-right) * (50% - (var(--d)/2 + var(--gap)))) var(--w) no-repeat,
            linear-gradient(var(--line), var(--line)) center bottom /
              var(--w) calc(var(--show-bottom) * (50% - (var(--d)/2 + var(--gap)))) no-repeat,
            linear-gradient(var(--line), var(--line)) left center /
              calc(var(--show-left) * (50% - (var(--d)/2 + var(--gap)))) var(--w) no-repeat;
        }
      `}</style>
    </div>
  );
};
