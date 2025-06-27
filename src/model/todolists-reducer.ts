import {Todolist} from "../app/App.tsx";
import {FilterValues} from "../TodolistItem.tsx";
import {createAction, nanoid} from "@reduxjs/toolkit";

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: TodolistsActionsType): Todolist[] => {
    switch (action.type) {
        case 'todolists/deleteTodolist':
            return state.filter((tl: Todolist) => tl.id !== action.payload.id)
        case 'todolists/createTodolist':
            return [...state, {id: action.payload.id, title: action.payload.title, filter: 'all'}]
        case 'todolists/changeTodolistTitle':
            return state.map((tl: Todolist) => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case 'todolists/changeTodolistFilter':
            return state.map((tl: Todolist) => tl.id === action.payload.id ? {
                ...tl,
                filter: action.payload.filter
            } : tl)
        default:
            return state
    }
}

export const deleteTodolistAC = createAction<{ id: string }>('todolists/deleteTodolist')

export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return {payload: {title, id: nanoid()}}
})

export const changeTodolistTitleAC = createAction<{ id: string, title: string }>('todolists/changeTodolistTitle')

export const changeTodolistFilterAC = createAction<{
    id: string,
    filter: FilterValues
}>('todolists/changeTodolistFilter')

export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>

export type TodolistsActionsType =
    | DeleteTodolistAction
    | CreateTodolistAction
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>