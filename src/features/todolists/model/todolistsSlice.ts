import {FilterValues} from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx'
import {Todolist} from '@/features/todolists/api/todolistsApi.types.ts'
import {todolistsApi} from '@/features/todolists/api/todolistsApi.ts'
import {createAppSlice} from "@/common/utils";
import {setAppStatus} from "@/app/appSlice.ts";

export type DomainTodolist = Todolist & {
    filter: FilterValues
}

export const todolistsSlice = createAppSlice({
    name: 'todolists',
    initialState: [] as DomainTodolist[],
    reducers: (create) => ({
        fetchTodolistsTC: create.asyncThunk(
            async (_, {dispatch, rejectWithValue}) => {
                try {
                    dispatch(setAppStatus({status: 'loading'}))
                    const res = await todolistsApi.getTodolists()
                    dispatch(setAppStatus({status: 'succeeded'}))
                    return {todolists: res.data}
                } catch (error) {
                    dispatch(setAppStatus({status: 'failed'}))
                    return rejectWithValue(error)
                }
            },
            {
                fulfilled: (state, action) => {
                    action.payload.todolists.forEach(tl => {
                        state.push({...tl, filter: 'all'})
                    })
                },
            }
        ),
        deleteTodolistTC: create.asyncThunk(
            async (id: string, {dispatch, rejectWithValue}) => {
                try {
                    dispatch(setAppStatus({status: 'loading'}))
                    await todolistsApi.deleteTodolist(id)
                    dispatch(setAppStatus({status: 'succeeded'}))
                    return {id}
                } catch (error) {
                    dispatch(setAppStatus({status: 'failed'}))
                    return rejectWithValue(error)
                }
            },
            {
                fulfilled: (state, action) => {
                    const index = state.findIndex((tl) => tl.id === action.payload.id)
                    if (index !== -1) {
                        state.splice(index, 1)
                    }
                }
            }
        ),
        createTodolistTC: create.asyncThunk(
            async (title: string, {dispatch, rejectWithValue}) => {
                try {
                    dispatch(setAppStatus({status: 'loading'}))
                    const res = await todolistsApi.createTodolist(title)
                    dispatch(setAppStatus({status: 'succeeded'}))
                    return {todolist: res.data.data.item}
                } catch (error) {
                    dispatch(setAppStatus({status: 'failed'}))
                    return rejectWithValue(error)
                }
            },
            {
                fulfilled: (state, action) => {
                    const newTodolist: DomainTodolist = {
                        ...action.payload.todolist,
                        filter: 'all'
                    }
                    state.unshift(newTodolist)
                }
            }
        ),
        changeTodolistTitleTC: create.asyncThunk(
            async (arg: { id: string, title: string }, {dispatch, rejectWithValue}) => {
                const {id, title} = arg
                try {
                    dispatch(setAppStatus({status: 'loading'}))
                    await todolistsApi.changeTodolistTitle({id, title})
                    dispatch(setAppStatus({status: 'succeeded'}))
                    return {id, title}
                } catch (error) {
                    dispatch(setAppStatus({status: 'failed'}))
                    return rejectWithValue(error)
                }
            },
            {
                fulfilled: (state, action) => {
                    const index = state.findIndex(tl => tl.id === action.payload.id)
                    if (index !== -1) {
                        state[index].title = action.payload.title
                    }
                }
            }
        ),
        changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
            const index = state.findIndex((tl) => tl.id === action.payload.id)
            if (index !== -1) {
                state[index].filter = action.payload.filter
            }
        })
    }),
    selectors: {
        selectTodolists: (state) => state,
    },
})

export const todolistsReducer = todolistsSlice.reducer
export const {
    changeTodolistTitleTC,
    createTodolistTC,
    deleteTodolistTC,
    fetchTodolistsTC,
    changeTodolistFilterAC
} = todolistsSlice.actions
export const {selectTodolists} = todolistsSlice.selectors