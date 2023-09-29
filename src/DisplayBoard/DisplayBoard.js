import { Component } from "react";
import CreateBoardColumn from "../CreateBoardColumn/CreateBoardColumn";
import CreateTask from "../CreateTask/CreateTask";
import "./DisplayBoard.css";
import DisplayTask from "../DisplayTask/DisplayTask";
import BoardColumnModal from "../BoardColumnModal/BoardColumnModal";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";



function DisplayBoard(props) {

    const [items, setItems] = useState(props.board.boardColumns)

    async function update() {
        await axios.get("http://localhost:3000/users/readUserByEmail/?email=" + props.user.email).then((user) => {
            //console.log(user.data[0].permissions[0].boards[0].boardColumns)
            setItems(user.data[0].permissions[0].boards[0].boardColumns)
        })
    }

    async function handleDragEnd(result) {
        //if (!result.destination)
        const {source, destination} = result
        console.log(destination)
        if (source.droppableId === destination.droppableId) {
            var oldItems = Array.from(items)
            const newItems = items.filter(function(item) { return item.board_column_id.toString() === result.destination.droppableId})
            const [reorderedItems] = newItems[0].tasks.splice(result.source.index, 1)
            
            newItems[0].tasks.splice(result.destination.index, 0, reorderedItems)

            var index = items.findIndex(function(item, i){
                return item.name === result.destination.droppableId
            });

            oldItems[index] = newItems[0]

            //console.log(items.indexOf(oldItems))
            setItems(oldItems)
        }
        else {
            try {
                var oldItems = Array.from(items)
                const sourceColumn = items.filter(function(item) { return item.board_column_id.toString() === source.droppableId})
                const destinationColumn = items.filter(function(item) { return item.board_column_id.toString() === destination.droppableId})

                const [reorderedItems] = sourceColumn[0].tasks.splice(result.source.index, 1)
                destinationColumn[0].tasks.splice(destination.index, 0, reorderedItems)

                var sourceIndex = items.findIndex(function(item, i){
                    return item.name === source.droppableId
                });

                var destinationIndex = items.findIndex(function(item, i){
                    return item.name === destination.droppableId
                });

                reorderedItems.board_column_id = destinationColumn[0].board_column_id

                await axios.put("http://localhost:3000/tasks/updateTask", reorderedItems).then((result) =>{
                    console.log("Updated task")
                    console.log(result)
                })

                oldItems[sourceIndex] = sourceColumn[0];
                oldItems[destinationIndex] = destinationColumn[0]

                setItems(oldItems)
            }
            catch(error) {
                console.log(error)
            }
        }
    }

    //Board to render
    let boardJSX = (
        <div className="main">
            <DragDropContext onDragEnd={handleDragEnd}>
                
                    {items.map((column, index) => {
                        console.log(column.board_column_id)
                        return (
                            
                            <Droppable droppableId={column.board_column_id.toString()} index={column}> 
                            {(provided, snapshot) => (
                            <ul className="sample" {...provided.droppableProps} ref={provided.innerRef}>
                                <div className="page-content page-container" id="page-content">
                                    <div className="padding">
                                        <div>
                                            <div className="row container">
                                                <div className="col-sm-12">
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <button
                                                                type="button"
                                                                className="column"
                                                                data-bs-toggle="modal"
                                                                data-bs-target={"#column" + column.board_column_id}
                                                            >
                                                                <h5>{column.title}</h5>
                                                            </button>
                                                        </div>
                                                        <BoardColumnModal
                                                            column={column}
                                                            board={props.board}
                                                        ></BoardColumnModal>
                                                        <div className="card-block">
                                                            <div className="row">
                                                                {column.tasks.map((task, index) => {
                                                                    return (
                                                                        <div>
                                                                        <button
                                                                        type="button"
                                                                        className="task"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target={"#task" + task.task_id}
                                                                    >
                                                                        <Draggable key = {task.task_id} draggableId={task.task_id?.toString()} index={index}>
                                                                            {(provided) => (
                                                                            <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="sample">
                                                                                <div>
                                                                                        <div className="card task text-black bg-light mb-3">
                                                                                            <div className="card-body">
                                                                                                <h5 className="card-title">
                                                                                                    {task.title}
                                                                                                </h5>
                                                                                                <p className="card-text">
                                                                                                    {task.description}
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                    
                                                                                    
                                                                                </div>
                                                                            </li>
                                                                            )}
                                                                        </Draggable>
                                                                        
                                                                        </button>
                                                                        <DisplayTask
                                                                            task={task}
                                                                            board={props.board}
                                                                            access_token={props.access_token}
                                                                            refresh={update}
                                                                        ></DisplayTask>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="new-task">
                                                    {column.position !== 1 ? "" :<button
                                                            type="button"
                                                            className="btn btn-primary"
                                                            data-bs-toggle="modal"
                                                            data-bs-target={"#newTask" + column.column_id}
                                                        >
                                                            New Task
                                                        </button>}
                                                    </div>
                                                </div>
                                                {column.position !== 1 ? "" : <CreateTask
                                                    board={props.board}
                                                    column={column}
                                                    access_token={props.access_token}
                                                    refresh={update}
                                                ></CreateTask>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {provided.placeholder}
                            </ul>
                            )} 
                            </Droppable>
                        );
                    })}
            </DragDropContext>
        </div>
    );

    //Render
        return (
            <div>
                <div className="invite">
                    <button
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#invite"
                    >
                        Invite a user
                    </button>
                    {boardJSX}
                </div>
                <button
                    className="btn btn-light new-column"
                    data-bs-toggle="modal"
                    data-bs-target="#newColumn"
                >
                    New Column
                </button>
                <CreateBoardColumn board={props.board}></CreateBoardColumn>
            </div>
        );
}

export default DisplayBoard;
