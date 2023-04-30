import { Component } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import axios from 'axios'
import './SignIn.css'



function SignIn (props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");
    const [error, setError] = useState("");


    async function submit() {
        console.log("submit")
        try{
        await axios.get("http://localhost:3000/users/authenticate/?email=" +email +"&password=" + password).then(result => {
            console.log(result.status < 400);
            console.log(result.data)
            if (result.status < 400) {
              props.onSubmit(result.data[0]);
              navigate('/', {replace: true})
            }
            else setError("Incorrect username or password")
        })
      }
      catch (error)
      {
        setError("Incorrect username or password")
      }        
    }
    

    
        return (
            <div className="signIn" >

  <main className="form-signin">
    <form>

      <h1 style={{textAlign: "center"}} className="h3 mb-3 fw-normal">Please sign in</h1>

      <div className="form-floating">
        <input onChange={event => setEmail(event.target.value)} type="email" className="form-control" id="floatingInput" name="email" placeholder="name@example.com" />
        <label for="floatingInput">Email address</label>
      </div>
      <div className="form-floating">
        <input onChange={event => setPassowrd(event.target.value)} type="password" className="form-control" id="floatingPassword" name="password" placeholder="Password" />
        <label for="floatingPassword">Password</label>
      </div>
      <Link className="w-100 btn btn-lg btn-primary" type="button" onClick={submit}>Sign in</Link>
      <p style={{textAlign: "center"}} className="mt-5 mb-3 text-muted">&copy; 2017–2023</p>
    </form>
    <p style={{color:'red'}}>{error}</p>
  </main>



</div>

        )
}

export default SignIn


