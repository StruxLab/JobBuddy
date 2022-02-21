interface ProcessList {
  (arg0: HTMLElement): void;
}

const processList: ProcessList = (node) => {
  const renderedPostings = node.getElementsByClassName('jobs-search-results__list-item');
  const jobIds: string[] = [];
  for (let i = 0; i < renderedPostings.length; i += 1) {
    const jobPostElement = renderedPostings[i] as HTMLElement;
    const postId = jobPostElement
      .dataset
      .occludableEntityUrn
      .split(':')
      .pop();
    if (jobPostElement.dataset.jobPostingId === postId) continue;
    jobPostElement.dataset.jobPostingId = postId;
    jobIds.push(postId);
  }
  console.log(jobIds);
};

export default processList;
