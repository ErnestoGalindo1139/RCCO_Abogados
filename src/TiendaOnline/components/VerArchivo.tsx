import React, { useEffect, useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { ModalBase } from './ModalBase';

interface VerArchivoProps {
  url: string; // puede ser una URL local (createObjectURL) o remota
  tipo?: string;
  nombre?: string;
  isOpen?: boolean;
  onClose?: () => void;
  modo?: 'inline' | 'modal';
}

export const VerArchivo: React.FC<VerArchivoProps> = ({
  url,
  tipo,
  nombre,
  isOpen = false,
  onClose,
  modo = 'inline',
}) => {
  const [xmlContent, setXmlContent] = useState<string | null>(null);

  // Si es XML, leer su contenido como texto
  useEffect(() => {
    if (
      modo === 'modal' &&
      url &&
      (tipo?.includes('xml') || nombre?.endsWith('.xml'))
    ) {
      fetch(url)
        .then((res) => res.text())
        .then((text) => {
          // formatear XML con indentación
          const formatted = new XMLSerializer().serializeToString(
            new DOMParser().parseFromString(text, 'application/xml')
          );
          setXmlContent(formatted);
        })
        .catch(() => setXmlContent('⚠️ No se pudo cargar el XML.'));
    }
  }, [url, tipo, nombre, modo]);

  const extension = nombre?.split('.').pop()?.toLowerCase();
  const isPDF = tipo?.includes('pdf') || extension === 'pdf';
  const isImage =
    tipo?.includes('image') ||
    ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '');
  const isXML = tipo?.includes('xml') || extension === 'xml';

  let content: React.ReactNode;

  if (isImage) {
    content = (
      <img
        src={url}
        alt={nombre || 'Archivo'}
        className="max-h-[70vh] rounded-lg shadow-md mx-auto"
      />
    );
  } else if (isPDF) {
    content = (
      <iframe
        src={url}
        className="w-full h-[70vh] rounded-lg border border-[var(--color-border)]"
      />
    );
  } else if (isXML) {
    content = (
      <pre
        className="bg-[var(--color-bg)] text-[var(--color-text)] text-sm p-3 rounded-lg
                   border border-[var(--color-border)] overflow-auto max-h-[70vh] whitespace-pre-wrap"
      >
        {xmlContent || 'Cargando XML...'}
      </pre>
    );
  } else {
    content = (
      <div className="flex flex-col items-center justify-center p-6 text-[var(--color-muted)]">
        <FileText size={40} />
        <p className="mt-2 text-sm">Vista previa no disponible</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center gap-1 text-[var(--color-primary)] underline text-sm"
        >
          <Download size={14} /> Descargar archivo
        </a>
      </div>
    );
  }

  if (modo === 'modal') {
    return (
      <ModalBase
        isOpen={isOpen || false}
        onClose={onClose || (() => {})}
        title={`${extension?.toUpperCase() || 'Archivo'} - ${nombre || ''}`}
        maxWidth="xl"
      >
        {content}
      </ModalBase>
    );
  }

  return <>{content}</>;
};
