"use client";

import { motion } from "framer-motion";

export default function GuideSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col gap-8 w-full mt-8"
    >
      {/* Earnings and Competitive Score Row Skeleton */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <div className="shimmer h-4 w-32 rounded"></div>
          <div className="shimmer h-8 w-24 rounded"></div>
          <div className="shimmer h-4 w-20 rounded"></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="shimmer h-4 w-32 rounded"></div>
          <div className="shimmer h-8 w-16 rounded"></div>
        </div>
      </div>

      {/* Steps Section Skeleton */}
      <div className="flex flex-col gap-4 w-full">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-3 p-4 border border-[#00D37E]/30 rounded-[4px]"
          >
            <div className="flex items-center gap-2">
              <div className="shimmer h-6 w-16 rounded"></div>
              <div className="shimmer h-6 w-48 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="shimmer h-4 w-full rounded"></div>
              <div className="shimmer h-4 w-3/4 rounded"></div>
            </div>
          </div>
        ))}

        {/* Show all steps button skeleton */}
        <div className="flex items-center justify-center">
          <div className="shimmer h-10 w-32 rounded"></div>
        </div>
      </div>
    </motion.div>
  );
}
