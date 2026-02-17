import { Gift } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface Scene3GiftBoxProps {
  onComplete: () => void;
}

export function Scene3GiftBox({ onComplete }: Scene3GiftBoxProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const handleTap = () => {
    if (isOpening || isOpened) return;

    setIsOpening(true);

    // Sequence: ribbon → lid → explosion → transition
    setTimeout(() => {
      setIsOpened(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 2000);
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.5 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "linear-gradient(135deg, #764ba2 0%, #f093fb 100%)",
            "linear-gradient(135deg, #f093fb 0%, #667eea 100%)",
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Sparkle Aura */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-200 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2,
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Instruction Text */}
      {!isOpening && (
        <motion.div
          className="absolute top-[10%] sm:top-[12%] md:top-[15%] text-center px-4"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.p
            className="text-white text-xl sm:text-2xl md:text-3xl font-bold"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Tap the gift ✨
          </motion.p>
        </motion.div>
      )}

      {/* Gift Box Container */}
      <motion.div
        className="relative cursor-pointer scale-75 sm:scale-90 md:scale-100"
        onClick={handleTap}
        animate={
          !isOpening
            ? {
                y: [0, -25, 0],
                rotate: [0, 3, 0, -3, 0],
              }
            : {}
        }
        transition={{
          duration: 2.5,
          repeat: isOpening ? 0 : Infinity,
          type: "easeInOut",
        }}
        whileHover={!isOpening ? { scale: 1.08 } : {}}
        whileTap={!isOpening ? { scale: 0.95 } : {}}
      >
        {/* Shadow */}
        <motion.div
          className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-64 h-8 rounded-full bg-black/30 blur-xl"
          animate={{
            scale: isOpening ? [1, 1.5] : [0.8, 1, 0.8],
            opacity: isOpening ? [0.3, 0] : [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 2, repeat: isOpening ? 0 : Infinity }}
        />

        {/* Sparkle Aura around box */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            boxShadow: "0 0 60px rgba(255, 215, 0, 0.6)",
          }}
          animate={{
            boxShadow: [
              "0 0 40px rgba(255, 215, 0, 0.4)",
              "0 0 80px rgba(255, 215, 0, 0.8)",
              "0 0 40px rgba(255, 215, 0, 0.4)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Box Base */}
        <motion.div
          className="relative w-64 h-64 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, #FF6B9D 0%, #C44569 100%)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Box Pattern */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)",
              }}
            />
          </div>

          {/* Ribbon Vertical */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-full bg-gradient-to-b from-yellow-400 to-yellow-600"
            animate={
              isOpening
                ? {
                    scaleX: [1, 0],
                    opacity: [1, 0],
                  }
                : {}
            }
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          {/* Ribbon Horizontal */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-600"
            animate={
              isOpening
                ? {
                    scaleY: [1, 0],
                    opacity: [1, 0],
                  }
                : {}
            }
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          {/* Ribbon Bow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20"
            animate={
              isOpening
                ? {
                    scale: [1, 0],
                    rotate: [0, 360],
                    opacity: [1, 0],
                  }
                : {
                    rotate: [0, 5, -5, 0],
                  }
            }
            transition={
              isOpening
                ? { duration: 1, ease: "easeInOut" }
                : { duration: 2, repeat: Infinity }
            }
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full shadow-lg" />
              <Gift
                className="absolute inset-0 m-auto text-yellow-900"
                size={40}
              />
            </div>
          </motion.div>

          {/* Lid */}
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #FF8FB1 0%, #D6527C 100%)",
              transformOrigin: "bottom",
            }}
            animate={
              isOpening
                ? {
                    rotateX: [0, -120],
                    y: [0, -100],
                    opacity: [1, 0],
                  }
                : {}
            }
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          />
        </motion.div>

        {/* Explosion Effect */}
        {isOpened && (
          <>
            {/* Light Burst */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,215,0,0.8) 30%, transparent 70%)",
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: [0, 3],
                opacity: [1, 0],
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {/* Particle Burst */}
            {[...Array(30)].map((_, i) => {
              const angle = (i / 30) * Math.PI * 2;
              const distance = 200;
              return (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                  style={{
                    background: i % 2 === 0 ? "#FFD700" : "#FFA500",
                  }}
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                  animate={{
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    scale: [1, 0],
                    opacity: [1, 0],
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              );
            })}

            {/* Sparkle Trail */}
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-300 rounded-full"
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400,
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.random() * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
