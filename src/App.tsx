import './App.css'
import {FilterValues, Task, TodolistItem} from './TodolistItem'
import {useState} from "react";

export const App = () => {
    const [filter, setFilter] = useState<FilterValues>('all');
    const [tasks, setTasks] = useState<Task[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Typescript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false},
    ])

    const deleteTask = (id: number) => {
        const filteredTasks: Task[] = tasks.filter((task: Task) => task.id !== id)
        setTasks(filteredTasks)
    }

    const changeFilter = (filter: FilterValues) => setFilter(filter)

    const filterTasks = (tasks: Task[], filter: FilterValues) => {
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.isDone);
            case 'completed':
                return tasks.filter(task => task.isDone);
            default:
                return tasks
        }
    }

    const filteredTasks = filterTasks(tasks, filter)

    return (
        <div className="app">
            <TodolistItem changeFilter={changeFilter} title="What to learn" tasks={filteredTasks} date={new Date()}
                          deleteTask={deleteTask}/>
        </div>
    )
}