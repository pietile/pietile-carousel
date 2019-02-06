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
  startIndex: number;
  sliderOffset: number;
}

interface Animation {
  from: number;
  index: number;
  raf?: number;
  start?: number;
  to: number;
}

export class PietileCarousel extends React.Component<Props, State> {
  static defaultProps = {
    count: 1,
    margin: 0,
  };

  private index = 0;

  private animation: Animation | null = null;

  state: Readonly<State> = {
    startIndex: 0,
    sliderOffset: 0,
  };

  componentWillUnmount() {
    this._stop();
  }

  // Width of one frame in %
  _getFrameWidth = (props: Props) => {
    return 100 / React.Children.count(props.children);
  };

  // Animation step
  _move = (timestamp: number) => {
    if (!this.animation) {
      return;
    }

    const { start } = this.animation;

    if (!start) {
      // First step
      this.animation.start = timestamp;
      this.animation.raf = requestAnimationFrame(this._move);

      return;
    }

    const progress = (timestamp - start) / DURATION;

    if (progress >= 1) {
      // Last step
      this.setState({
        sliderOffset: this.animation.to,
      });

      this.index = this.animation.index;

      if (this.props.onChange) {
        this.props.onChange(this.animation.index);
      }

      this.animation = null;

      return;
    }

    const { to, from } = this.animation;

    this.setState({
      sliderOffset: from + standardEasing(progress) * (to - from),
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
      index: this.index,
      from: this.state.sliderOffset,
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
      index: this.index ? this.index - 1 : React.Children.count(this.props.children) - 1,
      from: -this._getFrameWidth(this.props),
      to: 0,
    };

    this.setState(
      {
        startIndex: this.animation.index,
        sliderOffset: this.animation.from,
      },
      () => {
        if (!this.animation) {
          return;
        }

        this.animation.raf = requestAnimationFrame(this._move);
      },
    );
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
      index: (this.index + 1) % React.Children.count(this.props.children),
      from: 0,
      to: -this._getFrameWidth(this.props),
    };

    this.setState(
      {
        startIndex: this.index,
        sliderOffset: this.animation.from,
      },
      () => {
        if (!this.animation) {
          return;
        }

        this.animation.raf = requestAnimationFrame(this._move);
      },
    );
  };

  render() {
    const { children, className, style = {}, margin, count } = this.props;
    const { sliderOffset, startIndex } = this.state;

    const containerStyle = {
      ...style,
      overflow: 'hidden',
    };

    const sliderStyle = {
      height: '100%',
      transform: `translateX(${sliderOffset}%)`,
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
