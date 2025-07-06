import {beforeEach, expect, test} from 'vitest'
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    createTodolistTC,
    deleteTodolistTC,
    DomainTodolist,
    todolistsReducer,
} from '../todolistsSlice.ts'
import {nanoid} from '@reduxjs/toolkit'

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[] = []

beforeEach(() => {
    todolistId1 = nanoid()
    todolistId2 = nanoid()

    startState = [
        {id: todolistId1, title: 'What to learn', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'},
    ]
})

test('correct todolist should be deleted', () => {
    const endState = todolistsReducer(startState, deleteTodolistTC.fulfilled({id: todolistId1}, 'requestId', todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be created', () => {
    const title = 'New todolist'
    const newTodolist: DomainTodolist = {
        id: nanoid(),
        title,
        addedDate: 'testText',
        order: 2,
        filter: 'all',
        entityStatus: 'idle'
    }
    const endState = todolistsReducer(startState, createTodolistTC.fulfilled({todolist: newTodolist}, 'requestId2', title))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(title)  // Проверяем, что новый тудулист добавлен в конец
})

test('correct todolist should change its title', () => {
    const title = 'New title'
    const endState = todolistsReducer(startState, changeTodolistTitleTC.fulfilled({
        id: todolistId2,
        title
    }, 'requestId3', {id: todolistId2, title}))

    // Проверка, что первый тудулист остался без изменений
    expect(endState[0].title).toBe('What to learn')

    // Проверка, что второй тудулист изменил свое название
    expect(endState[1].title).toBe(title)
})

test('correct todolist should change its filter', () => {
    const filter = 'completed'
    const endState = todolistsReducer(startState, changeTodolistFilterAC({id: todolistId2, filter}))

    // Проверка, что фильтр для первого тудулиста не изменился
    expect(endState[0].filter).toBe('all')

    // Проверка, что фильтр для второго тудулиста изменился
    expect(endState[1].filter).toBe(filter)
})
