import { Todolist } from '@/app/App.tsx'
import { createSlice, nanoid } from '@reduxjs/toolkit'
import { FilterValues } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx'

const todolistSlice = createSlice({
  name: 'todolists',
  initialState: [] as Todolist[],
  reducers: (create) => ({
    deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    changeTodolistTitleAC: create.reducer<{ id: string; title: string }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    }),
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    }),
    createTodolistAC: create.preparedReducer(
      (title: string) => ({
        payload: {
          id: nanoid(),
          title,
        },
      }),
      (state, action) => {
        state.unshift({ ...action.payload, filter: 'all' })
      },
    ),
  }),
})

export const { createTodolistAC, deleteTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC } =
  todolistSlice.actions
export const todolistsReducer = todolistSlice.reducer
