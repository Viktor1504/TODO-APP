import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {FilterValues} from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx'
import {Todolist} from '@/features/todolists/api/todolistsApi.types.ts'
import {todolistsApi} from '@/features/todolists/api/todolistsApi.ts'

export type DomainTodolist = Todolist & {
    filter: FilterValues
    entityStatus: 'idle' | 'loading' | 'failed'
}

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as DomainTodolist[],
    reducers: (create) => ({
        changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
            const index = state.findIndex((tl) => tl.id === action.payload.id)
            if (index !== -1) {
                state[index].filter = action.payload.filter
            }
        }),
    }),
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodolistsTC.fulfilled, (_, action) => {
                return action.payload?.todolists.map((tl) => ({...tl, filter: 'all', entityStatus: 'idle'}))
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
            .addCase(changeTodolistTitleTC.rejected, (_, action) => {
                console.error('Error changing todolist title:', action.payload)
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex((tl) => tl.id === action.payload)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(deleteTodolistTC.rejected, (_, action) => {
                console.error('Error deleting todolist:', action.payload)
            })
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(createTodolistTC.rejected, (_, action) => {
                console.error('Error creating todolist:', action.payload)
            })
    },
    selectors: {
        selectTodolists: (state) => state,
    },
})

export const todolistsReducer = todolistsSlice.reducer
export const {changeTodolistFilterAC} = todolistsSlice.actions
export const {selectTodolists} = todolistsSlice.selectors

export const fetchTodolistsTC = createAsyncThunk(
    `${todolistsSlice.name}/fetchTodolistsTC`,
    async (_, {rejectWithValue}) => {
        try {
            const res = await todolistsApi.getTodolists()
            return {todolists: res.data}
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
        {rejectWithValue},
    ) => {
        try {
            await todolistsApi.changeTodolistTitle(payload)
            return payload
        } catch (error) {
            return rejectWithValue(error)
        }
    },
)

export const deleteTodolistTC = createAsyncThunk(
    `${todolistsSlice.name}/deleteTodolistTC`,
    async (id: string, {rejectWithValue}) => {
        try {
            await todolistsApi.deleteTodolist(id)
            return id
        } catch (error) {
            return rejectWithValue(error)
        }
    },
)

export const createTodolistTC = createAsyncThunk(
    `${todolistsSlice.name}/createTodolistTC`,
    async (title: string, {rejectWithValue}) => {
        try {
            const res = await todolistsApi.createTodolist(title)
            return {todolist: res.data.data.item}
        } catch (error) {
            return rejectWithValue(error)
        }
    },
)
