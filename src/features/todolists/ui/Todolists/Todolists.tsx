import { useAppSelector } from '@/common/hooks/useAppSelector.ts'
import { selectTodolists } from '@/features/todolists/model/todolists-selectors.ts'
import { Grid, Paper } from '@mui/material'
import { TodolistItem } from '@/features/todolists/ui/Todolists/TodolistItem'
import { useEffect } from 'react'
import { todolistsApi } from '@/features/todolists/api/todolistsApi.ts'
import { useAppDispatch } from '@/common/hooks'
import { setTodolistsAC } from '@/features/todolists/model/todolistsSlice.ts'

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      dispatch(setTodolistsAC({ todolists: res.data }))
    })
  }, [])

  return (
    <>
      {todolists.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper elevation={3} sx={{ p: '0 20px 20px 20px' }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
