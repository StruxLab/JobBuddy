import React from 'react';

export function createAppInstance() {
  return <App />;
}

export default function App({ node }) {
  const jobMetaData = {
    title: node.getElementsByClassName('job-card-list__title')[0].innerText,
    company: node.getElementsByClassName('job-card-container__company-name')[0].innerText,
    location: node.getElementsByClassName('job-card-container__metadata-item')[0].innerText,
  };
  function clickHandler(e) {
    // console.log(el);
    e.stopPropagation();
    console.log(jobMetaData);
  }
  return (
    <div
      style={{
        padding: '5px',
        backgroundColor: 'orange',
      }}
      onClick={clickHandler}
      aria-hidden="true"
    >
      Filler
    </div>
  );
}
