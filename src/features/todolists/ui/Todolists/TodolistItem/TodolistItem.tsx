import { TodolistTitle } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx'
import { CreateItemForm } from '@/common/components'
import { FilterButtons, Tasks } from '@/features/todolists/ui/Todolists/TodolistItem'
import { DomainTodolist } from '@/features/todolists/model/todolistsSlice.ts'
import { useAddTaskMutation } from '@/features/todolists/api/tasksApi.ts'
import { Box, Divider } from '@mui/material'

export type FilterValues = 'all' | 'active' | 'completed'

export const TodolistItem = ({ todolist }: { todolist: DomainTodolist }) => {
  const [addTask] = useAddTaskMutation()

  const createTask = (title: string) => {
    addTask({ todolistId: todolist.id, title })
  }

  return (
    <Box>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} disabled={todolist.entityStatus === 'loading'} />
      <Tasks todolist={todolist} />
      <Divider sx={{ marginY: 1 }} />
      <FilterButtons todolist={todolist} />
    </Box>
  )
}
