import { useAppDispatch } from '@/common/hooks'
import { FilterValues } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx'
import { DomainTodolist } from '@/features/todolists/model/todolistsSlice.ts'
import { Stack } from '@mui/material'
import Button from '@mui/material/Button'
import { todolistsApi } from '@/features/todolists/api/todolistsApi.ts'
import MenuIcon from '@mui/icons-material/Menu'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import DoneIcon from '@mui/icons-material/Done'

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
    <Stack direction="row">
      <Button
        startIcon={<MenuIcon />}
        variant={filter === 'all' ? 'outlined' : 'text'}
        color="inherit"
        onClick={() => changeFilter('all')}
        sx={{ minWidth: '100px' }}
      >
        All
      </Button>
      <Button
        startIcon={<PlayArrowIcon />}
        variant={filter === 'active' ? 'outlined' : 'text'}
        color="primary"
        onClick={() => changeFilter('active')}
        sx={{ minWidth: '100px' }}
      >
        Active
      </Button>
      <Button
        startIcon={<DoneIcon />}
        variant={filter === 'completed' ? 'outlined' : 'text'}
        color="secondary"
        onClick={() => changeFilter('completed')}
        sx={{ minWidth: '100px' }}
      >
        Completed
      </Button>
    </Stack>
  )
}
