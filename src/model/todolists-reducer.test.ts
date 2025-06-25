import {expect, test, beforeEach} from 'vitest'
import type {Todolist} from '../App'
import {createTodolistAC, deleteTodolistAC, todolistsReducer} from './todolists-reducer'

let todolistId1: string
let todolistId2: string
let startState: Todolist[] = []

beforeEach(() => {
    todolistId1 = crypto.randomUUID()
    todolistId2 = crypto.randomUUID()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
})

test('correct todolist should be deleted', () => {
    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be created', () => {
    const title = 'New todolist'
    const endState = todolistsReducer(startState, createTodolistAC(title))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})