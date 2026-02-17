import { Heart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface Photo {
  id: number;
  url: string;
  caption: string;
  date: string;
  angle: number;
  distance: number;
}

interface Scene4MemoryUniverseProps {
  onComplete: () => void;
  photos: { url: string; caption: string; date: string }[];
}

export function Scene4MemoryUniverse({
  onComplete,
  photos,
}: Scene4MemoryUniverseProps) {
  const [expandedPhoto, setExpandedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photosWithPosition, setPhotosWithPosition] = useState<Photo[]>([]);
  const [miniHearts, setMiniHearts] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  useEffect(() => {
    // Position photos in radial burst
    const positioned = photos.map((photo, i) => {
      const angle = (i / photos.length) * Math.PI * 2;
      const distance = 150;
      return {
        ...photo,
        id: i,
        angle,
        distance,
      };
    });
    setPhotosWithPosition(positioned);
  }, [photos]);

  const handlePhotoTap = (photo: Photo) => {
    setExpandedPhoto(photo);
    setCurrentIndex(photo.id);
  };

  const handleClose = () => {
    setExpandedPhoto(null);
  };

  const handleSwipe = (direction: "left" | "right") => {
    const newIndex =
      direction === "right"
        ? (currentIndex + 1) % photos.length
        : (currentIndex - 1 + photos.length) % photos.length;

    setCurrentIndex(newIndex);
    setExpandedPhoto(photosWithPosition[newIndex]);
  };

  const handleDoubleTap = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newHearts = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 50,
      y: y + (Math.random() - 0.5) * 50,
    }));

    setMiniHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setMiniHearts((prev) =>
        prev.filter((h) => !newHearts.find((n) => n.id === h.id)),
      );
    }, 1000);
  };

  return (
    <motion.div
      className="fixed inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Dark Starry Background */}
      <motion.div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-indigo-950" />

      {/* Constellation Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              delay: Math.random() * 3,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Title */}
      <motion.div
        className="absolute top-6 sm:top-8 md:top-12 inset-x-0 text-center z-10 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-serif text-white font-bold"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Our Memory Universe ✨
        </motion.h2>
        <motion.p
          className="text-white/70 mt-2 text-sm sm:text-base md:text-lg"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Tap any memory to explore
        </motion.p>
      </motion.div>

      {/* Continue Button */}
      <motion.button
        onClick={onComplete}
        className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 z-20 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full shadow-lg font-bold text-sm sm:text-base md:text-lg whitespace-nowrap"
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
      >
        <motion.span
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ display: "inline-block" }}
        >
          Continue →
        </motion.span>
      </motion.button>

      {/* Floating Photos in Orbit */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-md max-h-screen">
          {photosWithPosition.map((photo, i) => {
            const x = Math.cos(photo.angle) * photo.distance;
            const y = Math.sin(photo.angle) * photo.distance;

            return (
              <motion.div
                key={photo.id}
                className="absolute top-1/2 left-1/2 cursor-pointer"
                style={{
                  x: x,
                  y: y,
                  translateX: "-50%",
                  translateY: "-50%",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: [0, 360],
                }}
                transition={{
                  opacity: { delay: i * 0.2, duration: 0.5 },
                  scale: { delay: i * 0.2, duration: 0.5, type: "spring" },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                onClick={() => handlePhotoTap(photo)}
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(255, 215, 0, 0.3)",
                      "0 0 40px rgba(255, 215, 0, 0.6)",
                      "0 0 20px rgba(255, 215, 0, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Photo */}
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-yellow-400/50 shadow-2xl">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                  />

                  {/* Shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 3,
                      delay: i * 0.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />
                </div>

                {/* Light Particles connecting photos */}
                {i < photosWithPosition.length - 1 && (
                  <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
                    <motion.line
                      x1="50%"
                      y1="50%"
                      x2={`${((photosWithPosition[i + 1].angle - photo.angle) * 180) / Math.PI}%`}
                      y2={`${photo.distance}%`}
                      stroke="rgba(255, 215, 0, 0.2)"
                      strokeWidth="1"
                      animate={{
                        opacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </svg>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Expanded Photo View */}
      <AnimatePresence>
        {expandedPhoto && (
          <motion.div
            className="fixed inset-0 z-30 flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            {/* Backdrop Blur */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Photo Card */}
            <motion.div
              className="relative z-10 max-w-md w-full"
              initial={{ scale: 0.5, rotateY: 90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.5, rotateY: -90 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={handleDoubleTap}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute -top-4 -right-4 z-20 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
              >
                <X size={20} />
              </button>

              {/* Photo Frame */}
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                animate={{
                  boxShadow: [
                    "0 0 40px rgba(255, 215, 0, 0.5)",
                    "0 0 60px rgba(255, 215, 0, 0.8)",
                    "0 0 40px rgba(255, 215, 0, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <img
                  src={expandedPhoto.url}
                  alt={expandedPhoto.caption}
                  className="w-full aspect-[3/4] object-cover"
                />

                {/* Heart Pulse Animation */}
                <motion.div
                  className="absolute top-4 right-4"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart className="text-red-500 fill-red-500" size={32} />
                </motion.div>

                {/* Light Sparkle Trails */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-300 rounded-full"
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
                        delay: i * 0.2,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Caption */}
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.p
                  className="text-white text-xl font-medium"
                  style={{
                    textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {expandedPhoto.caption}
                </motion.p>
                <motion.p
                  className="text-white/70 mt-2"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {expandedPhoto.date}
                </motion.p>
              </motion.div>

              {/* Swipe Navigation Hint */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => handleSwipe("left")}
                  className="px-4 py-2 bg-white/20 backdrop-blur text-white rounded-full"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => handleSwipe("right")}
                  className="px-4 py-2 bg-white/20 backdrop-blur text-white rounded-full"
                >
                  Next →
                </button>
              </div>

              <p className="text-center text-white/50 text-sm mt-4">
                Double tap for hearts ❤️
              </p>
            </motion.div>

            {/* Mini Hearts on Double Tap */}
            <AnimatePresence>
              {miniHearts.map((heart) => (
                <motion.div
                  key={heart.id}
                  className="absolute pointer-events-none z-40"
                  style={{ left: heart.x, top: heart.y }}
                  initial={{ opacity: 1, scale: 0 }}
                  animate={{
                    opacity: 0,
                    scale: 1.5,
                    y: -50,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <Heart className="text-pink-400 fill-pink-400" size={20} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
