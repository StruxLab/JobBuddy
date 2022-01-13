import React from 'react';
import ReactDOM from 'react-dom';
import SearchItemControlPanel from '../components/ControlPanel/TilePanel.jsx';

export default function processTile(node) {
  node.dataset.jobbuddyAttached = true;
  const jobBuddyListItemPanel = document.createElement('div');
  jobBuddyListItemPanel.className = 'jb-control-panel';
  node.prepend(jobBuddyListItemPanel);
  ReactDOM.render(<SearchItemControlPanel node={node} />, jobBuddyListItemPanel);
  node.setAttribute('style', 'background-color: #ffbebe; border-radius: 5px; border: 1px solid #ffa9a9;');
}
