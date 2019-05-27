import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './views/App';
import { CookiesProvider } from 'react-cookie';
import './index.css';

ReactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  document.getElementById('root'));
