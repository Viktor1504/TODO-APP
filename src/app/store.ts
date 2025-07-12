import { configureStore } from '@reduxjs/toolkit'
import { appReducer, appSlice } from '@/app/appSlice.ts'
import { todolistsReducer, todolistsSlice } from '@/features/todolists/model/todolistsSlice.ts'
import { tasksReducer, tasksSlice } from '@/features/todolists/model/tasksSlice.ts'
import { authReducer, authSlice } from '@/features/auth/model/authSlice.ts'
import { todolistsApi } from '@/features/todolists/api/todolistsApi.ts'
import { setupListeners } from '@reduxjs/toolkit/query'

// создание store
export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [todolistsSlice.name]: todolistsReducer,
    [tasksSlice.name]: tasksReducer,
    [authSlice.name]: authReducer,
    [todolistsApi.reducerPath]: todolistsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todolistsApi.middleware),
})

setupListeners(store.dispatch)

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
