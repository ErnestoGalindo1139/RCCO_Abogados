import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FOLIO_PREFIX } from '../auth/folioAuth';

export const LoginFolioPage: React.FC = () => {
  const navigate = useNavigate();

  // Guardamos SOLO números (máx 8)
  const [digits, setDigits] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ===============================
  // FORMATEAR INPUT (AUTO GUION)
  // ===============================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Quitar todo lo que no sea número
    value = value.replace(/\D/g, '');

    // Máximo 8 números
    if (value.length > 8) {
      value = value.slice(0, 8);
    }

    setDigits(value);
  };

  // Mostrar con guion automático
  const formattedValue =
    digits.length <= 4 ? digits : `${digits.slice(0, 4)}-${digits.slice(4)}`;

  const entrar = async () => {
    setError('');

    if (digits.length !== 8) {
      setError('El folio debe tener 8 dígitos');
      return;
    }

    const folioCompleto = `${FOLIO_PREFIX}-${formattedValue}`;

    setLoading(true);

    try {
      const res = await fetch(
        // 'http://localhost:4005/verificar-folio-materiales',
        'https://api-rcco-abogados.grstechs.com/verificar-folio-materiales',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nu_Folio: folioCompleto }),
        }
      );

      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Respuesta inválida del servidor');
      }

      if (!data.success) {
        throw new Error(data.message || 'Folio no válido');
      }

      // ===============================
      // GUARDAR SESIÓN
      // ===============================
      localStorage.setItem('rcco_folio_logged', folioCompleto);
      localStorage.setItem('rcco_folio_usuario', JSON.stringify(data.body));

      navigate('/materiales');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('❌ Error login folio:', err);
      setError(err.message || 'Error al verificar el folio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h1 className="text-2xl font-bold text-[#113873] mb-2">
          Acceso a Materiales
        </h1>

        <p className="text-gray-500 mb-6">
          Ingresa el folio proporcionado al registrarte en el Simposio.
        </p>

        {/* INPUT CON PREFIJO + MÁSCARA */}
        <div className="flex items-center border rounded-xl mb-3 overflow-hidden">
          <span className="px-4 py-3 bg-slate-100 text-slate-600 font-semibold whitespace-nowrap">
            {FOLIO_PREFIX}-
          </span>

          <input
            value={formattedValue}
            onChange={handleChange}
            placeholder="0000-0000"
            className="flex-1 px-4 py-3 outline-none tracking-widest"
            inputMode="numeric"
          />
        </div>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <button
          onClick={entrar}
          disabled={loading}
          className="w-full py-3 bg-[#113873] hover:bg-[#0d2f5e] text-white rounded-xl font-semibold"
        >
          {loading ? 'Verificando...' : 'Entrar'}
        </button>
      </div>
    </main>
  );
};
