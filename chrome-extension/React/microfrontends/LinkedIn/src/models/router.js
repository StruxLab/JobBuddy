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

export default function router ({ pathname, search }) {
  const locationPath = pathname.split('/').slice(1, -1);
  console.log(locationPath);
  const routes = {
    '/jobs/': 'match!',
    '/jobs/search/': 'match!',
    '/jobs/collections/': 'match!',
    '/jobs/collections/recommended/': 'match!',
  };
  console.log(routes);
  console.log(pathname);
  console.log(routes[pathname], pathname);
  console.log(parseParams(search));


};
