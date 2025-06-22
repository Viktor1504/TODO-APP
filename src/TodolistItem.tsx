import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useMemo, useState} from "react";
import {Task, Todolist} from "./App.tsx";

export type FilterValues = 'all' | 'active' | 'completed'

type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todoListId: string, taskId: string) => void
    createTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    changeFilter: (todoListId: string, filter: FilterValues) => void
    deleteTodolist: (todolistId: string) => void
}

export const TodolistItem = ({
                                 todolist,
                                 tasks,
                                 deleteTask,
                                 createTask,
                                 changeTaskStatus,
                                 changeFilter,
                                 deleteTodolist
                             }: Props) => {
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const filteredTasks = useMemo(() => {
        switch (todolist.filter) {
            case 'active':
                return tasks.filter(task => !task.isDone);
            case 'completed':
                return tasks.filter(task => task.isDone);
            default:
                return tasks
        }
    }, [tasks, todolist.filter])

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            createTask(todolist.id, trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTaskTitle(e.currentTarget.value)
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
        changeTaskStatus(todolist.id, taskId, e.currentTarget.checked)
    }

    return (
        <div>
            <div className={'container'}>
                <h3>{todolist.title}</h3>
                {/* ✅ Прямая передача - нет дополнительной логики */}
                <Button title={'X'} onClick={() => deleteTodolist(todolist.id)}/>
            </div>

            <div>
                <input
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                        e.key === 'Enter' && createTaskHandler()
                    }
                />
                <Button title={'+'} onClick={createTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>

            {filteredTasks.length === 0 ? <p>No tasks</p> :
                <ul>
                    {filteredTasks.map((task) => (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={(e) => changeTaskStatusHandler(e, task.id)}
                            />
                            <span>{task.title}</span>
                            {/* ✅ Прямая передача - нет дополнительной логики */}
                            <Button title={'x'} onClick={() => deleteTask(todolist.id, task.id)}/>
                        </li>
                    ))}
                </ul>
            }

            <div>
                {/* ✅ Прямая передача для простых случаев */}
                <Button
                    title={'All'}
                    onClick={() => changeFilter(todolist.id, 'all')}
                    className={todolist.filter === 'all' ? 'active-filter' : ''}
                />
                <Button
                    title={'Active'}
                    onClick={() => changeFilter(todolist.id, 'active')}
                    className={todolist.filter === 'active' ? 'active-filter' : ''}
                />
                <Button
                    title={'Completed'}
                    onClick={() => changeFilter(todolist.id, 'completed')}
                    className={todolist.filter === 'completed' ? 'active-filter' : ''}
                />
            </div>
        </div>
    )
}