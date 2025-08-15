import React, { useId } from 'react';
import { motion } from 'framer-motion';

export const HexSvg: React.FC<{ a: string; b: string; hovered: boolean }> = ({
  a,
  b,
  hovered,
}) => {
  const uid = useId();
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="w-full h-full block"
      animate={{
        filter: hovered
          ? `drop-shadow(0 0 10px ${b}88) drop-shadow(0 0 18px ${a}55)`
          : 'drop-shadow(0 0 0 rgba(0,0,0,0))',
      }}
      transition={{ duration: 0.25 }}
    >
      <defs>
        <linearGradient id={`grad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={a} />
          <stop offset="100%" stopColor={b} />
        </linearGradient>
      </defs>

      <polygon
        points="50,3 95,27 95,73 50,97 5,73 5,27"
        fill={`url(#grad-${uid})`}
        opacity={hovered ? 1 : 0.95}
      />
      <polygon
        points="50,8 90,28 90,72 50,92 10,72 10,28"
        fill="rgba(255,255,255,0.08)"
      />
    </motion.svg>
  );
};
