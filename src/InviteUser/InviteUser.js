import { Component, useState } from "react"
import axios from "axios"

function InviteUser (props) {

    const [user_id, setUser_id] = useState(props.user.user_id)
    const [type, setType] = useState("invited")
    const [board_id, setBoard_id] = useState(props.board.board_id)
    const [email, setEmail] = useState("")
    const [tasklist_id, setTasklist_id] = useState(props.board.tasklist_id)

    function emailChange(event) {
        console.log(event.target.value)
        setEmail(event.target.value)
        console.log(email)
    }

    //Update request
    function update () {
        console.log(email)
        axios.post("http://localhost:3000/permissions/createPermissions", {user_id: user_id, board_id: board_id, type: type, "email":email, tasklist_id: tasklist_id}).then((response) =>{
            console.log(response)
        })
    }

    

        //Modal to render
let InviteJSX = (
    <div className="modal fade" name={"invite"} id={"invite"} tabindex="-1" role="dialog" aria-labelledby="invite" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <form>
                <div className="modal-content">
                    <div className="modal-header">
                    <input className="modal-title task-title" id="exampleModalLabel" placeholder="Email" required name="Email" defaultValue={email} onChange={emailChange} />
                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-footer">
                    <button data-bs-dismiss="modal" type="button" className="btn btn-primary" onClick={update}>Save changes</button>
                    </div>
                </div>
                </form>
                </div>
            </div>
            )
            //Render
        return (
            <div>
        {InviteJSX}
        </div>
        )
        }
    

    export default InviteUser