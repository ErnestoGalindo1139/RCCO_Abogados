import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleAlert,
  LoaderCircle,
  ScanLine,
  Search,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { API_URL } from '../../config/api';
import { apiFetch } from '../auth/session';
import { Pass, passToken } from '../passes/pass';
import { QrScanner } from '../components/QrScanner';
import { PassTicket } from '../components/PassTicket';

export function PassReaderPage() {
  const location = useLocation();
  const linkedCode =
    new URLSearchParams(location.search).get('qr') ||
    new URLSearchParams(window.location.search).get('qr') ||
    '';
  const [pass, setPass] = useState<Pass | null>(null);
  const [error, setError] = useState('');
  const [needsLogin, setNeedsLogin] = useState(false);
  const [busy, setBusy] = useState(false);
  const [savingEntry, setSavingEntry] = useState(false);
  const lock = useRef(false);
  const controller = useRef<AbortController>();
  useEffect(() => () => controller.current?.abort(), []);
  const lookup = async (value: string) => {
    if (lock.current) return;
    setPass(null);
    setError('');
    setNeedsLogin(false);
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
      if (response.status === 401 || response.status === 403) {
        setNeedsLogin(true);
        throw new Error(
          'Inicia sesión como verificador o administrador para consultar.'
        );
      }
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
  const saveEntry = async (current: Pass) => {
    if (lock.current || current.fh_Entrada) return;
    lock.current = true;
    setSavingEntry(true);
    setError('');
    setNeedsLogin(false);
    const abort = new AbortController();
    controller.current = abort;
    try {
      const response = await apiFetch(
        `${API_URL}/admin/pases/${current.nb_TokenQR}/entrada`,
        { method: 'POST', signal: abort.signal }
      );
      if (response.status === 401 || response.status === 403) {
        setNeedsLogin(true);
        throw new Error('Inicia sesión para registrar la entrada.');
      }
      if (response.status === 404)
        throw new Error(
          'El pase debe estar activo y pagado para registrar la entrada.'
        );
      if (!response.ok)
        throw new Error('Intenta registrar la entrada de nuevo.');
      const { body } = await response.json();
      setPass({ ...current, fh_Entrada: body.fh_Entrada });
    } catch (cause) {
      if (!abort.signal.aborted)
        setError(
          cause instanceof TypeError
            ? 'Error de red. Revisa tu conexión e intenta de nuevo.'
            : (cause as Error).message
        );
    } finally {
      lock.current = false;
      if (!abort.signal.aborted) setSavingEntry(false);
    }
  };
  const hasResult = Boolean(busy || error || pass);
  return (
    <main className="min-h-screen bg-[#f3f5f3] text-[#182d29]">
      <header className="bg-[#102c27] text-white">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-6 sm:px-8 sm:py-8">
          <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-[#baf4d5]">
            <ScanLine aria-hidden="true" size={25} />
          </div>
          <div>
            <p className="text-sm font-medium text-[#b5d5c9]">
              Acceso al simposio
            </p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Lector de pases
            </h1>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl items-start gap-4 px-4 py-5 sm:gap-6 sm:px-8 sm:py-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <section
          aria-labelledby="scan-title"
          className={`${hasResult ? 'row-start-2' : 'row-start-1'} min-w-0 rounded-2xl border border-[#dce4df] bg-white p-4 sm:p-6 md:col-start-1 md:row-start-1`}
        >
          <h2 id="scan-title" className="text-lg font-semibold">
            Consultar pase
          </h2>
          <p className="mt-1 text-sm text-[#4b625a]">
            Apunta la cámara al código QR del pase.
          </p>
          <QrScanner
            disabled={busy || savingEntry}
            readyLabel={pass ? 'Escanear siguiente' : 'Escanear QR'}
            onStart={() => {
              setPass(null);
              setError('');
              setNeedsLogin(false);
            }}
            onRead={(token) => void lookup(token)}
          />

          {linkedCode && !pass && (
            <button
              type="button"
              disabled={busy}
              onClick={() => void lookup(linkedCode)}
              className="mb-2 min-h-11 w-full rounded-xl bg-[#e9f2ed] px-4 font-semibold text-[#19513e] disabled:opacity-50"
            >
              Consultar pase del enlace
            </button>
          )}

          <Link
            to="/verificar-registro"
            className="mt-2 flex min-h-11 items-center gap-2 text-sm font-semibold text-[#19513e] hover:underline"
          >
            <Search aria-hidden="true" size={17} />
            Buscar por datos del registro
            <ArrowRight
              aria-hidden="true"
              size={16}
              className="ml-auto shrink-0"
            />
          </Link>
        </section>

        <section
          aria-label="Resultado de la consulta"
          className={`${hasResult ? '' : 'hidden md:block'} row-start-1 min-w-0 md:col-start-2`}
        >
          {busy && (
            <p
              role="status"
              className="flex items-center gap-3 rounded-2xl border border-[#dce4df] bg-white p-5 font-medium"
            >
              <LoaderCircle
                aria-hidden="true"
                size={20}
                className="animate-spin"
              />
              Buscando pase…
            </p>
          )}
          {error && (
            <div
              role="alert"
              className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-900"
            >
              <CircleAlert aria-hidden="true" size={22} className="shrink-0" />
              <div>
                <p className="font-semibold">
                  {pass
                    ? 'No se pudo registrar la entrada'
                    : 'No se pudo consultar el pase'}
                </p>
                <p className="mt-1 text-sm">{error}</p>
                {needsLogin && (
                  <Link
                    to="/loginVerificador"
                    onClick={() =>
                      sessionStorage.setItem(
                        'rcco_qr_return',
                        location.pathname + location.search
                      )
                    }
                    className="mt-2 inline-flex min-h-11 items-center font-semibold underline"
                  >
                    Iniciar sesión
                  </Link>
                )}
              </div>
            </div>
          )}
          {pass && (
            <article className="overflow-hidden rounded-2xl border border-[#c9ded1] bg-white">
              <div role="status" className="bg-[#e4f5ea] p-4 sm:p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#19513e]">
                  <span className="grid size-7 place-items-center rounded-full bg-[#19513e] text-white">
                    <Check aria-hidden="true" size={17} />
                  </span>
                  Pase válido
                </div>
                <h2 className="mt-3 break-words text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                  {pass.nb_Persona}
                </h2>
                <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-[#c5dfcf] pt-4">
                  <div>
                    <dt className="text-sm text-[#4b625a]">
                      Folio de registro
                    </dt>
                    <dd className="mt-1 break-words font-semibold tabular-nums">
                      {pass.nu_Folio}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[#4b625a]">
                      Accesos confirmados
                    </dt>
                    <dd className="mt-1 text-xl font-bold leading-tight tabular-nums">
                      {pass.nu_PasesConfirmados}
                    </dd>
                  </div>
                </dl>
              </div>
              {pass.nu_AnioEvento === 2027 && (
                <div className="border-b border-[#dce4df] p-4 sm:px-6">
                  {pass.fh_Entrada ? (
                    <div
                      role="status"
                      className="flex items-start gap-2 text-[#19513e]"
                    >
                      <Check
                        aria-hidden="true"
                        size={20}
                        className="mt-0.5 shrink-0"
                      />
                      <div>
                        <p className="font-semibold">Entrada registrada</p>
                        <p className="text-sm">
                          {new Intl.DateTimeFormat('es-MX', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                            timeZone: 'America/Mazatlan',
                          }).format(new Date(pass.fh_Entrada))}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => void saveEntry(pass)}
                      disabled={savingEntry}
                      className="min-h-12 w-full rounded-xl bg-[#19513e] px-4 font-semibold text-white hover:bg-[#123d2f] disabled:opacity-50"
                    >
                      {savingEntry
                        ? 'Registrando entrada…'
                        : 'Registrar entrada'}
                    </button>
                  )}
                </div>
              )}
              <details className="group px-4 py-1 sm:px-6">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
                  Ver boleto completo
                  <ChevronDown
                    aria-hidden="true"
                    size={18}
                    className="group-open:rotate-180"
                  />
                </summary>
                <PassTicket pass={pass} />
              </details>
            </article>
          )}
          {!busy && !error && !pass && (
            <div className="hidden min-h-60 place-items-center rounded-2xl border border-dashed border-[#bacbc2] p-6 text-center md:grid">
              <div>
                <ScanLine
                  aria-hidden="true"
                  size={32}
                  className="mx-auto text-[#4b625a]"
                />
                <p className="mt-3 font-semibold">Listo para escanear</p>
                <p className="mt-1 text-sm text-[#4b625a]">
                  Aquí aparecerán los datos del titular del pase.
                </p>
              </div>
            </div>
          )}
        </section>
        <p className="text-center text-xs text-[#4b625a] md:col-span-2">
          Para guardar la asistencia, pulsa Registrar entrada al recibir al
          titular.
        </p>
      </div>
    </main>
  );
}
