import {motion} from "framer-motion";
import React from "react";

// 드래그 설정 공통 함수
export const commonDragStyle = (ref: React.RefObject<HTMLDivElement | null>) => ({
  as: motion.div,
  drag: "x" as const,
  dragConstraints: ref,
  dragElastic: 0.6,
  dragMomentum: true,
  whileDrag: {
    scale: 0.99,
    cursor: "grabbing"
  },
  dragTransition: {
    bounceStiffness: 200,
    bounceDamping: 25
  },
  style: {
    cursor: "grab",
    touchAction: "none" as const
  }
});