import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { getTheme } from '@/common/theme'
import { selectThemeMode, setIsLoggedInAC } from '@/app/appSlice.ts'
import { ErrorSnackbar, Header } from '@/common/components'
import { Routing } from '@/common/routing'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import styles from './App.module.css'
import { useMeQuery } from '@/features/auth/api/authApi.ts'
import { ResultCode } from '@/common/enums.ts'

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()
  const [isInitialized, setIsInitialized] = useState(false)

  const { data, isLoading } = useMeQuery()

  useEffect(() => {
    if (isLoading) return
    setIsInitialized(true)
    if (data?.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedInAC({ isLoggedIn: true }))
    }
  }, [isLoading])

  if (!isInitialized) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
