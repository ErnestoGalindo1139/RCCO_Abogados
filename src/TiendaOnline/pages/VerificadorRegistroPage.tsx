import { apiFetch } from '../auth/session';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/api';
import { useState } from 'react';
import { UsuarioEvento } from '../types/UsuarioEvento';
import { CheckCircle, XCircle, Star } from 'lucide-react';

type RegistroEncontrado = Pick<
  UsuarioEvento,
  | 'id_UsuarioEvento'
  | 'nb_Nombre'
  | 'nb_ApellidoPaterno'
  | 'nb_ApellidoMaterno'
  | 'nu_Folio'
  | 'sn_Pagado'
  | 'sn_Activo'
  | 'sn_UsuarioEspecial'
  | 'nb_TipoUsuarioEspecial'
> & {
  de_Celular: string;
  de_Correo: string;
  nb_Empresa: string | null;
  de_Comentarios: string | null;
  fh_Registro: string;
  fh_Pago: string | null;
};

function construirFolio(input: string) {
  const match = /^(?:SIM27-)?(\d+)$/i.exec(input.trim());
  return match ? `SIM27-${match[1].padStart(4, '0')}` : null;
}

export default function VerificadorRegistroPage() {
  const [folioInput, setFolioInput] = useState('');
  const [nombre, setNombre] = useState('');
  const [apPaterno, setApPaterno] = useState('');
  const [apMaterno, setApMaterno] = useState('');
  const [empresa, setEmpresa] = useState('');

  const [resultados, setResultados] = useState<UsuarioEvento[]>([]);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const tieneCriteriosBusqueda = [
    folioInput,
    nombre,
    apPaterno,
    apMaterno,
    empresa,
  ].some((value) => value.trim());

  // ===============================
  // BUSCAR
  // ===============================
  const buscar = async () => {
    setMensaje('');
    setResultados([]);

    if (!tieneCriteriosBusqueda) {
      setMensaje('Ingresa al menos un criterio de búsqueda');
      return;
    }

    const folio = construirFolio(folioInput);

    if (folioInput.trim() && !folio) {
      setMensaje('Usa un folio como SIM27-0004 o escribe solo el número.');
      return;
    }

    setLoading(true);
    try {
      const res = await apiFetch(`${API_URL}/usuariosEvento/buscar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nu_Folio: folio,
          nb_Nombre: nombre || null,
          nb_ApellidoPaterno: apPaterno || null,
          nb_ApellidoMaterno: apMaterno || null,
          nb_Empresa: empresa || null,
        }),
      });

      const data = await res.json();

      if (!data.success || data.body.length === 0) {
        setMensaje('No se encontraron registros');
      } else {
        const mapped: UsuarioEvento[] = data.body.map(
          (u: RegistroEncontrado) => ({
            id_UsuarioEvento: u.id_UsuarioEvento,

            nb_Nombre: u.nb_Nombre?.trim(),
            nb_ApellidoPaterno: u.nb_ApellidoPaterno?.trim(),
            nb_ApellidoMaterno: u.nb_ApellidoMaterno?.trim() || null,

            NombreCompleto:
              `${u.nb_Nombre?.trim()} ${u.nb_ApellidoPaterno?.trim()} ${
                u.nb_ApellidoMaterno?.trim() || ''
              }`.trim(),

            Celular: u.de_Celular,
            Correo: u.de_Correo,
            Empresa: u.nb_Empresa,
            Comentarios: u.de_Comentarios,

            FechaRegistro: u.fh_Registro,
            FechaPago: u.fh_Pago,

            nu_Folio: u.nu_Folio,
            sn_Pagado: u.sn_Pagado,
            sn_Activo: u.sn_Activo,

            sn_UsuarioEspecial: u.sn_UsuarioEspecial,
            nb_TipoUsuarioEspecial: u.nb_TipoUsuarioEspecial,
          })
        );

        setResultados(mapped);
      }
    } catch {
      setMensaje('Error al consultar el registro');
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Link to="/admin" className="block p-4 text-blue-900 underline">
        Escanear o consultar pase QR
      </Link>
      {/* ================= HEADER ================= */}
      <header className="bg-gradient-to-r from-[#113873] to-[#0D47A1] text-white py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Verificación de Registro
          </h1>
          <p className="mt-2 text-blue-100 text-sm sm:text-base max-w-2xl">
            Busca al titular del pase por folio, nombre o empresa.
          </p>
        </div>
      </header>

      {/* ================= FORM ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8">
        <form
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
          onSubmit={(event) => {
            event.preventDefault();
            void buscar();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* ===== FOLIO ===== */}
            <div className="md:col-span-3">
              <label
                htmlFor="registro-folio"
                className="text-sm font-semibold text-slate-600"
              >
                Folio de registro
              </label>
              <input
                id="registro-folio"
                placeholder="SIM27-0004 o 0004"
                value={folioInput}
                onChange={(e) => setFolioInput(e.target.value)}
                autoCapitalize="characters"
                spellCheck={false}
                className="mt-2 block w-full rounded-xl border px-4 py-3 text-base sm:max-w-xs"
              />
            </div>

            {/* ===== INPUTS ===== */}
            <input
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="px-4 py-3 border rounded-xl"
            />

            <input
              placeholder="Apellido paterno"
              value={apPaterno}
              onChange={(e) => setApPaterno(e.target.value)}
              className="px-4 py-3 border rounded-xl"
            />

            <input
              placeholder="Apellido materno"
              value={apMaterno}
              onChange={(e) => setApMaterno(e.target.value)}
              className="px-4 py-3 border rounded-xl"
            />

            <input
              placeholder="Empresa"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              className="px-4 py-3 border rounded-xl md:col-span-2"
            />

            <button
              type="submit"
              disabled={loading || !tieneCriteriosBusqueda}
              className={`w-full rounded-xl font-semibold px-6 py-4 transition text-lg ${
                loading || !tieneCriteriosBusqueda
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-blue-700 hover:bg-blue-800 text-white'
              }`}
            >
              {loading ? 'Buscando…' : 'Buscar'}
            </button>
          </div>
        </form>
      </section>

      {/* ================= RESULTADOS ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 pb-10">
        {mensaje && (
          <p className="text-center text-red-600 font-semibold mb-4">
            {mensaje}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resultados.map((u) => (
            <div
              key={u.id_UsuarioEvento}
              className="bg-white rounded-2xl shadow p-6"
            >
              <div className="flex justify-between items-start gap-3">
                <h2 className="text-lg font-bold">{u.NombreCompleto}</h2>

                {u.sn_UsuarioEspecial && (
                  <span className="flex items-center gap-1 text-yellow-600 text-xs font-semibold whitespace-nowrap">
                    <Star size={14} />
                    {u.nb_TipoUsuarioEspecial}
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-600 mt-1">
                Empresa: {u.Empresa || '-'}
              </p>

              <div className="mt-3 space-y-1 text-sm">
                <p>Correo: {u.Correo}</p>
                <p>Celular: {u.Celular}</p>
                <p className="break-all">
                  Folio: <span className="font-semibold">{u.nu_Folio}</span>
                </p>
              </div>

              <div className="mt-4">
                {u.sn_Pagado ? (
                  <span className="inline-flex items-center gap-1 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    <CheckCircle size={16} /> Pagado
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                    <XCircle size={16} /> No pagado
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
