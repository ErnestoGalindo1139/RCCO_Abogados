import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Banknote,
  Building2,
  Factory,
  LandPlot,
  Disc,
  Droplet,
  Utensils,
  Wrench,
  Shield,
} from 'lucide-react';

// -------------------------------------------------------
// Diseño: Áreas especializadas (hexágonos alrededor + panel)
// - React + TypeScript + TailwindCSS + Framer Motion
// - Animaciones suaves al hover
// - Click despliega información detallada
// - 100% responsive
// - Componentes en funciones de flecha (preferencia del usuario)
// -------------------------------------------------------

// Datos de ejemplo (puedes modificar textos e íconos cuando gustes)
const SECTORES = [
  {
    id: 'financiero',
    titulo: 'Sector Financiero',
    icon: Banknote,
    colorA: '#5DA2FF',
    colorB: '#2A5BFF',
    descripcion:
      'Asesoría regulatoria, cumplimiento, prevención de lavado, fusiones y adquisiciones, litigio financiero y estructuración de productos.',
    puntos: [
      'Cumplimiento y CNBV',
      'Fintech / SOFOM / Sociedades de inversión',
      'Contratos y garantías',
    ],
  },
  {
    id: 'minera',
    titulo: 'Industria Minera',
    icon: Wrench,
    colorA: '#8ED1FC',
    colorB: '#4A90E2',
    descripcion:
      'Títulos de concesión, consulta previa, gestión ambiental y defensa administrativa en todas las etapas del proyecto.',
    puntos: [
      'Concesiones y servidumbres',
      'Impacto ambiental',
      'Contratación y compliance',
    ],
  },
  {
    id: 'hidrocarburos',
    titulo: 'Industria de Hidrocarburos',
    icon: Droplet,
    colorA: '#7DD3FC',
    colorB: '#0EA5E9',
    descripcion:
      'Midstream, downstream, permisos CRE/ASEA, contratos de transporte, almacenamiento y comercialización.',
    puntos: [
      'Permisos y regulatorio',
      'Contratos y logística',
      'Litigio y defensa',
    ],
  },
  {
    id: 'construccion',
    titulo: 'Sector Construcción',
    icon: Building2,
    colorA: '#A78BFA',
    colorB: '#6366F1',
    descripcion:
      'Contratos EPC, obra pública y privada, fianzas, reclamaciones, arbitraje y gestión de riesgos.',
    puntos: ['Contratos y garantías', 'Obra pública', 'Arbitraje y reclamos'],
  },
  {
    id: 'alimentaria',
    titulo: 'Industria Alimentaria',
    icon: Utensils,
    colorA: '#34D399',
    colorB: '#10B981',
    descripcion:
      'Cumplimiento sanitario, etiquetado, NOMs, trazabilidad, importación/exportación y publicidad.',
    puntos: ['COFEPRIS y NOMs', 'Etiquetado y claims', 'Comercio exterior'],
  },
  {
    id: 'inmobiliario',
    titulo: 'Sector Inmobiliario',
    icon: LandPlot,
    colorA: '#F59E0B',
    colorB: '#F97316',
    descripcion:
      'Adquisición, due diligence, fideicomisos, desarrollo, arrendamiento y regularización de inmuebles.',
    puntos: [
      'Fideicomisos y vehículos',
      'Due diligence',
      'Contratos y arrendamiento',
    ],
  },
  {
    id: 'agricola',
    titulo: 'Sector Agrícola',
    icon: Shield,
    colorA: '#4ADE80',
    colorB: '#22C55E',
    descripcion:
      'Tenencia de la tierra, certificaciones, contratación laboral y comercialización nacional e internacional.',
    puntos: ['Tierra y ejidos', 'Certificaciones', 'Exportación'],
  },
  {
    id: 'discografica',
    titulo: 'Industria Discográfica',
    icon: Disc,
    colorA: '#F472B6',
    colorB: '#EC4899',
    descripcion:
      'Propiedad intelectual, licencias, management, regalías, sincronizaciones y resolución de controversias.',
    puntos: ['Marcas y derechos', 'Contratos de artista', 'Regalías y sync'],
  },
] as const;

type Sector = (typeof SECTORES)[number];

// SVG hexágono reutilizable
const HexSvg: React.FC<{ a: string; b: string; hovered: boolean }> = ({
  a,
  b,
  hovered,
}) => (
  <svg viewBox="0 0 100 100" className="w-full h-full block">
    <defs>
      <linearGradient id={`grad-${a}-${b}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={a} />
        <stop offset="100%" stopColor={b} />
      </linearGradient>
      <filter id="shadow-soft" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="6" stdDeviation="6" floodOpacity="0.25" />
      </filter>
    </defs>
    <polygon
      points="50,3 95,27 95,73 50,97 5,73 5,27"
      fill={`url(#grad-${a}-${b})`}
      filter="url(#shadow-soft)"
      opacity={hovered ? 1 : 0.95}
    />
    <polygon
      points="50,8 90,28 90,72 50,92 10,72 10,28"
      fill="rgba(255,255,255,0.08)"
    />
  </svg>
);

// Tarjeta detalle
const DetallePanel: React.FC<{
  sector: Sector | null;
  onClose: () => void;
}> = ({ sector, onClose }) => {
  return (
    <AnimatePresence mode="wait">
      {sector && (
        <motion.div
          key={sector.id}
          initial={{ opacity: 0, y: 6, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 6, filter: 'blur(8px)' }}
          transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
          className="w-full lg:w-[28rem] xl:w-[32rem] bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-white/10">
              {sector.icon && React.createElement(sector.icon, { size: 32 })}
            </div>
            <h3 className="text-2xl font-bold tracking-tight">
              {sector.titulo}
            </h3>
          </div>

          <p className="mt-4 text-white/80 leading-relaxed">
            {sector.descripcion}
          </p>

          <ul className="mt-4 space-y-2 text-white/80">
            {sector.puntos.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/70" />
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 transition border border-white/10 text-sm"
            >
              Cerrar
            </button>
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 hover:brightness-110 transition text-sm font-semibold">
              Solicitar asesoría
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hexágono interactivo
const HexTile: React.FC<{
  sector: Sector;
  sizeRem: number;
  onClick: (s: Sector) => void;
}> = ({ sector, sizeRem, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = sector.icon;

  return (
    <motion.button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(sector)}
      className="relative grid place-items-center select-none outline-none"
      style={{ width: `${sizeRem}rem`, height: `${sizeRem}rem` }}
      whileHover={{ scale: 1.04, rotate: 0.5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-0 rounded-[2rem] will-change-transform">
        <HexSvg a={sector.colorA} b={sector.colorB} hovered={hovered} />
      </div>
      <div className="relative z-10 text-center px-3">
        <div className="mx-auto mb-2 grid place-items-center rounded-2xl bg-white/15 p-2">
          <Icon size={24} />
        </div>
        <span className="text-sm md:text-base font-medium drop-shadow-sm leading-tight">
          {sector.titulo}
        </span>
      </div>
      {/* Halo */}
      <motion.div
        className="absolute -inset-2 rounded-2xl blur-md"
        style={{
          background: `linear-gradient(135deg, ${sector.colorA}, ${sector.colorB})`,
        }}
        animate={{ opacity: hovered ? 0.35 : 0 }}
        transition={{ duration: 0.25 }}
      />
    </motion.button>
  );
};

// Componente principal
const AreasEspecializadas: React.FC = () => {
  const [seleccion, setSeleccion] = useState<Sector | null>(null);

  // Tamaño y radio responsivos
  const { sizeRem, radiusRem } = useMemo(() => {
    // valores base pensados para 1280px; se ajustan con clamp
    const sizeRem = 8; // diámetro aproximado del hexágono
    const radiusRem = 14; // radio del anillo
    return { sizeRem, radiusRem };
  }, []);

  // Calcula posiciones circulares para los 8 sectores
  const posiciones = useMemo(() => {
    const n = SECTORES.length;
    const step = (2 * Math.PI) / n;
    const start = -Math.PI / 2; // inicia arriba
    return SECTORES.map((s, i) => {
      const angle = start + i * step;
      const x = Math.cos(angle) * radiusRem;
      const y = Math.sin(angle) * radiusRem;
      return { id: s.id, x, y };
    });
  }, [radiusRem]);

  return (
    <div className="min-h-[90vh] w-full grid place-items-center bg-gradient-to-b from-[#0B2A6F] via-[#0D2F7F] to-[#0B2A6F] text-white py-10 px-4">
      <div className="w-full max-w-7xl grid gap-10 lg:grid-cols-[1fr,420px] xl:grid-cols-[1fr,520px] items-center">
        {/* Anillo con hexágonos */}
        <div
          className="relative mx-auto"
          style={{ width: `min(90vw, 42rem)`, height: `min(90vw, 42rem)` }}
        >
          {/* Círculo guía sutil */}
          <div className="absolute inset-0 rounded-full border border-white/10" />

          {/* Centro */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[12rem] h-[12rem] rounded-[3rem] grid place-items-center text-center shadow-2xl"
            style={{
              background:
                'radial-gradient(100% 100% at 50% 0%, #2563EB, #0EA5E9)',
            }}
          >
            <div>
              <p className="text-sm tracking-[0.2em] uppercase opacity-80">
                RCCO
              </p>
              <h2 className="text-2xl font-extrabold tracking-tight">ÁREAS</h2>
              <p className="text-sm -mt-0.5 opacity-90">Especializadas</p>
            </div>
          </div>

          {/* Hexágonos posicionados en círculo */}
          {SECTORES.map((s, i) => {
            const pos = posiciones[i];
            return (
              <div
                key={s.id}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(calc(${pos.x}rem - 50%), calc(${pos.y}rem - 50%))`,
                }}
              >
                <HexTile sector={s} sizeRem={sizeRem} onClick={setSeleccion} />
              </div>
            );
          })}
        </div>

        {/* Panel de detalle (derecha en desktop, abajo en móvil) */}
        <div className="lg:pl-2">
          {/* min-h para preservar el espacio y no romper tamaños */}
          <div className="min-h-[22rem] flex items-start">
            <DetallePanel
              sector={seleccion}
              onClose={() => setSeleccion(null)}
            />
            {!seleccion && (
              <motion.div
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0 }}
                className="text-white/80 max-w-lg"
              >
                <h3 className="text-2xl font-bold mb-2">
                  Explora nuestras áreas
                </h3>
                <p>
                  Pasa el cursor sobre cada hexágono para un efecto interactivo
                  y haz clic para ver información detallada del sector. Diseño
                  optimizado para escritorio y móvil.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Responsive: lista bajo el anillo en pantallas pequeñas */}
      <div className="mt-8 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-3 lg:hidden">
        {SECTORES.map((s) => (
          <button
            key={s.id}
            onClick={() => setSeleccion(s)}
            className="text-left px-4 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${s.colorA}, ${s.colorB})`,
                }}
              >
                {React.createElement(s.icon, { size: 20 })}
              </div>
              <span className="font-medium">{s.titulo}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AreasEspecializadas;
