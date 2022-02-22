import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const redirectUri = chrome.identity.getRedirectURL('oauth2');
console.log(redirectUri);

ReactDOM.render(<App />, document.getElementById('app'));
