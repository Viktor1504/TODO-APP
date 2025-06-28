import {Todolist} from "../../../app/App.tsx";
import {FilterValues} from "../ui/Todolists/TodolistItem/TodolistItem.tsx";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: Todolist[] = []

export const deleteTodolistAC = createAction<{ id: string }>('todolists/deleteTodolist')

export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return {payload: {title, id: nanoid()}}
})

export const changeTodolistTitleAC = createAction<{ id: string, title: string }>('todolists/changeTodolistTitle')

export const changeTodolistFilterAC = createAction<{
    id: string,
    filter: FilterValues
}>('todolists/changeTodolistFilter')

export const todolistsReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex((tl: Todolist) => tl.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
        .addCase(createTodolistAC, (state, action) => {
            state.push({id: action.payload.id, title: action.payload.title, filter: 'all'})
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const index = state.findIndex((tl: Todolist) => tl.id === action.payload.id)
            state[index].title = action.payload.title
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
            const todolist = state.find((tl: Todolist) => tl.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        })
})

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>