import { Component, useState } from "react";
import CreateBoardColumn from "../CreateBoardColumn/CreateBoardColumn";
import CreateTask from "../CreateTask/CreateTask";
import './DisplayBoard.css'
import DisplayTask from "../DisplayTask/DisplayTask";
import BoardColumnModal from "../BoardColumnModal/BoardColumnModal";
import axios from "axios";
import { useEffect } from "react";

function DisplayBoard(props)  {

    const [tasks, setTasks] = useState([])
    const [columns, setColumns] = useState([])
    useEffect(() => {
        console.log("I have been mounted")
        getUserId().then((user_id) => {
            fetchTasks(props.board, user_id)
        }).then(() => {
            console.log(props.board.id)
            
        })
        fetchColumns(props.board.id);
        
    }, [])


    

    let tasksJSX = (<div></div>)

    // refresh() {
    //     console.log("Create task")
    //     console.log(this.props)
    //     this.props.refresh();
    // }

    //Board to render
    let boardJSX = (
        <div className="main">
        {columns.map((column) => { return (
    <div className="page-content page-container" id="page-content">
        
        <div className="padding">

            <div>
            <div className="row container">
                <div className="col-sm-12">
                    <div className="card" >
                        <div className="card-header">
                            <button type="button" className="column" data-bs-toggle="modal" data-bs-target={'#column'+column.board_column_id}><h5>{column.title}</h5></button>
                        </div>
                        
                        <div className="card-block">
                            <div className="row" >
                            {column.tasks.map((task) => {
                                return (
                                    <div>
                                <button type="button" className="task" data-bs-toggle="modal" data-bs-target={'#task'+task.task_id}>
                                <div className="card task text-black bg-light mb-3">
                                    <div className="card-body">
                                    <h5 className="card-title">{task.title}</h5>
                                    <p className="card-text">{task.description}</p>
                                    </div>
                                </div>
                                </button>
                                
                                </div>
                                )
                            })}
                            
                            </div>
                        </div>

                        </div>
                        <div className="new-task">
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={'#newTask'+column.column_id}>New Task</button>
                        </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </div>) })}
        </div>
    )

    let taskJSX = {}

    async function getUserId() {
      // eslint-disable-next-line no-undef
      var access_token = gapi.client.getToken().access_token
      //props.googleSignIn(access_token)
      // eslint-disable-next-line no-undef
      //console.log(access_token)
      return await axios.get("https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + access_token).then(result => {
        console.log(result.data.id)
        return result.data.id;
      })
      //console.log(gapi.client.getToken().access_token)
    }

    async function fetchTasks(board, user_id) {
    // eslint-disable-next-line no-undef
    await gapi.client.tasks.tasks.list({tasklist: board.id}).then(function(response){
        console.log(response.result.items)
        response.result.items.forEach(task => {
            axios.get("http://localhost:3000/tasks/getMatchingGoogleTasks?google_id=" + task.id).then((result) =>{
            if (result.data.length === 0){
            //console.log(user_id)
            axios.post("http://localhost:3000/tasks/createTask", {
                "board_id": board.id,
                "board_column_id": 0,
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
        let tempTasks = []
        // eslint-disable-next-line no-undef
        await gapi.client.tasks.tasks.list({tasklist: board.id}).then(function(response){
        response.result.items.forEach(googleTask => {
            axios.get("http://localhost:3000/tasks/getMatchingGoogleTasks?google_id=" + googleTask.id).then((task) => {
                tempTasks.push(task.data[0]);
                console.log(task.data[0]);
                
                setTasks(tempTasks.slice())
                taskJSX = tasks.map((task) => {
                    return (
                        <li className="list-group-item">{task.title}</li>
                    )})
            })
        })
        })
        //console.log(tasks)
    }

    async function fetchColumns(board_id) {
        axios.get("http://localhost:3000/boardColumns/getBoardColumnsByBoardId?board_id=" + board_id).then((response) => {
            if (response.data.length === 0) {
                axios.post("http://localhost:3000/boardColumns/createBoardColumn", {
                    "board_id": props.board.id,
                    "title": "To Do",
                    "position": 1
                }).then(() => {
                    axios.post("http://localhost:3000/boardColumns/createBoardColumn", {
                        "board_id": props.board.id,
                        "title": "In Progress",
                        "position": 2
                    })
                }).then(() => {
                    axios.post("http://localhost:3000/boardColumns/createBoardColumn", {
                        "board_id": props.board.id,
                        "title": "Done",
                        "position": 3
                    })
                }).then(() => {
                    fetchColumns(props.board.id);
                })
            }
            else {
                console.log(response.data)
                console.log(tasks)
                for (let column of response.data) {
                    column.tasks = [];
                    tasks.forEach(task => {
                        console.log(column.position)
                        if (task.board_column_id <= 1 && column.position === 1) {
                            column.tasks.push(task)
                        }
                        else if (task.board_column_id === column.board_column_id) {
                            column.tasks.push(task)
                        }
                    })
                    setColumns(response.data);
                }
            }
        })
    }

    function test() {
        console.log(columns)
    }
    


        return (

            /*
            <div className="card">
                <ul className="list-group list-group-flush">
                    {tasks.map((task) => {
                    return (
                        <li className="list-group-item">{task.title}</li>
                    )})}
                </ul>
                </div>
            */
            
            <div>
                <button onClick={test}>Test</button>

                
                {boardJSX}
                
            </div>
            /*
            <div>
                <div className="invite">
                <button className="btn btn-primary" data-toggle="modal" data-target="#invite">Invite a user</button>
                {this.boardJSX}
            </div>
                <button className="btn btn-light new-column" data-bs-toggle="modal" data-bs-target="#newColumn">New Column</button>
                <CreateBoardColumn board={this.props.board}></CreateBoardColumn>
            </div>
            */
            
        )
}

export default DisplayBoard