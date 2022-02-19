
import router, { hookOnNode } from './models/router';
import axios from 'axios';

let location: (Location | null) = null;

const callback: MutationCallback = async (
  mutationList,
) => {
  if (!location) {
    const nodes = document.getElementsByClassName('job-card-container');
    const jobIdsToCheck = [];
    for (let i = 0; i < nodes.length; i += 1) {
      console.log(nodes[i]);
      jobIdsToCheck.push((nodes[i] as HTMLElement).dataset.jobId);
    }
    console.log(jobIdsToCheck);
    for (let i = 0; i < nodes.length; i += 1) {
      hookOnNode((nodes[i] as HTMLElement));
    }
  }
  if (location?.href !== window.location.href) {
    location = { ...window.location };
  }
  router(window.location, mutationList);
};
const targetNode = document.getElementsByClassName('application-outlet')[0]
  || document.body;
const config = {
  attributes: false,
  childList: true,
  subtree: true
};
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
