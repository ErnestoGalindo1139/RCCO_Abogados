import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2 } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Post } from '../../data/blogData';
import './EditorialPost.css';

const divisions = [
  {
    title: 'El caso y las precisiones del reglamento',
    marker: 'La semana pasada',
  },
  { title: 'El alcance de la restricción', marker: 'No obstante lo comentado' },
  {
    title: 'La ley y los pagos fraccionados',
    marker: 'Es que cuando nosotros',
  },
  {
    title: 'Conclusiones del análisis',
    marker: 'Mis conclusiones consolidadas',
  },
  {
    title: 'Los criterios del SAT y la confianza legítima',
    marker: 'Entonces ¿',
  },
  { title: 'Prácticas para documentar la operación', marker: 'De ahí que' },
  { title: 'Bibliografía y fuentes de consulta', marker: '## BIBLIOGRAFÍA' },
];

const otherDivisions: Record<string, typeof divisions> = {
  '2': [
    { title: 'Heredar con orden', marker: 'Heredar con orden' },
    { title: 'La importancia de planificar', marker: 'Pero, ¿Cuál' },
    {
      title: 'Instrumentos de planeación sucesoria',
      marker: 'Cada una de estas herramientas',
    },
    {
      title: 'El régimen patrimonial del matrimonio',
      marker: 'Además de las donaciones',
    },
    {
      title: 'El contrato de renta vitalicia',
      marker: 'Una vez definidas las bases',
    },
    {
      title: 'El fideicomiso testamentario',
      marker: 'No obstante, cuando el interés',
    },
    { title: 'El testamento', marker: 'Para quienes buscan' },
    { title: 'Conclusión', marker: 'En conclusión' },
  ],
  '3': [
    { title: 'La sucesión en la empresa familiar', marker: 'Autoría:' },
    {
      title: 'Diagnóstico e institucionalización',
      marker: 'En el caso particular',
    },
    {
      title: 'Preparar la transición y al sucesor',
      marker: 'Una vez identificado',
    },
    { title: 'La estructura societaria', marker: 'Otro aspecto determinante' },
    {
      title: 'El plan ejecutivo de transición',
      marker: 'Con los elementos anteriores',
    },
    {
      title: 'Comunicación e instrumentos legales',
      marker: 'Una vez iniciada',
    },
    { title: 'Conclusión', marker: 'En conclusión' },
  ],
  '4': [
    { title: 'La continuidad del legado', marker: 'Joel Gibrán' },
    {
      title: 'Fideicomiso y estructura societaria',
      marker: 'Cada instrumento jurídico',
    },
    {
      title: 'Gobierno corporativo y protocolos familiares',
      marker: 'Si bien el Gobierno',
    },
    { title: 'Instrumentos para formalizar la sucesión', marker: 'Ahora bien' },
    {
      title: 'El socio capitalista y la transición económica',
      marker: 'Cabe destacar',
    },
    {
      title: 'Conclusión',
      marker: 'La sucesión patrimonial en la empresa familiar requiere',
    },
  ],
};

function organize(content: string, id: string) {
  const blocks = content.trim().split(/\r?\n\s*\r?\n/);
  const lead =
    id === '5' && blocks[0]?.startsWith('## ') ? blocks.shift()!.slice(3) : '';
  const entries = id === '5' ? divisions : otherDivisions[id] || [];
  const sections: { title: string; blocks: string[] }[] = [];
  for (const block of blocks) {
    const division = entries.find((entry) => block.startsWith(entry.marker));
    const heading = block.match(/^## ([^\r\n]+)(?:\r?\n|$)/);
    if (division || heading)
      sections.push({ title: division?.title || heading![1], blocks: [] });
    if (!sections.length) sections.push({ title: 'Introducción', blocks: [] });
    const body = heading ? block.slice(heading[0].length) : block;
    if (body) sections[sections.length - 1].blocks.push(body);
  }
  return { lead, sections };
}

export function EditorialPost({
  post,
  prev,
  next,
}: {
  post: Post;
  prev?: Post;
  next?: Post;
}) {
  const [shareLabel, setShareLabel] = useState('Compartir artículo');
  const { lead, sections } = organize(post.content || '', post.id);
  const author =
    post.content
      ?.match(/Autor(?:ía)?:\s*([^\n]+)/)?.[1]
      ?.trim()
      .replace(/\.$/, '') ||
    (['3', '4'].includes(post.id)
      ? 'Joel Gibrán Osuna Laveaga y Liz Lascarez Calderón'
      : 'RCCO Abogados');
  const share = async () => {
    try {
      if (navigator.share)
        await navigator.share({ title: post.title, url: window.location.href });
      else {
        await navigator.clipboard.writeText(window.location.href);
        setShareLabel('Enlace copiado');
      }
    } catch {
      setShareLabel('No se pudo compartir');
    }
  };

  return (
    <main className="editorial-post">
      <header className="editorial-hero">
        <div className="editorial-container">
          <Link to="/blog" className="editorial-back">
            <ArrowLeft size={16} /> Volver al blog
          </Link>
          <div className="editorial-hero-grid">
            <div>
              <span className="editorial-eyebrow">
                {post.tag || 'Análisis jurídico'}
              </span>
              <h1>{post.title}</h1>
              <div className="editorial-meta">
                <span>
                  <Calendar size={15} />
                  {new Date(`${post.date}T12:00:00`).toLocaleDateString(
                    'es-MX',
                    { day: 'numeric', month: 'long', year: 'numeric' }
                  )}
                </span>
                <span>
                  <Clock size={15} />
                  {post.readTime} de lectura
                </span>
              </div>
            </div>
            <figure className="editorial-cover">
              <img src={post.cover} alt={post.title} />
            </figure>
          </div>
          <div className="editorial-byline">
            <div>
              <span className="editorial-avatar" aria-hidden="true">
                {post.id === '1' ? 'LL' : 'RC'}
              </span>
              <div>
                <strong>{author}</strong>
                <span>RCCO Abogados</span>
              </div>
            </div>
            <button onClick={share}>
              <Share2 size={16} />
              <span aria-live="polite">{shareLabel}</span>
            </button>
          </div>
        </div>
      </header>
      <div className="editorial-container editorial-layout">
        <aside className="editorial-index">
          <nav aria-label="Índice del artículo">
            <p>En este artículo</p>
            {sections.map((section, index) => (
              <a key={section.title} href={`#apartado-${index + 1}`}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>
        <article className="editorial-body">
          {lead && (
            <div className="editorial-lead">
              <span className="editorial-eyebrow">Punto de partida</span>
              <p>{lead}</p>
            </div>
          )}
          {sections.map((section, index) => (
            <section
              id={`apartado-${index + 1}`}
              className={`editorial-section ${/bibliografía|fuentes de consulta/i.test(section.title) ? 'editorial-sources' : ''}`}
              key={section.title}
            >
              <div className="editorial-section-heading">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h2>{section.title}</h2>
              </div>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {section.blocks.join('\n\n')}
              </ReactMarkdown>
            </section>
          ))}
          <nav
            className="editorial-pagination"
            aria-label="Navegación entre artículos"
          >
            {prev ? (
              <Link
                className="editorial-page-button"
                to={`/blog/${prev.slug}`}
                title={prev.title}
                aria-label={`Artículo anterior: ${prev.title}`}
              >
                <span className="editorial-page-direction">
                  <ArrowLeft size={18} /> Anterior
                </span>
                <strong className="editorial-page-title">{prev.title}</strong>
              </Link>
            ) : (
              <button className="editorial-page-button" disabled>
                <ArrowLeft size={18} /> Anterior
              </button>
            )}
            {next ? (
              <Link
                className="editorial-page-button"
                to={`/blog/${next.slug}`}
                title={next.title}
                aria-label={`Artículo siguiente: ${next.title}`}
              >
                <span className="editorial-page-direction">
                  Siguiente <ArrowRight size={18} />
                </span>
                <strong className="editorial-page-title">{next.title}</strong>
              </Link>
            ) : (
              <button className="editorial-page-button" disabled>
                Siguiente <ArrowRight size={18} />
              </button>
            )}
          </nav>
        </article>
      </div>
    </main>
  );
}
