import { configureStore } from '@reduxjs/toolkit'
import { appReducer, appSlice } from '@/app/appSlice.ts'
import { todolistSlice, todolistsReducer } from '@/features/todolists/model/todolistsSlice.ts'
import { tasksReducer, tasksSlice } from '@/features/todolists/model/tasksSlice.ts'

// создание store
export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [todolistSlice.name]: todolistsReducer,
    [tasksSlice.name]: tasksReducer,
  },
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
