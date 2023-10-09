import { Component } from "react";
import axios from "axios";

class CreateBoardColumn extends Component {

    //State
    state = {
        board_id: this.props.board.board_id,
        position: this.props.boardColumns[this.props.board.boardColumns.length-1].position + 1,
        tasklist_id: this.props.board.tasklist_id,
        title: '',
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
        axios.post("http://localhost:3000/boardColumns/createBoardColumn", this.state).then((result) =>{
            console.log("Wrote column" + this.state)
            this.props.refresh();
        }
            
        )
    }

    //Render
    render() {
        return (
            <div>
        {this.columnModalJSX}
        </div>
        )
    }

    //Modal to render
    columnModalJSX = (
        <div className="modal fade" name={"newColumn"} id={"newColumn"} tabindex="-1" role="dialog" aria-labelledby="task" aria-hidden="true">
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
                <button data-bs-dismiss="modal" type="button" className="btn btn-primary" onClick={this.update}>Save changes</button>
                </div>
            </div>
            </form>
            </div>
        </div>
    )
}

export default CreateBoardColumn