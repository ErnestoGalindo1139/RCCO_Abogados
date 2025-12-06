import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { LuClock2, LuFacebook, LuInstagram, LuMail } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import { LanguageFlagSwitch } from './LanguageFlagSwitch';

// ──────────────────────────────────────────────────────────────────────────────
// Configuración
// ──────────────────────────────────────────────────────────────────────────────
type LinkItem =
  | { id: string; label: string; type: 'section' }
  | { id: string; label: string; type: 'route' };

const LINKS: LinkItem[] = [
  { id: 'inicio', label: 'nav.home', type: 'section' },
  { id: 'nosotros', label: 'nav.about', type: 'section' },
  { id: 'servicios', label: 'nav.services', type: 'section' },
  { id: 'ubicacion', label: 'nav.contact', type: 'section' },
  { id: 'blog', label: 'nav.blog', type: 'route' },
  // 👉 Nuevo item Login
  { id: 'login', label: 'nav.login', type: 'route' },
];

// Ajusta el alto si cambias el tamaño del navbar
const NAV_HEIGHT = 72; // px

// ──────────────────────────────────────────────────────────────────────────────
// Componente: Navbar
// ──────────────────────────────────────────────────────────────────────────────
interface NavBarProps {
  lockScrollOnOpen?: boolean;
}

export const NavBar: React.FC<NavBarProps> = ({
  lockScrollOnOpen = true,
}) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');  // Inicializado vacío para que no haya selección al cargar
  const [isScrolled, setIsScrolled] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(0);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  
  // Referencias para optimización
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const animationFrameId = useRef<number | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const { t } = useTranslation(['common']);
  const { t: trans } = useTranslation('home');

  // Función optimizada para scroll to ID
  const scrollToId = useCallback((id: string): void => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT + 1;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  // Obtener altura del Banner
  useEffect(() => {
    const getBannerHeight = (): void => {
      const bannerElement = document.getElementById('inicio');
      if (bannerElement) {
        const height = bannerElement.offsetHeight;
        if (height !== bannerHeight) {
          setBannerHeight(height);
        }
      }
    };

    getBannerHeight();
    
    let resizeObserver: ResizeObserver | null = null;
    const bannerElement = document.getElementById('inicio');
    
    if (bannerElement && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(getBannerHeight);
      resizeObserver.observe(bannerElement);
    } else {
      window.addEventListener('resize', getBannerHeight);
    }

    return () => {
      if (resizeObserver && bannerElement) {
        resizeObserver.unobserve(bannerElement);
      } else {
        window.removeEventListener('resize', getBannerHeight);
      }
    };
  }, [bannerHeight]);

  // Fondo del navbar y visibilidad del botón de WhatsApp
  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      setIsBannerVisible(false);
      return;
    }

    const handleScroll = (): void => {
      const bannerElement = document.getElementById('inicio');
      if (bannerElement) {
        const rect = bannerElement.getBoundingClientRect();
        const isInBanner = rect.bottom > 0;
        
        setIsBannerVisible(isInBanner);
        setIsScrolled(!isInBanner);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Controla el scroll del body cuando el slider está abierto
  useEffect(() => {
    if (!lockScrollOnOpen) return;

    if (open) {
      const scrollY = window.scrollY;
      (document.body as any).dataset.scrollPosition = scrollY.toString();
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = Number(
        (document.body as any).dataset.scrollPosition || '0'
      );
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
      
      // Recalcular la sección activa cuando se cierra el slider
      const currentScroll = window.scrollY;
      let closestSection = '';
      let minDistance = Infinity;

      LINKS.forEach((item) => {
        if (item.type === 'section') {
          const section = document.getElementById(item.id);
          if (section) {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top + currentScroll - currentScroll);
            if (distance < minDistance) {
              minDistance = distance;
              closestSection = item.id;
            }
          }
        }
      });

      if (closestSection) {
        setActive(closestSection);
      }
    }
  }, [open, lockScrollOnOpen]);

  // Scrollspy optimizado (solo en Home)
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]): void => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    
    if (visible?.target?.id) {
      setActive(visible.target.id);
    }
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const options = {
      root: null,
      rootMargin: `-${NAV_HEIGHT}px 0px -50% 0px`,
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    };

    observerRef.current = new IntersectionObserver(observerCallback, options);

    LINKS.forEach((item) => {
      if (item.type === 'section') {
        const section = document.getElementById(item.id);
        if (section) observerRef.current?.observe(section);
      }
    });

    return (): void => {
      observerRef.current?.disconnect();
    };
  }, [isHome, observerCallback]);

  // Mantener comportamiento hash (/#inicio, etc.)
  useEffect(() => {
    if (!isHome) return;
    const hash = location.hash?.replace('#', '');
    if (hash) {
      setTimeout(() => scrollToId(hash), 0);
    }
  }, [isHome, location.hash, scrollToId]);

  // 👉 Comportamiento especial: si estoy en /login y doy atrás, me regresa al inicio
  useEffect(() => {
    if (location.pathname !== '/login') return;

    const handlePopState = () => {
      navigate('/#inicio', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [location.pathname, navigate]);

  // Función de navegación optimizada con useCallback
  const handleNav = useCallback((item: LinkItem): void => {
    const performNavigation = (): void => {
      if (item.type === 'route') {
        navigate(`/${item.id}`);
        return;
      }

      setActive(item.id);

      if (isHome) {
        scrollToId(item.id);
      } else {
        navigate(`/#${item.id}`);
      }
    };

    if (open) {
      setOpen(false);
      setTimeout(performNavigation, 300);
    } else {
      performNavigation();
    }
  }, [isHome, navigate, open, scrollToId]);

  const DesktopLinks = useMemo(
    () => (
      <nav className="hidden md:flex items-center gap-6">
        {LINKS.map((item) => {
          const isActive =
            item.type === 'route'
              ? location.pathname === `/${item.id}`
              : isHome && active === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNav(item)}
              className={`
                text-lg tracking-wide font-semibold transition-colors 
                hover:text-white/90 ${isActive ? 'text-white' : 'text-white/70'}
              `}
            >
              {t(item.label)}
            </button>
          );
        })}
      </nav>
    ),
    [active, isHome, location.pathname, handleNav, t]
  );

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50">
        <div
          className={`h-[72px] w-full flex items-center justify-between transition-colors duration-300 ${
            isScrolled || open
              ? 'bg-blue-900 backdrop-blur-md shadow-sm ring-1 ring-white/10'
              : 'bg-transparent'
          }`}
        >
          <div className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <button
              onClick={() =>
                handleNav({ id: 'inicio', label: 'nav.home', type: 'section' })
              }
              className="flex items-center w-32 sm:w-36 md:w-40 lg:w-44"
              aria-label={t('nav.logoAlt')}
              title={t('nav.logoAlt')}
            >
              <img
                src="/img/logoSinFondo.jpeg"
                alt={t('nav.logoAlt')}
                className="w-full h-auto object-contain"
              />
            </button>

            {/* Links escritorio y Language Switch */}
            <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
              {DesktopLinks}
              <LanguageFlagSwitch />

              {/* Botón menú móvil */}
              <button
                className="md:hidden p-2 text-white"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? t('actions.close') : t('nav.menu')}
              >
                {open ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
            </div>
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
              <span className="text-xl font-bold text-white">
                {t('nav.menu')}
              </span>
              <button
                onClick={() => setOpen(false)}
                className="p-2 text-white rounded-full hover:bg-blue-800"
                aria-label={t('actions.close')}
              >
                <X className="size-6" />
              </button>
            </div>

            {/* Contenido del slider */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-1">
                {LINKS.map((item) => {
                  const isActive =
                    item.type === 'route'
                      ? location.pathname === `/${item.id}`
                      : isHome && active === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item)}
                      className={`
                        block w-full text-left py-4 px-3 text-white/90 font-semibold tracking-wide
                        rounded-lg transition-colors border-l-4
                        ${
                          isActive
                            ? 'border-white bg-blue-800/50 text-white'
                            : 'border-transparent hover:bg-blue-800/30'
                        }
                      `}
                    >
                      {t(item.label)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer del slider con contacto + switch de idioma */}
            <div className="p-4 border-t border-blue-800 space-y-4">
              <LanguageFlagSwitch />

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-white/80">
                  <LuMail className="size-5" />
                  <a
                    href="mailto:contacto@rccoabogados.com.mx"
                    className="text-sm hover:text-white"
                  >
                    contacto@rccoabogados.com.mx
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <LuClock2 className="size-5" />
                  <p className="text-sm">{trans('ubicacion.schedule.week')}</p>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <FaWhatsapp className="size-5" />
                  <p className="text-sm font-semibold">+52 669-2291-634</p>
                </div>

                {/* Redes sociales */}
                <div className="flex justify-start space-x-4 pt-2">
                  <a href="https://www.facebook.com/profile.php?id=100063488083767" className="text-white/80 hover:text-white">
                    <LuFacebook className="size-6" />
                  </a>
                  <a href="https://wa.me/6692291634" className="text-white/80 hover:text-white">
                    <FaWhatsapp className="size-6" />
                  </a>
                  <a href="https://www.instagram.com/rccoabogados/" className="text-white/80 hover:text-white">
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

      {/* Botón flotante de WhatsApp - Solo visible después del banner */}
      <a
        href="https://wa.me/6692291634"
        target="_blank"
        rel="noopener noreferrer"
        className={`
          fixed bottom-6 right-6
          bg-green-500 hover:bg-green-600
          p-4 rounded-full shadow-lg
          transition-all duration-500
          hover:scale-110
          z-40
          ${isBannerVisible 
            ? 'opacity-0 pointer-events-none translate-y-10' 
            : 'opacity-100 pointer-events-auto translate-y-0'}
        `}
        aria-label="Abrir chat de WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6 text-white" />
      </a>
    </>
  );
};
