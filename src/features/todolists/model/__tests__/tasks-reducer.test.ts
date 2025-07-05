import {beforeEach, expect, test} from 'vitest'
import {createTaskTC, deleteTaskTC, tasksReducer, updateTaskTC} from '../tasksSlice.ts'
import {createTodolistTC, deleteTodolistTC, DomainTodolist} from '../todolistsSlice.ts'
import {TaskPriority, TaskStatus} from "@/common/enums.ts";
import {nanoid} from "@reduxjs/toolkit";
import {TasksState} from "@/features/todolists/api/tasksApi.types.ts";

let startState: TasksState = {}

const taskDefaultValues = {
    description: '',
    deadline: '',
    addedDate: '',
    startDate: '',
    priority: TaskPriority.Low,
    order: 0,
}

beforeEach(() => {
    startState = {
        todolistId1: [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatus.New,
                todoListId: 'todolistId1',
                ...taskDefaultValues,
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatus.Completed,
                todoListId: 'todolistId1',
                ...taskDefaultValues,
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatus.New,
                todoListId: 'todolistId1',
                ...taskDefaultValues,
            },
        ],
        todolistId2: [
            {
                id: '1',
                title: 'bread',
                status: TaskStatus.New,
                todoListId: 'todolistId2',
                ...taskDefaultValues,
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatus.Completed,
                todoListId: 'todolistId2',
                ...taskDefaultValues,
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatus.New,
                todoListId: 'todolistId2',
                ...taskDefaultValues,
            },
        ],
    }
})

test('array should be created for new todolist', () => {
    const title = 'New todolist'
    const newTodolist: DomainTodolist = {id: nanoid(), title, addedDate: 'testText', order: 2, filter: 'all'}
    const endState = tasksReducer(startState, createTodolistTC.fulfilled({todolist: newTodolist}, 'requestId2', title))

    const newKey = Object.keys(endState).find(key => key !== 'todolistId1' && key !== 'todolistId2')

    // Добавил проверку, что новый ключ добавлен
    expect(newKey).toBeDefined() // Убедитесь, что новый ключ найден
    expect(endState[newKey!]).toEqual([]) // Ожидаем, что новый ключ будет пустым массивом
    expect(Object.keys(endState).length).toBe(3) // Проверяем, что всего три ключа
})

test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, deleteTodolistTC.fulfilled({id: 'todolistId2'}, 'requestId', 'todolistId2'))

    // Добавил проверку на удаление данных для конкретного тудулиста
    expect(endState['todolistId2']).toBeUndefined() // Убедитесь, что ключ удален
    expect(Object.keys(endState).length).toBe(1) // Проверка на то, что остался только один ключ
})

test('correct task should be deleted', () => {
    const endState = tasksReducer(startState, deleteTaskTC.fulfilled({
        todolistId: 'todolistId2',
        taskId: '2'
    }, 'requestId', {todolistId: 'todolistId2', taskId: '2'}))

    // Проверка, что удаленная задача больше не присутствует и что длина массива уменьшена
    expect(endState['todolistId2'].length).toBe(2) // Проверяем, что в todolistId2 теперь 2 задачи
    expect(endState['todolistId2'].find(task => task.id === '2')).toBeUndefined() // Проверяем, что задача с id '2' удалена
})

test('correct task should be created at correct array', () => {
    const newTask = {id: '4', title: 'juice', status: TaskStatus.New, todoListId: 'todolistId2', ...taskDefaultValues}
    const endState = tasksReducer(startState, createTaskTC.fulfilled({task: newTask}, 'requestId', {
        todolistId: 'todolistId2',
        title: 'juice'
    }))

    // Проверка, что задача была создана и добавлена в правильный массив
    expect(endState.todolistId2.length).toBe(4) // Убедитесь, что в todolistId2 теперь 4 задачи
    const createdTask = endState.todolistId2.find(task => task.title === 'juice')
    expect(createdTask).toBeDefined() // Убедитесь, что задача создана
    expect(createdTask?.id).toBe('4') // Убедитесь, что id правильный
    expect(createdTask?.status).toBe(TaskStatus.New) // Убедитесь, что статус правильный
})

test('correct task should change its status', () => {
    const changedTask = {
        id: '2',
        title: 'Fish',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        ...taskDefaultValues,
    }
    const endState = tasksReducer(
        startState,
        updateTaskTC.fulfilled({task: changedTask}, 'requestId', {
            todolistId: 'todolistId2',
            taskId: '2',
            domainModel: {status: TaskStatus.New}
        }),
    )

    // Добавил проверки на то, что задачи не изменились
    expect(endState['todolistId2'][1].status).toBe(TaskStatus.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatus.Completed)
    expect(endState['todolistId1'][0].status).toBe(TaskStatus.New) // Убедитесь, что другие задачи не изменились
    expect(endState['todolistId1'][2].status).toBe(TaskStatus.New) // Убедитесь, что другие задачи не изменились
})

test('correct task should change its title', () => {
    const changedTask = {
        id: '2',
        title: 'juice',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        ...taskDefaultValues,
    }
    const endState = tasksReducer(
        startState,
        updateTaskTC.fulfilled({task: changedTask}, 'requestId', {
            todolistId: 'todolistId2',
            taskId: '2',
            domainModel: {title: 'juice'}
        }),
    )

    // Проверка изменения только той задачи, которая была изменена
    expect(endState['todolistId2'][1].title).toBe('juice') // Проверяем, что название изменилось
    expect(endState['todolistId2'][1].title).not.toBe('tea') // Убедитесь, что не вернулось старое название
    expect(endState['todolistId1'][1].title).toBe('JS') // Убедитесь, что другие задачи не изменились
})
