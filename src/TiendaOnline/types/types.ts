import type { LucideIcon } from 'lucide-react';

export type Sector = {
  id: string;
  titulo: string;
  icon: LucideIcon;
  colorA: string;
  colorB: string;
  descripcion: string;
  puntos: string[];
};
