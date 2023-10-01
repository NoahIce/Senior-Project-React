import { Component } from "react";
import './ListBoards.css'
import DisplayBoard from "../DisplayBoard/DisplayBoard";
import BoardModal from "../BoardModal/BoardModal";
import CreateBoard from "../CreateBoard/CreateBoard";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"
import { Routes, Route } from "react-router-dom";

function ListBoards(props) {
    //const [selectedBoard, setSelectedBoard] = useState(-1)
    const [user, setUser] = useState(props.user)
    const navigate = useNavigate();
    const location = useLocation();

    //Handle selected board
    function onSelectedBoard(board) {
        console.log("select board")
        props.setSelectedBoard(board)
        navigate('/board', {replace: true})
        console.log(board)
    }

    let displayBoard = (props.selectedBoard === -1 ? "" : <DisplayBoard user={user} board={props.selectedBoard} refresh={props.refresh}></DisplayBoard>)
    let boardsList = (<div></div>)

    async function update() {
        await axios.get("http://localhost:3000/users/readUserByEmail/?email=" + user.email).then((user) => {
            console.log(user)
            setUser(user.data[0])
        })
    }
    
    //Update the boards when changed
    function updateBoardsList() {
        if (location.pathname === "/" || location.pathname === "") {
            boardsList = user?.permissions.map((permission) => {
            return (<div>
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
            <div className="boards">
                {boardsList}
            </div>
            
            
            {props.selectedBoard === -1 ? <button  className="btn btn-light new-column" data-bs-toggle="modal" data-bs-target="#newBoard">New Board</button> : ""}
            <CreateBoard user={user} access_token={props.access_token} refresh={update}></CreateBoard>

            <Routes>
              <Route path='/board' element={<DisplayBoard key={props.selectedBoard} user={user} board={props.selectedBoard} access_token={props.access_token} refresh={props.refresh} />} />
            </Routes>
        </div>
    )
}

export default ListBoards