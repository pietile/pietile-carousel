import * as React from 'react';

import { FrameContainer } from './FrameContainer';

type Props = {
  children?: React.ReactNode;
  count: number;
  index: number;
  margin: number;
  style?: React.CSSProperties;
  innerRef: any;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function Slider({
  children,
  style = {},
  margin,
  count,
  index,
  innerRef,
  ...props
}: Props): JSX.Element {
  const containerStyle = {
    ...style,
    overflow: 'hidden',
  };

  const childrenCount = React.Children.count(children);
  const tail = childrenCount - count;
  const frameWidth = 100 / React.Children.count(children);

  let startIndex;
  let translate;
  if (!tail) {
    startIndex = 0;
    translate = 0;
  } else if (index >= 0) {
    startIndex = (Math.floor(index / tail) * tail) % childrenCount;
    translate = frameWidth * (index % tail);
  } else {
    startIndex =
      (childrenCount + ((Math.ceil(index / tail) * tail - tail) % childrenCount)) % childrenCount;
    translate = frameWidth * (tail + (index % tail));
  }

  const sliderStyle = {
    height: '100%',
    transform: `translateX(${-translate}%)`,
    willChange: 'transform',
  };

  return (
    <div ref={innerRef} style={containerStyle} {...props}>
      <FrameContainer style={sliderStyle} startIndex={startIndex} margin={margin} count={count}>
        {children}
      </FrameContainer>
    </div>
  );
}
