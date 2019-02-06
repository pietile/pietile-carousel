import * as React from 'react';

interface Props {
  readonly children: React.ReactNode;
  readonly count: number;
  readonly margin: number;
  readonly startIndex: number;
  readonly style: React.CSSProperties;
}

export function Slider({ children, startIndex, margin, count, style }: Props) {
  const childrenCount = React.Children.count(children);

  const containerStyle = {
    ...style,

    display: 'flex',
    width: `calc(((100% - ${(count - 1) * margin}px) / ${count} + ${margin}px)*${childrenCount})`,
  };

  const frames: React.ReactNode[] = Array(childrenCount);
  React.Children.forEach(children, (child, index) => {
    const pos = startIndex <= index ? -startIndex : childrenCount - startIndex;

    const frameStyle: React.CSSProperties = {
      boxSizing: 'border-box',
      flex: 1,
      marginRight: margin,
    };

    frames[index + pos] = (
      <div key={index} style={frameStyle}>
        {child}
      </div>
    );
  });

  return <div style={containerStyle}>{frames}</div>;
}
