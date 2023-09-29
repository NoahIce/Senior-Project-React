import { Component } from "react";
import axios from "axios";

class CreateTask extends Component {
    //State
    state = {
        board_id: this.props.board.board_id,
        title: "",
        board_column_id: this.props.column.board_column_id,
        description: "",
        assignee:  -1,
        reviewer: -1,
        story_points: -1,
        priority: -1,
    }

    //Handle title change
    titleChange = (event) => {
        console.log(event.target.value)
        this.setState({title: event.target.value})
    }
//Handle column change
    columnChange = (event) => {
        console.log(event.target.value)
        this.setState({board_column_id: event.target.value})
    }
//Handle description  change
    descriptionChange = (event) => {
        console.log(event.target.value)
        this.setState({description: event.target.value})
    }
    //Handle assignee change
    assigneeChange = (event) => {
        console.log(event.target.value)
        this.setState({assignee: event.target.value})
    }
//Handle reviewer change
    reviewerChange = (event) => {
        console.log(event.target.value)
        this.setState({reviewer: event.target.value})
    }
//Handle story points change
    storyPointsChange = (event) => {
        console.log(event.target.value)
        this.setState({story_points: event.target.value})
    }
//Handle priority change
    priorityChange = (event) => {
        console.log(event.target.value)
        this.setState({priority: event.target.value})
    }
//Update request
    update = () => {
        console.log(this.state)

        axios.post("https://tasks.googleapis.com/tasks/v1/lists/" + this.props.board.tasklist_id +  "/tasks/?access_token=" + this.props.access_token, 
        {"title": this.state.title, "notes": this.state.description, "due": new Date().toISOString()}).then((response) => {
            console.log(response)
            let task = {
                board_id: this.state.board_id,
                title: this.state.title,
                board_column_id: this.state.board_column_id,
                description: this.state.description,
                assignee:  this.state.assignee,
                reviewer: this.state.reviewer,
                story_points: this.state.story_points,
                priority: this.state.priority,
                google_id: response.data.id
            }
            axios.post("http://localhost:3000/tasks/createTask", task).then((result) =>{
            console.log("Wrote task")
            console.log(result)
            //this.props.refresh()
            })
        })
       
    }

    
//Get all columns
    columnOptions = (
        this.props.board.boardColumns.map((column) => {
            return <option value={column.board_column_id}>{column.title}</option>
        })
        
    )
//modal to render
    taskJSX = (
        <div className="modal fade" name={"newTask"+this.props.column.column_id} id={"newTask"+this.props.column.column_id}  tabindex="-1" role="dialog" aria-labelledby="task" aria-hidden="true">
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
                    <input className="task-description" onChange={this.descriptionChange} placeholder="Description" id="exampleModalLabel" required name="description" defaultValue={this.state.description} />
                </div>
                <div className="form-group">
                    <label>Assignee: </label>
                    <input className="task-assignee" onChange={this.assigneeChange} placeholder="Assignee" id="exampleModalLabel" required name="assignee" defaultValue={this.state.assignee} />
                </div>
                <div className="form-group">
                    <label>Reviewer: </label>
                    <input className="task-reviewer" onChange={this.reviewerChange} id="exampleModalLabel" required  name="reviewer" defaultValue={this.state.reviewer} />
                </div>
                <div className="form-group">
                    <label>Story Points: </label>
                    <input className="task-story-points" onChange={this.storyPointsChange} id="exampleModalLabel" required  name="story_points" defaultValue={this.state.story_points} />
                </div>
                <div className="form-group">
                    <label>Priority: </label>
                    <input className="task-priority" onChange={this.priorityChange} id="exampleModalLabel" required name="priority" defaultValue={this.state.priority} />
                </div>
                </div>
                <div className="modal-footer">
                <button data-bs-dismiss="modal" type="button" className="btn btn-primary" onClick={this.update}>Save changes</button>
                </div>
            </div>
            </form>
            </div>
        </div>
        )

    render() {
        console.log(this.props.column)
        return (
            <div>
            {this.taskJSX}
            </div>
        )
    }
}

export default CreateTask