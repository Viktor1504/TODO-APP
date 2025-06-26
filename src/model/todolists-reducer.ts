import {Todolist} from "../app/App.tsx";
import {FilterValues} from "../TodolistItem.tsx";

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: TodolistsActionsType): Todolist[] => {
    switch (action.type) {
        case 'DELETE-TODOLIST':
            return state.filter((tl: any) => tl.id !== action.payload.id)
        case 'CREATE-TODOLIST':
            return [...state, {id: action.payload.id, title: action.payload.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map((tl: any) => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((tl: any) => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        default:
            return state
    }
}

export const deleteTodolistAC = (id: string) => ({type: 'DELETE-TODOLIST', payload: {id}} as const)

export const createTodolistAC = (title: string) => ({
    type: 'CREATE-TODOLIST',
    payload: {id: crypto.randomUUID(), title}
} as const)

export const changeTodolistTitleAC = ({id, title}: { id: string, title: string }) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        id,
        title
    }
} as const)

export const changeTodolistFilterAC = ({id, filter}: { id: string, filter: FilterValues }) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        id,
        filter
    }
} as const)

export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>

export type TodolistsActionsType =
    DeleteTodolistAction |
    CreateTodolistAction |
    ReturnType<typeof changeTodolistTitleAC> |
    ReturnType<typeof changeTodolistFilterAC>