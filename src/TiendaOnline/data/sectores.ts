import {
  Banknote,
  Wrench,
  Droplet,
  Building2,
  Utensils,
  LandPlot,
  Shield,
  Disc,
} from 'lucide-react';
import { Sector } from '../types/Types';

export const SECTORES: readonly Sector[] = [
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
    titulo: 'Hotelería y Turismo',
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
    titulo: 'Industria de Entretenimiento',
    icon: Disc,
    colorA: '#F472B6',
    colorB: '#EC4899',
    descripcion:
      'Propiedad intelectual, licencias, management, regalías, sincronizaciones y resolución de controversias.',
    puntos: ['Marcas y derechos', 'Contratos de artista', 'Regalías y sync'],
  },
] as const;
