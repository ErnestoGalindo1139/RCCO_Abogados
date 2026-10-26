import { RegistrationResultModal } from './RegistrationResultModal';
import { API_URL } from '../../config/api';
import React, { useState } from 'react';
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  LoaderCircle,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
  UserRound,
  Users,
} from 'lucide-react';

type FormState = {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
  correo: string;
  empresa: string;
  mensaje: string;
};

const initialForm: FormState = {
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  telefono: '',
  correo: '',
  empresa: '',
  mensaje: '',
};

type Result = 'success' | 'missing' | 'error' | null;

export const EventoEnero2 = (): React.JSX.Element => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [folio, setFolio] = useState('');
  const [whatsappAccepted, setWhatsappAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result>(null);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const submit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (loading) return;
    if (
      !form.nombre.trim() ||
      !form.apellidoPaterno.trim() ||
      !form.telefono.trim() ||
      !form.correo.trim()
    ) {
      setResult('missing');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/registroSimposio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nb_Nombre: form.nombre.trim(),
          nb_ApellidoPaterno: form.apellidoPaterno.trim(),
          nb_ApellidoMaterno: form.apellidoMaterno.trim(),
          de_Celular: form.telefono.trim(),
          de_Correo: form.correo.trim(),
          nb_Empresa: form.empresa.trim(),
          de_Comentarios: form.mensaje.trim(),
          fh_Pago: null,
          whatsappConsent: true,
          sn_Pagado: false,
          sn_Activo: true,
        }),
      });
      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
        body?: { nu_Folio: string; whatsapp: { status: string } };
      };
      if (!response.ok || !data.success) throw new Error(data.message);

      setFolio(data.body?.nu_Folio || '');
      setWhatsappAccepted(data.body?.whatsapp.status === 'accepted');
      setForm(initialForm);
      setResult('success');
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Inténtalo nuevamente.'
      );
      setResult('error');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    ['nombre', 'Nombre *', UserRound, 'given-name', 'text', true],
    [
      'apellidoPaterno',
      'Apellido paterno *',
      UserRound,
      'family-name',
      'text',
      true,
    ],
    [
      'apellidoMaterno',
      'Apellido materno',
      UserRound,
      'additional-name',
      'text',
      false,
    ],
    ['telefono', 'Teléfono *', Phone, 'tel', 'tel', true],
    ['correo', 'Correo electrónico *', Mail, 'email', 'email', true],
    ['empresa', 'Empresa', Building2, 'organization', 'text', false],
  ] as const;

  return (
    <section className="sp-section sp-registration" id="inversion">
      <div className="sp-container" data-sp-reveal>
        <div className="sp-registration-grid">
          <div className="sp-registration-copy">
            <p className="sp-eyebrow">Inscripción oficial · Segunda edición</p>
            <h2>Tu lugar comienza aquí</h2>
            <p className="sp-description">
              Forma parte del encuentro corporativo que reúne conocimiento,
              experiencia y nuevas perspectivas sobre cumplimiento.
            </p>

            <div className="sp-registration-details">
              <div>
                <CalendarDays aria-hidden="true" />
                <span>
                  <small>Fecha</small>22 y 23 de enero de 2027
                </span>
              </div>
              <div>
                <MapPin aria-hidden="true" />
                <span>
                  <small>Sede</small>Hotel Fiesta Inn de Plaza Isla Tres
                  <br />
                  Mazatlán, Sinaloa
                </span>
              </div>
              <div>
                <Users aria-hidden="true" />
                <span>
                  <small>Acceso</small>Cupo limitado · Registro obligatorio
                </span>
              </div>
            </div>

            <div className="sp-registration-note">
              <CheckCircle2 aria-hidden="true" />
              <p>
                Recibirás un folio para continuar la confirmación directamente
                con el equipo de RCCO.
              </p>
            </div>
          </div>

          <form className="sp-registration-form" onSubmit={submit}>
            <div className="sp-form-heading">
              <div>
                <p className="sp-eyebrow">Registro de asistencia</p>
                <h3>Datos del participante</h3>
              </div>
              <span>Campos obligatorios *</span>
            </div>

            <div className="sp-form-grid">
              {fields.map(
                ([name, label, Icon, autoComplete, type, required]) => (
                  <label key={name}>
                    <span>{label}</span>
                    <span className="sp-input-wrap">
                      <Icon aria-hidden="true" />
                      <input
                        name={name}
                        type={type}
                        placeholder={label.replace(' *', '')}
                        maxLength={name === 'telefono' ? 25 : 200}
                        autoComplete={autoComplete}
                        value={form[name]}
                        onChange={onChange}
                        required={required}
                      />
                    </span>
                  </label>
                )
              )}
              <label className="sp-form-full">
                <span>Mensaje o comentario</span>
                <span className="sp-input-wrap sp-input-wrap--textarea">
                  <MessageSquareText aria-hidden="true" />
                  <textarea
                    name="mensaje"
                    rows={3}
                    maxLength={350}
                    placeholder="Escribe aquí cualquier comentario adicional"
                    value={form.mensaje}
                    onChange={onChange}
                  />
                </span>
              </label>
            </div>

            <p className="sp-phone-help">
              Teléfono de México: 10 dígitos. Para otro país, incluye + y el
              código de país.
            </p>
            <button
              type="submit"
              className="sp-button sp-button--gold sp-registration-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoaderCircle className="sp-spinner" aria-hidden="true" />{' '}
                  Registrando…
                </>
              ) : (
                <>
                  Solicitar mi registro <Send size={17} aria-hidden="true" />
                </>
              )}
            </button>
            <p className="sp-form-privacy">
              Información protegida · Uso exclusivo para la gestión del evento
            </p>
          </form>
        </div>
      </div>

      {result && (
        <RegistrationResultModal
          result={result}
          folio={folio}
          whatsappAccepted={whatsappAccepted}
          errorMessage={errorMessage}
          onClose={() => setResult(null)}
        />
      )}
    </section>
  );
};
