import * as React from 'react';

import { AnimatedValue, useSpring, OpaqueInterpolation, SetUpdateFn } from 'react-spring';

import { SpringValue } from './types';

interface Return {
  index: OpaqueInterpolation<number>;
  set: SetUpdateFn<SpringValue>;
}

export function useAnimation(childrenCount: number, onChange?: (index: number) => void): Return {
  const prevIndex = React.useRef<number>(0);

  const [{ index }, set] = useSpring<{ index: number }>(() => ({
    index: 0,
    onFrame: (value: AnimatedValue<SpringValue>): void => {
      if (!onChange) {
        return;
      }

      const newIndex = ((Math.round(value.index) % childrenCount) + childrenCount) % childrenCount;
      if (newIndex === prevIndex.current) {
        return;
      }

      prevIndex.current = newIndex;

      onChange(newIndex);
    },
  }));

  return { index, set };
}
