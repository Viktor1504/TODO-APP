import { Grid, Paper } from '@mui/material'
import { TodolistItem } from '@/features/todolists/ui/Todolists/TodolistItem'
import { useGetTodolistsQuery } from '@/features/todolists/api/todolistsApi.ts'
import { useState } from 'react'

export const Todolists = () => {
  const [skip, setSkip] = useState(true)

  const { data: todolists } = useGetTodolistsQuery(undefined, { skip })

  const fetchTodolists = () => {
    setSkip(false)
  }

  return (
    <>
      <div>
        <button onClick={fetchTodolists}>Download todolists</button>
      </div>
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
