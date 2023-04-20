import { Component } from "react";
import CreateBoardColumn from "../CreateBoardColumn/CreateBoardColumn";
import CreateTask from "../CreateTask/CreateTask";
import './DisplayBoard.css'
import DisplayTask from "../DisplayTask/DisplayTask";

class DisplayBoard extends Component {

    state = {
    }

    boardJSX = (
        <div className="main">
        {this.props.board.boardColumns.map((column) => { return (
    <div class="page-content page-container" id="page-content">
        
        <div class="padding">

            <div>
            <div class="row container">
                <div class="col-sm-12">
                    <div class="card" >
                        <div class="card-header">
                            <h5>{column.title }</h5>
                        </div>
                        <div class="card-block">
                            <div class="row" >
                            {column.tasks.map((task) => {
                                return (
                                    <div>
                                <button type="button" class="task" data-bs-toggle="modal" data-bs-target={'#task'+task.task_id}>
                                <div class="card task text-black bg-light mb-3">
                                    <div class="card-body">
                                    <h5 class="card-title">{task.title}</h5>
                                    <p class="card-text">{task.description}</p>
                                    </div>
                                </div>
                                </button>
                                <DisplayTask task={task} board={this.props.board}></DisplayTask>
                                </div>
                                )
                            })}
                            
                            </div>
                        </div>

                        </div>
                        <div class="new-task">
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={'#newTask'+column.column_id}>New Task</button>
                        </div>
                        </div>
                        <CreateTask board={this.props.board} column={column}></CreateTask>
                    </div>
                </div>
            </div>
            
        </div>) })}
        </div>
    )

    render() {
        return (
            <div>
                <div class="invite">
                <button class="btn btn-primary" data-toggle="modal" data-target="#invite">Invite a user</button>
                {this.boardJSX}
            </div>
                <button class="btn btn-light new-column" data-toggle="modal" data-target="#newColumn">New Column</button>
                <CreateBoardColumn board="board"></CreateBoardColumn>
            </div>
            


        )
    }
}

export default DisplayBoard