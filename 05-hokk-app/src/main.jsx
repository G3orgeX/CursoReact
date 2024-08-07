import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { HooksApp } from './HooksApp';
import { CounterApp } from './01-useState/CounterApp';
import { CounterWithCustomHooks } from './01-useState/CounterWithCustomHooks';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <HooksApp></HooksApp> */}
    {/* <CounterApp></CounterApp> */}
    <CounterWithCustomHooks></CounterWithCustomHooks>
  </React.StrictMode>,
)
