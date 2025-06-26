import {ChangeEvent, useMemo} from "react";
import {Task, Todolist} from "./app/App.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import {containerSx, getListItemSx} from "./TodolistItem.styles.ts";

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
                return tasks?.filter(task => !task.isDone) || []
            case 'completed':
                return tasks?.filter(task => task.isDone) || []
            default:
                return tasks
        }
    }, [tasks, todolist.filter, todolist.id])

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
                <IconButton>
                    <DeleteIcon onClick={() => deleteTodolist(todolist.id)}/>
                </IconButton>
            </div>
            <CreateItemForm onCreateItem={createTaskHandler}/>

            {filteredTasks ? (<List>
                    {filteredTasks.map((task) => {

                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(todolist.id, task.id, title)
                        }
                        return (
                            <ListItem key={task.id}
                                      sx={getListItemSx(task.isDone)}>
                                <div>
                                    <Checkbox checked={task.isDone}
                                              onChange={(e) => changeTaskStatusHandler(e, task.id)}/>
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                </div>
                                <IconButton>
                                    <DeleteIcon onClick={() => deleteTask(todolist.id, task.id)}/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>)
                :
                <p>No tasks</p>
            }

            <Stack direction="row" sx={containerSx}>
                <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                        color="inherit"
                        onClick={() => changeFilter(todolist.id, 'all')}
                >All</Button>
                <Button variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                        color="primary"
                        onClick={() => changeFilter(todolist.id, 'active')}
                >Active</Button>
                <Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                        color="secondary"
                        onClick={() => changeFilter(todolist.id, 'completed')}
                >Completed</Button>
            </Stack>
        </div>
    )
}

