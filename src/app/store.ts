import { configureStore } from '@reduxjs/toolkit'
import { appReducer, appSlice } from '@/app/appSlice.ts'
import { todolistsReducer, todolistsSlice } from '@/features/todolists/model/todolistsSlice.ts'
import { tasksReducer, tasksSlice } from '@/features/todolists/model/tasksSlice.ts'
import { authReducer, authSlice } from '@/features/auth/model/authSlice.ts'

// создание store
export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [todolistsSlice.name]: todolistsReducer,
    [tasksSlice.name]: tasksReducer,
    [authSlice.name]: authReducer,
  },
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
