import React from 'react';
import  ReactDOM  from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import { CLIENT_ID, API_KEY, DISCOVERY_DOC, SCOPES } from './config';
import axios from 'axios';

let tokenClient; //Defined later
let gapiInited = false;
let gisInited = false;
let callback = false;
let access_token = null;




window.gapiLoaded = () => {
  console.log("gapiLoaded")
  
  // eslint-disable-next-line no-undef
  gapi.load('client', initializeGapiClient);
  gapiInited = true;
  maybeRender()
  maybeRequest()
}

async function initializeGapiClient() {
// eslint-disable-next-line no-undef
      await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOC,
      })
    }

window.gisLoaded = async () => {
  console.log("gisLoaded")

  // eslint-disable-next-line no-undef
  tokenClient = await google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: ''
    // defined later
  })

  tokenClient.callback = async (resp) => {
    console.log("callback")
    if (resp.error !== undefined) {
      throw (resp);
    }
    else {
      callback = true;
      // eslint-disable-next-line no-undef
      access_token = gapi.client.getToken().access_token;
      maybeRender();
    }
    console.log(callback)
  }

  console.log(tokenClient)
  //console.log(tokenClient.requestAccessToken())
  gisInited = true;
  maybeRender()
  maybeRequest()
}


function maybeRender() {
  if (gisInited && gapiInited) {
    //console.log(tokenClient)
    const root = ReactDOM.createRoot(document.getElementById('root'));
   
    root.render(
        <App tokenClient={tokenClient} callback={callback} access_token={access_token}></App>
    );
  }
}

function maybeRequest() {
  console.log("hey")
  if (gisInited && gapiInited) {
    if (localStorage.getItem("loggedIn")) {
      tokenClient.requestAccessToken({prompt: ''})
    }
  }
}