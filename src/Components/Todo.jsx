import React from 'react';
import "./Todo.css";
import { useSelector, useDispatch } from 'react-redux'
import {addTodoActionCreator, deleteTodoActionCreator, newTodoTextActionCreator} from "../Redux/todoReducer";

const Todo = () => {
    const todos = useSelector((state) => state.todo.todos);
    const newTodoText = useSelector((state) => state.todo.newTodoText);
    const dispatch = useDispatch();

    // let newTodoElement = React.createRef();

    const addTodo = () => {
        dispatch(addTodoActionCreator());
    }

    const onInputChange = (e) => {
        let text = e.target.value;
        dispatch(newTodoTextActionCreator(text));
    }

    let todoElement = todos
        .map(todo =>
            <div key={todo.id} className="todoItem">
                <p>{todo.todoText}</p>
                <button onClick={() => dispatch(deleteTodoActionCreator(todo.id))} className="deleteBtn">
                    Delete
                </button>
            </div>
        );

    return (
        <div className="inputTodo">
            <input
                onChange={onInputChange}
                value={newTodoText}
                // ref={newTodoElement}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
                placeholder="Enter your todo"
            />
            <button onClick={addTodo}>Add</button>
            {todoElement}
        </div>
    )
}

export default Todo;