import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import SignIn from './SignIn/SignIn'
import ListBoards from './ListBoards/ListBoards';
import axios from 'axios';
import { CLIENT_ID, API_KEY, DISCOVERY_DOC, SCOPES } from './config';
import { useState, setState } from 'react';

function App (props) {

    //State
    const [loggedIn, setLoggedIn] = useState(false);
    const [tokenClient, setTokenClient] = useState({});
    const [user, setUser] = useState(null);
    const [access_token, setAccess_token] = useState({});

    //Method to sign in user
    async function signIn (email) {
        await axios.get("http://localhost:3000/users/readUserByEmail/?email=" + email).then((user) => {
            setUser(user.data[0])
            setLoggedIn(true) 
        })
    }
    async function refresh () {
        await axios.get("http://localhost:3000/users/readUserByEmail/?email=" + user.email).then((user) => {
            setUser(user.data[0]) 
            console.log(user.data[0])
        })
    } 

    //Method to sign out user
    function signOut ()  {
        console.log("Signing out")
        //this.setState({ loggedIn: false });
    }

    function googleSignIn (access_token) {
        console.log("Google sign in: " + access_token)
        setAccess_token(access_token)
        setLoggedIn(true) //uncomment to display <ListBoards></ListBoards>
    }

    //Render
  return (
       <div>
        <Navbar loggedIn={loggedIn} signIn={signIn} signOut={signOut} tokenClient={props.tokenClient} googleSignIn={googleSignIn}></Navbar>
        {user === null ? "" : <ListBoards key={user} user={user} access_token={access_token} refresh={refresh} ></ListBoards>}
       </div> 
  )
}

export default App;