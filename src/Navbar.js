import { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./Home";
import SignIn from "./SignIn/SignIn";
import logo from './content/logo.png'
import axios from "axios";

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.handleAuthClick = this.handleAuthClick.bind(this)
        this.getUserId = this.getUserId.bind(this)
        this.signIn = this.signIn.bind(this)
        this.signOut = this.signOut.bind(this)
    }

    handleAuthClick() {

        if (this.props.loggedIn) {
            this.signOut()
            return
        }

        //console.log(this.props)
          this.getUserId().then((email) => {
            /*
            fetchGoogleTasks(user_id).then(() => {
            })
            */
            this.signIn(email);
          })

        // eslint-disable-next-line no-undef
        if (gapi.client.getToken() === null) {
          // Prompt the user to select a Google Account and ask for consent to share their data
          // when establishing a new session.
          this.props.tokenClient.requestAccessToken({prompt: 'consent'});
        } else {
          // Skip display of account chooser and consent dialog for an existing session.
          this.props.tokenClient.requestAccessToken({prompt: ''});
        }

        
    }

    async getUserId() {
        // eslint-disable-next-line no-undef
        var access_token = gapi.client.getToken().access_token
        this.props.googleSignIn(access_token)
        // eslint-disable-next-line no-undef
        //console.log(access_token)
        return await axios.get("https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + access_token).then(result => {
          console.log(result.data.email)
          return result.data.email
        })
        //console.log(gapi.client.getToken().access_token)
      }

    signIn = (user) => {
        this.props.signIn(user);
    }

    signOut = () => {
        this.props.signOut();
    }

    loggedInNav = (this.props.loggedIn === true ? "" : <Link className="nav-link active" aria-current="page" Link to={'/SignIn'} >SignIn</Link>)

    render() {
        this.loggedInNav = (this.props.loggedIn === true ? <Link onClick={this.signOut} className="nav-link active" aria-current="page" Link to={'/SignIn'} >SignOut</Link> : <Link className="nav-link active" aria-current="page" Link to={'/SignIn'} >SignIn</Link>)
        return (
            <div>
                <nav class="navbar navbar-light bg-light">
                    <a className="navbar-brand">
                        <img src={logo} width={"50%"} height={"50%"}/>
                    </a>
                    <span class="navbar-text log">
                        <button className="btn btn-outline-dark" onClick={this.handleAuthClick}>{this.props.loggedIn ? "Log Out" : "Log In"}</button>
                    </span>
                </nav>
            </div>
        )
    }
}

export default Navbar