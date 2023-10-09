import { Component } from "react";
import CreateBoardColumn from "../CreateBoardColumn/CreateBoardColumn";
import CreateTask from "../CreateTask/CreateTask";
import "../DisplayBoard/DisplayBoard.css";
import DisplayTask from "../DisplayTask/DisplayTask";
import BoardColumnModal from "../BoardColumnModal/BoardColumnModal";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { useEffect } from "react";
import InviteUser from "../InviteUser/InviteUser";
import ReadOnlyDisplayTask from "./ReadOnlyDisplayTask";



function ReadOnlyDisplayBoard(props) {

    

    const [items, setItems] = useState(props.board.boardColumns)

    useEffect(() => {
        console.log("read")
        update()
    }, []);

    function reorderColumns(unordered) {
        //New items to store ordered columns
        let newItems = unordered;
        newItems.sort(function(a, b) {
            return a.position - b.position
        })
        console.log(newItems)
        //Reorder columns based on position field


        return newItems;
    }

    async function update() {
        await axios.get("http://localhost:3000/users/readUserByEmail/?email=" + props.user.email).then((user) => {
            //console.log(user.data[0].permissions[0].boards[0].boardColumns)
            console.log(props.board)
            var index = user.data[0].permissions.findIndex(function(item, i){
                return item.boards[0].board_id === props.board.board_id
            });
            console.log(index)
            setItems(reorderColumns(user.data[0].permissions[index].boards[0].boardColumns))


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

                var positions = []
                items.forEach((column) => {positions.push(column.position)})
                var lastPosition = -1;
                positions.forEach((position) => {if (position > lastPosition) lastPosition = position})

                

                console.log(items.slice(-1)[0].board_column_id)
                if (destination.droppableId.toString() == items[items.findIndex(function(column){return column.position === lastPosition})].board_column_id ) {
                    console.log("Last col")
                    await axios.put("http://localhost:3000/tasks/updateTask", reorderedItems).then((result) =>{
                        console.log("Updated task")
                        console.log(result)
                        axios.put("https://tasks.googleapis.com/tasks/v1/lists/"+ props.board.tasklist_id +"/tasks/" + reorderedItems.google_id + "?access_token=" + props.access_token, 
                        {"id": reorderedItems.google_id, "title": reorderedItems.title, "notes": reorderedItems.description, "due": new Date(reorderedItems.due).toISOString(), "status": "completed"})
                    })
                }
                else {
                    await axios.put("http://localhost:3000/tasks/updateTask", reorderedItems).then((result) =>{
                        console.log("Updated task")
                        console.log(result)
                        axios.put("https://tasks.googleapis.com/tasks/v1/lists/"+ props.board.tasklist_id +"/tasks/" + reorderedItems.google_id + "?access_token=" + props.access_token, 
                        {"id": reorderedItems.google_id, "title": reorderedItems.title, "notes": reorderedItems.description, "due": new Date(reorderedItems.due).toISOString(), "status": "needsAction"})
                    })
                }

                oldItems[sourceIndex] = sourceColumn[0];
                oldItems[destinationIndex] = destinationColumn[0]

                

                setItems(oldItems)
                
            }
            catch(error) {
                console.log(error)
            }
        }
    }

    async function moveLeft(e) {
        //Find column
        let column = {};
        await items.forEach(element => {
            if (parseInt(element.board_column_id) == e.target.id) column = element;
        });
        //Find left column
        let otherColumn = null;
        await items.forEach(element => {
            if (parseInt(column.position)-1 == element.position) otherColumn = element;
        });
        //If the left column is found, update both columns
        if (otherColumn) {
            console.log(column.board_column_id)
            await axios.put("http://localhost:3000/boardColumns/updateBoardColumn", 
            {board_column_id: column.board_column_id, board_id: column.board_id, title: column.title, position: column.position-1, tasklist_id: column.tasklist_id})
            .then((result) =>{
                console.log(result)
                axios.put("http://localhost:3000/boardColumns/updateBoardColumn", 
                {board_column_id: otherColumn.board_column_id, board_id: otherColumn.board_id, title: otherColumn.title, position: otherColumn.position+1, tasklist_id: otherColumn.tasklist_id})
                .then((result) => {
                    console.log(result)
                    update();
                })
        })
        }
    }

    async function moveRight(e) {
        //Find column
        let column = {};
        await items.forEach(element => {
            if (parseInt(element.board_column_id) == e.target.id) column = element;
        });
        //Find right column
        let otherColumn = null;
        await items.forEach(element => {
            if (parseInt(column.position)+1 == element.position) otherColumn = element;
        });
        //If the right column is found, update both columns
        if (otherColumn) {
            console.log(column.board_column_id)
            await axios.put("http://localhost:3000/boardColumns/updateBoardColumn", 
            {board_column_id: column.board_column_id, board_id: column.board_id, title: column.title, position: column.position+1, tasklist_id: column.tasklist_id})
            .then((result) =>{
                console.log(result)
                axios.put("http://localhost:3000/boardColumns/updateBoardColumn", 
                {board_column_id: otherColumn.board_column_id, board_id: otherColumn.board_id, title: otherColumn.title, position: otherColumn.position-1, tasklist_id: otherColumn.tasklist_id})
                .then((result) => {
                    console.log(result)
                    update();
                })
        })
        }
    }

    function unselectBoard() {
        props.setSelectedBoard(-1)
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
                                                                className="btn btn-light column"
                                                                data-bs-toggle="modal"
                                                                data-bs-target={"#column" + column.board_column_id}
                                                            >
                                                                <h5>{column.title}</h5>
                                                            </button>
                                                            <span className="arrow">
                                                            <button type="button" className="btn btn-light" id={column.board_column_id} onClick={moveLeft}>«</button>
                                                            <button type="button" className="btn btn-light" id={column.board_column_id} onClick={moveRight}>»</button>
                                                            </span>
                                                        </div>
                                                        <BoardColumnModal
                                                            column={column}
                                                            board={props.board}
                                                            refresh={update}
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
                                                                                        <div class="card-header" style={{backgroundColor: '#007FFF'}}>
                                                                                        </div>
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
                                                                        <ReadOnlyDisplayTask
                                                                            task={task}
                                                                            board={props.board}
                                                                            access_token={props.access_token}
                                                                            refresh={update}
                                                                        ></ReadOnlyDisplayTask>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
                <div className="boardTitle">
                <h1>
                    {props.board.title}
                </h1>
                </div>
                <div className="back">
                    <button
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#invite"
                        onClick={unselectBoard}
                    >
                        Back to List
                    </button>
                </div>
                
                {boardJSX}
                
            </div>
        );
}

export default ReadOnlyDisplayBoard;
