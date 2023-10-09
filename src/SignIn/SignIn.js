import { Component } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import axios from 'axios'
import './SignIn.css'



function SignIn (props) {

  //State
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");
    const [error, setError] = useState("");

//Function from authenticating the user
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

    function handleAuthClick() {

        //console.log(this.props)
        props.tokenClient.callback = async (resp) => {
          if (resp.error !== undefined) {
            throw (resp);
          }
          getUserId().then((email) => {
            /*
            fetchGoogleTasks(user_id).then(() => {
            })
            */
            fetchUser(email);
            navigate('/', {replace: true})
          })
        };

        // eslint-disable-next-line no-undef
        if (gapi.client.getToken() === null) {
          // Prompt the user to select a Google Account and ask for consent to share their data
          // when establishing a new session.
          props.tokenClient.requestAccessToken({prompt: 'consent'});
        } else {
          // Skip display of account chooser and consent dialog for an existing session.
          props.tokenClient.requestAccessToken({prompt: ''});
        }

        
    }

    async function fetchUser(email) {
      
        props.onSubmit(email)
    }

    async function fetchGoogleTasks(user_id) {
        console.log("fetch tasks")
        let response;
        try {
          // eslint-disable-next-line no-undef
          response = await gapi.client.tasks.tasklists.list({
            'maxResults': 10,
          });
          console.log(response.result.items)
          response.result.items.forEach(element => {
            // eslint-disable-next-line no-undef
            gapi.client.tasks.tasks.list({tasklist: element.id}).then(function(response){
                console.log(response.result.items)
                response.result.items.forEach(task => {
                  axios.get("http://localhost:3000/tasks/getMatchingGoogleTasks?google_id=" + task.id).then((result) =>{
                  if (result.data.length === 0){
                    //console.log(user_id)
                    axios.post("http://localhost:3000/tasks/createTask", {
                      "board_id": element.id,
                      "board_column_id": 1,
                      "title": task.title,
                      "description": task.hasOwnProperty("notes") ? task.notes : "",
                      "assignee": 1,
                      "reviewer": 1,
                      "story_points": 10,
                      "priority": 1,
                      "google_id": task.id,
                      "user_id": user_id
                    }).then((result) =>{console.log("wrote task")})
                  }
                  })
                })
              })
          });
        } catch (err) {
          return;
        }

    }

    async function getUserId() {
      // eslint-disable-next-line no-undef
      var access_token = gapi.client.getToken().access_token
      props.googleSignIn(access_token)
      // eslint-disable-next-line no-undef
      //console.log(access_token)
      return await axios.get("https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + access_token).then(result => {
        console.log(result.data.email)
        return result.data.email
      })
      //console.log(gapi.client.getToken().access_token)
    }
    
    function getMatchingTask(task) {
      console.log("getting matching tasks")
      axios.put("http://localhost:3000/tasks/getMatchingGoogleTasks", task.google_id).then((result) =>{
        console.log(result)
        })
      return task
    }

    function example() {
      // eslint-disable-next-line no-undef
      var access_token = gapi.client.getToken().access_token
      axios.get("https://tasks.googleapis.com/tasks/v1/lists/MTE1NzQwODk0ODAxNTc3NjUwMDc6MDow/tasks?access_token=" + access_token)
      .then((result) => {
        console.log(result.data.items)
      })
    }

    //Main html to return
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

  <button id="authorize_button" onClick={handleAuthClick}>Authorize</button>
  <button id="asdawd" onClick={example}>awd</button>

</div>

        )
}

export default SignIn


