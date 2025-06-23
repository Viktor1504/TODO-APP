import {ChangeEvent, useMemo} from "react";
import {Task, Todolist} from "./App.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export type FilterValues = 'all' | 'active' | 'completed'

type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todoListId: string, taskId: string) => void
    createTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    changeFilter: (todoListId: string, filter: FilterValues) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todoListId: string, title: string) => void
}

export const TodolistItem = ({
                                 todolist,
                                 tasks,
                                 deleteTask,
                                 createTask,
                                 changeTaskStatus,
                                 changeFilter,
                                 deleteTodolist,
                                 changeTaskTitle,
                                 changeTodolistTitle
                             }: Props) => {

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

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
        changeTaskStatus(todolist.id, taskId, e.currentTarget.checked)
    }

    const createTaskHandler = (title: string) => {
        createTask(todolist.id, title)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(todolist.id, title)
    }

    return (
        <div>
            <div className={'container'}>
                <h3>
                    <EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler}/>
                </h3>
                <Button title={'X'} onClick={() => deleteTodolist(todolist.id)}/>
            </div>

            <CreateItemForm onCreateItem={createTaskHandler}/>

            {!filteredTasks.length ? <p>No tasks</p> :
                <ul>
                    {filteredTasks.map((task) => {

                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(todolist.id, task.id, title)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={(e) => changeTaskStatusHandler(e, task.id)}
                                />
                                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                <IconButton>
                                    <DeleteIcon onClick={() => deleteTask(todolist.id, task.id)}/>
                                </IconButton>
                            </li>
                        )
                    })}
                </ul>
            }

            <Stack spacing={2} direction="row">
                <Button variant={todolist.filter === 'all' ? 'contained' : 'outlined'}
                        onClick={() => changeFilter(todolist.id, 'all')}
                >All</Button>
                <Button variant={todolist.filter === 'active' ? 'contained' : 'outlined'}
                        onClick={() => changeFilter(todolist.id, 'active')}
                >Active</Button>
                <Button variant={todolist.filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={() => changeFilter(todolist.id, 'completed')}
                >Completed</Button>
            </Stack>
        </div>
    )
}

