//Imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { index, todo } from '../../models/todo.model';

export interface TodosState {
  todos: todo[];
}

const initialState: TodosState = {
  todos:[
    { 
      text: 'Visit shopping mall',
    }
],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<todo>) => {
      state.todos.push( action.payload );
    },
    updateTodo: (state, action: PayloadAction<index>) => {
      const { index, text } = action.payload;
      state.todos[index].text = text;
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos.splice(action.payload, 1);
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = todosSlice.actions;

export default todosSlice.reducer;
