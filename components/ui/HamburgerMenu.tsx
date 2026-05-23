'use client';

import { startTransition, useState } from 'react';
import type { HamburgerMenuProps } from '@/lib/types';

export default function HamburgerMenu({
  strokeColor = '#FFFFFF',
  strokeWidth = 2.4,
  size = 48,
  defaultChecked = false,
  checked,
  onToggle,
  style,
}: HamburgerMenuProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const currentChecked = checked ?? isChecked;

  const handleChange = () => {
    const newChecked = !currentChecked;

    if (checked === undefined) {
      startTransition(() => {
        setIsChecked(newChecked);
      });
    }

    onToggle?.(newChecked);
  };

  return (
    <label
      style={{
        cursor: 'pointer',
        display: 'inline-block',
        width: size,
        height: size,
        ...style,
      }}
    >
      <input
        type="checkbox"
        checked={currentChecked}
        onChange={handleChange}
        style={{ display: 'none' }}
        aria-label="Toggle menu"
      />
      <svg
        viewBox="0 0 32 32"
        style={{
          width: '100%',
          height: '100%',
          transform: currentChecked ? 'rotate(-45deg)' : 'rotate(0deg)',
          transition: 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <path
          d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          fill="none"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          strokeDasharray={currentChecked ? '20 300' : '12 63'}
          strokeDashoffset={currentChecked ? -32.42 : 0}
          style={{
            transition:
              'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        <path
          d="M7 16 27 16"
          fill="none"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          style={{
            transition:
              'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </svg>
    </label>
  );
}
