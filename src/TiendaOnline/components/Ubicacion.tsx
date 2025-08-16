// components/LocationSection.tsx
import React, { useMemo, useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  ExternalLink,
  Copy,
} from 'lucide-react';

type Props = {
  title?: string;
  address: string;
  lat: number;
  lng: number;
  zoom?: number;
  phone?: string;
  hours?: string;
  className?: string;
};

export const UbicacionComponent: React.FC<Props> = ({
  title = 'Nuestra ubicación',
  address,
  lat,
  lng,
  zoom = 16,
  phone,
  hours,
  className = '',
}) => {
  const [interactive, setInteractive] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const mapSrc = useMemo(
    () => `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`,
    [lat, lng, zoom]
  );

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const mapsPlaceUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      id="ubicacion"
      className={`scroll-mt-28 py-16 sm:py-[8rem] bg-neutral-50 ${className}`}
    >
      <div className="mx-auto max-w-[64%] px-4 sm:px-6">
        <header className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">
            {title}
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Encuéntranos fácilmente y obtén indicaciones en un click.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[420px,1fr]">
          {/* Tarjeta */}
          <article>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-7 shadow-sm">
              <div className="space-y-6">
                {/* Dirección */}
                <div className="flex items-start gap-3">
                  <div className="grid size-10 place-items-center rounded-full border border-neutral-200">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900">Dirección</h3>
                    <p className="text-sm text-neutral-600">{address}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <a
                        className="inline-flex items-center gap-1 text-sm text-blue-700 hover:underline underline-offset-4"
                        href={mapsPlaceUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Ver en Google Maps <ExternalLink className="size-3.5" />
                      </a>
                      <button
                        onClick={copyAddress}
                        className="inline-flex items-center gap-1 rounded-md border border-neutral-200 px-2 py-1 text-xs hover:bg-neutral-50"
                        aria-label="Copiar dirección"
                      >
                        <Copy className="size-3.5" /> Copiar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Teléfono */}
                {phone && (
                  <div className="flex items-start gap-3">
                    <div className="grid size-10 place-items-center rounded-full border border-neutral-200">
                      <Phone className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-900">Teléfono</h3>
                      <a
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="text-sm text-neutral-600 hover:underline underline-offset-4"
                      >
                        {phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Horario */}
                {hours && (
                  <div className="flex items-start gap-3">
                    <div className="grid size-10 place-items-center rounded-full border border-neutral-200">
                      <Clock className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-900">Horario</h3>
                      <p className="text-sm text-neutral-600">{hours}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Acciones */}
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-blue-600/20 bg-blue-600/10 px-4 py-2 text-sm font-medium hover:bg-blue-600/15"
                >
                  <Navigation className="size-4" />
                  Cómo llegar
                </a>
                <a
                  href={mapsPlaceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm hover:bg-neutral-50"
                >
                  Abrir en Maps
                </a>
              </div>
            </div>
          </article>

          {/* Mapa */}
          <article>
            <div className="relative h-[380px] sm:h-[440px] lg:h-[480px] rounded-2xl overflow-hidden border border-neutral-200 shadow-sm">
              {/* Skeleton */}
              {!loaded && (
                <div className="absolute inset-0 animate-pulse bg-neutral-200" />
              )}

              {/* Botón/Hint abajo-izquierda para no chocar con el panel de Google */}
              <div className="absolute left-3 bottom-3 z-10">
                <button
                  type="button"
                  onClick={() => setInteractive(true)}
                  className={`rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs shadow hover:bg-neutral-50 transition ${
                    interactive ? 'hidden' : 'inline-flex'
                  }`}
                >
                  Activar mapa
                </button>
                {interactive && (
                  <span className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[11px] shadow">
                    En móvil: usa dos dedos para mover el mapa
                  </span>
                )}
              </div>

              <iframe
                title="Mapa de ubicación"
                aria-label="Mapa de Google con la ubicación del negocio"
                className={`absolute inset-0 h-full w-full ${
                  interactive ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
                loading="lazy"
                src={mapSrc}
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setLoaded(true)}
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
