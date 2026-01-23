import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  role?: 'user' | 'admin' | 'verificador';
}

export const ProtectedRoute: React.FC<Props> = ({ children, role }) => {
  const logged = localStorage.getItem('rcco_user_logged') === 'true';
  const userRole = localStorage.getItem('rcco_role'); // user | admin | verificador

  // ❌ No logueado
  if (!logged) {
    return (
      <Navigate
        to={role === 'verificador' ? '/loginVerificador' : '/login'}
        replace
      />
    );
  }

  // ❌ Logueado pero rol incorrecto
  if (role && userRole !== role) {
    return (
      <Navigate
        to={role === 'verificador' ? '/loginVerificador' : '/login'}
        replace
      />
    );
  }

  // ✅ Todo bien
  return <>{children}</>;
};
