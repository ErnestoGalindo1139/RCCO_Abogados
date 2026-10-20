import React, { useEffect, useRef, useState } from 'react';
import './RegistrationResultModal.css';
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  CircleAlert,
  Copy,
  MessageCircle,
  ShieldCheck,
  X,
} from 'lucide-react';

interface Props {
  result: 'success' | 'missing' | 'error';
  folio: string;
  whatsappAccepted: boolean;
  errorMessage: string;
  onClose: () => void;
}

export const RegistrationResultModal = ({
  result,
  folio,
  whatsappAccepted,
  errorMessage,
  onClose,
}: Props): React.JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const folioRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  const success = result === 'success';

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return (): void => {
      clearTimeout(copyTimer.current);
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  const copyFolio = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(folio);
      setCopied(true);
      setCopyFailed(false);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyFailed(true);
      const selection = window.getSelection();
      if (folioRef.current && selection) {
        const range = document.createRange();
        range.selectNodeContents(folioRef.current);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="sp-registration-modal"
      aria-labelledby="sp-registration-result"
      aria-describedby="sp-registration-description"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={`sp-registration-modal-card ${success ? 'sp-registration-modal-card--success' : 'sp-registration-modal-card--notice'}`}
      >
        <div className="sp-result-topline">
          <span className="sp-result-brand">
            RCCO<span>ABOGADOS</span>
          </span>
          <span className="sp-result-edition">
            SIMPOSIO ANUAL <b>2027</b>
          </span>
          <button
            type="button"
            className="sp-registration-modal-close"
            onClick={onClose}
            aria-label="Cerrar mensaje"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>

        <div className="sp-result-content">
          <div
            className={`sp-result-seal ${success ? '' : 'sp-result-seal--notice'}`}
            aria-hidden="true"
          >
            {success ? (
              <Check size={29} strokeWidth={1.8} />
            ) : (
              <CircleAlert size={28} strokeWidth={1.7} />
            )}
          </div>
          <p className="sp-result-eyebrow">
            {success
              ? 'Un encuentro. Nuevas perspectivas.'
              : 'Revisemos un detalle'}
          </p>
          <h2 id="sp-registration-result">
            {success ? (
              <>
                Registro <em>recibido.</em>
              </>
            ) : result === 'missing' ? (
              'Completa tu registro'
            ) : (
              'No pudimos completar tu registro'
            )}
          </h2>
          <p id="sp-registration-description" className="sp-result-description">
            {success
              ? 'Gracias por ser parte del próximo encuentro de RCCO Abogados. Este es tu folio de seguimiento.'
              : result === 'missing'
                ? 'Revisa nombre, apellido paterno, teléfono, correo y la autorización para recibir tu confirmación por WhatsApp.'
                : errorMessage ||
                  'Ocurrió un inconveniente al guardar tus datos. Vuelve al formulario para intentarlo de nuevo.'}
          </p>

          {success && (
            <>
              <div className="sp-result-ticket">
                <div className="sp-result-ticket-label">
                  <span>TU FOLIO DE REGISTRO</span>
                  <ShieldCheck size={17} aria-hidden="true" />
                </div>
                <div className="sp-result-ticket-code">
                  <strong ref={folioRef}>{folio}</strong>
                  <button
                    type="button"
                    onClick={() => {
                      void copyFolio();
                    }}
                    aria-label={copied ? 'Folio copiado' : 'Copiar folio'}
                  >
                    {copied ? (
                      <Check size={17} aria-hidden="true" />
                    ) : (
                      <Copy size={17} aria-hidden="true" />
                    )}
                    <span>{copied ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>
                <div className="sp-result-ticket-meta">
                  <span>22 — 23 ENE 2027</span>
                  <span>MAZATLÁN, SINALOA</span>
                </div>
              </div>
              <span className="sp-visually-hidden" role="status">
                {copied
                  ? 'Folio copiado al portapapeles.'
                  : copyFailed
                    ? 'No se pudo copiar. El folio está seleccionado para copiarlo manualmente.'
                    : ''}
              </span>
              {copyFailed && (
                <p className="sp-result-copy-help">
                  Mantén presionado el folio o cópialo manualmente.
                </p>
              )}

              <ol
                className="sp-result-progress"
                aria-label="Estado de tu inscripción"
              >
                <li className="sp-result-progress-done">
                  <span>
                    <Check size={13} aria-hidden="true" />
                  </span>
                  <div>
                    Registro<small>Recibido</small>
                  </div>
                </li>
                <li className="sp-result-progress-current" aria-current="step">
                  <span>02</span>
                  <div>
                    Pago<small>Pendiente</small>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    Inscripción<small>Por confirmar</small>
                  </div>
                </li>
              </ol>

              <div
                className={`sp-result-whatsapp ${whatsappAccepted ? '' : 'sp-result-whatsapp--pending'}`}
              >
                <MessageCircle size={19} aria-hidden="true" />
                <div>
                  <strong>
                    {whatsappAccepted
                      ? 'Revisa tu WhatsApp'
                      : 'Tu folio ya está guardado'}
                  </strong>
                  <p>
                    {whatsappAccepted
                      ? 'Solicitamos el envío de tu registro y los siguientes pasos al número que proporcionaste.'
                      : 'No pudimos solicitar el WhatsApp. Contacta a RCCO con tu folio; no necesitas registrarte otra vez.'}
                  </p>
                </div>
              </div>
            </>
          )}

          <div className="sp-result-actions">
            <button
              type="button"
              className="sp-button sp-button--gold"
              onClick={onClose}
            >
              {success ? 'Listo, guardaré mi folio' : 'Volver al formulario'}
              {success && <CheckCircle2 size={17} aria-hidden="true" />}
            </button>
            {result !== 'missing' && (
              <a
                className="sp-result-contact"
                href="https://wa.me/526692291634"
                target="_blank"
                rel="noopener noreferrer"
              >
                ¿Tienes dudas? Contacta a RCCO
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
          {success && (
            <p className="sp-result-footnote">
              Tu inscripción quedará confirmada una vez validado el pago.
            </p>
          )}
        </div>
        <div className="sp-result-bottomline">
          <span>CONOCIMIENTO · EXPERIENCIA · CONEXIONES</span>
          <span aria-hidden="true">02</span>
        </div>
      </div>
    </dialog>
  );
};
