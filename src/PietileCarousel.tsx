import React, { useEffect } from 'react';

import { animate, motion, useMotionValue } from 'framer-motion';

import { Slider } from './Slider';
import { useAutoplay } from './useAutoplay';
import { useDrag } from './useDrag';

const MotionSlider = motion(Slider);

export interface PietileCarouselHandle {
  moveRight: () => void;
  moveLeft: () => void;
  moveTo: (index: number) => void;
}

interface Props {
  autoplayInterval?: number;
  children?: React.ReactNode;
  className?: string;
  count?: number;
  draggable?: boolean;
  margin?: number;
  style?: React.CSSProperties;
  onChange?: (index: number) => void;
}

export const PietileCarousel = React.forwardRef<PietileCarouselHandle, Props>(
  (
    { autoplayInterval = 0, count = 1, children, draggable = true, margin = 0, onChange, ...props },
    ref: React.Ref<PietileCarouselHandle>,
  ) => {
    const sliderRef = React.useRef<HTMLDivElement>(null);
    const index = useMotionValue(0);

    const autoplay = useAutoplay(index, autoplayInterval);

    const childrenCount = React.Children.count(children);

    const drag = useDrag({
      count,
      enabled: !!draggable,
      index,
      margin,
      ref: sliderRef,
    });

    React.useImperativeHandle(
      ref,
      () => ({
        moveRight: (): void => {
          autoplay.start();

          const roundIndex = Number(index.get().toFixed(4));

          animate(index, Math.floor(roundIndex - 1), {
            type: 'spring',
            bounce: 0,
          });
        },
        moveLeft: (): void => {
          autoplay.start();

          const roundIndex = Number(index.get().toFixed(4));

          animate(index, Math.ceil(roundIndex + 1), {
            type: 'spring',
            bounce: 0,
          });
        },
        moveTo: (newIndex: number): void => {
          autoplay.start();

          animate(index, newIndex, {
            type: 'spring',
            bounce: 0,
          });
        },
      }),
      [autoplay, index],
    );

    useEffect(() => {
      let prevIndex = 0;

      const unsubscribe = index.onChange((value) => {
        if (!onChange) {
          return;
        }

        const newIndex = ((Math.round(value) % childrenCount) + childrenCount) % childrenCount;
        if (newIndex === prevIndex) {
          return;
        }

        prevIndex = newIndex;

        onChange(newIndex);
      });

      return () => {
        unsubscribe();
      };
    }, [index, childrenCount, onChange]);

    return (
      <MotionSlider
        ref={sliderRef}
        index={index}
        count={count}
        margin={margin}
        {...drag}
        {...props}
      >
        {children}
      </MotionSlider>
    );
  },
);
