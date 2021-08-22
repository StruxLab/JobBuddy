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

    const createControlPanel = (node) => {
        console.log(node.getAttribute('data-jk'));
        const controls = document.createElement('jb-controls');
        controls.append(document.createTextNode('test'));
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
                if (mutation.attributeName === 'class' && mutation.target.id === 'mosaic-provider-jobcards') {
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

    const style = document.createElement('style');
    style.appendChild(document.createTextNode('.result {background-color: #000!important}'));
    // document.body.appendChild(style);
})(window);