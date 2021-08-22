// ==UserScript==
// @name         JobBuddy
// @namespace    https://jobbuddy.mchan.me
// @version      0.1.0
// @description  Job Searching Tool
// @author       Michael Chan
// @match        https://*.indeed.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-idle

// ==/UserScript==

(function() {
    'use strict';
    window.onload = () => {
        const jobPostingTile = document.getElementsByClassName('result');
        for (let i = 0; i < jobPostingTile.length; i++) {
            const jobPost = jobPostingTile[i];
            jobPost.addEventListener('onmouseover', (event) => {
                console.log('hovered');
            });
            const controls = document.createElement('div');
            controls.className = 'jb-controls';
            controls.append(document.createTextNode('test'));
            jobPostTile[i].childNodes[0].prepend(controls);
            console.log(jobPost.getAttribute('data-jk'));
            // debugger;
        }

    };

    const style = document.createElement('style');
    style.appendChild(document.createTextNode('.result {background-color: #000!important}'));
    // document.body.appendChild(style);

})();