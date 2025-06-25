import type {TasksState} from '../App'
import {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer.ts";

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: TasksActionsType): TasksState => {
    switch (action.type) {
        case 'CREATE-TODOLIST': {
            return {...state, [action.payload.id]: []}
        }
        case 'DELETE-TODOLIST': {
            const {[action.payload.id]: deletedTasks, ...restTasks} = state
            return restTasks
        }
        case 'DELETE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        }
        case 'CREATE-TASK': {
            const newTask = {id: crypto.randomUUID(), title: action.payload.title, isDone: false}
            const tasks = state[action.payload.todolistId] || []
            return {...state, [action.payload.todolistId]: [newTask, ...tasks]}
        }
        case 'CHANGE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId
                    ? {...task, ...action.payload.updateFields} : task)
            }
        }
        default:
            return state
    }
}

export const deleteTaskAC = ({todolistId, taskId}: { todolistId: string, taskId: string }) => ({
    type: 'DELETE-TASK',
    payload: {todolistId, taskId}
} as const)

export const createTaskAC = ({todolistId, title}: { todolistId: string, title: string }) => ({
    type: 'CREATE-TASK',
    payload: {todolistId, title}
} as const)

export const changeTaskAC = ({todolistId, taskId, updateFields}: {
    todolistId: string,
    taskId: string,
    updateFields: {
        title?: string,
        isDone?: boolean
    }
}) => ({
    type: 'CHANGE-TASK',
    payload: {todolistId, taskId, updateFields}
} as const)


type TasksActionsType =
    CreateTodolistAction
    | DeleteTodolistAction
    | ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof createTaskAC>
    | ReturnType<typeof changeTaskAC>