(function(global) {
  'use strict';
  let reactDom;

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
      const classTypes = ['jb-status-0',
                          'jb-status-1',
                          'jb-status-2',
                          'jb-status-3',
                          'jb-status-4',
                          'jb-status-5'];
      const responseHandler = ({ status, statusText }) => {
        console.log('responsed');
          console.log(status, statusText);
      };
      target.parentElement.parentElement.classList.remove(...classTypes);
      if (dropDown.value) {
          fetch('https://jobbuddy.mchan.me/api/hello', {
              method: 'POST',
              body: JSON.stringify({test: 'test'}),
              mode: 'cors',
              onload: responseHandler,
          });
          target.parentElement.parentElement.classList.add('jb-status-' + dropDown.value);
      } else {
          confirm('Are you sure you want to remove this listing from your tracker?');
      }
  };

  const createControlPanel = (node) => {
      const controls = document.createElement('div');
      const syncButton = document.createElement('div');
      const span = document.createElement('span');
      const dropDown = createStatusDropDown();
      const postingMeta = {
          jobRole: node.getElementsByClassName('jobTitle')[0].lastChild.textContent,
          employer: node.getElementsByClassName('companyName')[0].textContent,
          location: node.getElementsByClassName('companyLocation')[0].textContent,
          id: node.getAttribute('data-jk'),
          salary: node.getElementsByClassName('salary-snippet')[0]?.ariaLabel,
          provider: 0, // Indeed
      };
      controls.className = 'jb-controls';
      span.className = 'jb-logo';
      span.innerText = 'JobBuddy';
      controls.append(span);
      controls.addEventListener('click', (event) => {
          event.stopPropagation();
          event.preventDefault();
      });
      console.table(postingMeta);
      controls.append(dropDown);
      syncButton.className = 'jb-sync-button';
      syncButton.style.backgroundImage = `url(${chrome.runtime.getURL("images/sync.png")})`;
      syncButton.addEventListener('click', (event) => handleSyncClick(event, dropDown));
      controls.append(syncButton);
      node.prepend(controls);

  };

  const attachToTiles = () => {
      const jobPostingTiles = reactDom.getElementsByClassName('result');
      for (let i = 0; i < jobPostingTiles.length; i++) {
          const tile = jobPostingTiles[i];
          createControlPanel(tile);
      }
  };

  const createMutationObserver = (node) => {
      const callback = (mutationsList, observer) => {
          mutationsList.forEach(mutation => {
            console.log(mutation);
              if (mutation.attributeName === 'class' &&
                  mutation.target.id === 'mosaic-provider-jobcards' &&
                  !reactDom.getElementsByClassName('jb-controls').length)
              {
                console.log('here');
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

  if (global.document.body.getAttribute('data-tn-application') === 'jasx') {
    reactDom = global.document;
    const jobCardContainer = reactDom.getElementById('mosaic-provider-jobcards');
    console.log(jobCardContainer);
    createMutationObserver(jobCardContainer);
  }
})(window);