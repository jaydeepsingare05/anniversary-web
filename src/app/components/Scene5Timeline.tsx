import { Heart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Milestone {
  icon: React.ReactNode;
  title: string;
  date: string;
  description: string;
  photos?: string[];
}

interface Scene5TimelineProps {
  onComplete: () => void;
  milestones: Milestone[];
}

export function Scene5Timeline({
  onComplete,
  milestones: initialMilestones,
}: Scene5TimelineProps) {
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(
    null,
  );

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(180deg, #ffeef8 0%, #ffe5f3 100%)",
            "linear-gradient(180deg, #ffe5f3 0%, #ffd4ec 100%)",
            "linear-gradient(180deg, #ffd4ec 0%, #ffeef8 100%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Floating Hearts Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ["120%", "-20%"],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: Math.random() * 5,
              repeat: Infinity,
            }}
          >
            <Heart
              className="text-pink-300 fill-pink-300"
              size={20 + Math.random() * 20}
            />
          </motion.div>
        ))}
      </div>

      {/* Continue Button */}
      <motion.button
        onClick={onComplete}
        className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 z-20 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full shadow-lg font-bold text-sm sm:text-base md:text-lg whitespace-nowrap"
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      >
        <motion.span
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ display: "inline-block" }}
        >
          Continue →
        </motion.span>
      </motion.button>

      {/* Content Container */}
      <div className="relative h-full overflow-y-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-4xl font-serif text-rose-900">
            Our Beautiful Journey ❤️
          </h2>
          <p className="text-rose-600 mt-2">Every moment with you is magical</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-2xl mx-auto">
          {/* Timeline Line */}
          <motion.div
            className="absolute left-8 top-0 w-1 h-full bg-gradient-to-b from-pink-300 via-rose-400 to-pink-300"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            style={{ transformOrigin: "top" }}
          >
            {/* Glowing light moving along timeline */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full"
              style={{
                boxShadow: "0 0 20px rgba(251, 191, 36, 0.8)",
              }}
              animate={{
                y: ["0%", "100%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Milestones */}
          <div className="space-y-12">
            {initialMilestones.map((milestone, i) => (
              <motion.div
                key={i}
                className="relative pl-24"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.2, duration: 0.6 }}
              >
                {/* Icon Circle */}
                <motion.div
                  className="absolute left-0 w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-rose-600 flex items-center justify-center shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(236, 72, 153, 0.5)",
                      "0 0 30px rgba(236, 72, 153, 0.8)",
                      "0 0 20px rgba(236, 72, 153, 0.5)",
                    ],
                  }}
                  transition={{
                    boxShadow: { duration: 2, repeat: Infinity },
                    rotate: { duration: 0.6 },
                  }}
                  onClick={() =>
                    setExpandedMilestone(expandedMilestone === i ? null : i)
                  }
                >
                  <div className="text-white">{milestone.icon}</div>
                </motion.div>

                {/* Connector Line */}
                <div className="absolute left-16 top-8 w-8 h-0.5 bg-gradient-to-r from-pink-400 to-transparent" />

                {/* Content Card */}
                <motion.div
                  className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-xl"
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() =>
                    setExpandedMilestone(expandedMilestone === i ? null : i)
                  }
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-2xl"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />

                  <h3 className="text-2xl font-semibold text-rose-900 mb-1">
                    {milestone.title}
                  </h3>
                  <p className="text-rose-600 text-sm mb-3">{milestone.date}</p>
                  <p className="text-gray-700">{milestone.description}</p>

                  {/* Expanded Photos */}
                  <AnimatePresence>
                    {expandedMilestone === i && milestone.photos && (
                      <motion.div
                        className="mt-4 grid grid-cols-2 gap-3"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {milestone.photos.map((photo, photoIdx) => (
                          <motion.div
                            key={photoIdx}
                            className="relative aspect-square rounded-lg overflow-hidden"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: photoIdx * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <img
                              src={photo}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                              whileHover={{ opacity: 0 }}
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {milestone.photos && (
                    <p className="text-sm text-rose-400 mt-3 text-center">
                      {expandedMilestone === i
                        ? "Tap to collapse"
                        : "Tap to see photos"}
                    </p>
                  )}
                </motion.div>

                {/* Floating Sparkles */}
                <div className="absolute inset-0 pointer-events-none overflow-visible">
                  {[...Array(3)].map((_, sparkleIdx) => (
                    <motion.div
                      key={sparkleIdx}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                      style={{
                        left: `${20 + sparkleIdx * 30}%`,
                        top: `${10 + sparkleIdx * 20}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        y: [0, -20, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.3 + sparkleIdx * 0.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* End of Timeline Decoration */}
          <motion.div
            className="relative mt-12 pl-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.div
              className="absolute left-0 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center"
              animate={{
                rotate: [0, 360],
                boxShadow: [
                  "0 0 30px rgba(251, 191, 36, 0.5)",
                  "0 0 50px rgba(251, 191, 36, 0.8)",
                  "0 0 30px rgba(251, 191, 36, 0.5)",
                ],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                boxShadow: { duration: 2, repeat: Infinity },
              }}
            >
              <Heart className="text-white fill-white" size={32} />
            </motion.div>

            <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-6 text-center">
              <h3 className="text-2xl font-serif text-rose-900">
                Forever & Always
              </h3>
              <p className="text-rose-600 mt-2">
                Here's to many more beautiful years together! 💕
              </p>
            </div>
          </motion.div>
        </div>

        {/* Extra spacing at bottom */}
        <div className="h-20" />
      </div>
    </motion.div>
  );
}
