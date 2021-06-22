// @ts-check
// import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../assets/application.scss';
import 'core-js/stable/index';
import 'regenerator-runtime/runtime';
import init from './init';
import socket from './socket';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(
  init(socket),
  document.getElementById('chat'),
);
