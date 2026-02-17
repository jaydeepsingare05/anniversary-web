import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  rotation: number;
  size: number;
}

export function RosePetals({ count = 15 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 5 + Math.random() * 3,
      rotation: Math.random() * 360,
      size: 20 + Math.random() * 20,
    }));
    setPetals(newPetals);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: '-10%',
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(petal.id) * 50, 0],
            rotate: [petal.rotation, petal.rotation + 720],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: petal.size,
              height: petal.size,
              background: 'radial-gradient(circle, rgba(255, 182, 193, 0.9) 0%, rgba(255, 105, 180, 0.5) 100%)',
              filter: 'blur(1px)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
