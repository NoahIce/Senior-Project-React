import { Component } from "react";
import './ListBoards.css'
import DisplayBoard from "../DisplayBoard/DisplayBoard";
import BoardModal from "../BoardModal/BoardModal";
import CreateBoard from "../CreateBoard/CreateBoard";

class ListBoards extends Component {

    //State
    state = {
        selectedBoard: -1,
        user: this.props.user,
    }

    // refresh()
    // {
    //     this.props.refresh();
    // }

    //Handle selected board
    onSelectedBoard(board) {
        console.log("select board")
        this.setState({selectedBoard: board})
        console.log(board)
    }

    displayBoard = (this.state.selectedBoard === -1 ? "" : <DisplayBoard user={this.props.user} board={this.state.selectedBoard} refresh={this.props.refresh}></DisplayBoard>)
    boardsList = (<div></div>)
    
    //Update the boards when changed
    updateBoardsList = () => {
        if (this.state.selectedBoard === -1)
        {
            this.boardsList = this.props.user.permissions.map((permission) => {
            return (<div>
                <div>
                <div className="card" style={{width: "18rem"}}>
                    <div className="card-body">
                    <h5 className="card-title">{permission.boards[0].title}</h5>
                        <button className="btn btn-primary" value={permission.boards[0].board_id}
                        onClick={() => this.onSelectedBoard(permission.boards[0])}
                        >
                        Go To
                        </button>
                    </div>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={'#board'+permission.boards[0].board_id}>Edit</button>
                    <BoardModal board={permission.boards[0]}></BoardModal>
                </div>
                </div>
                
            </div>)
        })
        }
        else{
            this.boardsList = <div></div>
        }
        
    }

    createBoard = <button className="btn btn-light new-column" data-toggle="modal" data-target="#newBoard">New Board</button>
    


    //render
    render() {
        console.log(this.state.selectedBoard)
        this.updateBoardsList();
        this.displayBoard = (this.state.selectedBoard === -1 ? "" : <DisplayBoard user={this.props.user} board={this.state.selectedBoard} refresh = {this.props.refresh}></DisplayBoard>)
        console.log(this.props.refresh)
            return (
                <div>
                    <div className="boards">
                        {this.boardsList}
                    </div>
                    
                    {this.displayBoard}
                    {this.state.selectedBoard === -1 ? <button  className="btn btn-light new-column" data-bs-toggle="modal" data-bs-target="#newBoard">New Board</button> : ""}
                    <CreateBoard user={this.state.user}></CreateBoard>
                </div>
            )
        }
}

export default ListBoards