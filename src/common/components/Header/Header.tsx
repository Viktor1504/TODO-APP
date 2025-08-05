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
import { baseApi } from '@/features/todolists/api/baseApi.ts'
import { Box, Typography } from '@mui/material' // Добавлен useTheme
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

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
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedInAC({ isLoggedIn: false }))
          localStorage.removeItem(AUTH_TOKEN)
        }
      })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(['Todolist', 'Task']))
      })
  }

  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />
  }

  return (
    <AppBar
      position="static"
      sx={{
        mb: '20px',
        background:
          themeMode === 'light'
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #4a5fc1 0%, #5d3a82 100%)',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
        color: theme.palette.common.white,
      }}
    >
      <Toolbar sx={{ py: 2 }}>
        <Container maxWidth={'lg'} sx={containerSx}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              color="inherit"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              TODO App
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isLoggedIn && <NavButton onClick={logoutHandler}>Sign out</NavButton>}

            <NavButton>FAQ</NavButton>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '4px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              {themeMode === 'light' ? (
                <LightModeIcon sx={{ color: 'white', mr: 1 }} />
              ) : (
                <DarkModeIcon sx={{ color: 'white', mr: 1 }} />
              )}
              <Switch
                color="default"
                onChange={changeMode}
                checked={themeMode === 'dark'}
                sx={{
                  '& .MuiSwitch-switchBase': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                  '& .MuiSwitch-track': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              />
            </Box>
          </Box>
        </Container>
      </Toolbar>

      {status === 'loading' && (
        <LinearProgress
          sx={{
            height: '4px',
            background: 'rgba(255, 255, 255, 0.2)',
            '& .MuiLinearProgress-bar': {
              background:
                themeMode === 'light'
                  ? 'linear-gradient(90deg, #ffffff, #a5b4fc)'
                  : 'linear-gradient(90deg, #a5b4fc, #7e57c2)',
            },
          }}
        />
      )}
    </AppBar>
  )
}
