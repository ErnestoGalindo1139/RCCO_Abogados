import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { API_URL } from '../../config/api';
import { apiFetch } from '../auth/session';
import { Pass, passToken } from '../passes/pass';
import { QrScanner } from '../components/QrScanner';
import { PassTicket } from '../components/PassTicket';

export function PassReaderPage() {
  const location = useLocation();
  const [input, setInput] = useState(
    () =>
      new URLSearchParams(location.search).get('qr') ||
      new URLSearchParams(window.location.search).get('qr') ||
      ''
  );
  const [pass, setPass] = useState<Pass | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const controller = useRef<AbortController>();
  useEffect(() => () => controller.current?.abort(), []);
  const lookup = async (value: string) => {
    if (lock.current) return;
    setPass(null);
    setError('');
    let token: string;
    try {
      token = passToken(value);
    } catch (cause) {
      setError((cause as Error).message);
      return;
    }
    lock.current = true;
    setBusy(true);
    const abort = new AbortController();
    controller.current = abort;
    try {
      const response = await apiFetch(`${API_URL}/admin/pases/${token}`, {
        signal: abort.signal,
      });
      if (response.status === 401)
        throw new Error(
          'Sesión vencida. Inicia sesión nuevamente para consultar.'
        );
      if (response.status === 404)
        throw new Error('Pase inexistente, inactivo o sin pago confirmado.');
      if (!response.ok) throw new Error('No fue posible consultar el pase.');
      const data = await response.json();
      setPass(data.body);
    } catch (cause) {
      if (!abort.signal.aborted)
        setError(
          cause instanceof TypeError
            ? 'Error de red. Revisa tu conexión e intenta de nuevo.'
            : (cause as Error).message
        );
    } finally {
      lock.current = false;
      if (!abort.signal.aborted) setBusy(false);
    }
  };
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl p-6 shadow">
        <h1 className="text-2xl text-blue-900 font-bold">Consultar pase QR</h1>
        <p className="my-3">
          Esta consulta muestra el pase. No registra asistencia ni consume
          accesos.
        </p>
        <QrScanner
          disabled={busy}
          onStart={() => {
            setPass(null);
            setError('');
          }}
          onRead={(token) => {
            setInput(token);
            void lookup(token);
          }}
        />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void lookup(input);
          }}
        >
          <label htmlFor="qr-token">Token o URL del pase</label>
          <input
            id="qr-token"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setPass(null);
              setError('');
            }}
            disabled={busy}
            className="block w-full border rounded p-3 my-2"
            autoComplete="off"
          />
          <button
            disabled={busy}
            className="bg-blue-900 text-white rounded px-5 py-3 disabled:opacity-50"
          >
            {busy ? 'Consultando…' : 'Consultar'}
          </button>
        </form>
        {busy && <p role="status">Buscando pase…</p>}
        {error && (
          <p role="alert" className="text-red-700 mt-4">
            {error}{' '}
            <Link
              to="/loginVerificador"
              onClick={() =>
                sessionStorage.setItem(
                  'rcco_qr_return',
                  location.pathname + location.search
                )
              }
              className="underline"
            >
              Iniciar sesión
            </Link>
          </p>
        )}
        {pass && (
          <>
            <p role="status" className="mt-4 font-bold">
              {pass.nb_Persona} · {pass.nu_PasesConfirmados} acceso(s)
              confirmado(s)
            </p>
            <PassTicket pass={pass} />
          </>
        )}
        <Link to="/verificar-registro" className="block mt-6 underline">
          Buscar por datos del registro
        </Link>
      </div>
    </main>
  );
}
