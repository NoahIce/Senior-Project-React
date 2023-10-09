import { Component, useEffect } from "react";
import './ListBoards.css'
import DisplayBoard from "../DisplayBoard/DisplayBoard";
import BoardModal from "../BoardModal/BoardModal";
import CreateBoard from "../CreateBoard/CreateBoard";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ReadOnlyDisplayBoard from "../ReadOnly/ReadOnlyDisplayBoard";
import ReadOnlyDisplayTask from "../ReadOnly/ReadOnlyDisplayTask";

function ListBoards(props) {
    //const [selectedBoard, setSelectedBoard] = useState(-1)
    const [user, setUser] = useState(props.user)
    const navigate = useNavigate();
    const location = useLocation();
    const [admin, setAdmin] = useState([]);
    const [invited, setInvited] = useState([]);
    const [boardType, setBoardType] = useState("admin");

    function setType(event) {
        console.log(event.target.id)
        setBoardType(event.target.id)
    }

    useEffect(function () {
        setAdmin([]);
        let tempAdmin = [];
        setInvited([]);
        let tempInvited = [];
        user.permissions.forEach(element => {
            console.log(tempAdmin)
            if (element.type == "admin") {
                tempAdmin.push(element)
            }
            else if (element.type == "invited") {
                tempInvited.push(element)
            }
        });
        setAdmin(tempAdmin);
        setInvited(tempInvited);
        console.log(invited);
    },[user])

    //Handle selected board
    function onSelectedBoard(board) {
        console.log("select board")
        props.setSelectedBoard(board)
        //navigate('/board', {replace: true})
        console.log(board)
    }

    let displayBoard = (props.selectedBoard === -1 ? "" : (boardType == "admin" ? <DisplayBoard user={user} setSelectedBoard={onSelectedBoard} board={props.selectedBoard} refresh={props.refresh} access_token={props.access_token}></DisplayBoard> : <ReadOnlyDisplayBoard user={user} setSelectedBoard={onSelectedBoard} board={props.selectedBoard} refresh={props.refresh} access_token={props.access_token}></ReadOnlyDisplayBoard>))
    let boardsList = (<div></div>)

    async function update() {
        await axios.get("http://localhost:3000/users/readUserByEmail/?email=" + user.email).then((user) => {
            console.log(user)
            setUser(user.data[0])
        })
    }
    
    //Update the boards when changed
    function updateBoardsList() {
        let tempPerms = admin;
        if (boardType == "admin") tempPerms = admin
        else if (boardType == "invited") tempPerms = invited
        if (location.pathname === "/" || location.pathname === "") {
            boardsList = tempPerms.map((permission) => {
            return (<div className="listBoards">
                <div>
                <div className="card" style={{width: "18rem"}}>
                    <div className="card-body">
                    <h5 className="card-title">{permission.boards[0].title}</h5>
                        <button className="btn btn-primary" value={permission.boards[0].board_id}
                        onClick={() => onSelectedBoard(permission.boards[0])}
                        >
                        Go To
                        </button>
                    </div>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={'#board'+permission.boards[0].board_id}>Edit</button>
                    <BoardModal board={permission.boards[0]} access_token={props.access_token} refresh={update}></BoardModal>
                </div>
                </div>
                
            </div>)
        })
    }
        
        
    }

    let createBoard = <button className="btn btn-light new-column" data-toggle="modal" data-target="#newBoard">New Board</button>
    


    //render
    
    return (
        <div>
            
            {updateBoardsList()}
            {console.log(props.selectedBoard)}
            <div hidden={props.selectedBoard !== -1} className="tabs">
                <ul class="nav nav-tabs justify-content-center">
                    <li class="nav-item">
                        <button id={"admin"} class={boardType == "admin" ? "active navItem btn btn-light" : "active navItem btn btn-dark"} aria-current="page" onClick={setType}>Admin</button>
                    </li>
                    <li class="nav-item">
                        <button id={"invited"} class={boardType == "invited" ? "active navItem btn btn-light" : "active navItem btn btn-dark" }  aria-current="page" onClick={setType}>Invited</button>
                    </li>
                </ul>
            </div>
            <div className="boards">
                {props.selectedBoard === -1 ? boardsList : ""}
            </div>


            {props.selectedBoard === -1 ? <div className="newBoard"><button  className="btn btn-success new-board" data-bs-toggle="modal" data-bs-target="#newBoard">New Board</button></div> : ""}
            <CreateBoard user={user} access_token={props.access_token} refresh={update}></CreateBoard>

            {displayBoard}
        </div>
    )
}

//<Route path='/board' element={<DisplayBoard key={props.selectedBoard} user={user} board={props.selectedBoard} access_token={props.access_token} refresh={props.refresh} />} />
export default ListBoards