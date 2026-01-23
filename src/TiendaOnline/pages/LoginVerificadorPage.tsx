import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginVerificadorPage() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 🔐 SI YA ESTÁ LOGUEADO COMO VERIFICADOR, NO DEJAR ENTRAR AQUÍ
  useEffect(() => {
    const logged = localStorage.getItem('rcco_user_logged') === 'true';
    const role = localStorage.getItem('rcco_role');

    if (logged && role === 'verificador') {
      navigate('/verificar-registro', { replace: true });
    }
  }, [navigate]);

  const login = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔑 CREDENCIALES DEL VERIFICADOR
    if (usuario === 'verificador' && password === 'PLD2026') {
      localStorage.setItem('rcco_user_logged', 'true');
      localStorage.setItem('rcco_role', 'verificador');

      navigate('/verificar-registro', { replace: true });
      return;
    }

    setError('Credenciales incorrectas');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#0A3C8C]">
          Acceso Verificador
        </h1>

        <form onSubmit={login} className="space-y-4">
          <div>
            <label className="text-sm text-slate-700">Usuario</label>
            <input
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-slate-700">Contraseña</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-semibold transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    </main>
  );
}
