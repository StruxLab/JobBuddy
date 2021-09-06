/* eslint-disable no-console */
const Models = {
  location: {
    href: '',
  },
};

Models.InitializeApp = function Initialize() {
  return new Promise((resolve) => {
    const callback = (mutationsList, observer) => {
      for (let i = 0; i < mutationsList.length; i += 1) {
        const mutation = mutationsList[i];
        if (mutation.target.classList.contains('boot-complete')) {
          console.log('Boot Complete');
          observer.disconnect();
          return resolve();
        }
      }
      return null;
    };
    if (document.body.classList.contains('boot-complete')) return resolve();
    this.Observers.base(document.body, callback, {
      attributes: true,
      childList: false,
      subtree: false,
    });
    return null;
  });
};

Models.Observers = {
  watchForPageChange() {
    console.log('Watching');
    const callback = (mutationsList, observer) => {
      if (Models.location.href !== window.location.href) {
        console.log('page change detected');
        Models.location = { ...window.location };
      }
    };
    console.log(this);
    this.base(document.getElementById('global-nav'), callback, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  },
  base(targetNode, callback, options) {
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, options);
    return observer;
  },
};
