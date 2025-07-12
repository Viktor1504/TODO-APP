import { Grid, Paper } from '@mui/material'
import { TodolistItem } from '@/features/todolists/ui/Todolists/TodolistItem'
import { useGetTodolistsQuery } from '@/features/todolists/api/todolistsApi.ts'

export const Todolists = () => {
  const { data: todolists } = useGetTodolistsQuery()

  return (
    <>
      {todolists?.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper elevation={3} sx={{ p: '0 20px 20px 20px' }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
