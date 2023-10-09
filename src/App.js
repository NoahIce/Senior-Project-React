import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, redirect } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import SignIn from './SignIn/SignIn'
import ListBoards from './ListBoards/ListBoards';
import axios from 'axios';
import { CLIENT_ID, API_KEY, DISCOVERY_DOC, SCOPES } from './config';
import { useState, setState } from 'react';
import DisplayBoard from './DisplayBoard/DisplayBoard';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import { useEffect } from 'react';
import './App.css'
import AuthenticationService from './services/AuthenticationService';

function App (props) {

    const [test, setTest] = useState(false);
    const [preLoggedIn, setPreLoggedIn] = useState(props.callback)

    useEffect(() => {
        setLoggedIn(preLoggedIn)
        console.log(preLoggedIn)
    }, [preLoggedIn])

     useEffect(() => {
        console.log(access_token);
       
      }, []);
        
    //State
    const [loggedIn, setLoggedIn] = useState(AuthenticationService.isLoggedIn());
    const [tokenClient, setTokenClient] = useState({});
    const [user, setUser] = useState(null);
    const [access_token, setAccess_token] = useState(props.access_token);
    const [selectedBoard, setSelectedBoard] = useState(-1)

    //Method to sign in user
    async function signIn (email) {
        await axios.get("http://localhost:3000/users/readUserByEmail/?email=" + email).then((user) => {
            setUser(user.data[0])
            console.log(email)
            setLoggedIn(true) 
            localStorage.setItem('loggedIn', JSON.stringify(true));
        })

        // eslint-disable-next-line no-undef
        console.log(gapi.client.getToken())
    }
    async function refresh () {
        await axios.get("http://localhost:3000/users/readUserByEmail/?email=" + user.email).then((user) => {
            setUser(user.data[0]) 
            console.log(user.data[0])
        })
    } 
    async function getBoards() {
        // eslint-disable-next-line no-undef
        var access_token = gapi.client.getToken().access_token
        googleSignIn(access_token)
        // eslint-disable-next-line no-undef
        //console.log(access_token)
        return await axios.get("https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + access_token).then(result => {
            console.log(result.data.email)
            signIn(result.data.email)

        })
        
    }

    //Method to sign out user
    function signOut ()  {
        console.log("Signing out")
        //this.setState({ loggedIn: false });
        // eslint-disable-next-line no-undef
        const token = gapi.client.getToken();
        if (token !== null) {
          // eslint-disable-next-line no-undef
          google.accounts.oauth2.revoke(token.access_token);
          // eslint-disable-next-line no-undef
          gapi.client.setToken('');
        }
        localStorage.clear();
        setLoggedIn(false)
          
    }

    function googleSignIn (access_token) {
        console.log("Google sign in: " + access_token)
        setAccess_token(access_token)
        setLoggedIn(true) //uncomment to display <ListBoards></ListBoards>
    }

    //Render
  return (
       <div>
        
        <Router>
            <Routes>
                
                <Route exact path='*' element={<Home getBoards={getBoards} user={user} access_token={access_token} refresh={refresh} selectedBoard={selectedBoard} setSelectedBoard={setSelectedBoard} loggedIn={loggedIn} signIn={signIn} signOut={signOut} tokenClient={props.tokenClient} googleSignIn={googleSignIn}/> } />
                <Route exact path='/SignIn' element={<SignIn onSubmit={signIn} tokenClient={props.tokenClient} googleSignIn={googleSignIn} />} />
                <Route path='/board' element={<PrivateRoute Component={<DisplayBoard  key={selectedBoard} board={selectedBoard} access_token={access_token} refresh={refresh}></DisplayBoard>}/>} /> 
            </Routes>
        </Router>
       </div> 
  )
}

export default App;

