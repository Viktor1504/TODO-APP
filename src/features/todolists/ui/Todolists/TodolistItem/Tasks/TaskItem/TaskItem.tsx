import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts'
import {ChangeEvent} from 'react'
import {deleteTaskTC, updateTaskTC} from '@/features/todolists/model/tasksSlice.ts'
import {Checkbox, ListItem} from '@mui/material'
import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan.tsx'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {getListItemSx} from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles.ts'
import {DomainTask} from "@/features/todolists/api/tasksApi.types.ts";
import {TaskStatus} from "@/common/enums.ts";
import {DomainTodolist} from "@/features/todolists/model/todolistsSlice.ts";

export const TaskItem = ({task, todolistId, todolist}: {
    task: DomainTask;
    todolistId: string;
    todolist: DomainTodolist
}) => {
    const dispatch = useAppDispatch()

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New;
        dispatch(updateTaskTC({todolistId, taskId: task.id, domainModel: {status}}));
    };

    const deleteTask = () => {
        dispatch(deleteTaskTC({todolistId, taskId: task.id}))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(updateTaskTC({todolistId, taskId: task.id, domainModel: {title}}))
    }

    return (
        <ListItem sx={getListItemSx(task.status)}>
            <div>
                <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatus}
                          disabled={todolist.entityStatus === 'loading'}/>
                <EditableSpan value={task.title} onChange={changeTaskTitle}
                              disabled={todolist.entityStatus === 'loading'}/>
            </div>
            <IconButton onClick={deleteTask} disabled={todolist.entityStatus === 'loading'}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}
