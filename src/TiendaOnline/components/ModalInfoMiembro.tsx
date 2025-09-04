// components/ExperienceModal.tsx
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type MemberForModal = {
  id: string;
  nombre: string;
  cargo?: string;
  subcargo?: string;
  src: string;
  experiencia?: string[]; // lista de bullets
};

type Props = {
  open: boolean;
  onClose: () => void;
  member?: MemberForModal | null;
};

const useLockBodyScroll = (locked: boolean) => {
  useEffect(() => {
    if (!locked) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [locked]);
};

export const ModalInfoMiembro: React.FC<Props> = ({ open, onClose, member }) => {
  useLockBodyScroll(open);

  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Enfocar botón de cerrar al abrir
  useEffect(() => {
    if (open) {
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    }
  }, [open]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && member && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden={!open}
          onMouseDown={(e) => {
            // click outside
            if (e.target === overlayRef.current) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-modal-title"
            className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl overflow-hidden"
            initial={{ y: 24, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 24, scale: 0.98, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 id="member-modal-title" className="text-xl font-semibold text-neutral-900">
                {member.nombre}
              </h3>
              <button
                ref={closeBtnRef}
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full p-2 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-label="Cerrar"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Content */}
            <div className="grid gap-6 p-6 md:grid-cols-[260px,1fr]">
              <div className="rounded-xl overflow-hidden border bg-neutral-50">
                <img
                  src={member.src}
                  alt={member.nombre}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div>
                {(member.cargo || member.subcargo) && (
                  <div className="mb-4">
                    {member.cargo && (
                      <p className="font-medium text-neutral-900">{member.cargo}</p>
                    )}
                    {member.subcargo && (
                      <p className="text-sm text-neutral-600">{member.subcargo}</p>
                    )}
                  </div>
                )}

                {member.experiencia?.length ? (
                  <ul className="list-disc pl-5 space-y-2 text-neutral-800">
                    {member.experiencia.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-neutral-600">
                    Próximamente agregaremos la experiencia de este miembro del equipo.
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t flex justify-end">
              <button
                onClick={onClose}
                className="rounded-lg px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
