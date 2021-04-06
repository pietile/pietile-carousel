import { MotionValue, animate } from 'framer-motion';

export function animateSpring(index: MotionValue<number>, to: number): void {
  animate(index, to, {
    bounce: 0,
    type: 'spring',
    velocity: 0,
  });
}
