import type { LucideProps } from 'lucide-react';
import React from 'react';

export type Sector = {
  id:
    | 'entretenimiento'
    | 'agricola'
    | 'construccion'
    | 'inmobiliario'
    | 'financiero'
    | 'alimentario'
    | 'minero'
    | 'turismo';
  icon: React.ComponentType<LucideProps>;
  colorA: string;
  colorB: string;
};
