import {
  CheckCircle,
  XCircle,
  Pencil,
  Trash2,
  RotateCcw,
  Star,
} from 'lucide-react';
import { UsuarioEvento } from '../types/UsuarioEvento';
type Props = {
  items: UsuarioEvento[];
  onEditar: (u: UsuarioEvento) => void;
  onToggleActivo: (u: UsuarioEvento) => void;
  onTogglePago: (u: UsuarioEvento) => void;
};
const fecha = (value: string) => {
  const match = value?.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}:\d{2}))?/);
  return match
    ? `${match[3]}/${match[2]}/${match[1]}${match[4] ? ' · ' + match[4] : ''}`
    : '—';
};
export const UsuariosEventoTable = ({
  items,
  onEditar,
  onToggleActivo,
  onTogglePago,
}: Props) => (
  <div
    className="rg-table-scroll"
    tabIndex={0}
    role="region"
    aria-label="Tabla de asistentes, desplazamiento horizontal"
  >
    <table className="rg-table">
      <thead>
        <tr>
          {[
            'Asistente',
            'Empresa',
            'Evento',
            'Pago',
            'Contacto',
            'Folio / Registro',
            'Comentarios',
            'Acciones',
          ].map((h) => (
            <th key={h} scope="col">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((u) => (
          <tr key={u.id_UsuarioEvento}>
            <td>
              <span className="rg-person">{u.NombreCompleto}</span>
              <span className="rg-secondary">
                {u.sn_UsuarioEspecial ? (
                  <>
                    <Star size={11} className="inline text-amber-500" />{' '}
                    {u.nb_TipoUsuarioEspecial || 'Invitado especial'}
                  </>
                ) : (
                  'Asistente general'
                )}
                {!u.sn_Activo && ' · Inactivo'}
              </span>
            </td>
            <td>{u.Empresa || '—'}</td>
            <td>
              <span>{u.nu_AnioEvento || 'Sin clasificar'}</span>
              <span className="rg-secondary">
                {u.nu_EdicionEvento
                  ? u.nu_EdicionEvento + '.ª edición'
                  : 'Edición sin asignar'}
              </span>
            </td>
            <td>
              <div className="rg-actions">
                <span
                  className={`rg-badge ${u.sn_Pagado ? 'rg-paid' : 'rg-pending'}`}
                >
                  {u.sn_Pagado ? 'Pagado' : 'Pendiente'}
                </span>
                <button
                  onClick={() => onTogglePago(u)}
                  title={
                    u.sn_Pagado ? 'Marcar como pendiente' : 'Confirmar pago'
                  }
                  aria-label={`${u.sn_Pagado ? 'Cambiar pago' : 'Confirmar pago'} de ${u.NombreCompleto}`}
                >
                  {u.sn_Pagado ? (
                    <XCircle size={15} />
                  ) : (
                    <CheckCircle size={15} />
                  )}
                </button>
              </div>
            </td>
            <td>
              <span className="rg-contact">{u.Correo || '—'}</span>
              <span className="rg-secondary">{u.Celular || '—'}</span>
            </td>
            <td>
              <span className="rg-folio">{u.nu_Folio}</span>
              <span className="rg-secondary">{fecha(u.FechaRegistro)}</span>
            </td>
            <td className="rg-comment">{u.Comentarios || '—'}</td>
            <td>
              <div className="rg-actions">
                <button
                  onClick={() => onEditar(u)}
                  title="Editar asistente"
                  aria-label={`Editar a ${u.NombreCompleto}`}
                >
                  <Pencil size={15} />
                </button>
                <button
                  className="rg-danger"
                  onClick={() => onToggleActivo(u)}
                  title={u.sn_Activo ? 'Desactivar' : 'Reactivar'}
                  aria-label={`${u.sn_Activo ? 'Desactivar' : 'Reactivar'} a ${u.NombreCompleto}`}
                >
                  {u.sn_Activo ? <Trash2 size={15} /> : <RotateCcw size={15} />}
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
