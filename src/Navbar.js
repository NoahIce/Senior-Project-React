import { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./Home";
import SignIn from "./SignIn/SignIn";

class Navbar extends Component {

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
          
          <Router>
           <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <p className="navbar-brand" href="#">Scrumboard app</p>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ">
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" Link to={'/'} >Home</Link>
                    </li>
                    <li className="nav-item">
                        {this.loggedInNav}
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" Link to={'/register'} >Register</Link>
                    </li>
                </ul>
                </div>
            </div>
            </nav>

          <Routes>
              <Route exact path='/' element={<Home app={this} />} />
              <Route exact path='/SignIn' element={<SignIn app={this} onSubmit={this.signIn} />} />
          </Routes>
          </Router>
        </div>
        )
    }
}

export default Navbar