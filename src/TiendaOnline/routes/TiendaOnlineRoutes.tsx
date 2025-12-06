import { Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { BlogPage } from '../pages/BlogPage';

import { BlogPostPage } from '../pages/BlogPostPage';
import { Footer } from '../components/FooterPlantilla';
import { NavBar } from '../components/NavBar';
import { PoliticaDePrivacidadPage } from '../pages/PoliticaDePrivacidad';
import { TerminosYCondicionesPage } from '../pages/TerminosYCondicionesPage';
import RegistradosPage from '../pages/RegistradosPage';
import { LoginPage } from '../pages/LoginPage';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { MaterialesPage } from '../pages/MaterialesPage';

export const TiendaOnlineRoutes = () => {

  const location = useLocation();

  // Rutas donde NO debe aparecer el NavBar ni el Footer
  const hideLayout = [
    "/login",
    "/materiales",
    "/registradosEvento",
  ].includes(location.pathname);

  return (
    <>

      {/* SIN NAVBAR/FOOTER */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/materiales"
          element={
            <ProtectedRoute role="user">
              <MaterialesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/registradosEvento"
          element={
            <ProtectedRoute role="admin">
              <RegistradosPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* SOLO MOSTRAR NAVBAR Y FOOTER SI NO ESTAMOS EN LAS RUTAS PRIVADAS */}
      {!hideLayout && <NavBar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/PoliticaDePrivacidad" element={<PoliticaDePrivacidadPage />} />
        <Route path="/TerminosYCondiciones" element={<TerminosYCondicionesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};
