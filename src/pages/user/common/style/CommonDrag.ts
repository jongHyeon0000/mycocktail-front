import {motion} from "framer-motion";
import React from "react";

// 드래그 설정 공통 함수
export const dragConfig = (ref: React.RefObject<HTMLDivElement>) => ({
  as: motion.div,
  drag: "x" as const,
  dragConstraints: ref,
  dragElastic: 0.2,
  dragMomentum: false,
  whileDrag: {
    scale: 0.99,
    cursor: "grabbing"
  },
  dragTransition: {
    bounceStiffness: 400,
    bounceDamping: 40
  },
  style: {
    cursor: "grab",
    touchAction: "none" as const
  }
});