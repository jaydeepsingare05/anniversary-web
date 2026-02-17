import { RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Scene6FinaleProps {
  onReplay: () => void;
  photos: string[];
}

export function Scene6Finale({ onReplay, photos }: Scene6FinaleProps) {
  const [showLanterns, setShowLanterns] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLanterns(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Position photos in heart shape
  const heartPositions = getHeartPositions(photos.length);

  return (
    <motion.div
      className="fixed inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Gradient Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
            "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #667eea 100%)",
            "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      {/* Floating Lanterns */}
      {showLanterns && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${10 + Math.random() * 80}%`,
                bottom: "-10%",
              }}
              animate={{
                y: [0, -window.innerHeight - 100],
                x: [0, (Math.random() - 0.5) * 100],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                delay: i * 0.5,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              {/* Lantern */}
              <div className="relative">
                {/* Light Glow */}
                <motion.div
                  className="absolute inset-0 blur-xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, transparent 70%)",
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Lantern Body */}
                <div
                  className="relative w-12 h-16 rounded-lg"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(255, 200, 100, 0.9), rgba(255, 150, 50, 0.9))",
                    boxShadow: "0 0 20px rgba(255, 215, 0, 0.6)",
                  }}
                >
                  {/* Lantern Top */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-yellow-900 rounded-t" />

                  {/* Flame */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-6 bg-yellow-200 rounded-full blur-sm"
                    animate={{
                      scaleY: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Golden Sparkle Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.1,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Heart-Shaped Photo Collage */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8">
        <motion.div
          className="relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 2, type: "spring", damping: 15 }}
        >
          {/* Glowing Heart Border */}
          <motion.div
            className="absolute inset-0"
            animate={{
              filter: [
                "drop-shadow(0 0 30px rgba(255, 215, 0, 0.6))",
                "drop-shadow(0 0 60px rgba(255, 215, 0, 0.9))",
                "drop-shadow(0 0 30px rgba(255, 215, 0, 0.6))",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Photos arranged in heart shape */}
          {photos.slice(0, heartPositions.length).map((photo, i) => {
            const pos = heartPositions[i];
            return (
              <motion.div
                key={i}
                className="absolute w-16 h-16 rounded-lg overflow-hidden border-2 border-white shadow-xl"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: [0, pos.rotation],
                }}
                transition={{
                  delay: 1 + i * 0.1,
                  duration: 0.5,
                  type: "spring",
                }}
                whileHover={{ scale: 1.3, zIndex: 10, rotate: 0 }}
              >
                <img
                  src={photo}
                  alt=""
                  className="w-full h-full object-cover"
                />

                {/* Photo shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Message Text */}
      <motion.div
        className="absolute top-[8%] sm:top-[12%] md:top-[15%] inset-x-0 text-center px-4 sm:px-6 md:px-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-serif text-white mb-2 sm:mb-4 font-bold"
          style={{
            textShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
          }}
          animate={{
            textShadow: [
              "0 0 20px rgba(255, 255, 255, 0.5)",
              "0 0 40px rgba(255, 255, 255, 0.8)",
              "0 0 20px rgba(255, 255, 255, 0.5)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          May your love grow stronger
        </motion.h2>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-white/90"
          style={{
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
          }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          with every passing year 💕
        </motion.p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="absolute bottom-[8%] sm:bottom-[10%] md:bottom-[12%] inset-x-0 flex flex-col items-center gap-3 sm:gap-4 md:gap-6 px-4 sm:px-6 md:px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1, type: "spring", stiffness: 100 }}
      >
        <motion.button
          onClick={onReplay}
          className="flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white/90 backdrop-blur text-purple-900 rounded-full shadow-2xl font-bold text-sm sm:text-base md:text-lg whitespace-nowrap"
          whileHover={{
            scale: 1.08,
            backgroundColor: "rgba(255, 255, 255, 1)",
            y: -3,
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 10px 40px rgba(255, 255, 255, 0.3)",
              "0 15px 60px rgba(255, 255, 255, 0.5)",
              "0 10px 40px rgba(255, 255, 255, 0.3)",
            ],
          }}
          transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <RotateCcw size={24} />
          </motion.div>
          <span className="font-bold">Replay Surprise</span>
        </motion.button>

        <motion.p
          className="text-white/70 text-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Made with ❤️ for an amazing couple
        </motion.p>
      </motion.div>

      {/* Confetti Rain */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-3 rounded"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: ["#FFD700", "#FF69B4", "#87CEEB", "#FFB6C1"][
                i % 4
              ],
            }}
            animate={{
              y: ["-10%", "110vh"],
              rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
              x: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: i * 0.1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// Helper function to generate heart-shaped positions
function getHeartPositions(
  count: number,
): Array<{ x: number; y: number; rotation: number }> {
  const positions: Array<{ x: number; y: number; rotation: number }> = [];

  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;

    // Parametric heart curve
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    );

    // Convert to percentage and center
    const xPercent = 50 + (x / 20) * 40;
    const yPercent = 50 + (y / 20) * 35;

    positions.push({
      x: xPercent,
      y: yPercent,
      rotation: Math.random() * 30 - 15,
    });
  }

  return positions;
}
