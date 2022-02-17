// Entry point into Tile
import React, { ReactElement } from 'react';

interface TilePanelProps {
  node: HTMLElement,
};
export default function TilePanel({ node }: TilePanelProps): ReactElement {
  const titleNode: HTMLElement = node.getElementsByClassName('job-card-list__title')[0];
  const jobMetaData = {
    title: titleNode?.innerText,
    company: node.getElementsByClassName('job-card-container__company-name')[0].innerText,
    location: node.getElementsByClassName('job-card-container__metadata-item')[0].innerText,
    jobId: node.dataset.jobId,
  };
  function clickHandler(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    console.log(jobMetaData);
  }
  return (
    <div
      style={{
        padding: '5px',
        backgroundColor: 'orange',
        marginBottom: '9px',
        // borderRadius: '10px 10px 0 0',
      }}
      onClick={clickHandler}
      aria-hidden="true"
    >
      JobBuddy
    </div>
  );
}