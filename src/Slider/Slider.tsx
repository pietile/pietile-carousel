import * as React from 'react';

import { ReorderingSlider } from './ReorderingSlider';
import { TransformingSlider } from './TransformingSlider';

interface Props {
  readonly children: React.ReactNode;
  readonly count: number;
  readonly margin: number;
  readonly startIndex: number;
  readonly style: React.CSSProperties;
}

export function Slider(props: Props) {
  const { margin, count, ...rest } = props;

  if (!margin && count === 1) {
    return <TransformingSlider {...rest} />;
  }

  return <ReorderingSlider {...props} />;
}
