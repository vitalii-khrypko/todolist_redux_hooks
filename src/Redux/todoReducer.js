const ADD_TODO = "ADD-TODO";
const NEW_TODO_TEXT = "NEW-TODO-TEXT";
const DELETE_TODO = "DELETE-TODO";
const DELETE_ALL = "DELETE-ALL";

// for editing todo
const EDIT_TODO_TEXT = "EDIT-TODO-TEXT"; //update text of todo when editing is finished
const SET_EDIT_TEXT = "SET_EDIT_TEXT"; //update text in input while editing
const SET_EDIT_TODO = "SET-EDIT-TODO"; //update ID of editing todo and its text
const CLEAR_EDIT_TODO = "CLEAR-EDIT-TODO"; //clear edit states

let initialState = {
    todos: [],
    newTodoText: "",
    editTodoId: null,
    editText: ""
};

const todoReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TODO:
            let newTodo = {
                id: state.todos.length + 1,
                todoText: state.newTodoText,
                date: new Date().toLocaleString()
            };
            return {
                ...state,
                todos: [...state.todos, newTodo],
                newTodoText: ""
            };

        case NEW_TODO_TEXT:
            return {
                ...state,
                newTodoText: action.text
            };

        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.todoId)
            };

        case DELETE_ALL:
            return {
                ...state,
                todos: []
            }

        case EDIT_TODO_TEXT:
            return{
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.todoId
                        ? { ...todo, todoText: action.text }
                        : todo
                ),
            }

        case SET_EDIT_TEXT:
            return{
                ...state,
                editText: action.text
            }

        case SET_EDIT_TODO:
            return {
                ...state,
                editTodoId: action.todoId,
                editText: action.text
            }

        case CLEAR_EDIT_TODO:
            return {
                ...state,
                editTodoId: null,
                editText: ""
            }

        default:
            return state;
    }
}

// add a new todo item to the list
export const addTodoActionCreator = () => ({ type: ADD_TODO });

// update the text input for a new todo item
export const newTodoTextActionCreator = (text) => ({ type: NEW_TODO_TEXT, text });

// delete a specific todo item by its ID
export const deleteTodoActionCreator = (todoId) => ({ type: DELETE_TODO, todoId });

// delete all todo items from the list
export const deleteAllActionCreator = () => ({ type: DELETE_ALL });

// for editing todo

// update the text of a specific todo item when editing is completed
export const editTodoTextActionCreator = (todoId, text) => ({ type: EDIT_TODO_TEXT, todoId, text });

// update the text inside the input field while editing (step by step)
export const setEditTextActionCreator = (text) => ({ type: SET_EDIT_TEXT, text });

// set the ID and text of the todo item being edited
export const setEditTodoActionCreator = (todoId, text) => ({ type: SET_EDIT_TODO, todoId, text });

// clear the editing state after saving or canceling the edit
export const clearEditTodoActionCreator = () => ({ type: CLEAR_EDIT_TODO});

export default todoReducer;