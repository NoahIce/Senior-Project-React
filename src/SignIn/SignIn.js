import { Component } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import axios from 'axios'
import './SignIn.css'

class SignIn extends Component {
    state = {
        email: "",
        password: "",
    }

    updateEmail = async (t) => {
        await this.setState({email: t.target.value })
        console.log(this.state.email)
    }

    updatePassword = async (t) => {
        await this.setState({password: t.target.value })
        console.log(this.state.password)
    }

    submit = () => {
        console.log("submit")
        axios.get("http://localhost:3000/users/authenticate/?email=" +this.state.email +"&password=" + this.state.password).then(result => {
            console.log(result.data[0]);
            console.log(result === null);
            this.props.onSubmit(result.data[0]);
        })
        //axios.post("http://localhost:3000/users/authenticate/?email=" + this.state.email + "&password=" + this.state.password)
        
    }

    render() {
        return (
            <div className="signIn" >

  <main className="form-signin">
    <form>
      <img className="mb-4" src="https://resizing.flixster.com/7teAttlGxEFkfptoq3r-GHgO4xY=/218x280/v2/https://flxt.tmsimg.com/assets/20782_v9_bb.jpg" alt=""  height="120" />
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

      <div className="form-floating">
        <input onChange={this.updateEmail} type="email" className="form-control" id="floatingInput" name="email" placeholder="name@example.com" />
        <label for="floatingInput">Email address</label>
      </div>
      <div className="form-floating">
        <input onChange={this.updatePassword} type="password" className="form-control" id="floatingPassword" name="password" placeholder="Password" />
        <label for="floatingPassword">Password</label>
      </div>
      <Link to={"/"} className="w-100 btn btn-lg btn-primary" type="button" onClick={this.submit}>Sign in</Link>
      <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
    </form>
  </main>



</div>

        )
    }
}

export default SignIn


