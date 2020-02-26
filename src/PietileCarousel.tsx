import * as React from 'react';

import { animated } from 'react-spring';

import { Slider } from './Slider';
import { useAnimation } from './useAnimation';
import { useAutoplay } from './useAutoplay';
import { useDrag } from './useDrag';

const AnimatedSlider = animated(Slider);

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
    {
      autoplayInterval = 0,
      count = 1,
      children,
      draggable = true,
      margin = 0,
      onChange,
      ...props
    }: Props,
    ref: React.Ref<PietileCarouselHandle>,
  ) => {
    const sliderRef = React.useRef<HTMLElement>(null);
    const { index, set } = useAnimation(React.Children.count(children), onChange);

    const autoplay = useAutoplay({ interval: autoplayInterval, index, set });

    const dragging = React.useRef<boolean>(false);
    useDrag({
      count,
      enabled: !!draggable,
      index,
      margin,
      ref: sliderRef,
      set,
      onStart: () => {
        dragging.current = true;

        autoplay.stop();
      },
      onEnd: (event: React.SyntheticEvent) => {
        if (!dragging.current) {
          return;
        }

        dragging.current = false;

        autoplay.start();

        if (!(event instanceof MouseEvent)) {
          return;
        }

        event.target.addEventListener(
          'click',
          e => {
            e.preventDefault();
          },
          { once: true },
        );
      },
    });

    React.useImperativeHandle(
      ref,
      () => ({
        moveRight: (): void => {
          autoplay.start();

          set({ index: Math.floor(index.getValue() - 1) });
        },
        moveLeft: (): void => {
          autoplay.start();

          set({ index: Math.ceil(index.getValue() + 1) });
        },
        moveTo: (newIndex: number): void => {
          autoplay.start();

          set({ index: newIndex });
        },
      }),
      [autoplay, index, set],
    );

    return (
      <AnimatedSlider innerRef={sliderRef} index={index} count={count} margin={margin} {...props}>
        {children}
      </AnimatedSlider>
    );
  },
);
