import { createSlice, nanoid } from '@reduxjs/toolkit'
import { TasksState } from '@/app/App.tsx'
import { createTodolistAC, deleteTodolistAC } from '@/features/todolists/model/todolistsSlice.ts'

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as TasksState,
  reducers: (create) => ({
    deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) {
        state[action.payload.todolistId].splice(index, 1)
      }
    }),
    createTaskAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
      state[action.payload.todolistId].unshift({ id: nanoid(), title: action.payload.title, isDone: false })
    }),
    changeTaskAC: create.reducer<{
      todolistId: string
      taskId: string
      updateFields: { title?: string; isDone?: boolean }
    }>((state, action) => {
      const task = state[action.payload.todolistId].find((t) => t.id === action.payload.taskId)
      if (task) {
        Object.assign(task, action.payload.updateFields)
      }
    }),
  }),
  extraReducers: (builder) => {
    builder.addCase(createTodolistAC, (state, action) => {
      state[action.payload.id] = []
    })
    builder.addCase(deleteTodolistAC, (state, action) => {
      delete state[action.payload.id]
    })
  },
})

export const { deleteTaskAC, createTaskAC, changeTaskAC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
