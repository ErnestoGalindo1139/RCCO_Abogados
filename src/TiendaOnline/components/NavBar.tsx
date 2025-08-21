import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

// ──────────────────────────────────────────────────────────────────────────────
// Configuración
// ──────────────────────────────────────────────────────────────────────────────
type LinkItem =
  | { id: string; label: string; type: 'section' }
  | { id: string; label: string; type: 'route' };

const LINKS: LinkItem[] = [
  { id: 'inicio', label: 'INICIO', type: 'section' },
  { id: 'nosotros', label: 'NOSOTROS', type: 'section' },
  { id: 'servicios', label: 'SERVICIOS', type: 'section' },
  { id: 'contacto', label: 'CONTACTO', type: 'section' },
  { id: '/blog', label: 'BLOG', type: 'route' }, // ← ruta independiente
];

// Ajusta el alto si cambias el tamaño del navbar
const NAV_HEIGHT = 72; // px

// ──────────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────────
const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT + 1;
  window.scrollTo({ top, behavior: 'smooth' });
};

// ──────────────────────────────────────────────────────────────────────────────
// Componente: Navbar
// ──────────────────────────────────────────────────────────────────────────────
export const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('inicio');
  const [isScrolled, setIsScrolled] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(0);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  // Obtener altura del Banner (solo en Home tiene sentido, pero no estorba en /blog)
  useEffect(() => {
    const getBannerHeight = () => {
      const bannerElement = document.getElementById('inicio');
      setBannerHeight(bannerElement ? bannerElement.offsetHeight : 0);
    };
    getBannerHeight();
    window.addEventListener('resize', getBannerHeight);
    return () => window.removeEventListener('resize', getBannerHeight);
  }, []);

  // Detectar scroll para cambiar el fondo del navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrolledPastBanner = window.scrollY >= bannerHeight - NAV_HEIGHT;
      setIsScrolled(scrolledPastBanner);
      setIsBannerVisible(!scrolledPastBanner);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, [bannerHeight]);

  // Scrollspy (solo en Home)
  useEffect(() => {
    if (!isHome) return;

    // eslint-disable-next-line no-undef
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: `-${NAV_HEIGHT + 8}px 0px -60% 0px`,
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActive(visible.target.id);
    }, options);

    LINKS.forEach((item) => {
      if (item.type === 'section') {
        const section = document.getElementById(item.id);
        if (section) observerRef.current?.observe(section);
      }
    });

    return () => observerRef.current?.disconnect();
  }, [isHome]);

  // Si llegas a "/" con hash (p.ej. "/#servicios"), hace scroll a esa sección
  useEffect(() => {
    if (!isHome) return;
    const hash = location.hash?.replace('#', '');
    if (hash) setTimeout(() => scrollToId(hash), 0);
  }, [isHome, location.hash]);

  // Navegación unificada
  const handleNav = (item: LinkItem) => {
    if (item.type === 'route') {
      navigate(item.id);
      setOpen(false);
      return;
    }
    // Sección
    if (isHome) {
      scrollToId(item.id);
    } else {
      // Ir al home con hash; el useEffect hará el scroll
      navigate(`/#${item.id}`);
    }
    setOpen(false);
  };

  const DesktopLinks = useMemo(
    () => (
      <nav className="hidden md:flex items-center gap-6">
        {LINKS.map((item) => {
          const isActive =
            item.type === 'route'
              ? location.pathname === item.id
              : isHome && active === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNav(item)}
              className={
                `text-lg tracking-wide font-semibold transition-colors hover:text-white/90 ` +
                (isActive ? 'text-white' : 'text-white/70')
              }
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    ),
    [active, isHome, location.pathname]
  );

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="w-full">
          <div
            className={`h-[72px] flex items-center justify-between px-8 transition-colors duration-300 ${
              isScrolled
                ? 'bg-blue-900 backdrop-blur-md shadow-sm ring-1 ring-white/10'
                : 'bg-transparent'
            }`}
          >
            {/* Logo */}
            <button
              onClick={() =>
                handleNav({ id: 'inicio', label: 'INICIO', type: 'section' })
              }
              className="flex items-center gap-3 w-40 md:w-48 p-4"
            >
              <img
                src="/img/logoSinFondo.jpeg"
                alt="RCCO Logo"
                className="w-full h-auto object-contain"
              />
            </button>

            {/* Links escritorio */}
            <div className="flex items-center justify-end gap-6">
              {DesktopLinks}
              {/* Redes escritorio (si las activas después) */}
              {/* {SocialButtons} */}
            </div>

            {/* Botón menú móvil */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setOpen((v) => !v)}
              aria-label="Abrir menú"
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        <div
          className={`md:hidden transition-[max-height] duration-300 ease-out overflow-hidden bg-blue-950/90 backdrop-blur-md
                      ${open ? 'max-h-96' : 'max-h-0'}`}
        >
          <div className="mx-auto max-w-7xl px-6 py-3 space-y-2">
            {LINKS.map((item) => {
              const isActive =
                item.type === 'route'
                  ? location.pathname === item.id
                  : isHome && active === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item)}
                  className={
                    `block w-full text-left py-3 text-white/90 font-semibold tracking-wide rounded-xl
                     hover:bg-white/5 transition-colors ` +
                    (isActive ? 'text-white' : '')
                  }
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Botón flotante de WhatsApp - Visible solo cuando no estamos en el banner */}
      <a
        href="https://wa.me/521234567890" // cambia al número real
        target="_blank"
        rel="noopener noreferrer"
        className={`
          fixed bottom-6 right-6
          bg-green-500 hover:bg-green-600
          p-4 rounded-full shadow-lg
          transition-all 
          hover:scale-110
          z-40
          ${isBannerVisible ? 'opacity-0 pointer-events-none translate-y-10' : 'opacity-100 pointer-events-auto translate-y-0'}
        `}
      >
        <FaWhatsapp className="w-6 h-6 text-white" />
      </a>
    </>
  );
};
