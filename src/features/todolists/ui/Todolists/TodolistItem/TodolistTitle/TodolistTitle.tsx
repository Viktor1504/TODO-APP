import { DomainTodolist } from '@/features/todolists/model/_todolistsSlice.ts'
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan.tsx'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  todolistsApi,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} from '@/features/todolists/api/todolistsApi.ts'
import { RequestStatus } from '@/common/types'
import { useAppDispatch } from '@/common/hooks'
import { Box } from '@mui/material'

export const TodolistTitle = ({ todolist }: { todolist: DomainTodolist }) => {
  const { id, title, entityStatus } = todolist
  const dispatch = useAppDispatch()

  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

  const deleteTodolist = () => {
    changeTodolistStatus('loading')
    removeTodolist(id)
      .unwrap()
      .catch(() => {
        changeTodolistStatus('idle')
      })
  }

  const changeTodolistStatus = (entityStatus: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
        const todolist = state.find((tl) => tl.id === id)
        if (todolist) {
          todolist.entityStatus = entityStatus
        }
      }),
    )
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
        disabled={entityStatus === 'loading'}
      />

      <IconButton onClick={deleteTodolist} disabled={entityStatus === 'loading'}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}
