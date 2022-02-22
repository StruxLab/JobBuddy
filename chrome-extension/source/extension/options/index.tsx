import React from 'react';
import ReactDOM from 'react-dom';

const redirectUri = chrome.identity.getRedirectURL('oauth2');
console.log(redirectUri);

const App = () => (
  <div>test</div>
);

ReactDOM.render(<App />, document.getElementById('app'));