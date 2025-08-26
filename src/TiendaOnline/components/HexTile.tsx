import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HexSvg } from './HexSvg';
import type { Sector } from '../types/types';
import { useTranslation } from 'react-i18next';

export const HexTile: React.FC<{
  sector: Sector;
  sizeRem: number;
  onClick: (s: Sector) => void;
}> = ({ sector, sizeRem, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const { t } = useTranslation('home');
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
      <div className="absolute inset-0 will-change-transform">
        <HexSvg a={sector.colorA} b={sector.colorB} hovered={hovered} />
      </div>

      <div className="relative z-10 text-center px-3">
        <div className="mx-auto mb-2 grid place-items-center rounded-2xl bg-white/15 p-2">
          <Icon size={24} />
        </div>
        <span className="text-sm md:text-base font-medium drop-shadow-sm leading-tight">
          {t(`areas.items.${sector.id}.title`)}
        </span>
      </div>
    </motion.button>
  );
};
