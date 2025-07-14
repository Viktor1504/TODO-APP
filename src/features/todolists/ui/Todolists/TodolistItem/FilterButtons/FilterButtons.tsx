import { useAppDispatch } from '@/common/hooks'
import { FilterValues } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx'
import { DomainTodolist } from '@/features/todolists/model/todolistsSlice.ts'
import { Stack } from '@mui/material'
import { containerSx } from '@/common/styles'
import Button from '@mui/material/Button'
import { todolistsApi } from '@/features/todolists/api/todolistsApi.ts'

export const FilterButtons = ({ todolist }: { todolist: DomainTodolist }) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeFilter = (filter: FilterValues) => {
    dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
        const todolist = state.find((tl) => tl.id === id)
        if (todolist) {
          todolist.filter = filter
        }
      }),
    )
  }

  return (
    <Stack direction="row" sx={containerSx}>
      <Button variant={filter === 'all' ? 'outlined' : 'text'} color="inherit" onClick={() => changeFilter('all')}>
        All
      </Button>
      <Button
        variant={filter === 'active' ? 'outlined' : 'text'}
        color="primary"
        onClick={() => changeFilter('active')}
      >
        Active
      </Button>
      <Button
        variant={filter === 'completed' ? 'outlined' : 'text'}
        color="secondary"
        onClick={() => changeFilter('completed')}
      >
        Completed
      </Button>
    </Stack>
  )
}
