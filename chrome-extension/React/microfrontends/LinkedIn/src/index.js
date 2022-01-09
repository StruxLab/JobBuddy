import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

// ReactDOM.render(<App />, document.getElementById('app'));
/*
const app = document.createElement('div');
app.id = 'jobbuddy';
document.getElementsByTagName('body')[0].appendChild(app);
ReactDOM.render(<App />, app);
*/
/* Pages to hook onto:
  /jobs
  /jobs/search
*/
const env = {
  location: null,
};
const callback = (mutationList, observer) => {
  if (env.location?.href !== window.location.href) {
    console.log({
      message: 'Page navigation detected',
      old: env.location?.href,
      new: window.location.href,
    });
    env.location = { ...window.location };
    // router(window.location);
  }
};
const router = ({ pathname, search }) => {
  console.log(pathname);
  console.log(search);
};

const targetNode = document.getElementsByClassName('application-outlet')[0];
const config = { attributes: true, childList: true, subtree: true };
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);

// Base mutation observer to monitor appstate changes
// const targetNode = document.getElementById('global-nav');
// targetNode.classList.add('test');
// const config = { attributes: true, childList: true, subtree: true };