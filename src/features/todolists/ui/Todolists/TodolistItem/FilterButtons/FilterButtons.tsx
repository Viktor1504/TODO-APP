import { useAppDispatch } from '@/common/hooks'
import { Stack } from '@mui/material'
import Button from '@mui/material/Button'
import { todolistsApi } from '@/features/todolists/api/todolistsApi.ts'
import { DomainTodolist, FilterValues } from '@/features/todolists/lib/types'

export const FilterButtons = ({ todolist }: { todolist: DomainTodolist }) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeFilter = (newFilter: FilterValues) => {
    dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
        const todolist = state.find((tl) => tl.id === id)
        if (todolist) {
          todolist.filter = newFilter
        }
      }),
    )
  }

  return (
    <Stack direction="row" spacing={2} justifyContent={'center'}>
      <Button variant={filter === 'all' ? 'contained' : 'outlined'} onClick={() => changeFilter('all')}>
        All
      </Button>
      <Button
        variant={filter === 'active' ? 'contained' : 'outlined'}
        color="secondary"
        onClick={() => changeFilter('active')}
      >
        Active
      </Button>
      <Button
        variant={filter === 'completed' ? 'contained' : 'outlined'}
        color="success"
        onClick={() => changeFilter('completed')}
      >
        Completed
      </Button>
    </Stack>
  )
}
