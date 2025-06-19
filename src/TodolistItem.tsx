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
    changeTaskStatus: (id: string, isDone: boolean) => void
    deleteAllTasks: () => void
    filter: FilterValues
}

export const TodolistItem = ({
                                 title,
                                 tasks,
                                 date,
                                 deleteTask,
                                 changeFilter,
                                 createTask,
                                 changeTaskStatus,
                                 deleteAllTasks,
                                 filter
                             }: Props) => {
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)


    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            createTaskHandler();
        }
    }

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            createTask(trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTaskTitle(e.currentTarget.value)
    }


    const deleteTaskHandler = (id: string) => {
        deleteTask(id)
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: Task) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(task.id, newStatusValue)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={createTaskOnEnterHandler}/>
                <Button title={'+'} onClick={createTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}

            </div>
            {tasks.length === 0 ? <p>No tasks</p> :
                <ul>
                    {tasks.map((task) => {
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone}
                                       onChange={(e) => changeTaskStatusHandler(e, task)}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={() => deleteTaskHandler(task.id)}/></li>
                        )
                    })}
                </ul>
            }
            <div>
                <Button title={'All'} onClick={() => changeFilter('all')}
                        className={filter === 'all' ? 'active-filter' : ''}/>
                <Button title={'Active'} onClick={() => changeFilter('active')}
                        className={filter === 'active' ? 'active-filter' : ''}/>
                <Button title={'Completed'} onClick={() => changeFilter('completed')}
                        className={filter === 'completed' ? 'active-filter' : ''}/>
            </div>
            <Button title={'Delete all tasks'} onClick={deleteAllTasks}/>
            <div>
                <p>{date?.toLocaleDateString()}</p>
            </div>
        </div>
    )
}