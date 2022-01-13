// Entry point into Tile
import React from 'react';

export default function TilePanel({ node }) {
  const jobMetaData = {
    title: node.getElementsByClassName('job-card-list__title')[0].innerText,
    company: node.getElementsByClassName('job-card-container__company-name')[0].innerText,
    location: node.getElementsByClassName('job-card-container__metadata-item')[0].innerText,
    jobId: node.dataset.jobId,
  };
  function clickHandler(e) {
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
