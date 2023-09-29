import { Component } from "react";
import CreateBoardColumn from "../CreateBoardColumn/CreateBoardColumn";
import CreateTask from "../CreateTask/CreateTask";
import './DisplayBoard.css'
import DisplayTask from "../DisplayTask/DisplayTask";
import BoardColumnModal from "../BoardColumnModal/BoardColumnModal";
import axios from "axios";

class DisplayBoard extends Component {

    state = {
    }

    // refresh() {
    //     console.log("Create task")
    //     console.log(this.props)
    //     this.props.refresh();
    // }

    //Board to render
    boardJSX = (
        <div className="main">
        {this.props.board.boardColumns.map((column) => { return (
    <div className="page-content page-container" id="page-content">
        
        <div className="padding">

            <div>
            <div className="row container">
                <div className="col-sm-12">
                    <div className="card" >
                        <div className="card-header">
                            <button type="button" className="column" data-bs-toggle="modal" data-bs-target={'#column'+column.board_column_id}><h5>{column.title}</h5></button>
                        </div>
                        <BoardColumnModal column={column} board={this.props.board}></BoardColumnModal>
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
                                <DisplayTask task={task} board={this.props.board} access_token={this.props.access_token}></DisplayTask>
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
                        <CreateTask board={this.props.board} column={column} access_token={this.props.access_token} refresh={this.props.refresh}></CreateTask>
                    </div>
                </div>
            </div>
            
        </div>) })}
        </div>
    )
    

    test = () => {
       axios.get("https://tasks.googleapis.com/tasks/v1/users/@me/lists?access_token=" + this.props.access_token)
      .then((result) => {
        console.log(result)
      })
    }

    //Render
    render() {
        console.log("props")
        console.log(this.props.refresh)
        return (
            <div>
                <div className="invite">
                <button className="btn btn-primary" data-toggle="modal" data-target="#invite">Invite a user</button>
                {this.boardJSX}
                </div>
                <button className="btn btn-light new-column" data-bs-toggle="modal" data-bs-target="#newColumn">New Column</button>
                <CreateBoardColumn board={this.props.board}></CreateBoardColumn>
                <button onClick={this.test}>Test</button>
            </div>
            


        )
    }
}

export default DisplayBoard