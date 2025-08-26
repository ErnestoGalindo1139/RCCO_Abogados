// src/data/sectores.ts
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
import type { Sector } from '../types/types'; // usa un único path consistente

export const SECTORES: readonly Sector[] = [
  { id: 'financiero', icon: Banknote, colorA: '#5DA2FF', colorB: '#2A5BFF' },
  { id: 'minera', icon: Wrench, colorA: '#8ED1FC', colorB: '#4A90E2' },
  { id: 'hidrocarburos', icon: Droplet, colorA: '#7DD3FC', colorB: '#0EA5E9' },
  { id: 'construccion', icon: Building2, colorA: '#A78BFA', colorB: '#6366F1' },
  { id: 'alimentaria', icon: Utensils, colorA: '#34D399', colorB: '#10B981' },
  { id: 'inmobiliario', icon: LandPlot, colorA: '#F59E0B', colorB: '#F97316' },
  { id: 'agricola', icon: Shield, colorA: '#4ADE80', colorB: '#22C55E' },
  { id: 'discografica', icon: Disc, colorA: '#F472B6', colorB: '#EC4899' },
] as const;
