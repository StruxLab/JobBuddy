/* eslint-disable no-console */
const Models = {
  location: {
    href: '',
  },
};

const Views = {
  StatusSelector() {
    const selector = document.createElement('select');
    selector.className = 'jb-status-select';
    const listOptions = [
      ['', 'Select a status...'],
      [1, 'Interested'],
      [0, 'Not Interested'],
      [2, 'Applied'],
      [3, 'Interviewing'],
      [4, 'Offer Received'],
      [5, 'No Longer Pursuing'],
    ];
    listOptions.forEach(([value, text]) => {
      const option = document.createElement('option');
      option.value = value;
      option.innerText = text;
      selector.append(option);
    });
    return selector;
  },
  ListControls(node) {
    const controlPanel = document.createElement('div');
    controlPanel.className = 'jb-controls';
    controlPanel.addEventListener('click', (event) => {
      event.stopPropagation();
    });
    const logo = document.createElement('span');
    logo.className = 'jb-logo';
    logo.innerText = 'JobBuddy';
    controlPanel.appendChild(logo);
    controlPanel.appendChild(this.StatusSelector());
    return controlPanel;
    // const postingMeta = {
    //   id: postingNode.getAttribute('data-jk'),
    //   provider: 0, // Indeed
    //   status: dropDown.value,
    //   jobRole: postingNode.getElementsByClassName('jobTitle')[0].lastChild.textContent,
    //   employer: postingNode.getElementsByClassName('companyName')[0].textContent,
    //   location: postingNode.getElementsByClassName('companyLocation')[0].textContent,
    //   salary: postingNode.getElementsByClassName('salary-snippet')[0]?.ariaLabel,
    // };
  },
  DetailsControls() {

  },
};

Models.Components = {
  JobListItem(mutationsList) {
    for (let i = 0; i < mutationsList.length; i += 1) {
      const mutation = mutationsList[i];
      for (let j = 0; j < mutation.addedNodes.length; j += 1) {
        const node = mutation.addedNodes[j];
        if (node.classList?.contains('job-card-container') && !node.getElementsByClassName('jb-controls').length) {
          console.log(node);
          node.style.backgroundColor = 'red';
          // node.parentElement.insertBefore(Views.ListControls(node), node);
          node.insertBefore(Views.ListControls(node), node.firstChild);
        }
      }
    }
  },
  JobDetails() {

  },
};

Models.InitializeApp = function Initialize() {
  return new Promise((resolve) => {
    const callback = (mutationsList, observer) => {
      for (let i = 0; i < mutationsList.length; i += 1) {
        const mutation = mutationsList[i];
        if (mutation.target.classList.contains('boot-complete')) {
          console.log('Boot Complete');
          this.location = { ...window.location };
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

Models.Pages = {
  jobsView() {
    console.log('jv');
  },
  jobsSearch() {
    const jobSearchList = document.getElementsByClassName('jobs-search-results__list')[0];
    // We should identify existing rendered nodes before observing
    const existingCards = document.getElementsByClassName('job-card-container');
    for (let i = 0; i < existingCards.length; i += 1) {
      const node = existingCards[i];
      if (!node.getElementsByClassName('jb-controls').length) {
        node.insertBefore(Views.ListControls(node), node.firstChild);
      }
    }
    Models.Observers.base(jobSearchList, Models.Components.JobListItem, {
      attributes: false,
      childList: true,
      subtree: true,
    });
  },
  jobs() {
    console.log('j');
  },
};

Models.Router = function Router() {
  // State Change Handler
  this.location = { ...window.location };
  console.log('Page change detected...');
  console.log('New page: ', this.location.href);
  if (this.location.pathname.includes('/jobs/view/')) {
    // No Sidebar
    Models.Pages.jobsView();
  } else if (this.location.pathname.includes('/jobs/search/') || this.location.pathname.includes('/jobs/collections/')) {
    // Potential Sidebar
    Models.Pages.jobsSearch();
  } else if (this.location.pathname.includes('/jobs/')) {
    // Different View
    Models.Pages.jobs();
  }
  // interactive
  // Routes
  // /jobs/
  // General Jobs
  // Recommended
  // https://www.linkedin.com/jobs/collections/recommended/?currentJobId=2442202966
  // https://www.linkedin.com/jobs/search/?geoId=92000000&keywords=google%20contractor&location=Worldwide
  // https://www.linkedin.com/jobs/search/?f_C=1441%2C17876832%2C791962%2C2374003%2C18950635%2C16140%2C10440912&geoId=92000000
  // https://www.linkedin.com/jobs/view/2662482295/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=IN_NETWORK&refId=5mlafLRBn2WAIa7MfKffug%3D%3D&trackingId=2xYtUzZIletYgk6Ka%2BZabw%3D%3D&trk=flagship3_search_srp_jobs

  // /jobs/search/* ?currentJobId={id}
  // /jobs/search/*
  // window.addEventListener('viewchange', Models.handleRouteChange);
};

Models.Observers = {
  waitForNavMenu() {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (document.getElementById('global-nav')) {
          resolve();
          clearInterval(interval);
        }
      }, 250);
    });
  },
  watchForPageChange() {
    const callback = (mutationsList, observer) => {
      if (Models.location.href !== window.location.href) {
        Models.Router();
      }
    };
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
