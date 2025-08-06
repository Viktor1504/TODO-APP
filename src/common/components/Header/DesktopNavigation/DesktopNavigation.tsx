import { Box } from '@mui/material'
import { NavButton } from '@/common/components/NavButton/NavButton.ts'
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher'

interface DesktopNavigationProps {
  isLoggedIn: boolean
  themeMode: 'light' | 'dark'
  onLogout: () => void
  onFaqClick?: () => void
  onThemeChange: () => void
}

export const DesktopNavigation = ({
  isLoggedIn,
  themeMode,
  onLogout,
  onFaqClick,
  onThemeChange,
}: DesktopNavigationProps) => {
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        gap: 2,
      }}
    >
      {isLoggedIn && (
        <NavButton
          onClick={onLogout}
          sx={{
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Sign out
        </NavButton>
      )}

      <NavButton
        onClick={onFaqClick}
        sx={{
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        FAQ
      </NavButton>

      <ThemeSwitcher themeMode={themeMode} onThemeChange={onThemeChange} />
    </Box>
  )
}
