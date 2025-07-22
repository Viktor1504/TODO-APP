import { useAppDispatch } from '@/common/hooks'
import { ButtonGroup } from '@mui/material'
import Button from '@mui/material/Button'
import { todolistsApi } from '@/features/todolists/api/todolistsApi.ts'
import MenuIcon from '@mui/icons-material/Menu'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import DoneIcon from '@mui/icons-material/Done'
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
    <ButtonGroup variant="outlined" size="small" sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button
        startIcon={<MenuIcon />}
        variant={filter === 'all' ? 'contained' : 'outlined'}
        onClick={() => changeFilter('all')}
      >
        All
      </Button>
      <Button
        startIcon={<PlayArrowIcon />}
        variant={filter === 'active' ? 'contained' : 'outlined'}
        color="secondary"
        onClick={() => changeFilter('active')}
      >
        Active
      </Button>
      <Button
        startIcon={<DoneIcon />}
        variant={filter === 'completed' ? 'contained' : 'outlined'}
        color="success"
        onClick={() => changeFilter('completed')}
      >
        Completed
      </Button>
    </ButtonGroup>
  )
}
