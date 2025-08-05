import { ChangeEvent } from 'react'
import { Box, Checkbox, ListItem } from '@mui/material'
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan.tsx'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { DomainTask, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types.ts'
import { TaskStatus } from '@/common/enums.ts'
import { useRemoveTaskMutation, useUpdateTaskMutation } from '@/features/todolists/api/tasksApi.ts'
import { DomainTodolist } from '@/features/todolists/lib/types'
import { taskItemSxProps } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.SxProps.ts'

export const TaskItem = ({ task, todolist }: { task: DomainTask; todolist: DomainTodolist }) => {
  const [removeTask] = useRemoveTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const deleteTask = () => {
    removeTask({ todolistId: todolist.id, taskId: task.id })
  }

  const baseUpdateModel: UpdateTaskModel = {
    status: task.status,
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    updateTask({ todolistId: todolist.id, taskId: task.id, model: { ...baseUpdateModel, status } })
  }

  const changeTaskTitle = (title: string) => {
    updateTask({ todolistId: todolist.id, taskId: task.id, model: { ...baseUpdateModel, title } })
  }

  const isCompleted = task.status === TaskStatus.Completed

  return (
    <ListItem sx={{ ...(isCompleted ? taskItemSxProps.completedTask : {}) }}>
      <Box sx={{ ...taskItemSxProps.taskItem, display: 'flex', alignItems: 'center', width: '100%', gap: 1 }}>
        <Checkbox checked={isCompleted} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onValueChange={changeTaskTitle} />
      </Box>
      <IconButton onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
