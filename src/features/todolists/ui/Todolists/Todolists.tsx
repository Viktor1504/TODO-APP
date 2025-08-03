import { Box, Grid, Paper } from '@mui/material'
import { TodolistItem } from '@/features/todolists/ui/Todolists/TodolistItem'
import { useGetTodolistsQuery } from '@/features/todolists/api/todolistsApi.ts'
import { containerSx } from '@/common/styles'
import { TodolistSkeleton } from '@/features/todolists/ui/Todolists/TodolistSkeleton/TodolistSkeleton.tsx'

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <Box sx={containerSx} gap="30px">
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    )
  }

  return (
    <>
      {todolists?.map((todolist) => (
        <Grid key={todolist.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper elevation={3} sx={{ p: '0 30px 30px 30px' }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
