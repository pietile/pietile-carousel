import React, { useEffect, useRef } from 'react';

import PietileCarousel from 'pietile-carousel';

export function App() {
  const carousel = useRef<PietileCarousel>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!carousel.current) {
        return;
      }

      carousel.current.moveRight();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const carouselStyle = {
    width: 350,
    height: 100,
  };

  const itemStyle = {
    width: '100%',
    height: '100%',
  };

  return (
    <div className="app">
      <h1 className="header">Pietile Carousel</h1>

      <PietileCarousel ref={carousel} style={carouselStyle} count={3} margin={16}>
        <div style={{ ...itemStyle, backgroundColor: 'red' }} />
        <div style={{ ...itemStyle, backgroundColor: 'orange' }} />
        <div style={{ ...itemStyle, backgroundColor: 'yellow' }} />
        <div style={{ ...itemStyle, backgroundColor: 'green' }} />
        <div style={{ ...itemStyle, backgroundColor: 'blue' }} />
        <div style={{ ...itemStyle, backgroundColor: 'indigo' }} />
        <div style={{ ...itemStyle, backgroundColor: 'violet' }} />
      </PietileCarousel>
    </div>
  );
}
