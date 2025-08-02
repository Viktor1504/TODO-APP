import { TodolistTitle } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx'
import { CreateItemForm } from '@/common/components'
import { FilterButtons, Tasks } from '@/features/todolists/ui/Todolists/TodolistItem'
import { useAddTaskMutation } from '@/features/todolists/api/tasksApi.ts'
import { Box, Divider } from '@mui/material'
import { DomainTodolist } from '@/features/todolists/lib/types'

export const TodolistItem = ({ todolist }: { todolist: DomainTodolist }) => {
  const [addTask] = useAddTaskMutation()

  const createTask = (title: string) => {
    addTask({ todolistId: todolist.id, title })
  }

  return (
    <Box>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} labelText={'Enter title task'} />
      <Tasks todolist={todolist} />
      <Divider sx={{ marginY: 1 }} />
      <FilterButtons todolist={todolist} />
    </Box>
  )
}
