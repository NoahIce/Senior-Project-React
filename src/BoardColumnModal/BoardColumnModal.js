import { Component } from "react";
import axios from "axios";

class BoardColumnModal extends Component {

    //State
    state = {
        board_column_id: this.props.column.board_column_id,
        board_id: this.props.board.board_id,
        position: this.props.column.position,
        title: this.props.column.title,
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
        axios.put("http://localhost:3000/boardColumns/updateBoardColumn", this.state).then((result) =>{
        console.log("Wrote task" + this.state)
        console.log(result)
        console.log("here")
        }
            
        )
    }

    //Delete request
    delete = () => {
        axios.delete("http://localhost:3000/boardColumns /deleteBoardColumn/" + this.state.column_id).then((result) =>{
    console.log("Delete task" + this.state)
    console.log(result)
    console.log("here")
        })
    }

    //Render
    render() {
        return (
            <div>
        {this.columnModalJSX}
        </div>
        )
    }

    //Modal to display
    columnModalJSX = (
        <div className="modal fade" name={"column" + this.state.board_column_id} id={"column" + this.state.board_column_id} tabindex="-1" role="dialog" aria-labelledby="task" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <form>
            <div className="modal-content">
                <div className="modal-header">
                <input className="modal-title task-title" id="exampleModalLabel" placeholder="Title" required name="title" defaultValue={this.state.title} onChange={this.titleChange} />
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div>
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

export default BoardColumnModal