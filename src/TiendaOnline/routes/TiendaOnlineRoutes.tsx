import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { BlogPage } from '../pages/BlogPage';
import { NavBar } from '../components/NavBar';
import { BlogPostPage } from '../pages/BlogPostPage';
import { Footer } from '../components/FooterPlantilla';

export const TiendaOnlineRoutes = () => {
  return (
    <>
      {/* Aqui va el NavbarComponent */}
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />{' '}
        {/* ← detalle */}
      </Routes>

      {/* Aqui va el FooterComponent */}
      <Footer />
    </>
  );
};
