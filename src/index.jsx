import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import '../assets/application.scss';
import 'core-js/stable/index';
import 'regenerator-runtime/runtime';
import init from './init';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';

const socket = io();

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(
  init(socket),
  document.getElementById('chat'),
);
