import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {ChangeEvent, useMemo} from "react";
import {Todolist} from "@/app/App.tsx";
import {changeTaskAC, deleteTaskAC} from "@/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Checkbox, List, ListItem} from "@mui/material";
import {getListItemSx} from "@/TodolistItem.styles.ts";
import {EditableSpan} from "@/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export const Tasks = ({todolist}: { todolist: Todolist }) => {
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

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({todolistId, taskId}))
    }

    return <>
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
    </>
}