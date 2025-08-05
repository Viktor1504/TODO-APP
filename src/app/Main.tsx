import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm.tsx'
import Container from '@mui/material/Container'
import { Grid, Paper } from '@mui/material'
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
        <Paper sx={{ p: 3, display: 'block', width: '100%' }} elevation={10}>
          <CreateItemForm onCreateItem={createTodolist} labelText={'Enter title todolist'} />
        </Paper>
      </Grid>
      <Grid container spacing={3} sx={{ minHeight: '100vh' }}>
        <Todolists />
      </Grid>
    </Container>
  )
}
