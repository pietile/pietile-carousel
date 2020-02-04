import * as React from 'react';

interface Props {
  readonly children: React.ReactNode;
  readonly count: number;
  readonly margin: number;
  readonly startIndex: number;
  readonly style: React.CSSProperties;
}

export function FrameContainer({ children, startIndex, margin, count, style }: Props): JSX.Element {
  const childrenCount = React.Children.count(children);

  const containerStyle = {
    ...style,

    display: 'flex',
    width: `calc(((100% - ${(count - 1) * margin}px) / ${count} + ${margin}px)*${childrenCount})`,
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
          paddingRight: margin,
        };

        return <div style={frameStyle}>{child}</div>;
      })}
    </div>
  );
}
