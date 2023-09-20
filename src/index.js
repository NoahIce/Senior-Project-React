import React from 'react';
import  ReactDOM  from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import { CLIENT_ID, API_KEY, DISCOVERY_DOC, SCOPES } from './config';

let tokenClient;
let gapiInited = false;
let gisInited = false;

window.gapiLoaded = () => {
  console.log("gapiLoaded")
  
  // eslint-disable-next-line no-undef
  gapi.load('client', initializeGapiClient);
  gapiInited = true;
  maybeRender()
}

async function initializeGapiClient() {
// eslint-disable-next-line no-undef
      await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOC,
      })
    }

window.gisLoaded = () => {
  console.log("gisLoaded")

  // eslint-disable-next-line no-undef
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: ''
    // defined later
  })

  console.log(tokenClient)
  //console.log(tokenClient.requestAccessToken())
  gisInited = true;
  maybeRender()
}


function maybeRender() {
  if (gisInited && gapiInited) {
    //console.log(tokenClient)
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <App tokenClient={tokenClient}></App>
    );
  }
}