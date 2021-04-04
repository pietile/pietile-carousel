import React, { useCallback, useImperativeHandle } from 'react';

import { PanInfo, motion, useMotionValue, PanHandlers } from 'framer-motion';

import { Slider } from './Slider';
import { useAutoplay } from './useAutoplay';
import { useOnChange } from './useOnChange';
import { usePan } from './usePan';
import { animateSpring } from './utils';

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

    useOnChange({
      childrenCount: React.Children.count(children),
      index,
      onChange,
    });

    const autoplay = useAutoplay(index, autoplayInterval);

    useImperativeHandle(
      ref,
      () => ({
        moveRight: (): void => {
          autoplay.start();

          const roundIndex = Number(index.get().toFixed(4));

          animateSpring(index, Math.floor(roundIndex - 1));
        },
        moveLeft: (): void => {
          autoplay.start();

          const roundIndex = Number(index.get().toFixed(4));

          animateSpring(index, Math.ceil(roundIndex + 1));
        },
        moveTo: (newIndex: number): void => {
          autoplay.start();

          animateSpring(index, newIndex);
        },
      }),
      [autoplay, index],
    );

    const panHandlers = usePan({
      count,
      index,
      margin,
      ref: sliderRef,
    });

    const onPanStart = useCallback(
      (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        autoplay.stop();

        panHandlers.onPanStart(event, info);
      },
      [autoplay, panHandlers],
    );

    const onPanEnd = useCallback(
      (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        autoplay.start();

        panHandlers.onPanEnd(event, info);
      },
      [autoplay, panHandlers],
    );

    let panProps: PanHandlers = {};
    if (draggable) {
      panProps = {
        onPanStart,
        onPan: panHandlers.onPan,
        onPanEnd,
      };
    }

    return (
      <MotionSlider
        ref={sliderRef}
        index={index}
        count={count}
        margin={margin}
        {...panProps}
        {...props}
      >
        {children}
      </MotionSlider>
    );
  },
);
