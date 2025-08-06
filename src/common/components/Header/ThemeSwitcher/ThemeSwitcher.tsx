import { Box, Switch } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

interface ThemeSwitcherProps {
  themeMode: 'light' | 'dark'
  onThemeChange: () => void
  size?: 'small' | 'medium'
}

export const ThemeSwitcher = ({ themeMode, onThemeChange, size = 'medium' }: ThemeSwitcherProps) => {
  const iconSize = size === 'small' ? '1.2rem' : '1.5rem'

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '4px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          transform: 'translateY(-1px)',
        },
      }}
    >
      {themeMode === 'light' ? (
        <LightModeIcon sx={{ color: 'white', mr: 1, fontSize: iconSize }} />
      ) : (
        <DarkModeIcon sx={{ color: 'white', mr: 1, fontSize: iconSize }} />
      )}
      <Switch
        color="default"
        onChange={onThemeChange}
        checked={themeMode === 'dark'}
        size={size}
        sx={{
          '& .MuiSwitch-switchBase': {
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          },
          '& .MuiSwitch-track': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
          '& .Mui-checked': {
            color: 'white',
          },
          '& .Mui-checked + .MuiSwitch-track': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          },
        }}
      />
    </Box>
  )
}
