import models from './';

function parseParams(search) {
  const parsedParams = {};
  if (!search) {
    return {};
  }
  const params = search.substring(1).split('&');
  for (let i = 0; i < params.length; i += 1) {
    const [paramKey, paramVal] = params[i].split('=');
    parsedParams[paramKey] = paramVal;
  }
  return parsedParams;
}

export default function router({ pathname, search }, mutationList) {
  const locationPath = pathname.split('/').slice(1, -1);
  if (locationPath[0] !== 'jobs') return;

  mutationList.forEach((mutation) => {
    const mutationNode = mutation.target;
    if (!['UL', 'DIV'].includes(mutationNode.nodeName) || mutationNode.dataset.jobbuddyAttached) return;

    if (mutationNode.classList.contains('jobs-search-results__list')) {
      models.processList(mutationNode);
    }
    if (mutationNode.classList.contains('job-card-container')) {
      models.processTile(mutationNode);
    }
    if (mutationNode.classList.contains('jobs-s-apply')) {
      mutationNode.dataset.jobbuddyAttached = true;
      mutationNode.parentNode.parentNode.setAttribute('style', 'background-color: orange!important');
      mutationNode.parentNode.parentNode.classList.add('jobbuddyyy');
    }
  });
}
