import AppBar from '@mui/material/AppBar'
import { useAppSelector } from '@/common/hooks/useAppSelector.ts'
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'
import { getTheme } from '@/common/theme/theme.ts'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { NavButton } from '@/common/components/NavButton/NavButton.ts'
import Switch from '@mui/material/Switch'
import { containerSx } from '@/common/styles'
import { changeThemeMode, selectStatus, selectThemeMode } from '@/app/appSlice.ts'
import LinearProgress from '@mui/material/LinearProgress'
import { logoutTC, selectIsLoggedIn } from '@/features/auth/model/authSlice.ts'
import { Navigate } from 'react-router'
import { Path } from '@/common/routing'

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const dispatch = useAppDispatch()
  const theme = getTheme(themeMode)

  const changeMode = () => {
    dispatch(changeThemeMode({ themeMode: themeMode === 'light' ? 'dark' : 'light' }))
  }

  const logoutHandler = () => {
    dispatch(logoutTC())
  }

  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />
  }

  return (
    <AppBar position="static" sx={{ mb: '30px' }}>
      <Toolbar>
        <Container maxWidth={'lg'} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            {isLoggedIn && <NavButton onClick={logoutHandler}>Sign out</NavButton>}
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={'default'} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
      {status === 'loading' && <LinearProgress />}
    </AppBar>
  )
}
