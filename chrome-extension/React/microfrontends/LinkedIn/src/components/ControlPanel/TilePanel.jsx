import React from 'react';

export default function TilePanel({ node }) {
  const jobMetaData = {
    title: node.getElementsByClassName('job-card-list__title')[0].innerText,
    company: node.getElementsByClassName('job-card-container__company-name')[0].innerText,
    location: node.getElementsByClassName('job-card-container__metadata-item')[0].innerText,
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
        marginBottom: '5px',
      }}
      onClick={clickHandler}
      aria-hidden="true"
    >
      JobBuddy
    </div>
  );
}
