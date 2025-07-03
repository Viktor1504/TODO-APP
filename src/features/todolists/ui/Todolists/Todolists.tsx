import {useAppSelector} from '@/common/hooks/useAppSelector.ts'
import {Grid, Paper} from '@mui/material'
import {TodolistItem} from '@/features/todolists/ui/Todolists/TodolistItem'
import {useEffect} from 'react'
import {useAppDispatch} from '@/common/hooks'
import {fetchTodolistsTC, selectTodolists} from '@/features/todolists/model/todolistsSlice.ts'

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())

    }, [])

    return (
        <>
            {todolists.map((todolist) => (
                <Grid key={todolist.id}>
                    <Paper elevation={3} sx={{p: '0 20px 20px 20px'}}>
                        <TodolistItem todolist={todolist}/>
                    </Paper>
                </Grid>
            ))}
        </>
    )
}
