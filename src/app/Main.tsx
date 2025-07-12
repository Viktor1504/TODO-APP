import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm.tsx'
import Container from '@mui/material/Container'
import { Grid } from '@mui/material'
import { Todolists } from '@/features/todolists/ui/Todolists/Todolists.tsx'
import { useAddTodolistMutation } from '@/features/todolists/api/todolistsApi.ts'

export const Main = () => {
  const [addTodolist] = useAddTodolistMutation()

  const createTodolist = (title: string) => {
    addTodolist(title)
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
