import { motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { FloatingParticles } from "./FloatingParticles";
import { RosePetals } from "./RosePetals";
import { SparkleEffect } from "./SparkleEffect";

interface Scene1IntroProps {
  onComplete: () => void;
  coupleImage: string;
}

export function Scene1Intro({ onComplete, coupleImage }: Scene1IntroProps) {
  const [showButton, setShowButton] = useState(false);
  const [gyroPermission, setGyroPermission] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  useEffect(() => {
    // Request gyroscope permission for iOS
    if (
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      (DeviceOrientationEvent as any)
        .requestPermission()
        .then((response: string) => {
          if (response === "granted") {
            setGyroPermission(true);
          }
        })
        .catch(console.error);
    } else {
      setGyroPermission(true);
    }

    // Show button after intro animations
    const timer = setTimeout(() => setShowButton(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!gyroPermission) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta !== null && event.gamma !== null) {
        // Subtle tilt effect
        rotateX.set(event.beta * 0.1);
        rotateY.set(event.gamma * 0.1);
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () =>
      window.removeEventListener("deviceorientation", handleOrientation);
  }, [gyroPermission, rotateX, rotateY]);

  const transform = useTransform(
    [rotateX, rotateY],
    ([x, y]) => `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg)`,
  );

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, #E8B4B8 0%, #F5E6D3 50%, #FFD4E5 100%)",
            "linear-gradient(135deg, #FFD4E5 0%, #E8B4B8 50%, #F5E6D3 100%)",
            "linear-gradient(135deg, #F5E6D3 0%, #FFD4E5 50%, #E8B4B8 100%)",
            "linear-gradient(135deg, #E8B4B8 0%, #F5E6D3 50%, #FFD4E5 100%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Light Rays */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 left-1/2 w-1 h-full origin-top"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, transparent 70%)",
              transform: `translateX(-50%) rotate(${-30 + i * 15}deg)`,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Rose Petals */}
      <RosePetals count={15} />

      {/* Sparkle Effect */}
      <SparkleEffect count={25} />

      {/* Floating Particles */}
      <FloatingParticles count={20} color="rgba(255, 215, 0, 0.5)" />

      {/* Main Photo Container */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8">
        <motion.div
          className="relative"
          style={{ transform }}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Glowing Frame */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: "linear-gradient(45deg, #FFD700, #FFA500, #FFD700)",
              padding: "4px",
            }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(255, 215, 0, 0.5)",
                "0 0 40px rgba(255, 215, 0, 0.8)",
                "0 0 60px rgba(255, 215, 0, 0.6)",
                "0 0 20px rgba(255, 215, 0, 0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-full h-full rounded-3xl bg-black" />
          </motion.div>

          {/* Photo with Ken Burns Effect */}
          <motion.div className="relative overflow-hidden rounded-3xl w-56 h-72 sm:w-64 sm:h-80 md:w-80 md:h-[450px]">
            <motion.img
              src={coupleImage}
              alt="Couple"
              className="w-full h-full object-cover"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            {/* Overlay Glow */}
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle, transparent 40%, rgba(255, 215, 0, 0.2) 100%)",
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Text Animation */}
      <div className="absolute inset-x-0 top-[10%] sm:top-[12%] md:top-[15%] text-center px-4 sm:px-6 md:px-8">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {Array.from("Happy 1st Wedding Anniversary ❤️").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 1.5 + i * 0.05,
                duration: 0.4,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ scale: 1.2, color: "#FFD700" }}
              style={{
                display: "inline-block",
                textShadow:
                  "0 0 8px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6)",
                fontWeight: "bold",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="mt-3 sm:mt-4 md:mt-6 text-lg sm:text-xl md:text-2xl text-white font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1 }}
          style={{
            textShadow:
              "0 0 8px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 215, 0, 0.5)",
          }}
        >
          <motion.span
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{ display: "inline-block" }}
          >
            One year of love, laughter & forever.
          </motion.span>
        </motion.p>
      </div>

      {/* CTA Button */}
      {showButton && (
        <motion.div
          className="absolute inset-x-0 bottom-[8%] sm:bottom-[10%] md:bottom-[12%] flex justify-center px-4 sm:px-6 md:px-8"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <motion.button
            onClick={onComplete}
            className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full text-base sm:text-lg md:text-xl lg:text-2xl font-bold relative overflow-hidden whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
              color: "#8B4513",
              boxShadow: "0 10px 40px rgba(255, 215, 0, 0.4)",
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 20px 60px rgba(255, 215, 0, 0.7)",
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 10px 40px rgba(255, 215, 0, 0.4)",
                "0 15px 60px rgba(255, 215, 0, 0.7)",
                "0 10px 40px rgba(255, 215, 0, 0.4)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span
              className="relative z-10 flex items-center gap-2"
              animate={{ opacity: [1, 0.8, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Tap to Begin the Surprise ✨
            </motion.span>

            {/* Button shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />

            {/* Pulsing ring effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
