import * as React from 'react';

import { OpaqueInterpolation, SetUpdateFn } from 'react-spring';

import { SpringValue } from './types';

interface Controls {
  stop: () => void;
  start: () => void;
}

interface Config {
  index: OpaqueInterpolation<number>;
  set: SetUpdateFn<SpringValue>;
  interval: number;
}

export function useAutoplay({ index, set, interval }: Config): Controls {
  const timer = React.useRef<number>(0);

  const stop = React.useCallback(() => {
    if (!timer.current) {
      return;
    }

    window.clearInterval(timer.current);
    timer.current = 0;
  }, [timer]);

  const start = React.useCallback(() => {
    stop();

    if (!interval) {
      return;
    }

    timer.current = window.setInterval(() => {
      set({ index: Math.ceil(index.getValue() + 1) });
    }, interval);
  }, [index, interval, timer, set, stop]);

  React.useEffect(() => {
    start();

    return (): void => {
      stop();
    };
  }, [start, stop]);

  return { start, stop };
}
