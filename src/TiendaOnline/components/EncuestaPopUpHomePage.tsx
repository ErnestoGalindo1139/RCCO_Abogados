import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EncuestaPopUpHomePage = () => {
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
        {/* HEADER */}
        <div className="evento-header cafe">
          <div className="evento-icon">☕</div>
          <span>Simposio 2026</span>
        </div>

        {/* TITLE */}
        <h2 className="evento-title">
          ¿Asististe a nuestro <span className="highlight">Simposio</span>?
        </h2>

        {/* TEXT */}
        <p className="evento-text">
          Si fuiste parte de nuestro evento, ayúdanos respondiendo nuestra
          <strong> encuesta de satisfacción</strong>.
        </p>

        <p className="evento-text">
          Tu opinión es muy importante para nosotros y como agradecimiento
          recibirás un <strong>café de cortesía en LE FROLLE</strong>.
        </p>

        <div className="evento-deco"></div>

        {/* BUTTONS */}
        <div className="evento-buttons">
          <button
            className="btn-primary-strong cafe"
            onClick={() => {
              navigate('/login-folio');
              setOpen(false);
            }}
          >
            Responder encuesta
          </button>

          <button className="btn-secondary-soft" onClick={() => setOpen(false)}>
            Más tarde
          </button>
        </div>
      </div>

      <style>{`
        .evento-overlay {
          position: fixed;
          inset: 0;
          background: rgba(40, 20, 0, 0.65);
          backdrop-filter: blur(10px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .evento-card {
          width: 92%;
          max-width: 500px;
          background: #ffffff;
          border-radius: 24px;
          padding: 42px 38px;
          text-align: center;
          position: relative;
          box-shadow: 0 25px 55px rgba(0,0,0,0.35);
          border: 1px solid rgba(120, 72, 0, 0.15);
          animation: card-float 6s ease-in-out infinite;
        }

        .evento-header {
          padding: 12px 22px;
          border-radius: 50px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: white;
          font-weight: 700;
          margin-bottom: 22px;
          letter-spacing: 0.4px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.35);
        }

        .evento-header.cafe {
          background: linear-gradient(90deg, #6f3b16, #a35a2c);
        }

        .evento-icon {
          font-size: 18px;
        }

        .evento-title {
          font-size: 24px;
          font-weight: 800;
          color: #3a1f0b;
          margin-bottom: 14px;
          line-height: 1.25;
        }

        .highlight {
          color: #a35a2c;
        }

        .evento-text {
          font-size: 15px;
          color: #444;
          margin-bottom: 12px;
          line-height: 1.45;
        }

        .evento-deco {
          width: 90px;
          height: 4px;
          margin: 24px auto 32px auto;
          border-radius: 6px;
          background: linear-gradient(90deg, #6f3b16, #a35a2c);
          animation: linePulse 1.2s infinite alternate ease-in-out;
        }

        @keyframes linePulse {
          0% { transform: scaleX(0.6); opacity: 0.6; }
          100% { transform: scaleX(1); opacity: 1; }
        }

        .evento-buttons {
          display: flex;
          justify-content: center;
          gap: 18px;
        }

        .btn-primary-strong {
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

        .btn-primary-strong.cafe {
          background: linear-gradient(90deg, #6f3b16, #a35a2c);
        }

        .btn-primary-strong:hover {
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

        @keyframes popupZoom {
          0% {
            opacity: 0;
            transform: scale(0.7) translateY(20px);
          }
          60% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-popup-zoom {
          animation: popupZoom 0.35s ease forwards;
        }

        @keyframes card-float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
};
