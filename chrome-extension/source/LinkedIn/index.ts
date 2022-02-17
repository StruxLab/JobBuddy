
import router from './models/router';

let location: (Location | null) = null;

const callback: MutationCallback = (
  mutationList,
  observer,
) => {
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
