import { Component } from "react";
import axios from "axios";

class BoardModal extends Component {

    //State
    state = {
        board_id: this.props.board.board_id,
        title: this.props.board.title,
    }

    //Handle title change
    titleChange = (event) => {
        console.log(event.target.value)
        this.setState({title: event.target.value})
        console.log(this.state.title)
    }

    //Update request
    update = () => {
        console.log(this.state)
        axios.put("https://tasks.googleapis.com/tasks/v1/users/@me/lists/" + this.props.board.tasklist_id + "?access_token=" + this.props.access_token, 
        {"id": this.props.board.tasklist_id, "title": this.state.title}).then((response) =>{
            console.log(response)
            axios.put("http://localhost:3000/boards/updateBoard", this.state).then((result) =>{
            console.log("Wrote board" + this.state)
            console.log(result)
            console.log("here")
            })
        })
    }

    //Delete request
    delete = () => {
        axios.delete("https://tasks.googleapis.com/tasks/v1/users/@me/lists/" + this.props.board.tasklist_id + "?access_token=" + this.props.access_token).then((response) =>{
            console.log(response);
            axios.delete("http://localhost:3000/boards/deleteBoard/" + this.state.board_id).then((result) =>{
                console.log("Delete board" + this.state)
                console.log(result)
                console.log("here")
            })
        })
        
    }

    //Render
    render() {
        return (
            <div>
        {this.BoardJSX}
        </div>
        )
        }

        //Modal to render
BoardJSX = (
<div className="modal fade" name={"board" + this.props.board.board_id} id={"board" + this.props.board.board_id} tabindex="-1" role="dialog" aria-labelledby="task" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <form>
            <div className="modal-content">
                <div className="modal-header">
                <input className="modal-title task-title" id="exampleModalLabel" placeholder="Title" required name="title" defaultValue={this.state.title} onChange={this.titleChange} />
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
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
}

export default BoardModal