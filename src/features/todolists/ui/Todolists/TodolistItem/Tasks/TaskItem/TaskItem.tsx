import { ChangeEvent } from 'react'
import { Checkbox, ListItem } from '@mui/material'
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan.tsx'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { getListItemSx } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles.ts'
import { DomainTask, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types.ts'
import { TaskStatus } from '@/common/enums.ts'
import { DomainTodolist } from '@/features/todolists/model/todolistsSlice.ts'
import { useRemoveTaskMutation, useUpdateTaskMutation } from '@/features/todolists/api/tasksApi.ts'

export const TaskItem = ({ task, todolist }: { task: DomainTask; todolist: DomainTodolist }) => {
  const [removeTask] = useRemoveTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const deleteTask = () => {
    removeTask({ todolistId: todolist.id, taskId: task.id })
  }

  const model: UpdateTaskModel = {
    status: task.status,
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    updateTask({ todolistId: todolist.id, taskId: task.id, model: { ...model, status } })
  }

  const changeTaskTitle = (title: string) => {
    updateTask({ todolistId: todolist.id, taskId: task.id, model: { ...model, title } })
  }

  return (
    <ListItem sx={getListItemSx(task.status)}>
      <div>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatus}
          disabled={todolist.entityStatus === 'loading'}
        />
        <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={todolist.entityStatus === 'loading'} />
      </div>
      <IconButton onClick={deleteTask} disabled={todolist.entityStatus === 'loading'}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
