import './App.css'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { getTheme } from '@/common/theme'
import { selectThemeMode } from '@/app/appSlice.ts'
import { ErrorSnackbar, Header } from '@/common/components'
import { Routing } from '@/common/routing'
import { useEffect, useState } from 'react'
import { initializeAppTC } from '@/features/auth/model/authSlice.ts'
import CircularProgress from '@mui/material/CircularProgress'
import styles from './App.module.css'

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()

  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    dispatch(initializeAppTC()).finally(() => setIsInitialized(true))
  }, [dispatch])

  if (!isInitialized) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={'app'}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
