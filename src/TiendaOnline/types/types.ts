import type { LucideProps } from 'lucide-react';
import React from 'react';

export type Sector = {
  id:
    | 'financiero'
    | 'minera'
    | 'hidrocarburos'
    | 'construccion'
    | 'alimentaria'
    | 'inmobiliario'
    | 'agricola'
    | 'discografica';
  icon: React.ComponentType<LucideProps>; // <- aquí el cambio
  colorA: string;
  colorB: string;
};
