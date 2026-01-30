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
import { SimposioPage } from '../pages/SimposioPage';
import VerificadorRegistroPage from '../pages/VerificadorRegistroPage';
import LoginVerificadorPage from '../pages/LoginVerificadorPage';
import { LoginFolioPage } from '../pages/LoginFolioPage';
import { ProtectedFolioRoute } from '../components/ProtectedFolioRoute';

export const TiendaOnlineRoutes = () => {
  const location = useLocation();

  // ⛔ SOLO rutas que NO deben tener layout
  const hideLayoutRoutes = [
    '/login',
    '/loginVerificador',
    '/registradosEvento',
    '/verificar-registro',
  ];

  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {/* NAVBAR */}
      {!hideLayout && <NavBar />}

      <Routes>
        {/* ===== PUBLICAS ===== */}
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/simposio" element={<SimposioPage />} />

        <Route
          path="/PoliticaDePrivacidad"
          element={<PoliticaDePrivacidadPage />}
        />
        <Route
          path="/TerminosYCondiciones"
          element={<TerminosYCondicionesPage />}
        />

        {/* ===== LOGINS ===== */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/loginVerificador" element={<LoginVerificadorPage />} />

        {/* 👇 LOGIN FOLIO CON NAVBAR */}
        <Route path="/login-folio" element={<LoginFolioPage />} />

        {/* 👇 MATERIALES CON NAVBAR */}
        <Route
          path="/materiales"
          element={
            <ProtectedFolioRoute>
              <MaterialesPage />
            </ProtectedFolioRoute>
          }
        />

        {/* ===== ADMIN ===== */}
        <Route
          path="/registradosEvento"
          element={
            <ProtectedRoute role="admin">
              <RegistradosPage />
            </ProtectedRoute>
          }
        />

        {/* ===== VERIFICADOR ===== */}
        <Route
          path="/verificar-registro"
          element={
            <ProtectedRoute role="verificador">
              <VerificadorRegistroPage />
            </ProtectedRoute>
          }
        />

        {/* ===== FALLBACK ===== */}
        <Route path="*" element={<HomePage />} />
      </Routes>

      {/* FOOTER */}
      {!hideLayout && <Footer />}
    </>
  );
};
