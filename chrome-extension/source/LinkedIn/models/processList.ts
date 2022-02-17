interface ProcessList {
  (arg0: HTMLElement): void;
}

const processList: ProcessList = (node) => {
  node.dataset.jobbuddyAttached = 'true';
  const renderedPostings = node.getElementsByClassName('jobs-search-results__list-item');
  console.log('here');
  console.log(renderedPostings);
  const jobIds = [];
  for (let i = 0; i < renderedPostings.length; i += 1) {
    const postId = (renderedPostings[i] as HTMLElement).dataset.occludableEntityUrn.split(':').pop();
    jobIds.push(postId);
  }
  console.log(jobIds);
};

export default processList;
