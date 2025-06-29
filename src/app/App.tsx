import './App.css'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useAppSelector } from '@/common/hooks'
import { getTheme } from '@/common/theme'
import { Header } from '@/common/components/Header/Header.tsx'
import { FilterValues } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx'
import { Main } from '@/app/Main.tsx'
import { selectThemeMode } from '@/app/appSlice.ts'

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

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <div className={'app'}>
        <CssBaseline />
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  )
}
