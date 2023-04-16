import axios from "axios";
import { Component } from "react";

class DisplayTask extends Component {

    state = {
        task_id: this.props.task.task_id,
        board_id: this.props.task.board_id,
        title: this.props.task.title,
        board_column_id: this.props.task.board_column_id,
        description: this.props.task.description,
        assignee:  this.props.task.assignee,
        reviewer: this.props.task.reviewer,
        story_points: this.props.task.story_points,
        priority: this.props.task.priority
    }

    titleChange = (event) => {
        console.log(event.target.value)
        this.setState({title: event.target.value})
        console.log(this.state.title)
    }

    columnChange = (event) => {
        console.log(event.target.value)
        this.setState({board_column_id: event.target.value})
    }

    descriptionChange = (event) => {
        console.log(event.target.value)
        this.setState({description: event.target.value})
    }
    
    assigneeChange = (event) => {
        console.log(event.target.value)
        this.setState({assignee: event.target.value})
    }

    reviewerChange = (event) => {
        console.log(event.target.value)
        this.setState({reviewer: event.target.value})
    }

    storyPointsChange = (event) => {
        console.log(event.target.value)
        this.setState({story_points: event.target.value})
    }

    priorityChange = (event) => {
        console.log(event.target.value)
        this.setState({priority: event.target.value})
    }

    update = () => {
        console.log(this.state)
        axios.put("http://localhost:3000/tasks/updateTask", this.state).then((result) =>{
    console.log("Wrote task" + this.state)
    console.log(result)
    console.log("here")
        }
            
        )
    }

    delete = () => {
        axios.delete("http://localhost:3000/tasks/deleteTask/" + this.state.task_id).then((result) =>{
    console.log("Delete task" + this.state)
    console.log(result)
    console.log("here")
        })
    }

    columnOptions = (
        this.props.board.boardColumns.map((column) => {
            return <option value={column.board_column_id}>{column.title}</option>
        })
        
    )

    taskJSX = (
        <div className="modal fade" name={"task" + this.props.task.task_id} id={"task" + this.props.task.task_id} tabindex="-1" role="dialog" aria-labelledby="task" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <form>
            <div className="modal-content">
                <div className="modal-header">
                <input className="modal-title task-title" id="exampleModalLabel" placeholder="Title" required name="title" defaultValue={this.state.title} onChange={this.titleChange} />
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body">
                <div className="form-group">
                    <label>Column: </label>
                    <select className="selectpicker" onChange={this.columnChange} name="board_column_id">
                    {this.columnOptions}
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input className="task-description" onChange={this.descriptionChange} placeholder="Description" id="exampleModalLabel" required name="description" defaultValue={this.props.task.description} />
                </div>
                <div className="form-group">
                    <label>Assignee: </label>
                    <input className="task-assignee" onChange={this.assigneeChange} placeholder="Assignee" id="exampleModalLabel" required name="assignee" defaultValue={this.props.task.assignee} />
                </div>
                <div className="form-group">
                    <label>Reviewer: </label>
                    <input className="task-reviewer" onChange={this.reviewerChange} id="exampleModalLabel" required  name="reviewer" defaultValue={this.props.task.reviewer} />
                </div>
                <div className="form-group">
                    <label>Story Points: </label>
                    <input className="task-story-points" onChange={this.storyPointsChange} id="exampleModalLabel" required  name="story_points" defaultValue={this.props.task.story_points} />
                </div>
                <div className="form-group">
                    <label>Priority: </label>
                    <input className="task-priority" onChange={this.priorityChange} id="exampleModalLabel" required name="priority" defaultValue={this.props.task.priority} />
                </div>
                </div>
                <div className="modal-footer">
                <button data-bs-dismiss="modal" type="button" className="btn btn-danger" onClick={this.delete}>Delete</button>
                <button data-bs-dismiss="modal" type="button" className="btn btn-primary" onClick={this.update}>Save changes</button>
                </div>
            </div>
            </form>
            </div>
        </div>
        )

    render() {
        console.log(this.props.task)
        return (
            <div>
            {this.taskJSX}
            </div>
        )
    }
}

export default DisplayTask