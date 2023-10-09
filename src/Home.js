import { Component } from "react";
import AuthenticationService from "./services/AuthenticationService";
import ListBoards from "./ListBoards/ListBoards";
import './Home.css'
import logo from './content/logo.png'
import Navbar from "./Navbar";

function Home (props) {
    
    
    return (
        
        <div >
            <input  readOnly={true}/>
            <Navbar loggedIn={props.loggedIn} signIn={props.signIn} signOut={props.signOut} tokenClient={props.tokenClient} googleSignIn={props.googleSingIn}></Navbar>
            <div className="welcome" hidden={props.user !== null}>
                <h1 hidden={props.user !== null}>Welcome to ProgLog!</h1>
            </div>
            {props.user === null ? <div className='getBoards'><button className="btn btn-primary " onClick={props.getBoards}>Get Boards</button></div> : <ListBoards key={props.user} user={props.user} access_token={props.access_token} refresh={props.refresh} selectedBoard={props.selectedBoard} setSelectedBoard={props.setSelectedBoard}></ListBoards>}
        </div>
    )
}

export default Home;