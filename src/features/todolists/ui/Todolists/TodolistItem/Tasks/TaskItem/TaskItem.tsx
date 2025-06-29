import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'
import { ChangeEvent } from 'react'
import { changeTaskAC, deleteTaskAC } from '@/features/todolists/model/tasks-reducer.ts'
import { Task } from '@/app/App.tsx'
import { Checkbox, ListItem } from '@mui/material'
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan.tsx'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { getListItemSx } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles.ts'

export const TaskItem = ({ task, todolistId }: { task: Task; todolistId: string }) => {
  const dispatch = useAppDispatch()

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskAC({ todolistId, taskId: task.id, updateFields: { isDone: e.currentTarget.checked } }))
  }

  const deleteTask = () => {
    dispatch(deleteTaskAC({ todolistId, taskId: task.id }))
  }

  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskAC({ todolistId, taskId: task.id, updateFields: { title } }))
  }

  return (
    <ListItem sx={getListItemSx(task.isDone)}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
      </div>
      <IconButton onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
