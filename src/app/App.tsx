import './App.css'
import {FilterValues, TodolistItem} from '../TodolistItem.tsx'
import {useState} from "react";
import {CreateItemForm} from "../CreateItemForm.tsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from "@mui/material/Paper";
import {containerSx} from "../TodolistItem.styles.ts";
import {NavButton} from "../NavButton.ts";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC
} from "../model/todolists-reducer.ts";
import {changeTaskAC, createTaskAC, deleteTaskAC} from "../model/tasks-reducer.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {selectTodolists} from "../model/todolists-selectors.ts";
import {selectTasks} from "../model/tasks-selectors.ts";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type TasksState = Record<string, Task[]>

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

type ThemeMode = 'dark' | 'light'

export const App = () => {
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({todolistId, taskId}))
    }

    const createTask = (todolistId: string, title: string) => {
        dispatch(createTaskAC({todolistId, title}))
    }

    const changeFilter = (id: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    const deleteTodolist = (todoListId: string) => {
        dispatch(deleteTodolistAC(todoListId))
    }

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskAC({todolistId, taskId, updateFields: {title}}))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskAC({todolistId, taskId, updateFields: {isDone}}))

    }

    const changeTodolistTitle = (id: string, title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }

    return <div className="app">
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar position="static" sx={{mb: '30px'}}>
                <Toolbar>
                    <Container maxWidth={'lg'} sx={containerSx}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <div>
                            <NavButton>Login</NavButton>
                            <NavButton>Logout</NavButton>
                            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                            <Switch color={'default'} onChange={changeMode}/>
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
            <Container maxWidth={'lg'}>
                <Grid container sx={{mb: '30px'}}>
                    <CreateItemForm onCreateItem={createTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todolists.map((todolist) => (
                        <Grid key={todolist.id}>
                            <Paper elevation={3} sx={{p: '0 20px 20px 20px'}}>
                                <TodolistItem
                                    todolist={todolist}
                                    tasks={tasks[todolist.id]}
                                    deleteTask={deleteTask}
                                    createTask={createTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeFilter={changeFilter}
                                    deleteTodolist={deleteTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    ))
                    }
                </Grid>
            </Container>
        </ThemeProvider>
    </div>
}

