'use client';

import {
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { animate, useInView } from 'framer-motion';

type Easing = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';

type AnimatedCounterProps = {
  startValue?: number;
  endValue: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  easing?: Easing;
  start?: boolean;
  className?: string;
  style?: CSSProperties;
};

const easingFunctions: Record<Easing, [number, number, number, number]> = {
  linear: [0, 0, 1, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
};

export default function AnimatedCounter({
  startValue = 0,
  endValue,
  duration = 2,
  delay = 0,
  decimals = 0,
  prefix = '',
  suffix = '',
  easing = 'easeOut',
  start = true,
  className,
  style,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(startValue);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const inferredDecimals = useMemo(() => {
    const countDecimals = (value: number) => {
      const asString = value.toString();
      const dotIndex = asString.indexOf('.');
      if (dotIndex === -1) return 0;
      return asString.length - dotIndex - 1;
    };
    return Math.max(countDecimals(startValue), countDecimals(endValue));
  }, [startValue, endValue]);

  useEffect(() => {
    if (!isInView || !start || hasAnimated) return;

    let controls: ReturnType<typeof animate> | undefined;
    const timer = window.setTimeout(() => {
      controls = animate(startValue, endValue, {
        duration,
        ease: easingFunctions[easing],
        onUpdate: (value) => {
          startTransition(() => {
            setDisplayValue(value);
          });
        },
        onComplete: () => {
          startTransition(() => {
            setHasAnimated(true);
          });
        },
      });
    }, delay * 1000);

    return () => {
      window.clearTimeout(timer);
      controls?.stop();
    };
  }, [isInView, start, hasAnimated, startValue, endValue, duration, delay, easing]);

  const effectiveDecimals = decimals > 0 ? decimals : inferredDecimals;
  const formattedValue = displayValue.toFixed(effectiveDecimals);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}
