import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

/* === Overlay WaitScreen === */
export const WaitScreen: React.FC<{ show: boolean }> = ({ show }) => {
  const { t } = useTranslation(['common']);

  if (typeof document === 'undefined') return null; // SSR safe

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-blue-900/75 backdrop-blur-sm"
        >
          <div className="w-14 h-14 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          <p className="mt-6 text-white font-semibold text-lg tracking-wide">
            {t('waitScreen.text')}
          </p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
