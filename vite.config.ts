/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig(({ command }) => {
  return {
    root: command === 'serve' ? path.resolve(__dirname, 'example') : undefined,
    build: {
      sourcemap: true,
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'PietileCarousel',
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['react', 'framer-motion'],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            react: 'React',
            'framer-motion': 'framerMotion',
          },
        },
      },
    },
    plugins: [dts()],
  };
});
