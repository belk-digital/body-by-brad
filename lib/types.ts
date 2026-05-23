import type { CSSProperties } from 'react';

export type CountUpProps = {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delay?: number;
  duration?: number;
  start?: boolean;
};

export type HamburgerMenuProps = {
  strokeColor?: string;
  strokeWidth?: number;
  size?: number;
  defaultChecked?: boolean;
  checked?: boolean;
  onToggle?: (checked: boolean) => void;
  style?: CSSProperties;
};

export type TextRollProps = {
  children: string;
  className?: string;
  center?: boolean;
};

export type CartItem = {
  id: string;
  name: string;
  size?: string;
  price: number;
  image: string;
  quantity: number;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price_cents: number;
  original_price_cents: number | null;
  image: string | null;
  stock: number;
  active: boolean;
  category: string | null;
};

export type TestimonialItem = {
  id: number;
  quote: string;
  sender: string;
  reactions: string[];
  tapback: string;
};

export type PosState = {
  left: number;
  top: number;
  width: number;
  height: number;
  radius: number;
  opacity: number;
};
