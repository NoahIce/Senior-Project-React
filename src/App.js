import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import SignIn from './SignIn/SignIn'
import ListBoards from './ListBoards/ListBoards';
import axios from 'axios';

class App extends Component {

    //State
    state = {
        loggedIn: false,
        user: {}
    }

    //Method for refeshing when state changes
     refresh = async () => {
      console.log(this.state.user.user_id)
                console.log("submit")
                    try{
                    await axios.get("http://localhost:3000/users/readUserById/?user_id=" + this.state.user.user_id).then(result => {
                        console.log(result.status < 400);
                        console.log(result.data)
                        this.setState({ user: result.data[0]});
                    })
                }
                catch (error)
                {
                    console.log(error)
                }    
    }

    //Method to sign in user
    signIn = (user) => {
        console.log("Signing in")
        console.log(user.boards);
        this.setState({ user: user});
        this.setState({ loggedIn: true });
        console.log(this.state.loggedIn)
    }

    //Method to sign out user
    signOut = () => {
        console.log("Signing out")
        this.setState({ loggedIn: false });
    }

    listBoards = (this.state.loggedIn === false ? "" : <ListBoards user={this.state.user} refresh={this.refresh}></ListBoards>)
    

    //Render
  render() {
    this.listBoards = (this.state.loggedIn === false ? "" : <ListBoards user={this.state.user} refresh={this.refresh}></ListBoards>)
    return (
       <div>
        <Navbar loggedIn={this.state.loggedIn} signIn={this.signIn} signOut={this.signOut}></Navbar>
        {this.listBoards}
       </div> 
    );
  }
}

export default App;