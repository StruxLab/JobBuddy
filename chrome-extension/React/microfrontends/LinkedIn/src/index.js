import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import router from './models/router';

const env = {
  location: null,
};
const callback = (mutationList, observer) => {
  if (env.location?.href !== window.location.href) {
    env.location = { ...window.location };
    router(window.location);
  }
  mutationList.forEach((mutation) => {
    const mutationNode = mutation.target;
    if (mutationNode.nodeName !== 'DIV') return;
    if (mutationNode.dataset.jobbuddyAttached) return; // Hooked, prevent repeats/loops
    // console.log('mutationdetected');
    // console.log(mutation);
    // if (mutation.target?.classList.contains('jobs-search-results__list-item')) {
    if (mutationNode.classList.contains('jobs-search-results__list')) {
      const renderedPostings = document.getElementsByClassName('job-card-container');
      for (let i = 0; i < renderedPostings.length; i += 1) {
        console.log(renderedPostings[i]);
      }
    }
    if (mutationNode.classList.contains('job-card-container')) {
      mutationNode.dataset.jobbuddyAttached = true;
      const jobBuddyListItemPanel = document.createElement('div');
      jobBuddyListItemPanel.className = 'jb-control-panel';
      // console.log(mutation.target.dataset);
      mutationNode.prepend(jobBuddyListItemPanel);
      ReactDOM.render(<App />, jobBuddyListItemPanel);
      mutationNode.style.backgroundColor = 'red';
      // console.log(mutation);
      // console.log(mutation.target.classList);
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
