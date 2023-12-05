//Imports
import { configureStore } from '@reduxjs/toolkit'
import  TodosReducer from "./slices/todosSlice";

export const store = configureStore({
  reducer: {
    todos:TodosReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>;
