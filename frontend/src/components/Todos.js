import React from "react";
import App from "../App";


const ToDoItem = ({todo}) => {
    let updatedDate = new Date(todo.updatedAt)
    let createdDate = new Date(todo.createdAt)
    return (

        <tr>
            <td scope="col">{todo.project.name}</td>
            <td scope="col">{todo.creator.username}</td>
            <td scope="col">{todo.noteText}</td>
            <td scope="col">{createdDate.toISOString().substring(0, 10)}</td>
            <td scope="col">{updatedDate.toISOString().substring(0, 10)}</td>
            <td scope="col">{todo.isActive.toString()}</td>
        </tr>

    )
}

const ToDoList = ({todos}) => {
    return (

        <div className="container">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Project name</th>
                    <th scope="col">Creator</th>
                    <th scope="col">Note text</th>
                    <th scope="col">Created at</th>
                    <th scope="col">Updated at</th>
                    <th scope="col">Status (is active)</th>
                </tr>
                </thead>
                <tbody>
                {todos.results.map((todo) => <ToDoItem key={todo.id} todo={todo}/>)}
                </tbody>
            </table>
        </div>

    )
}
export default ToDoList;