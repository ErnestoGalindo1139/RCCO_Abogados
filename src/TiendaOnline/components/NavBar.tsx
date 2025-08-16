import React, { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X, Facebook, Instagram  } from "lucide-react";
import { FaInstagram, FaWhatsapp, FaFacebook, FaTiktok, FaYoutube  } from "react-icons/fa";

// ──────────────────────────────────────────────────────────────────────────────
// Configuración
// ──────────────────────────────────────────────────────────────────────────────
const LINKS = [
  { id: "inicio", label: "INICIO" },
  { id: "nosotros", label: "NOSOTROS" },
  { id: "servicios", label: "SERVICIOS" },
  { id: "contacto", label: "CONTACTO" },
  { id: "blog", label: "BLOG" },
];

const SOCIALS = [
  { href: "https://www.facebook.com/", label: "Facebook", Icon: FaFacebook  },
  { href: "https://www.instagram.com/", label: "Instagram", Icon: FaInstagram  },
//   { href: "https://wa.me/521234567890", label: "WhatsApp", Icon: FaWhatsapp  },
  { href: "https://www.tiktok.com", label: "Tiktok", Icon: FaTiktok },
  { href: "https://www.youtube.com", label: "YouTube", Icon: FaYoutube  },
];

// Ajusta el alto si cambias el tamaño del navbar
const NAV_HEIGHT = 72; // px

// ──────────────────────────────────────────────────────────────────────────────
// Helper: scroll suave con offset
// ──────────────────────────────────────────────────────────────────────────────
const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT + 1;
  window.scrollTo({ top, behavior: "smooth" });
};

// ──────────────────────────────────────────────────────────────────────────────
// Componente: Navbar
// ──────────────────────────────────────────────────────────────────────────────
export const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(LINKS[0].id);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scrollspy (resalta el item según la sección visible)
  useEffect(() => {
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

    LINKS.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observerRef.current?.observe(section);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const DesktopLinks = useMemo(
    () => (
      <nav className="hidden md:flex items-center gap-6">
        {LINKS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToId(id)}
            className={
              `text-lg tracking-wide font-semibold transition-colors hover:text-white/90 ` +
              (active === id ? "text-white" : "text-white/70")
            }
          >
            {label}
          </button>
        ))}
      </nav>
    ),
    [active]
  );

  const SocialButtons = useMemo(
    () => (
      <div className="hidden md:flex items-center gap-3">
        {SOCIALS.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={label}
            className="p-2 rounded-full ring-1 ring-white/15 hover:ring-white/40 transition-all hover:scale-[1.03]"
          >
            <Icon className="size-5 text-white" />
          </a>
        ))}
      </div>
    ),
    []
  );

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Capa de fondo con blur (sobre imagen hero azul de referencia) */}
      <div className="w-full">
        <div
          className="h-[72px] flex items-center justify-between px-8 
                     bg-blue-900/70 backdrop-blur-md shadow-sm ring-1 ring-white/10"
        >
          {/* Logo */}
          <button onClick={() => scrollToId("inicio")} className="flex items-center gap-3">
            <span className="text-3xl font-extrabold tracking-widest text-white">RCCO</span>
          </button>

          {/* Links escritorio */}
          <div className="flex items-center justify-end gap-6">
            {DesktopLinks}

            {/* Redes escritorio */}
            {SocialButtons}
          </div>

          {/* Botón menú móvil (no hay botón de "agendar") */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      <div
        className={`md:hidden transition-[max-height] duration-300 ease-out overflow-hidden bg-blue-950/90 backdrop-blur-md
                    ${open ? "max-h-96" : "max-h-0"}`}
      >
        <div className="mx-auto max-w-7xl px-6 py-3 space-y-2">
          {LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => {
                scrollToId(id);
                setOpen(false);
              }}
              className={
                `block w-full text-left py-3 text-white/90 font-semibold tracking-wide rounded-xl
                 hover:bg-white/5 transition-colors ` + (active === id ? "text-white" : "")
              }
            >
              {label}
            </button>
          ))}

          <div className="flex items-center gap-3 pt-2">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="p-2 rounded-full ring-1 ring-white/15 hover:ring-white/40 transition-all"
              >
                <Icon className="size-5 text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};