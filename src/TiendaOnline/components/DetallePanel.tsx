import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Sector } from '../types/types';
import { useTranslation } from 'react-i18next';

export const DetallePanel: React.FC<{
  sector: Sector | null;
  onClose: () => void;
}> = ({ sector, onClose }) => {
  const { t } = useTranslation('home');

  return (
    <AnimatePresence mode="wait">
      {sector && (
        <motion.div
          key={sector.id}
          initial={{ opacity: 0, y: 6, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 6, filter: 'blur(8px)' }}
          transition={{ duration: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
          className="w-full lg:w-[28rem] xl:w-[32rem] bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-white/10">
              {sector.icon && <sector.icon size={32} />}
            </div>
            <h3 className="text-2xl font-bold tracking-tight">
              {t(`areas.items.${sector.id}.title`)}
            </h3>
          </div>

          <p className="mt-4 text-white/80 leading-relaxed">
            {t(`areas.items.${sector.id}.desc`)}
          </p>

          <ul className="mt-4 space-y-2 text-white/80">
            {(
              t(`areas.items.${sector.id}.bullets`, {
                returnObjects: true,
              }) as string[]
            ).map((p, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/70" />
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 transition border border-white/10 text-sm"
            >
              {t('areas.aria.close')}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
