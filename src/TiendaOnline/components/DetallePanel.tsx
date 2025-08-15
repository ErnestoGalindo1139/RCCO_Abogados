import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sector } from '../types/Types';

export const DetallePanel: React.FC<{
  sector: Sector | null;
  onClose: () => void;
}> = ({ sector, onClose }) => (
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
          <h3 className="text-2xl font-bold tracking-tight">{sector.titulo}</h3>
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

        <div className="mt-6 flex flex-wrap gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 transition border border-white/10 text-sm"
          >
            Cerrar
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
