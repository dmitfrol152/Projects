import { AnimatePresence, motion } from "framer-motion";
import type { AnimatedContainerProps } from "./types";

export function AnimatedContainer({
  children,
  className,
  transformAnimation = 20,
  setHover,
}: AnimatedContainerProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: transformAnimation }}
        animate={{ opacity: 1, y: 0 }}
        exit={{
          opacity: 0,
          y: -transformAnimation,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={className}
        onMouseEnter={() => setHover?.(true)}
        onMouseLeave={() => setHover?.(false)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
