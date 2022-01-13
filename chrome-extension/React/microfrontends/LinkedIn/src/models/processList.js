export default function processList(node) {
  node.dataset.jobbuddyAttached = true;
  const renderedPostings = node.getElementsByClassName('jobs-search-results__list-item');
  const jobIds = [];
  for (let i = 0; i < renderedPostings.length; i += 1) {
    const postId = renderedPostings[i].dataset.occludableEntityUrn.split(':').pop();
    jobIds.push(postId);
  }
  console.log(jobIds);
}
