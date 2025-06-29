import AppBar from '@mui/material/AppBar'
import { useAppSelector } from '@/common/hooks/useAppSelector.ts'
import { selectThemeMode } from '@/app/app-selectors.ts'
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'
import { getTheme } from '@/common/theme/theme.ts'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { NavButton } from '@/common/components/NavButton/NavButton.ts'
import Switch from '@mui/material/Switch'
import { containerSx } from '@/common/styles'
import { changeThemeMode } from '@/app/app-slice.ts'

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

  const changeMode = () => {
    dispatch(changeThemeMode({ themeMode: themeMode === 'light' ? 'dark' : 'light' }))
  }

  return (
    <AppBar position="static" sx={{ mb: '30px' }}>
      <Toolbar>
        <Container maxWidth={'lg'} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <NavButton>Login</NavButton>
            <NavButton>Logout</NavButton>
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={'default'} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  )
}
