import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { LuClock2, LuFacebook, LuInstagram, LuMail } from 'react-icons/lu';

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
  { id: 'blog', label: 'BLOG', type: 'route' }, // ← ruta independiente
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
interface NavBarProps {
  scrollBackground?: boolean;
  lockScrollOnOpen?: boolean;
}

export const NavBar: React.FC<NavBarProps> = ({ 
  scrollBackground = false,
  lockScrollOnOpen = true
}) => {
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
  // Controla el fondo y visibilidad del banner
  useEffect(() => {
    if (scrollBackground) {
      setIsScrolled(false);
      setIsBannerVisible(true);
      return;
    }
    // En /blog (u otra ruta que no sea "/"), siempre azul y sin escuchar scroll
    if (!isHome) {
      setIsScrolled(true); // fuerza fondo azul
      setIsBannerVisible(false); // como no hay banner, muestra el botón de WhatsApp
      return;
    }

    // En Home: comportamiento original
    const handleScroll = () => {
      const scrolledPastBanner = window.scrollY >= bannerHeight - NAV_HEIGHT;
      setIsScrolled(scrolledPastBanner);
      setIsBannerVisible(!scrolledPastBanner);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // init

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [bannerHeight, isHome, scrollBackground]);

  // Controla el scroll del body cuando el slider está abierto
  useEffect(() => {
    // Si lockScrollOnOpen es false, no bloquear el scroll
    if (!lockScrollOnOpen) return;
    
    // Crear estilo una vez si no existe
    if (!document.getElementById('scroll-lock-style')) {
      const style = document.createElement('style');
      style.id = 'scroll-lock-style';
      style.innerHTML = `
        .body-scroll-lock {
          overflow: hidden !important;
          height: 100% !important;
          width: 100% !important;
          position: fixed !important;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Aplicar o remover la clase según si el slider está abierto
    if (open) {
      document.body.classList.add('body-scroll-lock');
    } else {
      document.body.classList.remove('body-scroll-lock');
    }
    
    // Cleanup al desmontar
    return () => {
      document.body.classList.remove('body-scroll-lock');
    };
  }, [open, lockScrollOnOpen]);

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

        {/* Menú móvil deslizable (slider) */}
        <div 
          className={`md:hidden fixed top-0 right-0 h-full w-3/4 max-w-sm bg-blue-900 shadow-xl 
                      transform transition-transform duration-300 ease-in-out z-50
                      ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex flex-col h-full">
            {/* Cabecera del slider */}
            <div className="flex justify-between items-center p-4 border-b border-blue-800">
              <span className="text-xl font-bold text-white">Menú</span>
              <button 
                onClick={() => setOpen(false)}
                className="p-2 text-white rounded-full hover:bg-blue-800"
              >
                <X className="size-6" />
              </button>
            </div>
            
            {/* Contenido del slider */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-1">
                {LINKS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => {
                      scrollToId(id);
                      setOpen(false);
                    }}
                    className={`
                      block w-full text-left py-4 px-3 text-white/90 font-semibold tracking-wide
                      rounded-lg transition-colors border-l-4
                      ${active === id 
                        ? 'border-white bg-blue-800/50 text-white' 
                        : 'border-transparent hover:bg-blue-800/30'}
                    `}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Footer del slider con contacto */}
            <div className="p-4 border-t border-blue-800">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-white/80">
                  <LuMail className="size-5" />
                  <a href="mailto:contacto@rccoabogados.com.mx" className="text-sm hover:text-white">
                    contacto@rccoabogados.com.mx
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <LuClock2 className="size-5" />
                  <p className="text-sm">Lunes a Viernes, 9:00 - 17:00</p>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <FaWhatsapp className="size-5" />
                  <p className="text-sm font-semibold">+52 669-2291-634</p>
                </div>
                
                {/* Redes sociales */}
                <div className="flex justify-start space-x-4 pt-2">
                  <a href="#" className="text-white/80 hover:text-white">
                    <LuFacebook className="size-6" />
                  </a>
                  <a href="#" className="text-white/80 hover:text-white">
                    <FaWhatsapp className="size-6" />
                  </a>
                  <a href="#" className="text-white/80 hover:text-white">
                    <LuInstagram className="size-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Overlay para cerrar al tocar fuera del slider */}
        {open && (
          <div 
            className="fixed inset-0 bg-black/50 md:hidden z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
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
