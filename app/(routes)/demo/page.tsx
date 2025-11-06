"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChestExplosion() {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    // Podrías agregar un sonido o vibración aquí también
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <AnimatePresence>
        {!opened && (
          <motion.div
            key="chest"
            layout={false}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              scale: [1, 1, 0], // crece y luego se reduce a 0
              opacity: [1, 1, 0],
              transition: { duration: 1 },
            }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="cursor-pointer absolute"
            onClick={handleOpen}
          >
            <img
              src="/images/AtleticoMadrid.png"
              alt="Cofre"
              className="w-[100px] h-[100px] select-none bg-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {opened && (
        <motion.div
          key="gif"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="mt-8"
        >
          <img
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXpsOGxmeDRtaXA5eHlta2NvbWc2NzE4aGd1MWE3MHhpMjlwamxlbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Too7GW2ZQZF82ADD4R/giphy.gif"
            alt="GIF de explosión"
            className="rounded-xl shadow-lg w-[48] bg-transparent"
          />
        </motion.div>
      )}
    </div>
  );
}
