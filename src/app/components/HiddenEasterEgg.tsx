import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface HiddenEasterEggProps {
  isActive: boolean;
  onDismiss: () => void;
}

export function HiddenEasterEgg({ isActive, onDismiss }: HiddenEasterEggProps) {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; color: string }>>([]);

  useEffect(() => {
    if (isActive) {
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: ['#FFD700', '#FF69B4', '#87CEEB', '#FFB6C1', '#FFA500'][i % 5],
      }));
      setConfetti(newConfetti);

      const timer = setTimeout(() => {
        onDismiss();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isActive, onDismiss]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Message Container */}
          <motion.div
            className="relative z-10 mx-8 max-w-md"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            {/* Glowing Background */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              }}
              animate={{
                boxShadow: [
                  '0 0 40px rgba(255, 215, 0, 0.6)',
                  '0 0 80px rgba(255, 215, 0, 0.9)',
                  '0 0 40px rgba(255, 215, 0, 0.6)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Content */}
            <div className="relative bg-white rounded-3xl p-8 text-center shadow-2xl">
              {/* Sparkles around text */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 2, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>

              {/* Heart Icon */}
              <motion.div
                className="text-6xl mb-4"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ❤️
              </motion.div>

              {/* Message */}
              <motion.h3
                className="text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 mb-3"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  backgroundSize: '200% auto',
                }}
              >
                You both are made
              </motion.h3>
              <motion.h3
                className="text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-600"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                style={{
                  backgroundSize: '200% auto',
                }}
              >
                for each other ❤️
              </motion.h3>

              {/* Decorative Line */}
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full mx-auto mt-6"
                animate={{
                  width: ['50%', '100%', '50%'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Falling Confetti */}
          <div className="absolute inset-0 overflow-hidden">
            {confetti.map((piece) => (
              <motion.div
                key={piece.id}
                className="absolute w-2 h-3 rounded"
                style={{
                  left: `${piece.x}%`,
                  backgroundColor: piece.color,
                }}
                initial={{ top: '-5%', rotate: 0 }}
                animate={{
                  top: '105%',
                  rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                  x: [(Math.random() - 0.5) * 100],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  ease: 'linear',
                }}
              />
            ))}
          </div>

          {/* Floating Hearts */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="absolute text-4xl"
              style={{
                left: `${20 + Math.random() * 60}%`,
                bottom: '-10%',
              }}
              animate={{
                y: [0, -window.innerHeight - 100],
                x: [(Math.random() - 0.5) * 100],
                rotate: [0, 360],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: i * 0.2,
                ease: 'easeOut',
              }}
            >
              💕
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
