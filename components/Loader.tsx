"use client";
import { motion } from "framer-motion";

export default function Loader({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`flex flex-col items-center justify-center text-center gap-2 ${className}`}
    >
      <h2 className="text-white text-6xl font-bold">Thinking</h2>
      <p className="text-white/80 text-xl">Gathering ideas…</p>
    </motion.div>
  );
}
