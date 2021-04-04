import React, { useCallback, useState } from 'react';

import { animate, MotionValue, PanInfo } from 'framer-motion';

interface Config {
  count: number;
  enabled: boolean;
  index: MotionValue<number>;
  margin: number;
  ref: React.RefObject<HTMLElement>;
}

function calcItemWidth(ref: React.RefObject<HTMLElement>, count: number, margin: number): number {
  if (!ref.current) {
    return 0;
  }

  const { width } = ref.current.getBoundingClientRect();

  return (width - margin * (count - 1)) / count + margin;
}

export function useDrag({ count, index, margin, ref }: Config) {
  const [initial] = useState(() => ({
    dragging: false,
    index: index.get(),
    itemWidth: calcItemWidth(ref, count, margin),
  }));

  const onPanStart = useCallback(() => {
    initial.dragging = true;
    initial.index = index.get();
    initial.itemWidth = calcItemWidth(ref, count, margin);
  }, [ref, count, index, initial, margin]);

  const onPan = useCallback(
    (_, info: PanInfo) => {
      const newIndex = initial.index - info.offset.x / initial.itemWidth;

      index.set(newIndex);
    },
    [index, initial],
  );

  const onPanEnd = useCallback(
    (event, info: PanInfo) => {
      // Prevent click after drag
      initial.dragging = false;

      if (event instanceof MouseEvent) {
        event.target?.addEventListener(
          'click',
          (e) => {
            e.preventDefault();
          },
          { once: true },
        );
      }

      // Adjust position
      let newIndex: number;

      if (info.velocity.x > 100) {
        newIndex = Math.floor(index.get());
      } else if (info.velocity.x < -100) {
        newIndex = Math.ceil(index.get());
      } else {
        newIndex = Math.round(index.get());
      }

      animate(index, newIndex, {
        bounce: 0,
        type: 'spring',
        velocity: 0,
      });
    },
    [index, initial],
  );

  return { onPanStart, onPan, onPanEnd };
}
