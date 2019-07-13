import * as React from 'react';

import * as bezier from 'bezier-easing';

import { Slider } from './Slider';

const DURATION = 350;

const standardEasing = bezier(0.4, 0.0, 0.2, 1);

interface Props {
  children?: React.ReactNode;
  className?: string;
  count: number;
  margin: number;
  style?: React.CSSProperties;
  onChange?: (index: number) => void;
}

interface State {
  index: number;
}

interface Animation {
  from: number;
  raf: number;
  start?: number;
  to: number;
}

export class PietileCarousel extends React.Component<Props, State> {
  static defaultProps = {
    count: 1,
    margin: 0,
  };

  private animation: Animation | null = null;

  state: Readonly<State> = {
    index: 0,
  };

  componentDidMount() {
    if (!this.props.onChange) {
      return;
    }

    this.props.onChange(this.state.index);
  }

  componentDidUpdate(_: Props, prevState: State) {
    if (prevState.index === this.state.index) {
      return;
    }

    if (!this.props.onChange) {
      return;
    }

    const prevChildrenCount = React.Children.count(this.props.children);
    const childrenCount = React.Children.count(this.props.children);

    const prevIndex =
      ((Math.round(prevState.index) % prevChildrenCount) + prevChildrenCount) % prevChildrenCount;
    const index = ((Math.round(this.state.index) % childrenCount) + childrenCount) % childrenCount;
    if (prevIndex === index) {
      return;
    }

    this.props.onChange(index);
  }

  componentWillUnmount() {
    this._stop();
  }

  // Animation step
  _move = (timestamp: number) => {
    if (!this.animation) {
      return;
    }

    const { start } = this.animation;

    if (!start) {
      // First step
      this.setState({
        index: this.animation.from,
      });

      this.animation.start = timestamp;
      this.animation.raf = requestAnimationFrame(this._move);

      return;
    }

    const progress = (timestamp - start) / DURATION;

    if (progress >= 1) {
      // Last step
      this.setState({
        index: this.animation.to,
      });

      this.animation = null;

      return;
    }

    const { to, from } = this.animation;

    this.setState({
      index: from + standardEasing(progress) * (to - from),
    });

    this.animation.raf = requestAnimationFrame(this._move);
  };

  // Run animation in reverse
  _moveBack = () => {
    if (!this.animation) {
      return;
    }

    const { from } = this.animation;

    this._stop();

    this.animation = {
      from: this.state.index,
      to: from,
      raf: requestAnimationFrame(this._move),
    };
  };

  // Stop animation
  _stop = () => {
    if (!this.animation) {
      return;
    }

    if (this.animation.raf) {
      cancelAnimationFrame(this.animation.raf);
    }

    this.animation = null;
  };

  moveRight = () => {
    if (this.animation) {
      if (this.animation.from > this.animation.to) {
        // We are currently in move to opposite direction, so just move back
        this._moveBack();
      }

      return;
    }

    this.animation = {
      from: this.state.index,
      to: this.state.index + 1,
      raf: requestAnimationFrame(this._move),
    };
  };

  moveLeft = () => {
    if (this.animation) {
      if (this.animation.from < this.animation.to) {
        // We are currently in move to opposite direction, so just move back
        this._moveBack();
      }

      return;
    }

    this.animation = {
      from: this.state.index,
      to: this.state.index - 1,
      raf: requestAnimationFrame(this._move),
    };
  };

  moveTo = (index: number) => {
    const childrenCount = React.Children.count(this.props.children);
    const currentIndex =
      ((Math.round(this.state.index) % childrenCount) + childrenCount) % childrenCount;

    this.animation = {
      from: this.state.index,
      to: this.state.index + index - currentIndex,
      raf: requestAnimationFrame(this._move),
    };
  };

  render() {
    const { children, className, style = {}, margin, count } = this.props;
    const { index } = this.state;

    const containerStyle = {
      ...style,
      overflow: 'hidden',
    };

    const childrenCount = React.Children.count(this.props.children);
    const tail = childrenCount - count;
    const frameWidth = 100 / React.Children.count(this.props.children);

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
      <div style={containerStyle} className={className}>
        <Slider style={sliderStyle} startIndex={startIndex} margin={margin} count={count}>
          {children}
        </Slider>
      </div>
    );
  }
}
