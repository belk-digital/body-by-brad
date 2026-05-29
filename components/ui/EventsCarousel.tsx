'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from 'lucide-react';
import { Autoplay, EffectCreative, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { cn } from '@/lib/utils';

const carouselCSS = `
.events-carousel {
  width: 100%;
  height: 480px;
  padding-bottom: 56px !important;
}

.events-carousel .swiper-slide {
  background-position: center;
  background-size: cover;
  border-radius: 20px;
}

.events-carousel .swiper-pagination-bullet {
  background-color: #E6FF2B !important;
  opacity: 0.4;
  width: 8px;
  height: 8px;
  transition: all 0.25s;
}

.events-carousel .swiper-pagination-bullet-active {
  background-color: #E6FF2B !important;
  opacity: 1;
  width: 24px;
  border-radius: 4px;
}
`;

type CarouselImage = { src: string; alt: string };

interface EventsCarouselProps {
  images: CarouselImage[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
}

export function EventsCarousel({
  images,
  className,
  showPagination = true,
  showNavigation = true,
  loop = true,
  autoplay = true,
}: EventsCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [paused, setPaused] = useState(false);

  const togglePause = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    if (paused) {
      swiper.autoplay.start();
      setPaused(false);
    } else {
      swiper.autoplay.stop();
      setPaused(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className={cn('relative w-full', className)}
    >
      <style>{carouselCSS}</style>

      <Swiper
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        effect="creative"
        grabCursor
        slidesPerView="auto"
        centeredSlides
        loop={loop}
        autoplay={
          autoplay
            ? { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }
            : false
        }
        pagination={showPagination ? { clickable: true } : false}
        navigation={
          showNavigation
            ? { nextEl: '.ec-next', prevEl: '.ec-prev' }
            : false
        }
        creativeEffect={{
          prev: { shadow: true, translate: [0, 0, -400] },
          next: { translate: ['100%', 0, 0] },
        }}
        modules={[EffectCreative, Pagination, Autoplay, Navigation]}
        className="events-carousel"
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <img
              className="h-full w-full rounded-3xl object-cover"
              src={image.src}
              alt={image.alt}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pause / Resume button */}
      {autoplay && (
        <button
          onClick={togglePause}
          className="absolute top-3 left-1/2 z-10 -translate-x-1/2 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-zinc-800 text-[11px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm hover:bg-white transition-colors cursor-pointer"
        >
          {paused
            ? <><PlayIcon className="w-3 h-3" /> Resume slide</>
            : <><PauseIcon className="w-3 h-3" /> Pause slide</>
          }
        </button>
      )}

      {/* Custom nav buttons */}
      {showNavigation && (
        <>
          <button className="ec-prev absolute left-2 top-1/2 z-10 -translate-y-[calc(50%+28px)] flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition-colors cursor-pointer">
            <ChevronLeftIcon className="h-5 w-5 text-zinc-800" />
          </button>
          <button className="ec-next absolute right-2 top-1/2 z-10 -translate-y-[calc(50%+28px)] flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition-colors cursor-pointer">
            <ChevronRightIcon className="h-5 w-5 text-zinc-800" />
          </button>
        </>
      )}
    </motion.div>
  );
}
