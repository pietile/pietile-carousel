import * as React from 'react';

interface Props {
  readonly children: React.ReactNode;
  readonly startIndex: number;
  readonly style: React.CSSProperties;
}

export function TransformingSlider({ children, startIndex, style }: Props) {
  const childrenCount = React.Children.count(children);

  const containerStyle = {
    ...style,
    display: 'flex',
    width: `${100 * childrenCount}%`,
    willChange: 'transform',
  };

  return (
    <div style={containerStyle}>
      {React.Children.map(children, (child, index) => {
        const pos = startIndex <= index ? -startIndex : childrenCount - startIndex;

        const frameStyle: React.CSSProperties = {
          boxSizing: 'border-box',
          flex: 1,
          transform: `translateX(${pos * 100}%)`,
          willChange: 'transform',
        };

        return <div style={frameStyle}>{child}</div>;
      })}
    </div>
  );
}
