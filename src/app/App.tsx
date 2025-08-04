import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { getTheme } from '@/common/theme'
import { selectThemeMode, setIsLoggedInAC } from '@/app/appSlice.ts'
import { ErrorSnackbar, Header } from '@/common/components'
import { Routing } from '@/common/routing'
import { useEffect, useState } from 'react'
import { useMeQuery } from '@/features/auth/api/authApi.ts'
import { ResultCode } from '@/common/enums.ts'
import { Box, CircularProgress } from '@mui/material'
import { sxPropsApp } from '@/app/App.styles.ts'

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
      <Box sx={sxPropsApp.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} color={'secondary'} />
      </Box>
    )
  }

  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </Box>
    </ThemeProvider>
  )
}
