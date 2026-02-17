import { ChevronRight, Heart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface Photo {
  url: string;
  caption: string;
  date: string;
}

interface Scene2PhotoJourneyProps {
  onComplete: () => void;
  photos: Photo[];
}

export function Scene2PhotoJourney({
  onComplete,
  photos,
}: Scene2PhotoJourneyProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    // Auto-advance photos
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= photos.length) {
          clearInterval(timer);
          setShowContinue(true);
          return prev;
        }
        return next;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [photos.length]);

  return (
    <motion.div
      className="fixed inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Gradient Background - Rose Gold → Cream → Pink */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, #E8B4B8 0%, #F5E6D3 50%, #FFD4E5 100%)",
            "linear-gradient(135deg, #F5E6D3 0%, #FFD4E5 50%, #FFC1D9 100%)",
            "linear-gradient(135deg, #FFD4E5 0%, #FFC1D9 50%, #E8B4B8 100%)",
            "linear-gradient(135deg, #E8B4B8 0%, #F5E6D3 50%, #FFD4E5 100%)",
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Soft Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl opacity-30"
            style={{
              width: 200 + i * 50,
              height: 200 + i * 50,
              background:
                i % 2 === 0
                  ? "radial-gradient(circle, rgba(232, 180, 184, 0.6) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(255, 212, 229, 0.6) 0%, transparent 70%)",
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating Rose Gold Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: "linear-gradient(135deg, #E8B4B8, #D4AF37)",
              boxShadow: "0 0 10px rgba(232, 180, 184, 0.8)",
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ["100vh", "-10vh"],
              opacity: [0, 1, 1, 0],
              scale: [0, 1.5, 1.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Title */}
      <motion.div
        className="absolute top-6 sm:top-8 md:top-12 inset-x-0 text-center px-4 sm:px-6 md:px-8 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-serif text-rose-900 mb-2 font-bold"
          style={{
            textShadow: "0 2px 10px rgba(255, 255, 255, 0.5)",
          }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Your Beautiful Journey
        </motion.h2>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-rose-700 font-medium"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          365 days of unforgettable moments
        </motion.p>
      </motion.div>

      {/* 3D Polaroid Carousel */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-80 sm:h-[450px] md:h-[500px]">
          <AnimatePresence mode="popLayout">
            {photos.map((photo, index) => {
              const isActive = index === currentIndex;
              const isPast = index < currentIndex;
              const offset = index - currentIndex;

              if (!isPast && Math.abs(offset) <= 2) {
                return (
                  <motion.div
                    key={index}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{
                      scale: 0,
                      rotateY: 90,
                      opacity: 0,
                    }}
                    animate={{
                      scale: isActive ? 1 : 0.85 - Math.abs(offset) * 0.1,
                      rotateY: isActive ? 0 : offset * 15,
                      z: isActive ? 0 : -Math.abs(offset) * 100,
                      x: offset * 30,
                      opacity: isActive ? 1 : 0.4,
                      y: isActive ? 0 : Math.abs(offset) * 20,
                    }}
                    exit={{
                      scale: 0,
                      rotateY: -90,
                      opacity: 0,
                      transition: { duration: 0.5 },
                    }}
                    transition={{
                      type: "spring",
                      damping: 20,
                      stiffness: 100,
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: 1000,
                      zIndex: isActive ? 10 : 10 - Math.abs(offset),
                    }}
                  >
                    {/* Polaroid Frame */}
                    <motion.div
                      className="relative"
                      animate={
                        isActive
                          ? {
                              rotate: [-2, 2, -2],
                            }
                          : {}
                      }
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {/* Glowing Aura */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-lg blur-2xl"
                          style={{
                            background:
                              "radial-gradient(circle, rgba(232, 180, 184, 0.6) 0%, transparent 70%)",
                          }}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                      )}

                      {/* Polaroid Container */}
                      <div
                        className="relative bg-white rounded-lg shadow-2xl overflow-hidden"
                        style={{
                          width: "280px",
                          padding: "16px",
                          paddingBottom: "80px",
                        }}
                      >
                        {/* Photo */}
                        <div className="relative aspect-square rounded overflow-hidden bg-gray-100">
                          <motion.img
                            src={photo.url}
                            alt={photo.caption}
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.2, filter: "blur(10px)" }}
                            animate={{ scale: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.8 }}
                          />

                          {/* Photo Overlay Gradient */}
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              background:
                                "linear-gradient(to bottom, rgba(232, 180, 184, 0.1) 0%, transparent 50%)",
                            }}
                          />

                          {/* Vintage Film Effect */}
                          <motion.div
                            className="absolute inset-0 pointer-events-none opacity-10"
                            style={{
                              background:
                                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
                            }}
                          />
                        </div>

                        {/* Caption Area */}
                        <div className="absolute bottom-4 inset-x-4 text-center">
                          <motion.p
                            className="font-handwriting text-gray-700 text-lg mb-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            {photo.caption}
                          </motion.p>
                          <motion.p
                            className="text-xs text-gray-500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            {photo.date}
                          </motion.p>
                        </div>

                        {/* Corner Decoration */}
                        <div className="absolute top-2 right-2">
                          <Heart
                            className="text-rose-300 fill-rose-300"
                            size={16}
                          />
                        </div>
                      </div>

                      {/* Polaroid Shadow */}
                      <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-black/20 blur-xl rounded-full"
                        animate={{
                          opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    </motion.div>
                  </motion.div>
                );
              }
              return null;
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-32 inset-x-0 flex justify-center gap-2 px-8">
        {photos.map((_, index) => (
          <motion.div
            key={index}
            className="rounded-full"
            style={{
              width: index === currentIndex ? 24 : 8,
              height: 8,
              background:
                index <= currentIndex
                  ? "linear-gradient(135deg, #E8B4B8, #D4AF37)"
                  : "rgba(232, 180, 184, 0.3)",
            }}
            animate={{
              boxShadow:
                index === currentIndex
                  ? [
                      "0 0 10px rgba(232, 180, 184, 0.5)",
                      "0 0 20px rgba(232, 180, 184, 0.8)",
                      "0 0 10px rgba(232, 180, 184, 0.5)",
                    ]
                  : "none",
            }}
            transition={{
              width: { duration: 0.3 },
              boxShadow: { duration: 1.5, repeat: Infinity },
            }}
          />
        ))}
      </div>

      {/* Continue Button */}
      <AnimatePresence>
        {showContinue && (
          <motion.div
            className="absolute bottom-8 sm:bottom-10 md:bottom-12 inset-x-0 flex justify-center px-4 sm:px-6 md:px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.button
              onClick={onComplete}
              className="flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl font-bold text-sm sm:text-base md:text-lg whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #E8B4B8 0%, #D4AF37 100%)",
              }}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 10px 40px rgba(232, 180, 184, 0.4)",
                  "0 15px 60px rgba(232, 180, 184, 0.7)",
                  "0 10px 40px rgba(232, 180, 184, 0.4)",
                ],
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity },
              }}
            >
              <span className="text-white font-bold">
                Continue Your Journey
              </span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronRight className="text-white" size={20} />
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
            }}
            animate={{
              y: ["110%", "-10%"],
              rotate: [0, 360],
              opacity: [0, 0.4, 0.4, 0],
            }}
            transition={{
              duration: 8 + i,
              delay: i * 1.5,
              repeat: Infinity,
            }}
          >
            <Heart className="text-rose-300 fill-rose-300" size={24} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
