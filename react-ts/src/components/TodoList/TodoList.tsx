// Imports
import React, { useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import "./TodoList.css";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, updateTodo } from "../../redux/slices/todosSlice";
import { RootState } from "../../redux/store";
import { ALERT_MESSAGE } from "../../shared/Constants";

const TodoList: React.FC = () => {
  const dispatch = useDispatch();

  // Get all todos from Redux store
  const allTodos = useSelector((state: RootState) => state.todos.todos);

  const [input, setInput] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  // Function to handle the "Add" button click
  const handleClick = () => {
    if (input.trim() !== "") {
      dispatch(addTodo({ text: input }));
      setInput("");
    } else {
      alert(ALERT_MESSAGE.input);
    }
  };

  // Function to handle the "Update" button click
  const handleUpdate = (index: number) => {
    setEditingIndex(index);
    setEditingText(allTodos[index].text);
  };

  // Function to save the updated todo text
  const saveUpdatedTodoText = (index: number) => {
    if (editingText.trim() !== "") {
      dispatch(updateTodo({ index, text: editingText }));
      setEditingIndex(null);
      setEditingText("");
    } else {
      alert(ALERT_MESSAGE.update);
    }
  };

  // Function to handle the "Delete" button click
  const handleDeleteTodo = (index: number) => {
    dispatch(deleteTodo(index));
  };

  return (
    <div className="todo-page">
      <h1>TODO List in React TypeScript</h1>
      <div>
        <input
          type="text"
          placeholder="Add Todo Item"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <button onClick={handleClick}>Add</button>
      </div>
      <div>
        <ul>
          {allTodos.length > 0 ? (
            allTodos.map((todo, index) => (
              <li key={index}>
                {editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.currentTarget.value)}
                    />
                    <h3 onClick={() => saveUpdatedTodoText(index)}>
                      <BsCheck2 />
                    </h3>
                  </>
                ) : (
                  <span>{todo.text}</span>
                )}
                <div>
                  <button onClick={() => handleUpdate(index)}>
                    <BiEdit />
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteTodo(index)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No todos available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
