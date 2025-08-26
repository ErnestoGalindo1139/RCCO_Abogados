import React from 'react';
import { motion } from 'framer-motion';
import type { Sector } from '../types/types';
import { useTranslation } from 'react-i18next';

export const DetalleInlineMobile: React.FC<{
  sector: Sector;
  onClose: () => void;
}> = ({ sector, onClose }) => {
  const { t } = useTranslation('home');

  const bullets = t(`areas.items.${sector.id}.bullets`, {
    returnObjects: true,
  }) as string[];

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mt-3 rounded-2xl bg-white/5 border border-white/10 p-4">
        <p className="text-white/80">{t(`areas.items.${sector.id}.desc`)}</p>
        <ul className="mt-4 space-y-2 text-white/80">
          {bullets.map((p, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/70" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-3 justify-end">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 transition border border-white/10 text-sm"
          >
            {t('areas.aria.close')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
