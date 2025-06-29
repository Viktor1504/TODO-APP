import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'
import { Todolist } from '@/app/App.tsx'
import { FilterValues } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx'
import { changeTodolistFilterAC } from '@/features/todolists/model/todolistsSlice.ts'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { containerSx } from '@/common/styles/container.styles.ts'

export const FilterButtons = ({ todolist }: { todolist: Todolist }) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeFilter = (filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ id, filter }))
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
