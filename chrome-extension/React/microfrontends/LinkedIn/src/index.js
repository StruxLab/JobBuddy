import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import router from './models/router';

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
    router(window.location);
  }
  mutationList.forEach((mutation) => {
    // console.log(mutation);
    // if (mutation.target?.classList.contains('jobs-search-results__list-item')) {
    if (mutation.target?.classList.contains('job-card-container')) {
      mutation.target.style.backgroundColor = 'red';
      mutation.target.classList.add('hello');
      console.log(mutation);
      console.log(mutation.classList);
    }
  });
};

const targetNode = document.getElementsByClassName('application-outlet')[0] || document.body;
const config = { attributes: false, childList: true, subtree: true };
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);

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
