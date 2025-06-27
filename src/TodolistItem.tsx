import {ChangeEvent, useMemo} from "react";
import {Todolist} from "./app/App.tsx";
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
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {changeTaskAC, createTaskAC, deleteTaskAC} from "@/model/tasks-reducer.ts";
import {changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC} from "@/model/todolists-reducer.ts";

export type FilterValues = 'all' | 'active' | 'completed'

type Props = {
    todolist: Todolist
}

export const TodolistItem = ({todolist,}: Props) => {
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(selectTasks)[todolist.id]

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

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
        dispatch(changeTaskAC({todolistId: todolist.id, taskId, updateFields: {isDone: e.currentTarget.checked}}))
    }

    const createTask = (title: string) => {
        dispatch(createTaskAC({todolistId: todolist.id, title}))
    }

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC({id: todolist.id, title}))
    }

    const changeFilter = (id: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    const deleteTodolist = (todoListId: string) => {
        dispatch(deleteTodolistAC({id: todoListId}))
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({todolistId, taskId}))
    }

    return (
        <div>
            <div className={'container'}>
                <h3>
                    <EditableSpan value={todolist.title} onChange={changeTodolistTitle}/>
                </h3>
                <IconButton>
                    <DeleteIcon onClick={() => deleteTodolist(todolist.id)}/>
                </IconButton>
            </div>
            <CreateItemForm onCreateItem={createTask}/>

            {filteredTasks ? (<List>
                    {filteredTasks.map((task) => {
                        const changeTaskTitle = (title: string) => {
                            dispatch(changeTaskAC({todolistId: todolist.id, taskId: task.id, updateFields: {title}}))
                        }
                        return (
                            <ListItem key={task.id}
                                      sx={getListItemSx(task.isDone)}>
                                <div>
                                    <Checkbox checked={task.isDone}
                                              onChange={(e) => changeTaskStatus(e, task.id)}/>
                                    <EditableSpan value={task.title} onChange={changeTaskTitle}/>
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

