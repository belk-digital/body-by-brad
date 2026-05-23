'use client';

import { useRef, useState } from 'react';

type Props = {
  before: string;
  beforeAlt?: string;
  after?: string;
  afterAlt?: string;
  afterContent?: React.ReactNode;
  initialPos?: number; // 0–100, default 40
};

export default function BeforeAfterSlider({
  before,
  beforeAlt = 'Before',
  after,
  afterAlt = 'After',
  afterContent,
  initialPos = 40,
}: Props) {
  const [pos, setPos] = useState(initialPos);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  function getPercent(clientX: number) {
    if (!containerRef.current) return pos;
    const { left, width } = containerRef.current.getBoundingClientRect();
    return Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none"
      onPointerMove={(e) => {
        if (!dragging.current) return;
        setPos(getPercent(e.clientX));
      }}
      onPointerUp={() => { dragging.current = false; }}
      onPointerCancel={() => { dragging.current = false; }}
    >
      {/* Base layer — after image or custom content */}
      {after ? (
        <img
          src={after}
          alt={afterAlt}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      ) : (
        <div className="absolute inset-0">
          {afterContent ?? (
            <div className="h-full w-full bg-white flex items-center justify-end pr-6">
              <p className="text-zinc-400 text-sm font-medium leading-snug text-right max-w-[120px]">
                Slide right<br />to see the<br />results →
              </p>
            </div>
          )}
        </div>
      )}

      {/* Before image — clipped to the left */}
      <img
        src={before}
        alt={beforeAlt}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-top"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_8px_rgba(0,0,0,0.35)] pointer-events-none"
        style={{ left: `${pos}%` }}
      />

      {/* Drag handle — only this initiates dragging */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center cursor-col-resize z-10"
        style={{ left: `${pos}%`, touchAction: 'none' }}
        onPointerDown={(e) => {
          dragging.current = true;
          containerRef.current?.setPointerCapture(e.pointerId);
        }}
      >
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <path d="M5 1L1 6L5 11" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 1L17 6L13 11" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Before label */}
      <span className="absolute bottom-3 left-3 pointer-events-none text-[10px] font-bold uppercase tracking-widest text-white bg-black/50 px-2.5 py-1 rounded-full">
        Before
      </span>
    </div>
  );
}
