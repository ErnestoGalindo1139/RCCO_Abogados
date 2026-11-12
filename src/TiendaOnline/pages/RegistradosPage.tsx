/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiFetch, logoutSession } from '../auth/session';
import { Pass } from '../passes/pass';
import { PassModal } from '../components/PassModal';
import { API_URL } from '../../config/api';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../RegistradosPage.css';
import {
  CheckCircle,
  Download,
  Search,
  Users,
  Building2,
  Clock3,
  LogOut,
  SlidersHorizontal,
} from 'lucide-react';
import { UsuariosEventoTable } from '../components/UsuariosEventoTable';
import { UsuarioEvento } from '../types/UsuarioEvento';

type TipoAccion = 'pago' | 'activo' | 'editar';

// ===============================
// HELPERS
// ===============================
const norm = (s: string) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

// ===============================
// COMPONENTE
// ===============================
export default function RegistradosPage() {
  const navigate = useNavigate();

  // ===============================
  // ESTADOS
  // ===============================
  const [filtroAnio, setFiltroAnio] = useState('2027');
  const [query, setQuery] = useState('');
  const [filtroPago, setFiltroPago] = useState<
    'todos' | 'pagados' | 'nopagados'
  >('todos');

  const [filtroEmpresa, setFiltroEmpresa] = useState<string>('todas');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const [usuarios, setUsuarios] = useState<UsuarioEvento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmModalPago, setConfirmModalPago] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UsuarioEvento | null>(null);
  const [nuevoValorPago, setNuevoValorPago] = useState<boolean>(false);
  const [nuevoValor, setNuevoValor] = useState(false);
  const [tipoAccion, setTipoAccion] = useState<TipoAccion>('pago');

  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [exportando, setExportando] = useState(false);
  const [paymentBusy, setPaymentBusy] = useState(false);
  const [currentPass, setCurrentPass] = useState<Pass | null>(null);
  const [passMessage, setPassMessage] = useState('');

  // ===== FORM EDITAR =====
  const [formEdit, setFormEdit] = useState({
    nb_Nombre: '',
    nb_ApellidoPaterno: '',
    nb_ApellidoMaterno: '',
    Empresa: '',
    Cargo: '',
    Celular: '',
    Correo: '',
    Comentarios: '',

    // ⭐ NUEVOS
    sn_UsuarioEspecial: false,
    nb_TipoUsuarioEspecial: '',
  });

  // =====================================================
  // FETCH
  // =====================================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiFetch(`${API_URL}/usuariosEvento`);
        const data = await res.json();

        if (!data.success || !Array.isArray(data.body)) {
          throw new Error('Respuesta inválida del endpoint');
        }

        const mapped = data.body.map((u: any) => ({
          id_UsuarioEvento: u.id_UsuarioEvento,
          nu_AnioEvento: u.nu_AnioEvento ?? null,
          nu_EdicionEvento: u.nu_EdicionEvento ?? null,

          nb_Nombre: u.nb_Nombre,
          nb_ApellidoPaterno: u.nb_ApellidoPaterno,
          nb_ApellidoMaterno: u.nb_ApellidoMaterno,

          NombreCompleto: `${u.nb_Nombre} ${u.nb_ApellidoPaterno} ${
            u.nb_ApellidoMaterno ?? ''
          }`.trim(),

          Celular: u.de_Celular,
          Correo: u.de_Correo,
          Empresa: u.nb_Empresa,
          Cargo: u.nb_Cargo ?? null,
          Comentarios: (u.de_Comentarios || '')
            .replace(
              /\s*\[WhatsApp: autoriza[^\]\r\n]*; \d{4}-\d{2}-\d{2}T[^\]\r\n]+\]/g,
              ''
            )
            .trim(),
          constanciaWhatsApp:
            (u.de_Comentarios || '')
              .match(
                /\[WhatsApp: autoriza[^\]\r\n]*; \d{4}-\d{2}-\d{2}T[^\]\r\n]+\]/g
              )
              ?.join('\n') || '',
          FechaRegistro: u.fh_Registro,
          FechaPago: u.sn_Pagado ? 'PAGADO' : null,
          sn_Pagado: u.sn_Pagado,
          nu_Folio: u.nu_Folio,
          sn_Activo: u.sn_Activo,

          // ⭐ NUEVOS
          sn_UsuarioEspecial: u.sn_UsuarioEspecial,
          nb_TipoUsuarioEspecial: u.nb_TipoUsuarioEspecial,
        }));

        setUsuarios(mapped);
      } catch (err: any) {
        setError(err.message);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  // =====================================================
  // EMPRESAS ÚNICAS
  // =====================================================
  const empresas = useMemo(() => {
    const set = new Set<string>();
    usuarios.forEach((u) => {
      if (u.Empresa && u.Empresa.trim() !== '') {
        set.add(u.Empresa);
      }
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [usuarios]);

  // =====================================================
  // FILTROS
  // =====================================================
  const filtrados = useMemo(() => {
    const q = norm(query);

    return usuarios.filter((u) => {
      const match =
        norm(u.NombreCompleto).includes(q) ||
        norm(u.Correo).includes(q) ||
        norm(u.Celular).includes(q) ||
        norm(u.Empresa || '').includes(q) ||
        norm(u.Cargo || '').includes(q) ||
        norm(u.nu_Folio || '').includes(q) ||
        norm(u.Comentarios || '').includes(q);

      if (!match) return false;
      if (filtroAnio !== 'todos' && String(u.nu_AnioEvento) !== filtroAnio)
        return false;
      if (filtroPago === 'pagados' && !u.sn_Pagado) return false;
      if (filtroPago === 'nopagados' && u.sn_Pagado) return false;
      if (filtroEmpresa !== 'todas' && u.Empresa !== filtroEmpresa)
        return false;

      return true;
    });
  }, [query, filtroPago, filtroEmpresa, filtroAnio, usuarios]);

  // =====================================================
  // PAGINADO
  // =====================================================
  const effectiveSize = pageSize || Math.max(1, filtrados.length);
  const pages = Math.max(1, Math.ceil(filtrados.length / effectiveSize));
  const currentPage = Math.min(page, pages);
  const items = filtrados.slice(
    (currentPage - 1) * effectiveSize,
    currentPage * effectiveSize
  );
  const anios = [
    ...new Set([
      2026,
      2027,
      ...usuarios
        .map((u) => u.nu_AnioEvento)
        .filter((v): v is number => v != null),
    ]),
  ].sort((a, b) => b - a);
  const pagados = filtrados.filter((u) => u.sn_Pagado).length;

  useEffect(() => {
    setPage(1);
  }, [query, filtroPago, filtroEmpresa, filtroAnio, pageSize]);

  // =====================================================
  // MODALES
  // =====================================================
  const abrirModalPago = (u: UsuarioEvento) => {
    setSelectedUser(u);
    setNuevoValorPago(!u.sn_Pagado);
    setTipoAccion('pago');
    setNuevoValor(!u.sn_Pagado);
    setConfirmModalPago(true);
  };

  const confirmarPago = async () => {
    if (!selectedUser || paymentBusy) return;
    setPaymentBusy(true);
    try {
      const response = await apiFetch(`${API_URL}/updatePagoUsuariosEvento`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_UsuarioEvento: selectedUser.id_UsuarioEvento,
          sn_Pagado: nuevoValorPago,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success)
        throw new Error(
          response.status === 401
            ? 'Sesión vencida. Inicia sesión nuevamente.'
            : data.message || 'No se pudo actualizar el pago.'
        );
      setUsuarios((prev) =>
        prev.map((u) =>
          u.id_UsuarioEvento === selectedUser.id_UsuarioEvento
            ? { ...u, sn_Pagado: data.body.sn_Pagado }
            : u
        )
      );
      setCurrentPass(null);
      setPassMessage('');
      mostrarExito(
        nuevoValorPago
          ? data.body.whatsapp.status === 'accepted' &&
            data.body.whatsapp.messageId
            ? 'Pago confirmado. Envío del QR por WhatsApp aceptado.'
            : data.body.whatsapp.status === 'failed'
              ? `Pago confirmado y pase generado. ${data.body.whatsapp.message || 'Falló WhatsApp; puedes reintentarlo.'}`
              : data.body.whatsapp.status === 'not_applicable'
                ? 'Pago confirmado. La plantilla QR corresponde al simposio 2027.'
                : data.body.whatsapp.status === 'already_confirmed'
                  ? 'El pago y el pase ya estaban confirmados. No se hizo un nuevo envío a YCloud; usa Enviar / reenviar WhatsApp.'
                  : 'Pago guardado. La API no confirmó una solicitud de WhatsApp.'
          : 'El pago fue marcado como NO PAGADO.'
      );
      setConfirmModalPago(false);
    } catch (cause) {
      alert((cause as Error).message);
    } finally {
      setPaymentBusy(false);
    }
  };

  const reenviarPase = async () => {
    if (!currentPass || paymentBusy) return;
    setPaymentBusy(true);
    setPassMessage('');
    try {
      const response = await apiFetch(
        `${API_URL}/admin/pases/${currentPass.nb_TokenQR}/reenviar`,
        { method: 'POST' }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'No se pudo reenviar.');
      if (data.whatsapp?.status !== 'accepted' || !data.whatsapp?.messageId)
        throw new Error(
          'La API no devolvió un ID de mensaje de YCloud. No se puede confirmar la solicitud.'
        );
      setPassMessage(
        `Solicitud aceptada por YCloud. ID: ${data.whatsapp.messageId}. Entrega aún no confirmada.`
      );
    } catch (cause) {
      setPassMessage((cause as Error).message);
    } finally {
      setPaymentBusy(false);
    }
  };

  const verPase = async (user: UsuarioEvento) => {
    if (paymentBusy) return;
    setPaymentBusy(true);
    try {
      const response = await apiFetch(
        `${API_URL}/admin/usuarios/${user.id_UsuarioEvento}/pase`
      );
      const data = await response.json();
      if (response.status === 404) {
        setSelectedUser(user);
        setNuevoValorPago(true);
        setConfirmModalPago(true);
        return;
      }
      if (!response.ok)
        throw new Error(
          response.status === 401
            ? 'Sesión vencida. Inicia sesión nuevamente.'
            : data.message || 'No fue posible recuperar el pase.'
        );
      setCurrentPass(data.body);
      setPassMessage('');
    } catch (cause) {
      alert((cause as Error).message);
    } finally {
      setPaymentBusy(false);
    }
  };

  const mostrarExito = (mensaje: string) => {
    setSuccessMessage(mensaje);
    setSuccessModal(true);
  };

  const abrirModalActivo = (u: UsuarioEvento) => {
    setSelectedUser(u);
    setTipoAccion('activo');
    setNuevoValor(!u.sn_Activo);
    setConfirmModal(true);
  };

  const abrirModalEditar = (u: UsuarioEvento) => {
    setSelectedUser(u);
    setTipoAccion('editar');
    setFormEdit({
      nb_Nombre: u.nb_Nombre,
      nb_ApellidoPaterno: u.nb_ApellidoPaterno,
      nb_ApellidoMaterno: u.nb_ApellidoMaterno || '',
      Empresa: u.Empresa || '',
      Cargo: u.Cargo || '',
      Celular: u.Celular,
      Correo: u.Correo,
      Comentarios: u.Comentarios || '',

      // ⭐ NUEVOS
      sn_UsuarioEspecial: u.sn_UsuarioEspecial,
      nb_TipoUsuarioEspecial: u.nb_TipoUsuarioEspecial || '',
    });
    setConfirmModal(true);
  };

  // =====================================================
  // CONFIRMAR PAGO / ACTIVO
  // =====================================================
  const confirmarAccion = async () => {
    if (!selectedUser) return;

    const endpoint =
      tipoAccion === 'pago'
        ? `${API_URL}/updatePagoUsuariosEvento`
        : `${API_URL}/toggleUsuarioEvento`;

    const body =
      tipoAccion === 'pago'
        ? {
            id_UsuarioEvento: selectedUser.id_UsuarioEvento,
            sn_Pagado: nuevoValor,
          }
        : {
            id_UsuarioEvento: selectedUser.id_UsuarioEvento,
            sn_Activo: nuevoValor,
          };

    await apiFetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    setUsuarios((prev) =>
      prev.map((u) =>
        u.id_UsuarioEvento === selectedUser.id_UsuarioEvento
          ? {
              ...u,
              ...(tipoAccion === 'pago'
                ? { sn_Pagado: nuevoValor }
                : { sn_Activo: nuevoValor }),
            }
          : u
      )
    );

    mostrarExito(
      nuevoValor
        ? 'Usuario activado correctamente.'
        : 'Usuario desactivado correctamente.'
    );

    setConfirmModal(false);
  };

  // =====================================================
  // GUARDAR EDICIÓN
  // =====================================================
  const guardarEdicion = async () => {
    if (!selectedUser) return;

    try {
      const response = await apiFetch(`${API_URL}/updateUsuarioEvento`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_UsuarioEvento: selectedUser.id_UsuarioEvento,
          nb_Nombre: formEdit.nb_Nombre,
          nb_ApellidoPaterno: formEdit.nb_ApellidoPaterno,
          nb_ApellidoMaterno: formEdit.nb_ApellidoMaterno || null,
          nb_Empresa: formEdit.Empresa,
          nb_Cargo: formEdit.Cargo.trim(),
          de_Celular: formEdit.Celular,
          de_Correo: formEdit.Correo,
          de_Comentarios: [
            formEdit.Comentarios.trim(),
            selectedUser.constanciaWhatsApp,
          ]
            .filter(Boolean)
            .join('\n'),

          // ⭐ NUEVOS
          sn_UsuarioEspecial: formEdit.sn_UsuarioEspecial,
          nb_TipoUsuarioEspecial: formEdit.sn_UsuarioEspecial
            ? formEdit.nb_TipoUsuarioEspecial
            : null,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success)
        throw new Error(data.message || 'No se pudieron guardar los cambios.');

      setUsuarios((prev) =>
        prev.map((u) =>
          u.id_UsuarioEvento === selectedUser.id_UsuarioEvento
            ? {
                ...u,
                ...formEdit,
                NombreCompleto:
                  `${formEdit.nb_Nombre} ${formEdit.nb_ApellidoPaterno} ${formEdit.nb_ApellidoMaterno}`.trim(),
              }
            : u
        )
      );

      mostrarExito('Los datos del usuario se actualizaron correctamente.');

      setConfirmModal(false);
    } catch (cause) {
      alert((cause as Error).message);
    }
  };

  // =====================================================
  // EXPORTAR EXCEL
  // =====================================================
  const exportarExcel = async () => {
    try {
      setExportando(true);

      const res = await apiFetch(`${API_URL}/registrosSimposio/EXCEL`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nu_AnioEvento: filtroAnio === 'todos' ? null : Number(filtroAnio),
          query,
          sn_Pagado:
            filtroPago == 'todos' ? null : filtroPago == 'pagados' ? 1 : 0,
          nb_Empresa: filtroEmpresa == 'todas' ? null : filtroEmpresa,
        }),
      });

      if (!res.ok) throw new Error('Error al generar Excel');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'UsuariosEvento.xlsx';
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Error al exportar Excel');
    } finally {
      setExportando(false);
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================
  const logout = () => {
    logoutSession();
    localStorage.removeItem('rcco_user_logged');
    localStorage.removeItem('rcco_role');
    navigate('/login');
  };

  // =====================================================
  // LOADING / ERROR
  // =====================================================
  if (loading)
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100 text-xl font-semibold">
        Cargando registros...
      </main>
    );

  if (error)
    return (
      <main className="min-h-screen flex items-center justify-center bg-red-100 text-xl font-semibold text-red-700">
        Error: {error}
      </main>
    );

  // =====================================================
  // RENDER
  // =====================================================
  return (
    <>
      {currentPass && (
        <PassModal
          pass={currentPass}
          busy={paymentBusy}
          message={passMessage}
          onClose={() => setCurrentPass(null)}
          onSend={reenviarPase}
        />
      )}
      <main className="rcco-registros">
        <header className="rg-header">
          <div className="rg-topbar">
            <a href="/" className="rg-brand">
              RCCO <span>ABOGADOS</span>
            </a>
            <span className="rg-private">Administración · Simposio</span>
            <button className="rg-logout" onClick={logout}>
              <LogOut size={16} /> Cerrar sesión
            </button>
          </div>
          <div className="rg-hero">
            <div>
              <span className="rg-eyebrow">GESTIÓN DE ASISTENTES</span>
              <h1>
                Registros del evento<span>.</span>
              </h1>
              <p>
                Cada edición, cada asistente. Toda la información en un solo
                lugar.
              </p>
            </div>
            <button
              className="rg-export"
              onClick={exportarExcel}
              disabled={exportando || !filtrados.length}
            >
              <Download size={18} />
              {exportando ? 'Generando…' : 'Exportar Excel'}
            </button>
          </div>
        </header>
        <div className="rg-content">
          <section
            className="rg-stats"
            aria-label="Resumen de los registros filtrados"
          >
            {[
              {
                label: 'Registros',
                value: filtrados.length,
                icon: Users,
                detail: 'Asistentes en la selección',
              },
              {
                label: 'Pagos confirmados',
                value: pagados,
                icon: CheckCircle,
                detail: 'Registro de pago completado',
              },
              {
                label: 'Pagos pendientes',
                value: filtrados.length - pagados,
                icon: Clock3,
                detail: 'Por confirmar',
              },
              {
                label: 'Empresas',
                value: new Set(
                  filtrados.map((u) => u.Empresa?.trim()).filter(Boolean)
                ).size,
                icon: Building2,
                detail: 'Organizaciones representadas',
              },
            ].map(({ label, value, icon: Icon, detail }) => (
              <article className="rg-stat" key={label}>
                <div>
                  <span>{label}</span>
                  <Icon size={19} />
                </div>
                <strong>{value.toLocaleString('es-MX')}</strong>
                <small>{detail}</small>
              </article>
            ))}
          </section>
          <section className="rg-panel" aria-label="Filtros y asistentes">
            <div className="rg-panel-title">
              <div>
                <h2>Directorio de asistentes</h2>
                <p>Consulta y administra los registros de cada edición.</p>
              </div>
              <span className="rg-live">Control de registros</span>
            </div>
            <div className="rg-filters">
              <label className="rg-search">
                <span>Buscar asistente</span>
                <div>
                  <Search size={18} />
                  <input
                    placeholder="Nombre, correo, empresa o folio…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </label>
              <label>
                <span>Año del evento</span>
                <select
                  value={filtroAnio}
                  onChange={(e) => {
                    setFiltroAnio(e.target.value);
                  }}
                >
                  <option value="todos">Todos los años</option>
                  {anios.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Estado del pago</span>
                <select
                  value={filtroPago}
                  onChange={(e) =>
                    setFiltroPago(e.target.value as typeof filtroPago)
                  }
                >
                  <option value="todos">Todos los pagos</option>
                  <option value="pagados">Pagados</option>
                  <option value="nopagados">Pendientes</option>
                </select>
              </label>
              <label>
                <span>Empresa</span>
                <select
                  value={filtroEmpresa}
                  onChange={(e) => setFiltroEmpresa(e.target.value)}
                >
                  <option value="todas">Todas las empresas</option>
                  {empresas.map((emp) => (
                    <option key={emp}>{emp}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="rg-results">
              <span>
                <b>{filtrados.length}</b> registros encontrados
              </span>
              <button
                onClick={() => {
                  setQuery('');
                  setFiltroAnio('2027');
                  setFiltroEmpresa('todas');
                  setFiltroPago('todos');
                }}
              >
                <SlidersHorizontal size={14} /> Limpiar filtros
              </button>
            </div>
            {items.length ? (
              <UsuariosEventoTable
                items={items}
                onEditar={abrirModalEditar}
                onToggleActivo={abrirModalActivo}
                onTogglePago={abrirModalPago}
                onVerPase={verPase}
              />
            ) : (
              <div className="rg-empty">
                <Search size={32} />
                <h3>No encontramos registros</h3>
                <p>Prueba con otra búsqueda o cambia los filtros.</p>
              </div>
            )}
            <footer className="rg-pagination">
              <label>
                Mostrar{' '}
                <select
                  aria-label="Registros por página"
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  {[10, 25, 50, 100].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                  <option value={0}>Todos</option>
                </select>{' '}
                por página
              </label>
              <div>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setPage(currentPage - 1)}
                >
                  Anterior
                </button>
                <span>
                  {currentPage} / {pages}
                </span>
                <button
                  disabled={currentPage === pages}
                  onClick={() => setPage(currentPage + 1)}
                >
                  Siguiente
                </button>
              </div>
            </footer>
          </section>
          <p className="rg-footnote">
            RCCO ABOGADOS · Administración de eventos
          </p>
        </div>
        {/* MODAL CONFIRMAR PAGO */}
        {confirmModalPago && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl p-8 shadow-xl max-w-sm w-full text-center">
              <h2 className="text-xl font-bold mb-4">
                {selectedUser?.sn_Pagado && nuevoValorPago
                  ? 'Generar pase QR'
                  : '¿Confirmar acción?'}
              </h2>

              <p className="text-slate-700 mb-6">
                ¿Deseas marcar como{' '}
                <b>{nuevoValorPago ? 'PAGADO' : 'NO PAGADO'}</b> al usuario?
                <br />
                <span className="font-semibold">
                  {selectedUser?.NombreCompleto}
                </span>
              </p>

              {nuevoValorPago && selectedUser?.nu_AnioEvento === 2027 && (
                <p className="text-sm text-slate-600 mb-6">
                  Se generará el pase QR personal y se enviará la confirmación
                  por WhatsApp.
                </p>
              )}

              <div className="flex justify-between gap-4">
                <button
                  disabled={paymentBusy}
                  onClick={() => setConfirmModalPago(false)}
                  className="w-1/2 py-2 bg-slate-300 hover:bg-slate-400 rounded-lg font-semibold"
                >
                  Cancelar
                </button>

                <button
                  disabled={paymentBusy}
                  onClick={confirmarPago}
                  className="w-1/2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  {paymentBusy ? 'Procesando…' : 'Confirmar'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL ACTIVAR / DESACTIVAR */}
        {confirmModal && tipoAccion === 'activo' && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl p-8 shadow-xl max-w-sm w-full text-center">
              <h2 className="text-xl font-bold mb-4">
                {nuevoValor ? 'Activar usuario' : 'Desactivar usuario'}
              </h2>

              <p className="text-slate-700 mb-6">
                ¿Estás seguro que deseas{' '}
                <b>{nuevoValor ? 'ACTIVAR' : 'DESACTIVAR'}</b> al usuario:
                <br />
                <span className="font-semibold">
                  {selectedUser?.NombreCompleto}
                </span>
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setConfirmModal(false)}
                  className="w-1/2 py-2 bg-slate-300 hover:bg-slate-400 rounded-lg font-semibold"
                >
                  Cancelar
                </button>

                <button
                  onClick={confirmarAccion}
                  className={`w-1/2 py-2 text-white rounded-lg font-semibold ${
                    nuevoValor
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL OPERACIÓN EXITOSA */}
        {successModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl p-8 shadow-xl max-w-sm w-full text-center">
              <CheckCircle className="w-14 h-14 text-green-600 mx-auto mb-4" />

              <h2 className="text-xl font-bold mb-3">Operación exitosa</h2>

              <p className="text-slate-700 mb-6">{successMessage}</p>

              <button
                onClick={() => setSuccessModal(false)}
                className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
              >
                Aceptar
              </button>
            </div>
          </div>
        )}

        {/* MODAL EDITAR */}
        {confirmModal && tipoAccion === 'editar' && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl p-8 shadow-xl max-w-sm w-full">
              <h2 className="text-xl font-bold mb-4 text-center">
                Editar usuario
              </h2>

              <div className="space-y-3">
                <input
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Nombre"
                  value={formEdit.nb_Nombre}
                  onChange={(e) =>
                    setFormEdit({ ...formEdit, nb_Nombre: e.target.value })
                  }
                />
                <input
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Apellido paterno"
                  value={formEdit.nb_ApellidoPaterno}
                  onChange={(e) =>
                    setFormEdit({
                      ...formEdit,
                      nb_ApellidoPaterno: e.target.value,
                    })
                  }
                />
                <input
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Apellido materno"
                  value={formEdit.nb_ApellidoMaterno}
                  onChange={(e) =>
                    setFormEdit({
                      ...formEdit,
                      nb_ApellidoMaterno: e.target.value,
                    })
                  }
                />
                <input
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Empresa"
                  value={formEdit.Empresa}
                  onChange={(e) =>
                    setFormEdit({ ...formEdit, Empresa: e.target.value })
                  }
                />
                <input
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Puesto / cargo en la empresa"
                  aria-label="Puesto / cargo en la empresa"
                  autoComplete="organization-title"
                  maxLength={200}
                  value={formEdit.Cargo}
                  onChange={(e) =>
                    setFormEdit({ ...formEdit, Cargo: e.target.value })
                  }
                />
                <input
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Celular"
                  value={formEdit.Celular}
                  onChange={(e) =>
                    setFormEdit({ ...formEdit, Celular: e.target.value })
                  }
                />
                <input
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Correo"
                  value={formEdit.Correo}
                  onChange={(e) =>
                    setFormEdit({ ...formEdit, Correo: e.target.value })
                  }
                />
                <textarea
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={3}
                  placeholder="Comentarios"
                  value={formEdit.Comentarios}
                  onChange={(e) =>
                    setFormEdit({ ...formEdit, Comentarios: e.target.value })
                  }
                />

                {/* ⭐ USUARIO ESPECIAL */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formEdit.sn_UsuarioEspecial}
                    onChange={(e) =>
                      setFormEdit({
                        ...formEdit,
                        sn_UsuarioEspecial: e.target.checked,
                      })
                    }
                    className="w-4 h-4"
                  />
                  <span className="font-medium">Usuario especial</span>
                </div>

                {/* ⭐ TIPO USUARIO ESPECIAL */}
                {formEdit.sn_UsuarioEspecial && (
                  <input
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Tipo de usuario especial (Cortesía, STAFF, VIP, Prensa, etc.)"
                    value={formEdit.nb_TipoUsuarioEspecial}
                    onChange={(e) =>
                      setFormEdit({
                        ...formEdit,
                        nb_TipoUsuarioEspecial: e.target.value,
                      })
                    }
                  />
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setConfirmModal(false)}
                    className="w-1/2 py-2 bg-slate-300 rounded-lg font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={guardarEdicion}
                    className="w-1/2 py-2 bg-blue-600 text-white rounded-lg font-semibold"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
