import ReactDOM from 'react-dom';
import React from 'react';
import TileControlPanel from '../components/TileControlPanel';

interface ProcessTile {
  (arg0: HTMLElement): void;
}

const processTile: ProcessTile = (node) => {
  node.dataset.jobbuddyAttached = 'true';
  const jobBuddyListItemPanel = document.createElement('div');
  jobBuddyListItemPanel.className = 'jb-control-panel';
  node.prepend(jobBuddyListItemPanel);
  node.setAttribute('style', 'background-color: #ffbebe; border-radius: 5px; border: 1px solid #ffa9a9;');
  ReactDOM.render(
    <TileControlPanel node={node} />,
    jobBuddyListItemPanel
  );
}

export default processTile;
