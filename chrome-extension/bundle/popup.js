async function authenticate (event) {
  const redirectUri = chrome.identity.getRedirectURL('oauth2');
  const clientId = '4d815e2740249b35e920';
  const url = `https://github.com/login/oauth/authorize?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  // console.log(url);
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
    console.log(data);
    console.log('token', data);
    chrome.storage.local.set({ jb_token: data }, () => {
      console.log('token set!');
    });
  } catch (e) {
    console.log(e);
  }
};

const logout = event => {
  chrome.identity.clearAllCachedAuthTokens(() => {
    console.log('logged out');
  });
};

document.getElementById('github-oauth').addEventListener('click', authenticate);
document.getElementById('logout').addEventListener('click', logout);
// document.getElementById('logout').addEventListener('click', () => {
//   chrome.storage.local.get(['jb_token'], (result) => {
//     console.log(result);
//   });
// });