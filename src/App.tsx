import './App.css'
import {FilterValues, TodolistItem} from './TodolistItem'
import {useState} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import {Paper} from "@mui/material";
import {containerSx} from "./TodolistItem.styles.ts";
import {NavButton} from "./NavButton.ts";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'

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
    const todolistId1 = crypto.randomUUID()
    const todolistId2 = crypto.randomUUID()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            {id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true},
            {id: crypto.randomUUID(), title: 'JS', isDone: true},
            {id: crypto.randomUUID(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: crypto.randomUUID(), title: 'Rest API', isDone: true},
            {id: crypto.randomUUID(), title: 'GraphQL', isDone: false},
        ],
    })

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
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId)})
    }

    const createTask = (todoListId: string, title: string) => {
        const newTask = {id: crypto.randomUUID(), title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map((task) => task.id === taskId ? {...task, isDone} : task)
        })
    }

    const changeFilter = (todoListId: string, filter: FilterValues) => {
        setTodolists(todolists.map((todolist: Todolist) => todolist.id === todoListId ? {
            ...todolist,
            filter
        } : todolist))
    }

    const deleteTodolist = (todoListId: string) => {
        setTodolists(todolists.filter((todolist: Todolist) => todolist.id !== todoListId))
        const {[todoListId]: deletedTasks, ...restTasks} = tasks
        setTasks(restTasks)
    }

    const createTodolist = (title: string) => {
        const newTodolist: Todolist = {id: crypto.randomUUID(), title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolist.id]: []})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)})
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, title} : todolist))
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