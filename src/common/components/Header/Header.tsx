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
import { changeThemeMode, selectIsLoggedIn, selectStatus, selectThemeMode, setIsLoggedInAC } from '@/app/appSlice.ts'
import LinearProgress from '@mui/material/LinearProgress'
import { Navigate } from 'react-router'
import { Path } from '@/common/routing'
import { useLogoutMutation } from '@/features/auth/api/authApi.ts'
import { ResultCode } from '@/common/enums.ts'
import { AUTH_TOKEN } from '@/common/constants'
import { clearDataAC } from '@/common/actions'

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const dispatch = useAppDispatch()

  const [logout] = useLogoutMutation()

  const changeMode = () => {
    dispatch(changeThemeMode({ themeMode: themeMode === 'light' ? 'dark' : 'light' }))
  }

  const logoutHandler = () => {
    logout().then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC({ isLoggedIn: false }))
        localStorage.removeItem(AUTH_TOKEN)
        dispatch(clearDataAC())
      }
    })
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
