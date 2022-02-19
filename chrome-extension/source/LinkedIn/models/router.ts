import processList from '../models/processList';
import processTile from '../models/processTile';

// const parseParams = (search) => {
//   const parsedParams = {};
//   if (!search) {
//     return {};
//   }
//   const params = search.substring(1).split('&');
//   for (let i = 0; i < params.length; i += 1) {
//     const [paramKey, paramVal] = params[i].split('=');
//     parsedParams[paramKey] = paramVal;
//   }
//   return parsedParams;
// }



interface HookOnNode {
  (arg0: HTMLElement): void;
};
export const hookOnNode: HookOnNode = (mutationNode) => {
  if (mutationNode.classList.contains('jobs-search-results__list')) {
    processList(mutationNode);
  }
  if (mutationNode.classList.contains('job-card-container')) {
    processTile(mutationNode);
  }
  if (mutationNode.classList.contains('jobs-s-apply')) {
    mutationNode.dataset.jobbuddyAttached = 'true';
    (mutationNode.parentNode.parentNode as HTMLElement).setAttribute('style', 'background-color: orange!important');
    (mutationNode.parentNode.parentNode as HTMLElement).classList.add('jobbuddy');
  }
}

interface Router {
  (arg0: Location, arg1: MutationRecord[]): void;
};
const router: Router = ({ pathname, search }, mutationList) => {
  const locationPath = pathname.split('/').slice(1, -1);
  if (locationPath[0] !== 'jobs') return;
  mutationList.forEach((mutation) => {
    const mutationNode = (mutation.target as HTMLElement);
    if (!(['UL', 'DIV'].indexOf(mutationNode.nodeName) > -1)
      || mutationNode.dataset.jobbuddyAttached) return;

    hookOnNode(mutationNode);
  });
}

export default router;
