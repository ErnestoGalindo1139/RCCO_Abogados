import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  Coffee,
  Download,
  Gavel,
  MessageCircle,
  QrCode,
  Ticket,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { VerArchivo } from '../components/VerArchivo';
import { LogoCarousel } from '../components/LogoCarousel';
import { CarruselExpositores } from '../components/CarruselExpositores';
import { EventoEnero2 } from '../components/EventoEnero2';
import '../../SimposioPage2.css';

type Documento = { nombre: string; tipo: 'pdf' | 'image'; url: string };
type Ponente = {
  nombre: string;
  cargo: string;
  foto: string;
  tema?: string;
  perfil?: string;
};
type Sesion = {
  hora: string;
  tipo: string;
  titulo: string;
  descripcion: string;
  destacada?: boolean;
};
type Jornada = { nombre: string; sesiones: Sesion[] };

/** Edita aquí los datos confirmados por RCCO. No se usan fechas, cifras o precios ficticios. */
export const SIMPOSIO: {
  edicion: string;
  fecha: string;
  ciudad: string;
  sede: string;
  registroUrl: string | null;
  whatsapp: string;
  precio: number | null;
  precioNota: string;
  resultados: { valor: string; titulo: string; descripcion: string }[];
  ponentes: Ponente[];
  programaConfirmado: boolean;
  jornadas: Jornada[];
} = {
  edicion: '2.ª edición',
  fecha: '22 y 23 de enero de 2027',
  ciudad: 'Mazatlán, Sinaloa',
  sede: 'Hotel Fiesta Inn de Plaza Isla Tres, Mazatlán, Sinaloa',
  registroUrl: null, // Añade la ruta o URL real del registro cuando esté disponible.
  whatsapp: '526692291634',
  precio: null, // MXN. La información existente se consulta con VerArchivo.
  precioNota:
    'Consulta la inversión y los beneficios en la información del evento.',
  resultados: [
    {
      valor: 'Comunidad',
      titulo: 'Encuentro profesional',
      descripcion:
        'Un espacio para compartir perspectivas en materia de prevención de lavado de dinero.',
    },
    {
      valor: 'Experiencia',
      titulo: 'Conocimiento especializado',
      descripcion:
        'Diálogo entre profesionales del derecho, cumplimiento y sector empresarial.',
    },
    {
      valor: 'Conexiones',
      titulo: 'Vinculación profesional',
      descripcion:
        'Un punto de encuentro para fortalecer relaciones y compartir experiencias.',
    },
    {
      valor: '2.ª edición',
      titulo: 'El siguiente capítulo',
      descripcion:
        'Continuamos construyendo este encuentro de la mano de RCCO Abogados.',
    },
  ],
  // Si está vacío se conserva CarruselExpositores, con los datos de tu proyecto.
  // Añade los ponentes confirmados aquí para usar las cuatro cards del diseño Stitch.
  ponentes: [],
  programaConfirmado: true,
  // Estructura de referencia; sustituye por el programa autorizado antes de publicarlo.
  jornadas: [
    {
      nombre: 'Día 1',
      sesiones: [
        {
          hora: 'Por confirmar',
          tipo: 'Acreditación',
          titulo: 'Registro y bienvenida',
          descripcion: 'Recepción de participantes e inicio del encuentro.',
        },
        {
          hora: 'Por confirmar',
          tipo: 'Magistral',
          titulo: 'Conferencia de apertura',
          descripcion: 'Tema y ponente por anunciar.',
          destacada: true,
        },
        {
          hora: 'Por confirmar',
          tipo: 'Panel',
          titulo: 'Diálogo entre especialistas',
          descripcion: 'Participantes y temas por anunciar.',
        },
        {
          hora: 'Por confirmar',
          tipo: 'Networking',
          titulo: 'Espacio de vinculación profesional',
          descripcion: 'Un momento para conectar con otros asistentes.',
        },
        {
          hora: 'Por confirmar',
          tipo: 'Sesión académica',
          titulo: 'Análisis y experiencias de cumplimiento',
          descripcion: 'Contenido académico por anunciar.',
        },
        {
          hora: 'Por confirmar',
          tipo: 'Cierre',
          titulo: 'Conclusiones de la jornada',
          descripcion: 'Horario y dinámica por anunciar.',
        },
      ],
    },
    {
      nombre: 'Día 2',
      sesiones: [
        {
          hora: 'Por confirmar',
          tipo: 'Bienvenida',
          titulo: 'Inicio de la siguiente jornada',
          descripcion: 'Horario y dinámica por anunciar.',
        },
        {
          hora: 'Por confirmar',
          tipo: 'Magistral',
          titulo: 'Conferencia especializada',
          descripcion: 'Tema y ponente por anunciar.',
          destacada: true,
        },
        {
          hora: 'Por confirmar',
          tipo: 'Panel',
          titulo: 'Perspectivas y retos profesionales',
          descripcion: 'Participantes y temas por anunciar.',
        },
        {
          hora: 'Por confirmar',
          tipo: 'Clausura',
          titulo: 'Conclusiones y cierre del Simposio',
          descripcion: 'Horario y dinámica por anunciar.',
        },
      ],
    },
  ],
};

const patrocinadores = [
  'img/patrocinadores/ANMX.png',
  'img/patrocinadores/DIAZ SALAZAR Y ASOCIADOS.png',
  'img/patrocinadores/LF DESPACHO.png',
  'img/patrocinadores/P&C.png',
  'img/patrocinadores/RCCO NEGOCIOS.png',
  'img/patrocinadores/SOMOFA.png',
  'img/patrocinadores/grupoAHRE.png',
  'img/patrocinadores/ESlogo.png',
  'img/patrocinadores/Le logo.png',
];

// Imágenes ilustrativas incluidas en el export de Stitch. Reemplazar por fotografías reales.
const galeria = [
  {
    foto: 'img1',
    etiqueta: 'El encuentro',
    texto: 'Un espacio para compartir conocimiento',
  },
  {
    foto: 'img2',
    etiqueta: 'Networking',
    texto: 'Conexiones que trascienden el evento',
  },
  {
    foto: 'img3',
    etiqueta: 'Perspectiva práctica',
    texto: 'Aprendizaje e intercambio profesional',
  },
];
const pilares: {
  icon: LucideIcon;
  titulo: string;
  texto: string;
  pie: string;
}[] = [
  {
    icon: Gavel,
    titulo: 'Actualización normativa',
    texto:
      'Amplía tu perspectiva sobre los retos jurídicos y regulatorios en materia de prevención de lavado de dinero.',
    pie: 'Perspectiva jurídica',
  },
  {
    icon: Users,
    titulo: 'Networking de alto nivel',
    texto:
      'Conecta con profesionales del derecho, cumplimiento y sector empresarial en un entorno de diálogo e intercambio.',
    pie: 'Comunidad profesional',
  },
  {
    icon: ClipboardList,
    titulo: 'Enfoque práctico',
    texto:
      'Comparte experiencias y conoce perspectivas que contribuyan al fortalecimiento de los procesos de tu organización.',
    pie: 'Conocimiento aplicable',
  },
  {
    icon: Award,
    titulo: 'Materiales y participación',
    texto:
      'Consulta el brochure oficial para conocer los materiales, documentos y beneficios de participación de esta edición.',
    pie: 'Información oficial',
  },
];
const incluye: { icon: LucideIcon; titulo: string; texto: string }[] = [
  {
    icon: Gavel,
    titulo: 'Conferencias',
    texto: 'Consulta las sesiones del programa oficial.',
  },
  {
    icon: ClipboardList,
    titulo: 'Contenido académico',
    texto: 'Temas y actividades de esta edición.',
  },
  {
    icon: Coffee,
    titulo: 'Espacios de encuentro',
    texto: 'Consulta los servicios y actividades incluidos.',
  },
  {
    icon: BookOpen,
    titulo: 'Materiales digitales',
    texto: 'Información sobre documentos del evento.',
  },
  {
    icon: Award,
    titulo: 'Constancia',
    texto: 'Consulta los requisitos de expedición.',
  },
  {
    icon: Users,
    titulo: 'Networking',
    texto: 'Vinculación con otros profesionales.',
  },
  {
    icon: QrCode,
    titulo: 'Acceso al evento',
    texto: 'Información para tu acreditación.',
  },
  {
    icon: Ticket,
    titulo: 'Pase oficial',
    texto: 'Inversión y beneficios del acceso.',
  },
];
const pasos = [
  {
    titulo: 'Registro',
    texto: 'Consulta el proceso y proporciona los datos solicitados.',
  },
  {
    titulo: 'Confirmación y QR',
    texto:
      'Confirma tu participación y consulta las indicaciones para tu acceso.',
  },
  {
    titulo: 'Documentos',
    texto: 'Revisa los materiales habilitados para descarga desde la página.',
  },
  {
    titulo: 'Acreditación',
    texto:
      'Presenta tu acceso al llegar y sigue las indicaciones para tu credencial.',
  },
  {
    titulo: 'Encuesta y constancia',
    texto: 'Consulta los pasos y requisitos para completar tu participación.',
  },
];
const preguntas = [
  {
    pregunta: '¿Cómo puedo registrarme al Simposio?',
    respuesta:
      'Consulta el proceso de registro disponible en esta sección. Para recibir asistencia o confirmar tu inscripción, contacta al equipo de RCCO por WhatsApp.',
  },
  {
    pregunta: '¿Cuál es la inversión y qué incluye mi acceso?',
    respuesta:
      'La información de inversión y beneficios se encuentra en el documento de acceso. Puedes abrirlo en esta página o solicitar información al equipo organizador.',
  },
  {
    pregunta: '¿Cuándo y dónde se realizará?',
    respuesta:
      'El Simposio se realizará el 22 y 23 de enero de 2027 en el Hotel Fiesta Inn de Plaza Isla Tres, Mazatlán, Sinaloa.',
  },
  {
    pregunta: '¿Cómo obtengo mi acceso y código QR?',
    respuesta:
      'El equipo organizador te compartirá las indicaciones correspondientes una vez confirmada tu participación. Si necesitas ayuda, utiliza la atención por WhatsApp.',
  },
  {
    pregunta: '¿Puedo registrar a varios integrantes de mi empresa?',
    respuesta:
      'Sí puedes solicitar información para un registro grupal. El equipo de RCCO te orientará sobre el proceso y las condiciones aplicables.',
  },
  {
    pregunta: '¿Cómo consulto los materiales y mi constancia?',
    respuesta:
      'Consulta con el equipo organizador la disponibilidad de documentos y los requisitos para obtener tu constancia de participación.',
  },
];

const asset = (name: string) => `/img/simposio/${name}.webp`;
const mensaje = encodeURIComponent(
  'Hola, me gustaría recibir información sobre la segunda edición del Simposio Anual Corporativo sobre Prevención de Lavado de Dinero.'
);
const whatsappUrl = `https://wa.me/${SIMPOSIO.whatsapp}?text=${mensaje}`;

function Encabezado({
  etiqueta,
  titulo,
  texto,
  centrado = false,
}: {
  etiqueta: string;
  titulo: string;
  texto?: string;
  centrado?: boolean;
}) {
  return (
    <div className={`sp-heading${centrado ? ' sp-heading--center' : ''}`}>
      <p className="sp-eyebrow">{etiqueta}</p>
      <h2>{titulo}</h2>
      {texto && <p className="sp-description">{texto}</p>}
    </div>
  );
}

export const SimposioPage2 = (): React.JSX.Element => {
  const location = useLocation();
  const root = useRef<HTMLDivElement>(null);
  const [archivoSeleccionado, setArchivoSeleccionado] =
    useState<Documento | null>(null);
  const [dia, setDia] = useState(0);
  const [faq, setFaq] = useState<number | null>(null);
  const [fotoAbierta, setFotoAbierta] = useState<number | null>(null);
  const fotoAnterior = useRef<HTMLElement | null>(null);
  const cerrarFoto = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const page = root.current;
    const header = document.querySelector<HTMLElement>('header.fixed');
    if (!page) return;

    const updateHeroSpace = (): void => {
      const headerHeight = header?.getBoundingClientRect().height ?? 0;
      page.style.setProperty('--sp-header-height', `${headerHeight}px`);
    };

    updateHeroSpace();
    const resizeObserver = new ResizeObserver(updateHeroSpace);
    if (header) resizeObserver.observe(header);
    window.addEventListener('resize', updateHeroSpace);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeroSpace);
    };
  }, []);

  const abrirDocumento = (tipo: 'brochure' | 'registro' | 'precio') => {
    const mobile =
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 767px)').matches;
    const documentos: Record<typeof tipo, Documento> = {
      brochure: {
        nombre: 'Brochure Oficial del Simposio',
        tipo: 'pdf',
        url: '/BROCHURE_SIMPOSIO.pdf',
      },
      registro: {
        nombre: 'Proceso de Registro',
        tipo: 'image',
        url: '/img/proceso_registro_mobile.jpg',
      },
      precio: {
        nombre: 'Inversión y Beneficios de Acceso',
        tipo: 'image',
        url: mobile
          ? '/img/precio_pase_web_mobile.jpg'
          : '/img/precio_pase_web_desktop.jpg',
      },
    };
    setArchivoSeleccionado(documentos[tipo]);
  };

  // No se modifican los hashes: el sitio utiliza React Router con rutas #/simposio.
  const irA = (id: string) => {
    const element = root.current?.querySelector<HTMLElement>(`[id="${id}"]`);
    element?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
    const section = new URLSearchParams(location.search).get('section');
    if (!section) return;
    const timer = window.setTimeout(() => {
      // Buscar por id evita interpolar parámetros externos en un selector CSS.
      const element = Array.from(
        root.current?.querySelectorAll<HTMLElement>('[id]') ?? []
      ).find((el) => el.id === section);
      element?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
        block: 'start',
      });
    }, 350);
    return () => window.clearTimeout(timer);
  }, [location.search, location.pathname]);

  useEffect(() => {
    const elements =
      root.current?.querySelectorAll<HTMLElement>('[data-sp-reveal]');
    if (
      !elements ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sp-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 }
    );
    elements.forEach((el) => {
      el.classList.add('sp-reveal');
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const lightboxOpen = fotoAbierta !== null;
  useEffect(() => {
    if (!lightboxOpen) return;
    fotoAnterior.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    cerrarFoto.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFotoAbierta(null);
      if (event.key === 'Tab') {
        event.preventDefault();
        cerrarFoto.current?.focus();
      }
      if (event.key === 'ArrowRight')
        setFotoAbierta((index) =>
          index === null ? null : (index + 1) % galeria.length
        );
      if (event.key === 'ArrowLeft')
        setFotoAbierta((index) =>
          index === null ? null : (index + galeria.length - 1) % galeria.length
        );
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      fotoAnterior.current?.focus();
    };
  }, [lightboxOpen]);

  return (
    <div ref={root} className="rcco-simposio">
      <div className="sp-intro">
        <LogoCarousel
          className="sp-intro-sponsors"
          title="logos.tituloPatrocinadores"
          logos={[...patrocinadores, ...patrocinadores]}
        />
        {/* El header y footer pertenecen al layout existente del sitio. */}
        <section
          className="sp-hero"
          id="inicio"
          aria-labelledby="simposio-titulo"
        >
          <h1 id="simposio-titulo" className="sp-visually-hidden">
            2.º Simposio Anual Corporativo sobre Prevención de Lavado de Dinero
          </h1>
          <picture className="sp-hero-picture">
            <source
              media="(max-width: 767px)"
              srcSet="/img/simposio/simposio_banner_movil.jpeg"
            />
            <source
              media="(max-width: 1100px) and (orientation: portrait)"
              srcSet="/img/simposio/simposio_banner_tablet_vertical.png"
            />
            <source
              media="(max-width: 1100px)"
              srcSet="/img/simposio/simposio_banner_tablet.jpeg"
            />
            <source
              media="(min-width: 1101px) and (max-height: 800px)"
              srcSet="/img/simposio/simposio_banner_desktop_ultrawide.png"
            />
            <source
              media="(min-width: 1101px) and (min-height: 801px)"
              srcSet="/img/simposio/simposio_banner_desktop_ultrawide.png"
            />
            <img
              className="sp-hero-banner"
              src="/img/simposio/simposio_banner_laptop.png"
              alt=""
              fetchPriority="high"
            />
          </picture>
          <div className="sp-hero-actions">
            <div className="sp-actions sp-actions--center">
              <button
                className="sp-button sp-button--gold"
                onClick={() => irA('inversion')}
              >
                Reservar mi lugar <ArrowRight size={18} />
              </button>
              <button
                className="sp-button sp-button--outline"
                onClick={() => irA('programa')}
              >
                <CalendarDays size={18} /> Ver programa
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* <section className="sp-section sp-section--raised" id="resultados">
        <div className="sp-container" data-sp-reveal>
          <Encabezado
            etiqueta="Impacto e historial"
            titulo="Resultados de nuestra primera edición"
            texto="Una comunidad que sigue creciendo con conocimiento, experiencia y nuevas perspectivas."
          />
          <div className="sp-stats">
            {SIMPOSIO.resultados.map((item) => (
              <article className="sp-stat" key={item.titulo}>
                <div className="sp-stat-value">{item.valor}</div>
                <h3>{item.titulo}</h3>
                <p>{item.descripcion}</p>
              </article>
            ))}
          </div>
        </div>
      </section> */}

      <section className="sp-section" id="galeria">
        <div className="sp-container" data-sp-reveal>
          <div className="sp-gallery-heading">
            <Encabezado
              etiqueta="Memorias visuales"
              titulo="Así se vivió nuestra primera edición"
              texto="Un encuentro para aprender, conectar y compartir experiencias."
            />
            <span className="sp-place">{SIMPOSIO.ciudad}</span>
          </div>
          <div className="sp-gallery">
            {galeria.map((item, index) => (
              <button
                className={`sp-gallery-item sp-gallery-item--${index + 1}`}
                key={item.foto}
                onClick={() => setFotoAbierta(index)}
                aria-label={`Ampliar imagen: ${item.texto}`}
              >
                <img
                  src={asset(item.foto)}
                  alt={item.texto}
                  loading="lazy"
                  width="1024"
                  height="768"
                />
                <span className="sp-gallery-caption">
                  <span className="sp-eyebrow">{item.etiqueta}</span>
                  <strong>{item.texto}</strong>
                </span>
              </button>
            ))}
          </div>
          {/* <p className="sp-small-note">
            Imágenes ilustrativas de la propuesta visual. La galería oficial se
            publicará próximamente.
          </p> */}
        </div>
      </section>

      <section className="sp-section sp-section--light" id="beneficios">
        <div className="sp-container" data-sp-reveal>
          <Encabezado
            etiqueta=""
            titulo="¿Por qué asistir?"
            texto="Una experiencia diseñada para actualizarte, conectar y fortalecer tu práctica profesional frente a la evolución regulatoria."
          />
          <div className="sp-pillars">
            {pilares.map(({ icon: Icon, titulo, texto, pie }) => (
              <article className="sp-pillar" key={titulo}>
                <div className="sp-icon-box">
                  <Icon size={24} />
                </div>
                <h3>{titulo}</h3>
                <p>{texto}</p>
                <div className="sp-pillar-foot">
                  {pie}
                  <ArrowRight size={14} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-section sp-section--raised" id="ponentes">
        <div className="sp-container" data-sp-reveal>
          {SIMPOSIO.ponentes.length > 0 ? (
            <div className="sp-speakers">
              {SIMPOSIO.ponentes.map((ponente) => (
                <article className="sp-speaker" key={ponente.nombre}>
                  <div className="sp-speaker-photo">
                    <img
                      src={ponente.foto}
                      alt={ponente.nombre}
                      loading="lazy"
                      width="400"
                      height="480"
                    />
                  </div>
                  <div className="sp-speaker-content">
                    <p className="sp-eyebrow">{ponente.cargo}</p>
                    <h3>{ponente.nombre}</h3>
                    {ponente.tema && <p>{ponente.tema}</p>}
                    {ponente.perfil && (
                      <a
                        className="sp-text-link"
                        href={ponente.perfil}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver perfil <ArrowRight size={14} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="sp-existing-speakers">
              <CarruselExpositores />
            </div>
          )}
          <div className="sp-section-bottom">
            <button className="sp-text-link" onClick={() => irA('programa')}>
              Conoce el programa y sus sesiones <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      <section className="sp-section" id="programa">
        <div className="sp-container sp-container--narrow" data-sp-reveal>
          <Encabezado
            etiqueta="Itinerario académico"
            titulo="Programa del evento"
            texto="Conferencias, perspectivas y espacios de vinculación para enriquecer tu experiencia."
            centrado
          />
          {!SIMPOSIO.programaConfirmado && (
            <p className="sp-program-note">
              Programa por confirmar. Las jornadas y sesiones muestran la
              estructura prevista.
            </p>
          )}
          {SIMPOSIO.jornadas.length > 0 ? (
            <>
              <div
                className="sp-tabs"
                role="tablist"
                aria-label="Jornadas del Simposio"
              >
                {SIMPOSIO.jornadas.map((jornada, index) => (
                  <button
                    key={jornada.nombre}
                    role="tab"
                    id={`sp-tab-${index}`}
                    aria-selected={dia === index}
                    aria-controls={`sp-panel-${index}`}
                    tabIndex={dia === index ? 0 : -1}
                    onClick={() => setDia(index)}
                    onKeyDown={(event) => {
                      let next = index;
                      if (event.key === 'ArrowRight')
                        next = (index + 1) % SIMPOSIO.jornadas.length;
                      else if (event.key === 'ArrowLeft')
                        next =
                          (index + SIMPOSIO.jornadas.length - 1) %
                          SIMPOSIO.jornadas.length;
                      else if (event.key === 'Home') next = 0;
                      else if (event.key === 'End')
                        next = SIMPOSIO.jornadas.length - 1;
                      else return;
                      event.preventDefault();
                      setDia(next);
                      document.getElementById(`sp-tab-${next}`)?.focus();
                    }}
                  >
                    {jornada.nombre}
                  </button>
                ))}
              </div>
              {SIMPOSIO.jornadas.map((jornada, index) => (
                <div
                  key={jornada.nombre}
                  role="tabpanel"
                  id={`sp-panel-${index}`}
                  aria-labelledby={`sp-tab-${index}`}
                  hidden={dia !== index}
                  tabIndex={0}
                >
                  <div className="sp-timeline">
                    {jornada.sesiones.map((sesion, sessionIndex) => (
                      <article
                        className={`sp-session${sesion.destacada ? ' sp-session--featured' : ''}`}
                        key={`${sesion.titulo}-${sessionIndex}`}
                      >
                        <div className="sp-session-meta">
                          <span>{sesion.hora}</span>
                          <span className="sp-tag">{sesion.tipo}</span>
                        </div>
                        <h3>{sesion.titulo}</h3>
                        <p>{sesion.descripcion}</p>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="sp-program-note">
              El programa se anunciará próximamente.
            </p>
          )}
          <div className="sp-section-bottom">
            <button
              className="sp-text-link"
              onClick={() => abrirDocumento('brochure')}
            >
              <Download size={15} /> Consultar información del evento
            </button>
          </div>
        </div>
      </section>

      <section className="sp-section sp-section--raised" id="acceso">
        <div className="sp-container" data-sp-reveal>
          <Encabezado
            etiqueta="Participación y beneficios"
            titulo="Tu acceso incluye"
            texto="Consulta los beneficios y condiciones de tu pase en la información oficial del evento."
            centrado
          />
          <div className="sp-includes">
            {incluye.map(({ icon: Icon, titulo, texto }) => (
              <article className="sp-include" key={titulo}>
                <Icon size={23} />
                <div>
                  <h3>{titulo}</h3>
                  <p>{texto}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="sp-section-bottom">
            <button
              className="sp-text-link"
              onClick={() => abrirDocumento('precio')}
            >
              Ver inversión y beneficios oficiales <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* <EventoEnero2 /> */}

      {/* <section className="sp-section sp-section--raised" id="experiencia">
        <div className="sp-container" data-sp-reveal>
          <Encabezado
            etiqueta="Tu participación, paso a paso"
            titulo="Una experiencia ágil y digital"
            texto="Conoce las etapas de tu participación y consulta las instrucciones del equipo organizador."
            centrado
          />
          <ol className="sp-steps">
            {pasos.map((paso, index) => (
              <li className="sp-step" key={paso.titulo}>
                <span className="sp-step-number">{index + 1}</span>
                <h3>{paso.titulo}</h3>
                <p>{paso.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section> */}

      <section className="sp-section" id="faq">
        <div className="sp-container sp-container--narrow" data-sp-reveal>
          <Encabezado
            etiqueta="Preguntas frecuentes"
            titulo="Resolvemos tus dudas"
            texto="Información para tu asistencia, registro y participación."
            centrado
          />
          <div className="sp-faq">
            {preguntas.map((item, index) => (
              <div
                className={`sp-faq-item${faq === index ? ' sp-faq-item--open' : ''}`}
                key={item.pregunta}
              >
                <h3>
                  <button
                    id={`sp-faq-button-${index}`}
                    aria-expanded={faq === index}
                    aria-controls={`sp-faq-answer-${index}`}
                    onClick={() => setFaq(faq === index ? null : index)}
                  >
                    {item.pregunta}
                    <ChevronDown size={18} />
                  </button>
                </h3>
                <div
                  id={`sp-faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`sp-faq-button-${index}`}
                  hidden={faq !== index}
                >
                  <p>{item.respuesta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="sp-section sp-closing" id="contacto">
        <img
          className="sp-closing-photo"
          src={asset('cierre')}
          alt=""
          loading="lazy"
        />
        <div
          className="sp-container sp-container--narrow sp-closing-content"
          data-sp-reveal
        >
          <Encabezado
            etiqueta="Segunda edición · RCCO Abogados"
            titulo="Sé parte de la segunda edición"
            centrado
          />
          <blockquote>
            <p>
              Actualízate, conecta y forma parte de un encuentro que impulsa el
              conocimiento, el cumplimiento y la integridad empresarial.
            </p>
            <cite>Simposio Anual Corporativo · RCCO Abogados</cite>
          </blockquote>
          <div className="sp-actions sp-actions--center">
            <button
              className="sp-button sp-button--gold"
              onClick={() => irA('inversion')}
            >
              Reservar mi lugar <ArrowRight size={17} />
            </button>
            <a
              className="sp-button sp-button--outline"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={17} /> Solicitar información
            </a>
          </div>
        </div>
      </section> */}

      {archivoSeleccionado && (
        <VerArchivo
          modo="modal"
          url={archivoSeleccionado.url}
          tipo={archivoSeleccionado.tipo}
          isOpen={true}
          onClose={() => setArchivoSeleccionado(null)}
        />
      )}
      {fotoAbierta !== null && (
        <div
          className="sp-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Imagen de la galería"
          onClick={() => setFotoAbierta(null)}
        >
          <button
            ref={cerrarFoto}
            className="sp-lightbox-close"
            aria-label="Cerrar imagen"
            onClick={() => setFotoAbierta(null)}
          >
            ×
          </button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img
              src={asset(galeria[fotoAbierta].foto)}
              alt={galeria[fotoAbierta].texto}
            />
            <figcaption>{galeria[fotoAbierta].texto}</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
};
