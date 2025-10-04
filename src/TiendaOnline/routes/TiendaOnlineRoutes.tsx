import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { BlogPage } from '../pages/BlogPage';

import { BlogPostPage } from '../pages/BlogPostPage';
import { Footer } from '../components/FooterPlantilla';
import { NavBar } from '../components/NavBar';
import { PoliticaDePrivacidadPage } from '../pages/PoliticaDePrivacidad';
import { TerminosYCondicionesPage } from '../pages/TerminosYCondicionesPage';

export const TiendaOnlineRoutes = () => {
  return (
    <>
      {/* Aqui va el NavbarComponent */}
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/PoliticaDePrivacidad" element={<PoliticaDePrivacidadPage />} />
        <Route path="/TerminosYCondiciones" element={<TerminosYCondicionesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />{' '}
        {/* ← detalle */}
      </Routes>

      {/* Aqui va el FooterComponent */}
      <Footer />
    </>
  );
};
