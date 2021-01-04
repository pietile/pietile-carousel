import * as React from 'react';

import { OpaqueInterpolation, animated } from 'react-spring';

interface Props {
  children: React.ReactNode;
  childrenCount: number;
  index: number;
  margin: number;
  startIndex: OpaqueInterpolation<number>;
}

export function ItemWrapper({
  children,
  childrenCount,
  index,
  margin,
  startIndex,
}: Props): JSX.Element {
  const pos = startIndex.interpolate(
    (value) => (value <= index ? -value : childrenCount - value) * 100,
  );

  const style: React.CSSProperties = {
    boxSizing: 'border-box',
    flex: 1,
    transform: pos.interpolate((value) => `translateX(${value}%)`),
    willChange: 'transform',
    paddingRight: margin,
  };

  return <animated.div style={style}>{children}</animated.div>;
}
