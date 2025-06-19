import {Button} from "./Button.tsx";
import {ChangeEvent, useState} from "react";
import {KeyboardEvent} from "react";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

type Props = {
    title: string
    tasks: Task[]
    date?: Date
    deleteTask: (id: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
    changeTaskStatus: (id: string) => void
    deleteAllTasks: () => void
}

export const TodolistItem = ({
                                 title,
                                 tasks,
                                 date,
                                 deleteTask,
                                 changeFilter,
                                 createTask,
                                 changeTaskStatus,
                                 deleteAllTasks
                             }: Props) => {
    const [taskTitle, setTaskTitle] = useState<string>('')

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            createTaskHandler();
        }
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const createTaskHandler = () => {
        if (taskTitle && taskTitle.trim()) {
            createTask(taskTitle.trim());
            setTaskTitle('')
        }
    }

    const deleteTaskHandler = (id: string) => {
        deleteTask(id)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle} onChange={changeTaskTitleHandler}
                       onKeyDown={createTaskOnEnterHandler}/>
                <Button title={'+'} onClick={createTaskHandler}/>
            </div>
            {tasks.length === 0 ? <p>No tasks</p> :
                <ul>
                    {tasks.map((task) => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}
                                       onChange={() => changeTaskStatus(task.id)}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={() => deleteTaskHandler(task.id)}/></li>
                        )
                    })}
                </ul>
            }
            <div>
                <Button title={'All'} onClick={() => changeFilter('all')}/>
                <Button title={'Active'} onClick={() => changeFilter('active')}/>
                <Button title={'Completed'} onClick={() => changeFilter('completed')}/>
            </div>
            <Button title={'Delete all tasks'} onClick={deleteAllTasks}/>
            <div>
                <p>{date?.toLocaleDateString()}</p>
            </div>
        </div>
    )
}