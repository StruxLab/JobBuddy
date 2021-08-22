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

    const createButton = (title, handler) => {
        const button = document.createElement('button');
        button.append(document.createTextNode(title));
        button.addEventListener('click', handler);
        return button;
    };
    const someHandler = (event) => {
        console.log(event);
    };

    const createControlPanel = (node) => {
        console.log(node.getAttribute('data-jk'));
        const controls = document.createElement('div');
        controls.className = 'jb-controls';
        controls.append(document.createTextNode('[JobBuddy]'));
        controls.addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();
        });
        controls.append(createButton('test', someHandler));
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
                    attachToTiles();
                    const style = document.createElement('style');
                    style.appendChild(document.createTextNode('.jb-controls {background-color: orange; border-radius: 3px; padding: 10px; font-weight: bold;}'));
                    document.body.appendChild(style);
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