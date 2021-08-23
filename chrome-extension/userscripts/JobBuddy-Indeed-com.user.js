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
        background-color: #d0f2ff;
        border-radius: 3px;
        padding: 10px;
        font-weight: bold;
        cursor: default;
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
        dropDown.className = 'jb-status-select';
        dropDown.append(createOption('Select a status...', ''));
        dropDown.append(createOption('Interested', 1));
        dropDown.append(createOption('Not Interested', 0));
        dropDown.append(createOption('Applied', 2));
        dropDown.append(createOption('Interviewing', 3));
        dropDown.append(createOption('Offered', 4));
        dropDown.append(createOption('No Longer Pursuing', 5));
        // dropDown.innertext2.selected = true;
        dropDown.addEventListener('change', handleDropDownChange);

        return dropDown;
    };

    const handleDropDownChange = ({ target }) => {
        const classTypes = ['jb-status-0',
                            'jb-status-1',
                            'jb-status-2',
                            'jb-status-3',
                            'jb-status-4',
                            'jb-status-5'];
        event.target.parentElement.parentElement.classList.remove(...classTypes);
        if (target.value) {
            event.target.parentElement.parentElement.classList.add('jb-status-' + target.value);
        }
    };

    const createControlPanel = (node) => {
        console.log(node.getAttribute('data-jk'));
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
        controls.append(createStatusDropDown());
        node.prepend(controls);
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