import { RefObject, useEffect } from 'react';

import { OpaqueInterpolation, SetUpdateFn } from 'react-spring';
import { useGesture } from 'react-use-gesture';

import { SpringValue } from './types';

import { FullGestureState, Vector2 } from 'react-use-gesture/dist/types';

interface Config {
  count: number;
  enabled: boolean;
  index: OpaqueInterpolation<number>;
  margin: number;
  ref: RefObject<HTMLElement>;
  set: SetUpdateFn<SpringValue>;
  onStart: () => void;
  onEnd: (event: React.SyntheticEvent) => void;
}

function calcItemWidth(ref: RefObject<HTMLElement>, count: number, margin: number): number {
  if (!ref.current) {
    return 0;
  }

  const { width } = ref.current.getBoundingClientRect();

  return (width - margin * (count - 1)) / count + margin;
}

export function useDrag({ count, enabled, index, margin, ref, set, onStart, onEnd }: Config): void {
  const bind = useGesture(
    {
      onDragStart: () => {
        onStart();
      },
      onDrag: ({ down, memo, movement: [mx], vxvy: [vx] }: FullGestureState<'drag'>) => {
        const itemWidth = memo || calcItemWidth(ref, count, margin);
        let newIndex = -mx / itemWidth;

        if (!down) {
          if (vx > 0.5) {
            newIndex = Math.floor(newIndex);
          } else if (vx < -0.5) {
            newIndex = Math.ceil(newIndex);
          } else {
            newIndex = Math.round(newIndex);
          }

          set({
            index: newIndex,
            immediate: false,
          });

          return 0;
        }

        set({
          index: newIndex,
          immediate: true,
        });

        return itemWidth;
      },
      onDragEnd: (state: any) => {
        onEnd(state.event);
      },
    },
    {
      domTarget: ref,
      drag: {
        filterTaps: true,
        axis: 'x',
        initial: (): Vector2 => {
          const itemWidth = calcItemWidth(ref, count, margin);

          return [-itemWidth * index.getValue(), 0];
        },
      },
    },
  );

  useEffect((): undefined | (() => void) => {
    if (!enabled) {
      return undefined;
    }

    return bind() as () => void;
  }, [bind, enabled, ref]);
}
