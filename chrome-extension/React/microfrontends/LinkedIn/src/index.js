import React from 'react';
import ReactDOM from 'react-dom';
import SearchItemControlPanel from './components/ControlPanel/TilePanel.jsx';
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

    if (mutationNode.classList.contains('jobs-search-results__list')) {
      console.log('here');
      const renderedPostings = document.getElementsByClassName('job-card-container');
      console.log(renderedPostings);
      for (let i = 0; i < renderedPostings.length; i += 1) {
        console.log(renderedPostings[i]);
      }
    }
    if (mutationNode.classList.contains('job-card-container')) {
      mutationNode.dataset.jobbuddyAttached = true;
      const jobBuddyListItemPanel = document.createElement('div');
      jobBuddyListItemPanel.className = 'jb-control-panel';
      mutationNode.prepend(jobBuddyListItemPanel);
      ReactDOM.render(<SearchItemControlPanel node={mutationNode} />, jobBuddyListItemPanel);
      mutationNode.style.backgroundColor = 'red';
    }
    // if (mutationNode.classList.contains('jobs-search__job-details--container')) {
    //   console.log('match!!!');
    //   mutationNode.setAttribute('style', 'background-color: orange!important');
    //   mutationNode.dataset.jobbuddyAttached = true;
    //   mutationNode.classList.add('jobbuddyyy');
    // }
    if (mutationNode.classList.contains('jobs-s-apply')) {
      mutationNode.dataset.jobbuddyAttached = true;
      mutationNode.parentNode.parentNode.setAttribute('style', 'background-color: orange!important');
      mutationNode.parentNode.parentNode.classList.add('jobbuddyyy');
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
