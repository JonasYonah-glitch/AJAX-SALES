'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface ZoomParallaxProps {
  children: React.ReactNode[];
}

export function ZoomParallax({ children }: ZoomParallaxProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {children.map((child, index) => {
          const scale = scales[index % scales.length];

          // Mapping positions based on the provided logic
          const positionStyles = [
            'relative h-[30vh] w-[35vw]', // Center slot (index 0)
            '!-top-[30vh] !left-[5vw] !h-[30vh] !w-[35vw]',
            '!-top-[10vh] !-left-[25vw] !h-[45vh] !w-[20vw]',
            '!left-[27.5vw] !h-[25vh] !w-[25vw]',
            '!top-[27.5vh] !left-[5vw] !h-[25vh] !w-[20vw]',
            '!top-[27.5vh] !-left-[22.5vw] !h-[25vh] !w-[30vw]',
            '!top-[22.5vh] !left-[25vw] !h-[15vh] !w-[15vw]',
          ];

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={cn(
                "absolute flex items-center justify-center",
                index === 0 ? "z-10" : "z-0"
              )}
            >
              <div className={cn("relative", positionStyles[index % positionStyles.length])}>
                {child}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
