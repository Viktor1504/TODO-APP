import { Box, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher'

interface MobileNavigationProps {
  themeMode: 'light' | 'dark'
  onThemeChange: () => void
  onMenuToggle: () => void
}

export const MobileNavigation = ({ themeMode, onThemeChange, onMenuToggle }: MobileNavigationProps) => {
  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'none' },
        alignItems: 'center',
        gap: 2,
      }}
    >
      {/* Переключатель темы - всегда виден на мобильных */}
      <ThemeSwitcher themeMode={themeMode} onThemeChange={onThemeChange} size="small" />

      {/* Бургер меню кнопка */}
      <IconButton
        color="inherit"
        onClick={onMenuToggle}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            transform: 'scale(1.05)',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  )
}
