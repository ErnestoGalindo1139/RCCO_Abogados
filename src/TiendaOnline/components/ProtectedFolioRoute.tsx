import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedFolioRoute = ({
  children,
}: {
  children: React.JSX.Element;
}) => {
  const folio = localStorage.getItem('rcco_folio_logged');

  if (!folio) {
    return <Navigate to="/login-folio" replace />;
  }

  return children;
};
