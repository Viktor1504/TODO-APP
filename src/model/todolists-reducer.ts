import {Todolist} from "../App.tsx";
import {FilterValues} from "../TodolistItem.tsx";

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: TodolistsActionsType): Todolist[] => {
    switch (action.type) {
        case 'DELETE-TODOLIST':
            return state.filter((tl: any) => tl.id !== action.payload.id)
        case 'CREATE-TODOLIST':
            return [...state, {id: crypto.randomUUID(), title: action.payload.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map((tl: any) => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((tl: any) => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        default:
            return state
    }
}

export const deleteTodolistAC = (id: string) => ({type: 'DELETE-TODOLIST', payload: {id}} as const)

export const createTodolistAC = (title: string) => ({type: 'CREATE-TODOLIST', payload: {title}} as const)

export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        id,
        title
    }
} as const)

export const changeTodolistFilterAC = (id: string, filter: FilterValues) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        id,
        filter
    }
} as const)

export type TodolistsActionsType =
    ReturnType<typeof deleteTodolistAC> |
    ReturnType<typeof createTodolistAC> |
    ReturnType<typeof changeTodolistTitleAC> |
    ReturnType<typeof changeTodolistFilterAC>