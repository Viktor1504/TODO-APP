import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { FilterValues } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx'
import { Todolist } from '@/features/todolists/api/todolistsApi.types.ts'
import { todolistsApi } from '@/features/todolists/api/todolistsApi.ts'

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: 'idle' | 'loading' | 'failed'
}

export const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
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
        state.unshift({ ...action.payload, filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' })
      },
    ),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistsTC.fulfilled, (_, action) => {
        return action.payload?.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
      })
      .addCase(fetchTodolistsTC.rejected, (_, action) => {
        console.error('Error fetching todolists:', action.payload)
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const todolist = state.find((tl) => tl.id === action.payload.id)
        if (todolist) {
          todolist.title = action.payload.title
        }
      })
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const { createTodolistAC, deleteTodolistAC, changeTodolistFilterAC } = todolistsSlice.actions

export const fetchTodolistsTC = createAsyncThunk(
  `${todolistsSlice.name}/fetchTodolistsTC`,
  async (_, { rejectWithValue }) => {
    try {
      const res = await todolistsApi.getTodolists()
      return { todolists: res.data }
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (
    payload: {
      id: string
      title: string
    },
    { rejectWithValue },
  ) => {
    try {
      await todolistsApi.changeTodolistTitle(payload)
      return payload
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
