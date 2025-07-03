import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts'
import {ChangeEvent} from 'react'
import {changeTaskAC, deleteTaskTC} from '@/features/todolists/model/tasksSlice.ts'
import {Checkbox, ListItem} from '@mui/material'
import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan.tsx'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {getListItemSx} from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles.ts'
import {DomainTask} from "@/features/todolists/api/tasksApi.types.ts";
import {TaskStatus} from "@/common/enums.ts";

export const TaskItem = ({task, todolistId}: { task: DomainTask; todolistId: string }) => {
    const dispatch = useAppDispatch()

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskAC({todolistId, taskId: task.id, updateFields: {status: e.currentTarget.checked}}))
    }

    const deleteTask = () => {
        dispatch(deleteTaskTC({todolistId, taskId: task.id}))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskAC({todolistId, taskId: task.id, updateFields: {title}}))
    }

    return (
        <ListItem sx={getListItemSx(task.status)}>
            <div>
                <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatus}/>
                <EditableSpan value={task.title} onChange={changeTaskTitle}/>
            </div>
            <IconButton onClick={deleteTask}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}
