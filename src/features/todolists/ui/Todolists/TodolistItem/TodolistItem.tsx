import { TodolistTitle } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx'
import { FilterButtons, Tasks } from '@/features/todolists/ui/Todolists/TodolistItem'
import { useAddTaskMutation } from '@/features/todolists/api/tasksApi.ts'
import { Box, Divider } from '@mui/material'
import { DomainTodolist } from '@/features/todolists/lib/types'
import { todolistItemSxProps } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.SxProps.ts'
import { CreateItemForm } from '@/common/components'

export const TodolistItem = ({ todolist }: { todolist: DomainTodolist }) => {
  const [addTask] = useAddTaskMutation()

  const createTask = (title: string) => {
    addTask({ todolistId: todolist.id, title })
  }

  return (
    <Box>
      <TodolistTitle todolist={todolist} />
      <Box sx={todolistItemSxProps.todolistContent}>
        <Box sx={todolistItemSxProps.createTaskForm}>
          <CreateItemForm onCreateItem={createTask} labelText={'Enter title task'} />
        </Box>
        <Tasks todolist={todolist} />
        <Divider sx={todolistItemSxProps.divider} />
        <FilterButtons todolist={todolist} />
      </Box>
    </Box>
  )
}
