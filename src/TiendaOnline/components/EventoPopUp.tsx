import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EventoPopup = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="evento-overlay">
      <div className="evento-card animate-popup-zoom">
        <div className="evento-header">
          <div className="evento-icon">
            <img
              className="w-[2rem]"
              src="/img/1ER_SIMPOSIO_LOGO_ICONO_01.png"
              alt=""
            />
          </div>
          <span>1er Simposio Anual Corporativo</span>
        </div>

        <h2 className="evento-title">
          Prevención de Lavado de Dinero en Sinaloa
        </h2>

        <p className="evento-text">
          Análisis especializado sobre la Reforma Estructural a la Ley
          Antilavado (LFPIORPI 2024–2025). Evento dirigido a líderes
          empresariales, notarios, contadores y profesionales de actividades
          vulnerables.
        </p>

        <p className="evento-subinfo">
          <strong>23 y 24 de enero · Fiesta Inn Isla Tres, Mazatlán</strong>
        </p>

        <div className="evento-deco"></div>

        <div className="evento-buttons">
          <button
            className="btn-primary-strong"
            onClick={() => {
              navigate('/simposio'); // ⬅️ Aquí navegamos
              setOpen(false);
            }}
          >
            Ir al Simposio
          </button>

          <button className="btn-secondary-soft" onClick={() => setOpen(false)}>
            Cerrar
          </button>
        </div>
      </div>

      <style>{`
        /* OVERLAY */
        .evento-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 18, 40, 0.70);
          backdrop-filter: blur(10px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        /* CARD */
        .evento-card {
          width: 92%;
          max-width: 520px;
          background: #ffffff;
          border-radius: 24px;
          padding: 42px 38px;
          text-align: center;
          position: relative;
          box-shadow: 0 25px 55px rgba(0,0,0,0.35);
          border: 1px solid rgba(0, 38, 77, 0.12);
          animation: card-float 6s ease-in-out infinite;
        }

        /* HEADER */
        .evento-header {
          background: linear-gradient(90deg, #05204A, #0A387C);
          padding: 12px 20px;
          border-radius: 50px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: white;
          font-weight: 600;
          margin-bottom: 22px;
          letter-spacing: 0.3px;
          box-shadow: 0 4px 12px rgba(0, 102, 204, 0.4);
        }

        .evento-icon {
          font-size: 18px;
        }

        /* TITLE */
        .evento-title {
          font-size: 24px;
          font-weight: 800;
          color: #04163B;
          margin-bottom: 12px;
          line-height: 1.25;
        }

        .evento-subinfo {
          color: #0a387c;
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 25px;
        }

        /* TEXT */
        .evento-text {
          font-size: 15px;
          color: #444;
          margin-bottom: 10px;
          line-height: 1.45;
        }

        /* DECORATIVE LINE */
        .evento-deco {
          width: 90px;
          height: 4px;
          margin: 0 auto 32px auto;
          border-radius: 6px;
          background: linear-gradient(90deg, #0A387C, #1A5CDA);
          animation: linePulse 1.2s infinite alternate ease-in-out;
        }

        @keyframes linePulse {
          0% { transform: scaleX(0.6); opacity: 0.6; }
          100% { transform: scaleX(1); opacity: 1; }
        }

        /* BUTTONS */
        .evento-buttons {
          display: flex;
          justify-content: center;
          gap: 18px;
        }

        .btn-primary-strong {
          background: linear-gradient(90deg, #0A387C, #144EA4);
          color: white;
          padding: 12px 26px;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 6px 16px rgba(0,0,0,0.25);
          transition: 0.25s ease;
        }
        .btn-primary-strong:hover {
          background: linear-gradient(90deg, #144EA4, #1A5CDA);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }

        .btn-secondary-soft {
          background: #e6e6e6;
          color: #444;
          padding: 12px 26px;
          border-radius: 10px;
          font-size: 15px;
          cursor: pointer;
          border: none;
          transition: 0.25s ease;
        }
        .btn-secondary-soft:hover {
          background: #d0d0d0;
        }

        /* POPUP ANIMATION */
        @keyframes popupZoom {
          0% {
            opacity: 0;
            transform: scale(0.7) translateY(20px);
          }
          60% {
            opacity: 1;
            transform: scale(1.05) translateY(0px);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-popup-zoom {
          animation: popupZoom 0.35s ease forwards;
        }

        /* FLOAT */
        @keyframes card-float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
};
