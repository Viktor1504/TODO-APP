import './App.css'
import {FilterValues, TodolistItem} from './TodolistItem'
import {useState} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type TasksState = Record<string, Task[]>

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export const App = () => {
    const todolistId1 = crypto.randomUUID()
    const todolistId2 = crypto.randomUUID()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            {id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true},
            {id: crypto.randomUUID(), title: 'JS', isDone: true},
            {id: crypto.randomUUID(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: crypto.randomUUID(), title: 'Rest API', isDone: true},
            {id: crypto.randomUUID(), title: 'GraphQL', isDone: false},
        ],
    })

    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId)})
    }

    const createTask = (todoListId: string, title: string) => {
        const newTask = {id: crypto.randomUUID(), title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map((task) => task.id === taskId ? {...task, isDone} : task)
        })
    }

    const changeFilter = (todoListId: string, filter: FilterValues) => {
        setTodolists(todolists.map((todolist: Todolist) => todolist.id === todoListId ? {
            ...todolist,
            filter
        } : todolist))
    }

    const deleteTodolist = (todoListId: string) => {
        setTodolists(todolists.filter((todolist: Todolist) => todolist.id !== todoListId))
        const {[todoListId]: deletedTasks, ...restTasks} = tasks
        setTasks(restTasks)
    }

    const createTodolist = (title: string) => {
        const newTodolist: Todolist = {id: crypto.randomUUID(), title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolist.id]: []})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, title } : task)})
    }
    return (
        <div className="app">
            <CreateItemForm onCreateItem={createTodolist}/>
            {todolists.map((todolist) => (
                <TodolistItem
                    key={todolist.id}
                    todolist={todolist}
                    tasks={tasks[todolist.id]}
                    deleteTask={deleteTask}
                    createTask={createTask}
                    changeTaskStatus={changeTaskStatus}
                    changeFilter={changeFilter}
                    deleteTodolist={deleteTodolist}
                    changeTaskTitle={changeTaskTitle}
                />
            ))
            }
        </div>
    )
}