import { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import { Camera, X } from 'lucide-react';
import { passToken } from '../passes/pass';

type Props = {
  disabled?: boolean;
  onRead: (token: string) => void;
  onStart: () => void;
};
export function QrScanner({ disabled = false, onRead, onStart }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const callbacks = useRef({ onRead, onStart });
  callbacks.current = { onRead, onStart };
  useEffect(() => {
    if (!open || disabled) return;
    let disposed = false;
    let stream: MediaStream | undefined;
    let frame = 0;
    let last = 0;
    const stop = () => {
      cancelAnimationFrame(frame);
      stream?.getTracks().forEach((track) => track.stop());
      if (video.current) video.current.srcObject = null;
    };
    const start = async () => {
      try {
        setError('');
        if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia)
          throw new Error(
            'La cámara requiere HTTPS y un navegador compatible. Puedes consultar el código manualmente.'
          );
        callbacks.current.onStart();
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
              facingMode: { ideal: 'environment' },
              width: { ideal: 640 },
              height: { ideal: 480 },
            },
          });
        } catch (initial) {
          if (disposed) return;
          if (
            ['NotReadableError', 'OverconstrainedError', 'AbortError'].includes(
              (initial as Error).name
            )
          )
            stream = await navigator.mediaDevices.getUserMedia({
              audio: false,
              video: true,
            });
          else throw initial;
        }
        if (disposed) {
          stop();
          return;
        }
        const element = video.current;
        if (!element) {
          stop();
          return;
        }
        element.srcObject = stream;
        await element.play();
        if (disposed) {
          stop();
          return;
        }
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d', { willReadFrequently: true });
        if (!context)
          throw new Error(
            'No se puede leer la cámara. Usa la consulta manual.'
          );
        const scan = (now: number) => {
          if (disposed) return;
          if (
            now - last >= 180 &&
            element.readyState >= 2 &&
            element.videoWidth
          ) {
            last = now;
            try {
              const scale = Math.min(
                1,
                960 / Math.max(element.videoWidth, element.videoHeight)
              );
              canvas.width = Math.round(element.videoWidth * scale);
              canvas.height = Math.round(element.videoHeight * scale);
              context.drawImage(element, 0, 0, canvas.width, canvas.height);
              const pixels = context.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
              );
              const result = jsQR(pixels.data, canvas.width, canvas.height, {
                inversionAttempts: 'dontInvert',
              });
              if (result) {
                let token: string;
                try {
                  token = passToken(result.data);
                } catch {
                  setError(
                    'QR inválido. Acerca un pase RCCO válido o usa la consulta manual.'
                  );
                  frame = requestAnimationFrame(scan);
                  return;
                }
                disposed = true;
                stop();
                setOpen(false);
                callbacks.current.onRead(token);
                return;
              }
            } catch {
              disposed = true;
              stop();
              setOpen(false);
              setError('No se pudo leer la cámara. Usa la consulta manual.');
              return;
            }
          }
          frame = requestAnimationFrame(scan);
        };
        frame = requestAnimationFrame(scan);
      } catch (cause) {
        stop();
        if (!disposed) {
          setOpen(false);
          setError(
            (cause as Error).name === 'NotAllowedError'
              ? 'Permiso de cámara denegado. Permítelo en el navegador o usa la consulta manual.'
              : (cause as Error).name === 'NotFoundError'
                ? 'No se encontró una cámara. Usa la consulta manual.'
                : (cause as Error).message ||
                  'No fue posible abrir la cámara. Usa la consulta manual.'
          );
        }
      }
    };
    void start();
    return () => {
      disposed = true;
      stop();
    };
  }, [open, disabled]);
  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);
  return (
    <div className="my-4">
      <button
        type="button"
        disabled={disabled}
        className="flex items-center gap-2 rounded bg-blue-900 text-white px-4 py-3 disabled:opacity-50"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Camera />} {open ? 'Cerrar cámara' : 'Escanear QR'}
      </button>
      {open && !disabled && (
        <video
          ref={video}
          autoPlay
          muted
          playsInline
          className="w-full max-w-xl rounded mt-4"
          aria-label="Lector de pases QR"
        />
      )}
      {error && (
        <p role="alert" className="text-red-700 mt-3">
          {error}
        </p>
      )}
    </div>
  );
}
