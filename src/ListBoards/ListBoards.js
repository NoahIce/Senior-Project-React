import { Component } from "react";
import './ListBoards.css'
import DisplayBoard from "../DisplayBoard/DisplayBoard";

class ListBoards extends Component {

    state = {
        selectedBoard: -1
    }

    onSelectedBoard(board) {
        console.log("select board")
        this.setState({selectedBoard: board})
        console.log(board)
    }

    displayBoard = (this.state.selectedBoard === {} ? "" : <DisplayBoard user={this.props.user} board={this.state.selectedBoard}></DisplayBoard>)
    boardsList = (<div></div>)
    
    
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


    
    render() {
        console.log(this.state.selectedBoard)
        this.updateBoardsList();
        this.displayBoard = (this.state.selectedBoard === -1 ? "" : <DisplayBoard user={this.props.user} board={this.state.selectedBoard}></DisplayBoard>)

            return (
                <div>
                    <div className="boards">
                        {this.boardsList}
                    </div>
                    
                    {this.displayBoard}
                    {this.state.selectedBoard === -1 ? <button  className="btn btn-light new-column" data-toggle="modal" data-target="#newBoard">New Board</button> : ""}
                </div>
            )
        }
}

export default ListBoards