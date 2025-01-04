import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

// third-party
import 'react-perfect-scrollbar/dist/css/styles.css';

// style + assets
import '@/assets/scss/style.scss';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
