import { Grid, Paper } from '@mui/material'
import { TodolistItem } from '@/features/todolists/ui/Todolists/TodolistItem'
import { useGetTodolistsQuery } from '@/features/todolists/api/todolistsApi.ts'
import { TodolistSkeleton } from '@/features/todolists/ui/Todolists/TodolistSkeleton/TodolistSkeleton.tsx'
import { todolistsSxProps } from '@/features/todolists/ui/Todolists/Todolists.SxProps.ts'

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <>
        <Grid container spacing={3}>
          {Array(6)
            .fill(null)
            .map((_, id) => (
              <Grid key={id} size={{ xs: 12, sm: 6, md: 4 }}>
                <TodolistSkeleton />
              </Grid>
            ))}
        </Grid>
      </>
    )
  }

  return (
    <>
      {todolists?.map((todolist) => (
        <Grid key={todolist.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper sx={todolistsSxProps.todolistPaper}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
