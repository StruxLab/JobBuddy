// ==UserScript==
// @name         JobBuddy
// @namespace    https://jobbuddy.mchan.me
// @version      0.1.0
// @description  Job Searching Tool
// @author       Michael Chan
// @match        https://*.indeed.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-start

// ==/UserScript==

// https://www.indeed.com/viewjob?jk={{jobkey}}

(function(global) {
    'use strict';
    let reactDom;
    let styles;

    const defineStyles = () => {
        styles = document.createElement('style');
        document.body.appendChild(styles);
        styles.innerText = `
        .jb-logo {
        background-color: #244a83;
        padding: 5px 9px;
        color: #fff;
        border-radius: 5px;
        margin-right:10px;
        }
        .jb-controls {
        display: flex;
        background-color: #d0f2ff;
        border-radius: 3px;
        padding: 10px;
        font-weight: bold;
        cursor: default;
        align-items: center;
        }
        .jb-status-select {
        margin-right: 8px;
        }
        .jb-sync-button {
        background-image: url('https://jobbuddy.mchan.me/assets/images/sync.png');
        height: 23px;
        width: 23px;
        cursor: pointer;
        background-size: contain;
        }
        .jb-status-0 {
        background-color: #b4b4b4!important;
        }
        .jb-status-0 .jb-controls {
        background-color: #565656;
        }
        .jb-status-1 {
        background-color: #def0ff!important;
        }
        .jb-status-1 .jb-controls {
        background-color: #5fb5ff;
        }
        .jb-status-2 {
        background-color: #f0ffea!important;
        }
        .jb-status-2 .jb-controls {
        background-color: #89df74;
        }
        .jb-status-3 {
        background-color: #fff9db!important;
        }
        .jb-status-3 .jb-controls {
        background-color: #ffd60f;
        }
        .jb-status-4 {
        background-color: #e1ffce!important;
        }
        .jb-status-4 .jb-controls {
        background-color: #4bb000;
        }
        .jb-status-5 {
        background-color: #ffc8c8!important;
        }
        .jb-status-5 .jb-controls {
        background-color: #ff8787;
        }`;
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
        console.log(target.parentElement.parentElement);
        const classTypes = ['jb-status-0',
                            'jb-status-1',
                            'jb-status-2',
                            'jb-status-3',
                            'jb-status-4',
                            'jb-status-5'];
        target.parentElement.parentElement.classList.remove(...classTypes);
        if (dropDown.value) {
            target.parentElement.parentElement.classList.add('jb-status-' + dropDown.value);
        } else {
            confirm('Are you sure you want to remove this listing from your tracker?');
        }
    };

    const createControlPanel = (node) => {
        // console.log(node.getAttribute('data-jk'));
        const controls = document.createElement('div');
        controls.className = 'jb-controls';
        const span = document.createElement('span');
        span.className = 'jb-logo';
        span.innerText = 'JobBuddy';
        controls.append(span);
        controls.addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();
        });
        // Create Dropdown
        const dropDown = createStatusDropDown();
        controls.append(dropDown);
        // Create Sync Button
        const syncButton = document.createElement('div');
        syncButton.className = 'jb-sync-button';
        syncButton.addEventListener('click', (event) => handleSyncClick(event, dropDown));
        controls.append(syncButton);
        node.prepend(controls);
        // console.log(node);
        const postingMeta = {
            jobRole: node.getElementsByClassName('jobTitle')[0].lastChild.textContent,
            employer: node.getElementsByClassName('companyName')[0].textContent,
            location: node.getElementsByClassName('companyLocation')[0].textContent,
            id: node.getAttribute('data-jk'),
            salary: node.getElementsByClassName('salary-snippet')[0]?.ariaLabel,
            provider: 0, // Indeed
        };
        console.table(postingMeta);
    };

    const attachToTiles = () => {
        const jobPostingTiles = reactDom.getElementsByClassName('result');
        for (let i = 0; i < jobPostingTiles.length; i++) {
            const tile = jobPostingTiles[i];
            createControlPanel(tile);
            // console.log(tile);
            // Backlog WIP
            // const tags = tile.querySelector('.jobTitle .topLeft');
            //console.log(tags);
        }
    };

    const createMutationObserver = (node) => {
        const callback = (mutationsList, observer) => {
            mutationsList.forEach(mutation => {
                if (mutation.attributeName === 'class' &&
                    mutation.target.id === 'mosaic-provider-jobcards' &&
                    !reactDom.getElementsByClassName('jb-controls').length)
                {
                    defineStyles();
                    attachToTiles();
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

    document.addEventListener("DOMContentLoaded", () => {
        if (global.document.body.getAttribute('data-tn-application') === 'jasx') {
            reactDom = global.document;
            const jobCardContainer = reactDom.getElementById('mosaic-provider-jobcards');
            createMutationObserver(jobCardContainer);
        }
    });
})(window);