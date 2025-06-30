import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'
import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm.tsx'
import Container from '@mui/material/Container'
import { Grid } from '@mui/material'
import { Todolists } from '@/features/todolists/ui/Todolists/Todolists.tsx'
import { createTodolistAC } from '@/features/todolists/model/todolistsSlice.ts'

export const Main = () => {
  const dispatch = useAppDispatch()

  const createTodolist = (title: string) => {
    dispatch(createTodolistAC(title))
  }

  return (
    <Container maxWidth={'lg'}>
      <Grid container sx={{ mb: '30px' }}>
        <CreateItemForm onCreateItem={createTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
