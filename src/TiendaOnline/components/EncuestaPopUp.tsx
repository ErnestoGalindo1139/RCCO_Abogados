import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EncuestaPopUp = () => {
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
          <span>Regalo especial</span>
        </div>

        {/* TITLE */}
        <h2 className="evento-title">
          ¡Te regalamos un café en <span className="highlight">LE FROLLE</span>!
        </h2>

        {/* TEXT */}
        <p className="evento-text">
          Responde nuestra encuesta de satisfacción y recibe un café totalmente
          <strong> gratis</strong> en <strong>LE FROLLE</strong>.
        </p>

        <p className="evento-subinfo">Presenta este código en sucursal</p>

        {/* CODE */}
        <div className="evento-code">CAFE-ENCUESTA-2025</div>

        <div className="evento-deco"></div>

        {/* BUTTONS */}
        <div className="evento-buttons">
          <button
            className="btn-primary-strong cafe"
            onClick={() => {
              navigate('/encuesta-satisfaccion');
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
        /* OVERLAY */
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

        /* CARD */
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

        /* HEADER */
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

        /* TITLE */
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

        /* TEXT */
        .evento-text {
          font-size: 15px;
          color: #444;
          margin-bottom: 12px;
          line-height: 1.45;
        }

        .evento-subinfo {
          font-size: 14px;
          color: #6f3b16;
          font-weight: 600;
          margin-bottom: 14px;
        }

        /* CODE */
        .evento-code {
          display: inline-block;
          padding: 10px 22px;
          border-radius: 12px;
          background: #f7efe9;
          border: 2px dashed #a35a2c;
          font-weight: 800;
          letter-spacing: 1px;
          color: #6f3b16;
          margin-bottom: 26px;
        }

        /* DECOR */
        .evento-deco {
          width: 90px;
          height: 4px;
          margin: 0 auto 32px auto;
          border-radius: 6px;
          background: linear-gradient(90deg, #6f3b16, #a35a2c);
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

        /* POPUP ANIMATION */
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
