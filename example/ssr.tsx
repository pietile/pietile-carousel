import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { App } from './App';

export function render(): string {
  return ReactDOMServer.renderToString(<App />);
}
