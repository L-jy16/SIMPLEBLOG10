import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/scss/style.scss';
import App from './App';

import store from './Reducer/store';  // 전체 저장할 수 있는 것
import { Provider } from 'react-redux'; // github, google 로그인 이런 거에 필요(stroe에 저장되어 있는 것을 제공)

import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
