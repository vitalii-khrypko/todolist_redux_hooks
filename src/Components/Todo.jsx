import React from 'react';
import "./Todo.css";
import { useSelector, useDispatch } from 'react-redux'
import {
    addTodoActionCreator,
    deleteAllActionCreator,
    deleteTodoActionCreator,
    editTodoTextActionCreator,
    newTodoTextActionCreator,
    setEditTextActionCreator,
    setEditTodoActionCreator,
    clearEditTodoActionCreator
} from "../Redux/todoReducer";

const Todo = () => {
    const todos = useSelector((state) => state.todo.todos);
    const newTodoText = useSelector((state) => state.todo.newTodoText);
    const editTodoId = useSelector((state) => state.todo.editTodoId); // ID of edited todo
    const editText = useSelector((state) => state.todo.editText); // text of edited todo
    const dispatch = useDispatch();

    const addTodo = () => {
        dispatch(addTodoActionCreator());
    }

    const deleteTodo = (todoId) => {
        dispatch(deleteTodoActionCreator(todoId));
    }

    const deleteAll = () => {
        dispatch(deleteAllActionCreator());
    }

    const editTodo = (todoId, text) => {
        dispatch(setEditTodoActionCreator(todoId, text )); // update id and text for editing
    }

    const saveEdit = (todoId, text) => {
        dispatch(editTodoTextActionCreator(todoId, text));
        dispatch(clearEditTodoActionCreator()); // clear edit states after saving
    }

    //Main input
    const onInputChange = (e) => {
        let text = e.target.value;
        dispatch(newTodoTextActionCreator(text));
    }

    //Edit input
    const onEditInputChange = (e) => {
        let text = e.target.value;
        dispatch(setEditTextActionCreator(text));
    }

    let todoElement = todos.map(todo =>
        <div key={todo.id} className="todoItem">
            <span className="todoDate">{todo.date}</span>

            {editTodoId === todo.id ? (
                // Input for editing todo
                <div className="edit-container">
                    <input
                        value={editText}
                        onChange={onEditInputChange} // updating text
                    />
                    <button onClick={() => saveEdit(editTodoId, editText)}>Save</button>
                </div>
            ) : (
                <p>{todo.todoText}</p>
            )}

            <button onClick={() => editTodo(todo.id, todo.todoText)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)} className="deleteBtn">
                Delete
            </button>
        </div>
    );

    return (
        <div className="inputTodo">
            <input
                onChange={onInputChange}
                value={newTodoText}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
                placeholder="Enter your todo"
            />
            <button onClick={deleteAll}>Delete All</button>
            <button onClick={addTodo}>Add</button>
            {todoElement}
        </div>
    );
}

export default Todo;
