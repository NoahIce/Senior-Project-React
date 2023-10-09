import axios from "axios";
import { Component } from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../DisplayTask/DisplayTask.css'

class ReadOnlyDisplayTask extends Component {

    componentDidMount() {
    }
    

    //State
    state = {
        task_id: this.props.task.task_id,
        board_id: this.props.task.board_id,
        title: this.props.task.title,
        board_column_id: this.props.task.board_column_id,
        description: this.props.task.description,
        assignee:  this.props.task.assignee,
        reviewer: this.props.task.reviewer,
        story_points: this.props.task.story_points,
        priority: this.props.task.priority,
        google_id: this.props.task.google_id,
        due: new Date(this.props.task.due)
    }

    //Handle title change
    titleChange = (event) => {
        console.log(event.target.value)
        this.setState({title: event.target.value})
        console.log(this.state.title)
    }

    //Handle column change
    columnChange = (event) => {
        console.log(event.target.value)
        this.setState({board_column_id: event.target.value})
    }
 
    //Handle description change
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

    //Handle Date change
    dateChange = (event) => {
        console.log(event)
        this.setState({due: event})
    }

    //update request
    update = () => {
        console.log(this.state)
        axios.put("https://tasks.googleapis.com/tasks/v1/lists/"+ this.props.board.tasklist_id +"/tasks/" + this.props.task.google_id + "?access_token=" + this.props.access_token, 
        {"id": this.props.task.google_id, "title": this.state.title, "notes": this.state.description, "due": this.state.due.toISOString()}).then((result) =>{
            axios.put("http://localhost:3000/tasks/updateTask", this.state).then((result) =>{
            console.log("Updated task" + this.state)
            console.log(result)
            console.log("here")
            }).then(() => {
                this.props.refresh()
            })
        })
    }

    //delete request
    delete = () => {
        axios.delete("https://tasks.googleapis.com/tasks/v1/lists/"+ this.props.board.tasklist_id +"/tasks/" + this.props.task.google_id + "?access_token=" + this.props.access_token).then((response) =>{
            axios.delete("http://localhost:3000/tasks/deleteTask/" + this.state.task_id).then((result) =>{
                console.log("Delete task" + this.state)
                console.log(result)
                console.log("here")
            }).then(() => {
                this.props.refresh()
            })
        })
    }

    //Get all columns
    columnOptions = (
        this.props.board.boardColumns.map((column) => {
            return <option value={column.board_column_id}>{column.title}</option>
        })
        
    )

    //Modal to render
    taskJSX = (<div></div>
        )

    render() {
        console.log("readlonly")
        this.taskJSX = (
            <div className="modal fade" name={"task" + this.props.task.task_id} id={"task" + this.props.task.task_id} tabindex="-1" role="dialog" aria-labelledby="task" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <form>
                <div className="modal-content">
                    <div className="modal-header">
                    <input readOnly={true} className="modal-title task-title" id={"title" + this.props.task.task_id} placeholder="Title" name="title" defaultValue={this.state.title} />
                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body">
                    <div className="form-group">
                        <label>Column: </label>
                        <select disabled={true} id={"column" + this.props.task.task_id} readOnly={true} className="selectpicker" onChange={this.columnChange} name="board_column_id">
                        {this.columnOptions}
                        </select>
                    </div>
                    <div className="form-group task-description">
                        <label>Description: </label>
                        <textarea readOnly={true} rows={5} cols={30} className="task-description" onChange={this.descriptionChange} placeholder="Description" id={"description" + this.props.task.task_id} required name="description" defaultValue={this.props.task.description} />
                    </div>
                    <div className="form-group">
                        <label>Story Points: </label>
                        <input readOnly={true} className="task-story-points" onChange={this.storyPointsChange} id={"story_points" + this.props.task.task_id} required  name="story_points" defaultValue={this.props.task.story_points} />
                    </div>
                    <div className="form-group">
                        <label>Priority: </label>
                        <input readOnly={true} className="task-priority" onChange={this.priorityChange} id={"priority" + this.props.task.task_id} required name="priority" defaultValue={this.props.task.priority} />
                    </div>
                    <div className="form-group">
                    <DatePicker
                    disabled={true}
                        selected={this.state.due}
                        onChange={this.dateChange}
                    />
                    </div>
                    </div>
                    <div className="modal-footer">
                    </div>
                </div>
                </form>
                </div>
            </div>
            )
        return (
            <div>
            <input readOnly={true} />
            {this.taskJSX}
            </div>
        )
    }
}

export default ReadOnlyDisplayTask