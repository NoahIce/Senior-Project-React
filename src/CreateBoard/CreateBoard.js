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
        axios.post("http://localhost:3000/boards/createBoard", this.state).then((result) =>{
    console.log("Wrote board" + this.state)
    console.log(result)
    console.log("here")
        }
        )
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