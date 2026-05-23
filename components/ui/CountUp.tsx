'use client';

import { useEffect, useState } from 'react';
import type { CountUpProps } from '@/lib/types';

export default function CountUp({
  end,
  prefix = '',
  suffix = '',
  decimals = 0,
  delay = 0,
  duration = 1800,
  start = true,
}: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) {
      setCount(0);
      return;
    }

    let animationFrame = 0;
    let timeoutId = 0;

    timeoutId = window.setTimeout(() => {
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        setCount(end * easedProgress);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrame);
    };
  }, [delay, duration, end, start]);

  return (
    <>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </>
  );
}
