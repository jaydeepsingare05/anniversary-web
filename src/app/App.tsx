import { Calendar, Heart, Home, Laugh, PartyPopper } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { HiddenEasterEgg } from "./components/HiddenEasterEgg";
import { Scene1Intro } from "./components/Scene1Intro";
import { Scene2PhotoJourney } from "./components/Scene2PhotoJourney";
import { Scene3GiftBox } from "./components/Scene3GiftBox";
import { Scene4MemoryUniverse } from "./components/Scene4MemoryUniverse";
import { Scene5Timeline } from "./components/Scene5Timeline";
import { Scene6Finale } from "./components/Scene6Finale";

export default function App() {
  const [currentScene, setCurrentScene] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(
    null,
  );

  // Sample data - replace with real photos and dates
  const coupleImage = "/src/asset/one.jpeg";

  const photos = [
    {
      url: "/src/asset/two.jpeg",
      caption: "The moment we said yes",
      date: "December 4, 2024",
    },
    {
      url: "/src/asset/three.jpeg",
      caption: "Our special day",
      date: "February 17, 2025",
    },
    {
      url: "/src/asset/four.jpeg",
      caption: "Adventures together",
      date: "April 2025",
    },
    {
      url: "/src/asset/five.jpeg",
      caption: "Festival of lights",
      date: "October 2025",
    },
    {
      url: "/src/asset/six.jpeg",
      caption: "Laughter & joy",
      date: "December 2025",
    },
    {
      url: "/src/asset/seven.jpeg",
      caption: "Forever moments",
      date: "January 2026",
    },
    {
      url: "/src/asset/eight.jpeg",
      caption: "Moments of joy",
      date: "January 2026",
    },
    {
      url: "/src/asset/nine.jpeg",
      caption: "Together forever",
      date: "February 2026",
    },
    {
      url: "/src/asset/ten.jpeg",
      caption: "Creating memories",
      date: "February 2026",
    },
    {
      url: "/src/asset/eleven.jpeg",
      caption: "Our journey",
      date: "March 2026",
    },
    {
      url: "/src/asset/twelve.jpeg",
      caption: "Spring together",
      date: "April 2026",
    },
    {
      url: "/src/asset/thirteen.jpeg",
      caption: "Love grows",
      date: "May 2026",
    },
    {
      url: "/src/asset/fifteen.jpeg",
      caption: "Summer dreams",
      date: "July 2026",
    },
  ];

  const milestones = [
    {
      icon: <Heart size={32} />,
      title: "💍 Engagement Day",
      date: "December 4, 2024",
      description:
        "The day we promised forever to each other. A moment that changed our lives.",
      photos: ["/src/asset/twelve.jpeg", "/src/asset/fifteen.jpeg"],
    },
    {
      icon: <Calendar size={32} />,
      title: "💒 Wedding Day",
      date: "February 17, 2025",
      description:
        "Surrounded by love, we became one. The most beautiful day of our lives.",
      photos: ["/src/asset/seven.jpeg", "/src/asset/nine.jpeg"],
    },
    {
      icon: <Home size={32} />,
      title: "🏡 First Home Together",
      date: "June 2025",
      description:
        "Building our nest, creating our sanctuary. Where our love grows every day.",
    },
    {
      icon: <PartyPopper size={32} />,
      title: "🎉 First Festival",
      date: "October 2025",
      description:
        "Celebrating traditions together. Lights, love, and laughter filled our home.",
      photos: ["/src/asset/five.jpeg", "/src/asset/six.jpeg"],
    },
    {
      icon: <Laugh size={32} />,
      title: "😂 Funniest Moment",
      date: "November 2025",
      description:
        "That time we got lost on a road trip and found the best sunset spot!",
    },
    {
      icon: <Heart size={32} />,
      title: "❤️ One Year Together",
      date: "February 17, 2026",
      description:
        "365 days of love, laughter, and endless memories. Here's to forever!",
      photos: ["/src/asset/eight.jpeg", "/src/asset/ten.jpeg"],
    },
  ];

  const handleSceneComplete = () => {
    setCurrentScene((prev) => prev + 1);
  };

  const handleReplay = () => {
    setCurrentScene(0);
  };

  // Long press detection for easter egg
  const handleTouchStart = () => {
    const timer = setTimeout(() => {
      setShowEasterEgg(true);
    }, 3000);
    setLongPressTimer(timer);
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  useEffect(() => {
    return () => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
      }
    };
  }, [longPressTimer]);

  return (
    <div
      className="fixed inset-0 bg-black overflow-hidden"
      style={{ touchAction: "manipulation" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      {/* Force mobile portrait orientation message */}
      <div className="hidden landscape:flex landscape:md:hidden fixed inset-0 bg-gradient-to-br from-purple-600 to-pink-600 items-center justify-center p-8 z-50">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">📱</div>
          <h2 className="text-2xl font-bold mb-2">Please rotate your device</h2>
          <p className="text-white/80">
            This experience is designed for portrait mode
          </p>
        </div>
      </div>

      {/* Scene Container */}
      <AnimatePresence mode="wait">
        {currentScene === 0 && (
          <Scene1Intro
            key="scene1"
            onComplete={handleSceneComplete}
            coupleImage={coupleImage}
          />
        )}
        {currentScene === 1 && (
          <Scene2PhotoJourney
            key="scene2"
            onComplete={handleSceneComplete}
            photos={photos}
          />
        )}
        {currentScene === 2 && (
          <Scene3GiftBox key="scene3" onComplete={handleSceneComplete} />
        )}
        {currentScene === 3 && (
          <Scene4MemoryUniverse
            key="scene4"
            onComplete={handleSceneComplete}
            photos={photos}
          />
        )}
        {currentScene === 4 && (
          <Scene5Timeline
            key="scene5"
            onComplete={handleSceneComplete}
            milestones={milestones}
          />
        )}
        {currentScene === 5 && (
          <Scene6Finale
            key="scene6"
            onReplay={handleReplay}
            photos={photos.map((p) => p.url)}
          />
        )}
      </AnimatePresence>

      {/* Hidden Easter Egg */}
      <HiddenEasterEgg
        isActive={showEasterEgg}
        onDismiss={() => setShowEasterEgg(false)}
      />
    </div>
  );
}
