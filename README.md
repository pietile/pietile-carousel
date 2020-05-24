# Pietile Carousel

[![npm version](https://badgen.net/npm/v/pietile-carousel?color=56C838)](https://www.npmjs.com/package/pietile-carousel)
[![install size](https://badgen.net/packagephobia/install/pietile-carousel)](https://packagephobia.now.sh/result?p=pietile-carousel)

React carousel based on [react-spring](https://github.com/react-spring/react-spring) and [react-use-gesture](https://github.com/react-spring/react-use-gesture) without repaints and simple in use.

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

| name          | description     |
| :------------ | :-------------- |
| moveLeft()    | Scroll left     |
| moveRight()   | Scroll right    |
| moveTo(index) | Scroll to index |

## License

Pietile Carousel is MIT License.
