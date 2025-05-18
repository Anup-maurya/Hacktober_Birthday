import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function BirthdayPage() {
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [count, setCount] = useState(0);

  const handleCelebrate = () => {
    setIsCelebrating(true);
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
    });
  };

  // Counting logic (1 to 1000 in 3 sec)
  useEffect(() => {
    if (!isCelebrating) return;

    let current = 0;
    const maxCount = 1000;
    const intervalTime = 3; // 3ms * 1000 = 3000ms = 3 sec

    const interval = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= maxCount) {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isCelebrating]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 flex flex-col justify-center items-center p-6 text-center">
      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold text-white drop-shadow-lg"
      >
        🎉 Happy Birthday! 🎂
      </motion.h1>

      {/* Sub Text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-4 text-xl text-white"
      >
        Wishing you joy, laughter, and lots of cake!
      </motion.p>

      {/* Count Text */}
      {isCelebrating && (
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 1,
            duration: 0.8,
            type: "spring",
            stiffness: 120,
          }}
          className="mt-6 text-5xl font-extrabold text-yellow-300"
        >
          Wishing you a Happy Birthday {count} times!
        </motion.p>
      )}

      {/* Celebrate Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCelebrate}
        className="mt-8 mb-10 px-6 py-3 bg-white text-purple-700 font-semibold rounded-xl shadow-lg hover:bg-purple-100 transition"
      >
        {isCelebrating ? "🎊 Enjoy the Day!" : "Click to Celebrate 🎈"}
      </motion.button>

      {/* Birthday Image */}
      {isCelebrating && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-6"
        >
          <img
            src="/birthday-image.jpg"
            alt="Birthday Cake"
            className="w-64 rounded-lg shadow-lg"
          />
        </motion.div>
      )}
    </div>
  );
}
