const ghSignInButton = document.getElementById('github-oauth');

async function authenticate (event) {

  ghSignInButton.textContent = 'Signing In...';
  const redirectUri = chrome.identity.getRedirectURL('oauth2');
  const clientId = '4d815e2740249b35e920';
  const url = `https://github.com/login/oauth/authorize?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  const launchWebAuth = new Promise((resolve, reject) => {
    chrome.identity.launchWebAuthFlow({
      url: `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`,
      interactive: true,
    }, (responseUrl) => {
      const url = new URL(responseUrl);
      fetch(`http://localhost:40300/v1/oauth/github/handler${url.search}`, {
        mode: 'cors'
      })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(e => reject());
    });
  });
  try {
    const { data } = await launchWebAuth;
    console.log('token', data);
    chrome.storage.local.set({ jb_token: data }, () => {
      console.log('User token set!');
    });
  } catch (e) {
    console.log(e);
  }
};

const logout = event => {
  chrome.identity.clearAllCachedAuthTokens(() => {
    console.log('logged out');
  });
  chrome.storage.local.remove('jb_token', () => {
    console.log('token removed');
  });
};

const getKeyFromStorage = (keys) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, (data) => {
      resolve(data);
    });
  });

};
(async () => {
  const tokenFromStorage = await getKeyFromStorage(['jb_token']);
  console.log(tokenFromStorage.jb_token);
  if (tokenFromStorage.jb_token) {
    ghSignInButton.remove();
    document.getElementById('logout').addEventListener('click', logout);
  } else {
    document.getElementById('github-oauth').addEventListener('click', authenticate);
  }
})();




