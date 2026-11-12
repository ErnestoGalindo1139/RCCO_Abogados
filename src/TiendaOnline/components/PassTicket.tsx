import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Printer } from 'lucide-react';
import { Pass, passPng, passToken, ticketLines } from '../passes/pass';
import '../../passes.css';

export function PassTicket({ pass }: { pass: Pass }) {
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const ticket = useRef<HTMLElement>(null);
  useEffect(() => {
    let active = true;
    setImage('');
    setError('');
    Promise.resolve()
      .then(() =>
        QRCode.toDataURL(passToken(pass.nb_TokenQR), {
          width: 720,
          margin: 4,
          errorCorrectionLevel: 'M',
        })
      )
      .then((url) => {
        if (active) setImage(url);
      })
      .catch(() => {
        if (active) setError('No fue posible generar el QR.');
      });
    return () => {
      active = false;
    };
  }, [pass.nb_TokenQR]);
  const download = async () => {
    if (!image || downloading) return;
    setDownloading(true);
    setError('');
    try {
      const blob = await passPng(pass, image);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Pase-${pass.nu_Folio}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setError('No fue posible descargar el pase.');
    } finally {
      setDownloading(false);
    }
  };
  const print = () => {
    if (!ticket.current || !image || downloading) return;
    const container = document.createElement('div');
    container.id = 'rcco-print-pass';
    container.appendChild(ticket.current.cloneNode(true));
    document.body.appendChild(container);
    const cleanup = () => {
      container.remove();
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup, { once: true });
    try {
      window.print();
    } catch {
      cleanup();
      setError('No fue posible abrir la impresión.');
    }
  };
  return (
    <section className="pass-wrapper" aria-label="Pase del simposio">
      <article className="pass-ticket" ref={ticket}>
        {ticketLines(pass).map((line, index) =>
          index === 0 ? <h2 key={index}>{line}</h2> : <p key={index}>{line}</p>
        )}
        <div className="pass-qr">
          {image ? (
            <img src={image} alt="Código QR personal de acceso" />
          ) : (
            !error && <p role="status">Generando QR…</p>
          )}
        </div>
      </article>
      {error && <p role="alert">{error}</p>}
      <div className="flex gap-4 my-4 justify-center">
        <button disabled={!image || downloading} onClick={download}>
          <Download size={18} />{' '}
          {downloading ? 'Descargando…' : 'Descargar PNG'}
        </button>
        <button disabled={!image || downloading} onClick={print}>
          <Printer size={18} /> Imprimir / PDF
        </button>
      </div>
    </section>
  );
}
