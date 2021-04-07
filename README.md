# Pietile Carousel

[![npm version](https://badgen.net/npm/v/pietile-carousel?color=56C838)](https://www.npmjs.com/package/pietile-carousel)
[![minzipped bundle size](https://badgen.net/bundlephobia/minzip/pietile-carousel)](https://bundlephobia.com/result?p=pietile-carousel)

React carousel based on [Framer Motion](https://github.com/framer/motion) without repaints and simple in use.

## Features

- Doesn't require to specify items dimensions (pure css solution)
- Relies on translates for movements (zero paints)
- Arbitrary number of visible items
- Сyclicality

## Installation

Using yarn

```sh
yarn add pietile-carousel
```

or using npm

```sh
npm install -S pietile-carousel
```

Pietile Carousel **depends** on [Framer Motion](https://github.com/framer/motion) which is a peer dependency so be sure that it's installed in you project (if not then install it using `yarn add framer-motion` or `npm install -S framer-motion`)

## Usage

Every item is wrapped in container where it can layout it's content. The size of container depends on the size of carousel and amount of visible items. You can use any styling system you want to set styles. Get ref and use moveLeft/moveRight/moveTo methods for scroll.

## Example

```jsx
import React from 'react';

import PietileCarousel from 'pietile-carousel';

function App() {
  const carouselStyle = {
    width: 150,
    height: 100,
  };

  const itemStyle = {
    width: '100%',
    height: '100%',
  };

  return (
    <PietileCarousel style={carouselStyle}>
      <div style={{ ...itemStyle, backgroundColor: 'red' }} />
      <div style={{ ...itemStyle, backgroundColor: 'orange' }} />
      <div style={{ ...itemStyle, backgroundColor: 'yellow' }} />
    </PietileCarousel>
  );
}
```

## API

### Properties

| name             | description                                |     type | default |
| :--------------- | :----------------------------------------- | -------: | :------ |
| autoplayInterval | How often autoplay happens (0 to disable)  |   number | 0       |
| children         | Components rendered in carousel (required) |     Node | -       |
| className        | CSS class                                  |   string | -       |
| count            | Amount of visible items                    |   number | 1       |
| draggable        | Allow drag                                 |  boolean | true    |
| margin           | Margin between items                       |   number | 0       |
| style            | Style object                               |   Object | -       |
| onChange         | Callback when index changes                | Function | -       |

### Methods

| name           | description              |
| :------------- | :----------------------- |
| slideNext()    | Scroll to next slide     |
| slidePrev()    | Scroll to previous slide |
| slideTo(index) | Scroll to index          |

## Note

Carousel protects nesting links (a-tag's) from undesirable behavior (link click is being processed when the user starts dragging and release the mouse outside of the carousel) by calling `preventDefault` for the correspondent `click` event. If you are handling clicks manually you can check [defaultPrevented](https://developer.mozilla.org/en-US/docs/Web/API/Event/defaultPrevented) when processing your event.

## License

Pietile Carousel is MIT License.
