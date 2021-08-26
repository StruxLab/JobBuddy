(() => {
  const jobCardContainer = document.getElementById('mosaic-provider-jobcards');
  const jbNotifications = document.createElement('div');
  let memStore;
  chrome.storage.local.get(['jb_token'], (result) => {
    memStore = result;
  });
  jbNotifications.id = 'jb-notifications';
  document.getElementsByTagName('html')[0].append(jbNotifications);

  const pushNotification = (title, message, style = 'default') => {
    const notificationOuter = document.createElement('div');
    const notificationTitle = document.createElement('div');
    const notificationMessage = document.createElement('div');
    notificationOuter.append(notificationTitle);
    notificationOuter.append(notificationMessage);
    notificationOuter.className = `jb-notif-outer jb-opaque jb-notif-style-${style}`;
    notificationTitle.className = 'jb-notif-title';
    notificationMessage.className = 'jb-notif-message';
    notificationTitle.innerText = title;
    notificationMessage.innerText = message;
    jbNotifications.append(notificationOuter);
    setTimeout(() => {
      notificationOuter.classList.remove('jb-opaque');
    }, 0);
    setTimeout(() => {
      notificationOuter.className += ' jb-opaque';
    }, 4000);
    setTimeout(() => {
      notificationOuter.remove();
    }, 9000);
  };

  const createStatusDropDown = () => {
    const createOption = (optionText, value) => {
      const option = document.createElement('option');
      option.textContent = optionText;
      option.value = value;
      return option;
    };
    const dropDown = document.createElement('select');
    const jbPostingStatuses = [
      [1, 'Interested'],
      [0, 'Not Interested'],
      [2, 'Applied'],
      [3, 'Interviewing'],
      [4, 'Offer Received'],
      [5, 'No Longer Pursuing'],
    ];
    dropDown.className = 'jb-status-select';
    dropDown.append(createOption('Select a status...', ''));
    jbPostingStatuses.forEach(([id, statusText]) => {
      dropDown.append(createOption(statusText, id));
    });
    // dropDown.innertext2.selected = true;
    // dropDown.addEventListener('change', handleDropDownChange);
    return dropDown;
  };

  const handleSyncClick = ({ target }, dropDown) => {
    const postingNode = target.parentElement.parentElement.parentElement;
    const previousStatus = postingNode.getAttribute('data-jb-status');
    const postingMeta = {
      id: postingNode.getAttribute('data-jk'),
      provider: 0, // Indeed
      status: dropDown.value,
      jobRole: postingNode.getElementsByClassName('jobTitle')[0].lastChild.textContent,
      employer: postingNode.getElementsByClassName('companyName')[0].textContent,
      location: postingNode.getElementsByClassName('companyLocation')[0].textContent,
      salary: postingNode.getElementsByClassName('salary-snippet')[0]?.ariaLabel,
    };
    const responseHandler = ({ status, statusText }) => {
      postingNode.classList.add(`jb-status-${dropDown.value}`);
      pushNotification('Success!', 'Job saved to list!', 'green');
      console.log('nothing before');
      console.log('responsed');
      console.log(status, statusText);
    };
    if (previousStatus === dropDown.value) return;
    postingNode.classList.remove(`jb-status-${previousStatus}`);
    postingNode.setAttribute('data-jb-status', dropDown.value);
    // If previousStatus === null, then send entire payload
    console.log('here', previousStatus);
    if (previousStatus === null || 1) {
      console.log(memStore);
      fetch('http://localhost:40300/v1/tracker', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${memStore.jb_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postingMeta),
        mode: 'cors',
      })
        .then(responseHandler)
        .catch((e) => {
          console.log(e);
          pushNotification('Error!', 'Status failed to save.', 'red');
        });
    } else {
      pushNotification('Success!', 'Tracking status updated', 'green');
    }
    // otherwise if nextstate is null, use delete
    // otherwise just send the status update
    if (dropDown.value) {

    } else {
      confirm('Are you sure you want to remove this listing from your tracker?');
    }
  };

  const createControlPanel = (node) => {
    const controls = document.createElement('div');
    const syncButton = document.createElement('div');
    const span = document.createElement('span');
    const dropDown = createStatusDropDown();
    controls.className = 'jb-controls';
    span.className = 'jb-logo';
    span.innerText = 'JobBuddy';
    controls.append(span);
    controls.addEventListener('click', (event) => {
      event.stopPropagation();
      event.preventDefault();
    });
    controls.append(dropDown);
    syncButton.className = 'jb-sync-button';
    syncButton.style.backgroundImage = `url(${chrome.runtime.getURL('images/sync.png')})`;
    syncButton.addEventListener('click', (event) => handleSyncClick(event, dropDown));
    controls.append(syncButton);
    node.firstChild.prepend(controls);
  };

  const stateChange = ({ data }) => {
    console.log('here');
    console.log(data);
    data.forEach(({ external_id: id, status_code: status }) => {
      const postElement = document.getElementById(`job_${id}`) || document.getElementById(`sj_${id}`);
      postElement.setAttribute('data-jb-status', status);
      postElement.classList.add(`jb-status-${status}`);
    });
  };

  const getJobSaves = (jobIdList) => {
    fetch('http://localhost:40300/v1/tracker/list', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${memStore.jb_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: jobIdList,
          provider: 0,
        }),
        mode: 'cors',
      })
        .then(response => response.json())
        .then(stateChange)
        .catch((e) => {
          console.log(e);
          pushNotification('Error!', 'Status failed to save.', 'red');
        });
  };

  const attachToTiles = () => {
    const jobPostingTiles = document.getElementsByClassName('result');
    const jobIdList = [];
    for (let i = 0; i < jobPostingTiles.length; i += 1) {
      const tile = jobPostingTiles[i];
      createControlPanel(tile);
      jobIdList.push(tile.getAttribute('data-jk'));
    }
    getJobSaves(jobIdList);
  };

  const createMutationObserver = (node) => {
    const callback = (mutationsList, observer) => {
      mutationsList.forEach((mutation) => {
        if (((mutation.attributeName === 'class' && ['uip-micro-content-provider', 'mosaic-provider-jobcards'].includes(mutation.target.id))
        || (mutation.attributeName === 'style' && mutation.target.id === 'vjs-container'))
        && !document.getElementsByClassName('jb-controls').length) {
          attachToTiles();
          observer.disconnect();
        }
      });
    };
    const observer = new MutationObserver(callback);
    observer.observe(node, {
      childList: false,
      attributes: true,
      subtree: true,
    });
  };

  // Initialize
  createMutationObserver(jobCardContainer);
})();
