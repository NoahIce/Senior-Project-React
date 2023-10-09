import { Component } from "react"
import axios from "axios"

class Invite extends Component {

    emailChange = (event) => {
        console.log(event.target.value)
        this.setState({title: event.target.value})
        console.log(this.state.title)
    }

    //State
    state = {
        user_id: this.props.user.user_id,
        board_id: this.props.board.board_id,
        type: "invited",
        email: "",
        tasklist_id: this.props.board.tasklist_id
    }

    //Update request
    update = () => {
        console.log(this.state)
        axios.put("http://localhost:3000/permissions/createPermissions", this.state).then((response) =>{
            console.log(response)
            })
    }

    //Render
    render() {
        return (
            <div>
        {this.InviteJSX}
        </div>
        )
        }

        //Modal to render
InviteJSX = (
<div className="modal fade" name={"invite"} id={"board"} tabindex="-1" role="dialog" aria-labelledby="task" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <form>
            <div className="modal-content">
                <div className="modal-header">
                <input className="modal-title task-title" id="exampleModalLabel" placeholder="Email" required name="Email" defaultValue={this.state.email} onChange={this.emailChange} />
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-footer">
                </div>
            </div>
            </form>
            </div>
        </div>
        )
    }

    export default Invite