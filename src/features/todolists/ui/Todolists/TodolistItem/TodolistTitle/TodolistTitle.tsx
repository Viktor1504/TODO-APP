import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan.tsx'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from '@/features/todolists/api/todolistsApi.ts'
import { Box } from '@mui/material'
import { DomainTodolist } from '@/features/todolists/lib/types'
import { todolistsTitleSxProps } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.SxProps'

export const TodolistTitle = ({ todolist }: { todolist: DomainTodolist }) => {
  const { id, title } = todolist

  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

  const deleteTodolist = () => {
    removeTodolist(id)
  }

  const changeTodolistTitle = (title: string) => {
    updateTodolistTitle({ id, title })
  }

  return (
    <Box sx={todolistsTitleSxProps.todolistHeader}>
      <EditableSpan sx={todolistsTitleSxProps.titleText} value={title} onValueChange={changeTodolistTitle} />
      <IconButton onClick={deleteTodolist}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}
