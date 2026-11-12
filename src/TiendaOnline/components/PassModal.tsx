import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { LoaderCircle, MessageCircle, QrCode, X } from 'lucide-react';
import { Pass } from '../passes/pass';
import { PassTicket } from './PassTicket';
import '../../passes.css';

type Props = {
  pass: Pass;
  busy: boolean;
  message: string;
  onClose: () => void;
  onSend: () => void;
};

export function PassModal({ pass, busy, message, onClose, onSend }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return createPortal(
    <dialog
      ref={dialog}
      className="pass-modal"
      aria-labelledby="pass-modal-title"
      aria-describedby="pass-modal-description"
      onCancel={(event) => {
        event.preventDefault();
        if (!busy) onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget || busy) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose();
      }}
    >
      <header className="pass-modal-header">
        <div className="pass-modal-icon">
          <QrCode size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="pass-modal-eyebrow">RCCO · SIMPOSIO 2027</p>
          <h2 id="pass-modal-title">Pase de acceso</h2>
          <p id="pass-modal-description">
            Consulta el QR personal y comparte el pase con el asistente.
          </p>
        </div>
        <button
          type="button"
          className="pass-modal-close"
          onClick={onClose}
          disabled={busy}
          aria-label="Cerrar pase"
        >
          <X size={22} />
        </button>
      </header>
      <div className="pass-modal-body">
        <div className="pass-modal-person">
          <span className="pass-modal-paid">Pago confirmado</span>
          <span>{pass.nu_Folio}</span>
        </div>
        <PassTicket pass={pass} />
      </div>
      <footer className="pass-modal-footer">
        {message && (
          <p role="status" className="pass-modal-feedback">
            {message}
          </p>
        )}
        <div className="pass-modal-footer-row">
          <p>El envío incluye su QR, nombre y folio.</p>
          <button
            type="button"
            className="pass-modal-send"
            disabled={busy}
            onClick={onSend}
          >
            {busy ? (
              <LoaderCircle size={19} className="animate-spin" />
            ) : (
              <MessageCircle size={19} />
            )}
            {busy ? 'Enviando a WhatsApp…' : 'Enviar / reenviar WhatsApp'}
          </button>
        </div>
      </footer>
    </dialog>,
    document.body
  );
}
