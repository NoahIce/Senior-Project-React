import { Component } from "react";
import axios from "axios";

class CreateBoard extends Component {

    //State
    state = {
        title: '',
        user: this.props.user
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
        axios.post("https://tasks.googleapis.com/tasks/v1/users/@me/lists?access_token=" + this.props.access_token, 
        {"title": this.state.title})
        .then((response) => {
            console.log(response)
            axios.post("http://localhost:3000/boards/createBoard", 
            {title: this.state.title, user_id:this.state.user.user_id, email: this.props.user.email, tasklist_id: response.data.id}).then((result) =>{
                console.log("Wrote board")
                console.log(result)
                this.props.refresh();
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
<div className="modal fade" name={"newBoard"} id={"newBoard"} tabindex="-1" role="dialog" aria-labelledby="task" aria-hidden="true">
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
                <button data-bs-dismiss="modal" type="button" className="btn btn-primary" onClick={this.update}>Save changes</button>
                </div>
            </div>
            </form>
            </div>
        </div>
        )
}

export default CreateBoard