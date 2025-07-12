import { FilterValues } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx'
import { Todolist, todolistSchema } from '@/features/todolists/api/todolistsApi.types.ts'
import { _todolistsApi } from '@/features/todolists/api/_todolistsApi.ts'
import { createAppSlice, handleServerAppError, handleServerNetworkError } from '@/common/utils'
import { setAppStatus } from '@/app/appSlice.ts'
import { RequestStatus } from '@/common/types'
import { ResultCode } from '@/common/enums.ts'
import { clearDataAC } from '@/common/actions'

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}

const initialState: DomainTodolist[] = []

export const todolistsSlice = createAppSlice({
  name: 'todolists',
  initialState,
  reducers: (create) => ({
    fetchTodolistsTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatus({ status: 'loading' }))
          const res = await _todolistsApi.getTodolists()
          todolistSchema.array().parse(res.data)
          dispatch(setAppStatus({ status: 'succeeded' }))
          return { todolists: res.data }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload.todolists.forEach((tl) => {
            state.push({ ...tl, filter: 'all', entityStatus: 'idle' })
          })
        },
      },
    ),
    deleteTodolistTC: create.asyncThunk(
      async (id: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatus({ status: 'loading' }))
          dispatch(changeTodolistStatusAC({ id, entityStatus: 'loading' }))
          const res = await _todolistsApi.deleteTodolist(id)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatus({ status: 'succeeded' }))
            return { id }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((tl) => tl.id === action.payload.id)
          if (index !== -1) {
            state.splice(index, 1)
          }
        },
      },
    ),
    createTodolistTC: create.asyncThunk(
      async (title: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatus({ status: 'loading' }))
          const res = await _todolistsApi.createTodolist(title)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatus({ status: 'succeeded' }))
            return { todolist: res.data.data.item }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const newTodolist: DomainTodolist = {
            ...action.payload.todolist,
            filter: 'all',
            entityStatus: 'idle',
          }
          state.unshift(newTodolist)
        },
      },
    ),
    changeTodolistTitleTC: create.asyncThunk(
      async (arg: { id: string; title: string }, { dispatch, rejectWithValue }) => {
        const { id, title } = arg
        try {
          dispatch(setAppStatus({ status: 'loading' }))
          const res = await _todolistsApi.changeTodolistTitle({ id, title })
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatus({ status: 'succeeded' }))
            return { id, title }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((tl) => tl.id === action.payload.id)
          if (index !== -1) {
            state[index].title = action.payload.title
          }
        },
      },
    ),
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    }),
    changeTodolistStatusAC: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
      const todolist = state.find((tl) => tl.id === action.payload.id)
      if (todolist) {
        todolist.entityStatus = action.payload.entityStatus
      }
    }),
  }),
  selectors: {
    selectTodolists: (state) => state,
  },
  extraReducers: (builder) => {
    builder.addCase(clearDataAC, () => {
      return initialState
    })
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const {
  changeTodolistTitleTC,
  createTodolistTC,
  deleteTodolistTC,
  fetchTodolistsTC,
  changeTodolistFilterAC,
  changeTodolistStatusAC,
} = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors
