# Pietile Carousel

[![npm version](https://badgen.net/bundlephobia/minzip/pietile-carousel)](https://bundlephobia.com/result?p=pietile-carousel@latest)

React carousel which tries to minimize amount of repaints and be simple in use.

<img src="https://media.giphy.com/media/1gRsY9qTHyJrYTxGYS/giphy.gif" />

## Features

- Doesn't require to specify items dimensions (pure css solution)
- Tries to rely on translates as much as possible for movements (zero paints in best cases)
- Arbitary number of visible items
- Сyclicality
- Tiny (2.1kB gzipped)

## Usage

Every item is wrapped in container where it can layout it's content. The size of container depends on the size of carousel and amount of visible items. You can use any styling system you want to set styles. Get ref and user moveLeft/moveRight/moveTo methods for scroll.

## Example

```jsx
import React, { useRef, useEffect } from 'react';

import PietileCarousel from 'PietileCarousel';

function App() {
  const carousel = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!carousel.current) {
        return;
      }

      carousel.current.moveLeft();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const carouselStyle = {
    width: 150,
    height: 100,
  };

  const itemStyle = {
    width: '100%',
    height: '100%',
  };

  return (
    <PietileCarousel ref={carousel} style={carouselStyle}>
      <div style={{ ...itemStyle, backgroundColor: 'red' }} />
      <div style={{ ...itemStyle, backgroundColor: 'orange' }} />
      <div style={{ ...itemStyle, backgroundColor: 'yellow' }} />
    </PietileCarousel>
  );
}
```

## API

### Properties

| name      | description                                |     type | default |
| :-------- | :----------------------------------------- | -------: | :------ |
| children  | Components rendered in carousel (required) |     Node | -       |
| className | CSS class                                  |   string | -       |
| count     | Amount of visible items                    |   number | 1       |
| margin    | Margin between items                       |   number | 0       |
| style     | Style object                               |   Object | -       |
| onChange  | Callback when index changes                | Function | -       |

### Methods

| name            | description     |
| :-------------- | :-------------- |
| moveLeft()      | Scroll left     |
| moveRight()     | Scroll left     |
| scrollTo(index) | Scroll to index |

## License

Pietile Carousel is MIT License.
