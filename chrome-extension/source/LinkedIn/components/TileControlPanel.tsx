// Entry point into Tile
import React, { ReactElement } from 'react';

interface TilePanelProps {
  node: HTMLElement,
};
export default function TilePanel({ node }: TilePanelProps): ReactElement {
  const jobMetaData = {
    title: (node.getElementsByClassName('job-card-list__title')[0] as HTMLElement)?.innerText,
    company: (node.getElementsByClassName('job-card-container__company-name')[0] as HTMLElement)?.innerText,
    location: (node.getElementsByClassName('job-card-container__metadata-item')[0] as HTMLElement)?.innerText,
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
