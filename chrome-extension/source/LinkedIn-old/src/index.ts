
import router from './models/router';

interface Env {
  location: null | Location,
};
const env: Env = {
  location: null,
};
const callback = (mutationList, observer) => {
  if (env.location?.href !== window.location.href) {
    env.location = { ...window.location };
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
