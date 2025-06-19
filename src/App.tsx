import './App.css'
import {FilterValues, Task, TodolistItem} from './TodolistItem'
import {useState} from "react";

export const App = () => {
    const [filter, setFilter] = useState<FilterValues>('all');
    const [tasks, setTasks] = useState<Task[]>([
        {id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true},
        {id: crypto.randomUUID(), title: 'JS', isDone: true},
        {id: crypto.randomUUID(), title: 'ReactJS', isDone: false},
        {id: crypto.randomUUID(), title: 'Redux', isDone: false},
        {id: crypto.randomUUID(), title: 'Typescript', isDone: false},
        {id: crypto.randomUUID(), title: 'RTK query', isDone: false},
    ])

    const deleteAllTasks = () => {
        setTasks([])
    }

    const deleteTask = (id: string) => {
        const filteredTasks: Task[] = tasks.filter((task: Task) => task.id !== id)
        setTasks(filteredTasks)
    }

    const createTask = (title: string) => {
        const newTask = {id: crypto.randomUUID(), title, isDone: false}
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const newTasks = tasks.map((task: Task) => task.id === taskId ? {...task, isDone} : task)
        setTasks(newTasks)
    }

    const changeFilter = (filter: FilterValues) => setFilter(filter)

    const getFilteredTasks = (tasks: Task[], filter: FilterValues) => {
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.isDone);
            case 'completed':
                return tasks.filter(task => task.isDone);
            default:
                return tasks
        }
    }

    const filteredTasks = getFilteredTasks(tasks, filter)

    return (
        <div className="app">
            <TodolistItem changeFilter={changeFilter} title="What to learn" tasks={filteredTasks} date={new Date()}
                          deleteTask={deleteTask} createTask={createTask} changeTaskStatus={changeTaskStatus}
                          deleteAllTasks={deleteAllTasks} filter={filter}/>
        </div>
    )
}