import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan.tsx'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from '@/features/todolists/api/todolistsApi.ts'
import { Box } from '@mui/material'
import { DomainTodolist } from '@/features/todolists/lib/types'

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
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <EditableSpan
        sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '20px' }}
        value={title}
        onValueChange={changeTodolistTitle}
      />

      <IconButton onClick={deleteTodolist}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}
