import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { BlogPage } from '../pages/BlogPage';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';

export const TiendaOnlineRoutes = () => {
  return (
    <>
      {/* Aqui va el NavbarComponent */}
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>

      {/* Aqui va el FooterComponent */}
      <Footer />
    </>
  );
};
