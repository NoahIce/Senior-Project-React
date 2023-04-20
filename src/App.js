import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import SignIn from './SignIn/SignIn'
import ListBoards from './ListBoards/ListBoards';

class App extends Component {

    state = {
        loggedIn: false,
        user: {}
    }

    signIn = (user) => {
        console.log("Signing in")
        console.log(user);
        this.setState({ user: user});
        this.setState({ loggedIn: true });
        console.log(this.state.loggedIn)
    }

    signOut = () => {
        console.log("Signing out")
        this.setState({ loggedIn: false });
    }

    listBoards = (this.state.loggedIn === false ? "" : <ListBoards user={this.state.user}></ListBoards>)
    

  render() {
    this.listBoards = (this.state.loggedIn === false ? "" : <ListBoards user={this.state.user}></ListBoards>)
    return (
       <div>
        <Navbar loggedIn={this.state.loggedIn} signIn={this.signIn} signOut={this.signOut}></Navbar>
        {this.listBoards}
       </div> 
    );
  }
}

export default App;