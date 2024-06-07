import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './HelloWordApp';
import { FirstApp } from './FirstApp';
import './styles.css'
import { CounterApp } from './CounterApp';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* <App></App> */}
        <FirstApp title ="Hola Soy Jorge" subtitle={120}></FirstApp>
        {/* <CounterApp value={2}/>, */}
    </React.StrictMode>
)
