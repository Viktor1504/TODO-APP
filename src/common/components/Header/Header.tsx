import { AppBar, Container, Toolbar } from '@mui/material'
import { Navigate } from 'react-router'
import { getTheme } from '@/common/theme/theme.ts'
import { containerSx } from '@/common/styles'
import { Path } from '@/common/routing'
import { DesktopNavigation } from './DesktopNavigation/DesktopNavigation'
import { MobileNavigation } from './MobileNavigation/MobileNavigation'
import { LoadingProgress } from './LoadingProgress/LoadingProgress'
import { MobileMenuDrawer } from './MobileMenuDrawer/MobileMenuDrawer'
import { useHeaderLogic } from '@/common/components/Header/hooks/useHeaderLogic.ts'
import { HeaderLogo } from '@/common/components/Header/HeaderLogo/HeaderLogo.tsx'

export const Header = () => {
  const {
    themeMode,
    status,
    isLoggedIn,
    mobileMenuOpen,
    handleThemeChange,
    handleLogout,
    handleMobileMenuToggle,
    handleMobileMenuClose,
    handleFaqClick,
  } = useHeaderLogic()

  const theme = getTheme(themeMode)

  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />
  }

  return (
    <>
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
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar sx={{ py: 2 }}>
          <Container
            maxWidth={'lg'}
            sx={{
              ...containerSx,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Левая часть - Логотип */}
            <HeaderLogo />

            {/* Правая часть - Навигация для десктопа */}
            <DesktopNavigation
              isLoggedIn={isLoggedIn}
              themeMode={themeMode}
              onLogout={handleLogout}
              onFaqClick={handleFaqClick}
              onThemeChange={handleThemeChange}
            />

            {/* Правая часть - Навигация для мобильных */}
            <MobileNavigation
              themeMode={themeMode}
              onThemeChange={handleThemeChange}
              onMenuToggle={handleMobileMenuToggle}
            />
          </Container>
        </Toolbar>

        {/* Индикатор загрузки */}
        {status === 'loading' && <LoadingProgress themeMode={themeMode} />}
      </AppBar>

      {/* Мобильное меню */}
      <MobileMenuDrawer
        handleMobileMenuClose={handleMobileMenuClose}
        mobileMenuOpen={mobileMenuOpen}
        logoutHandler={handleLogout}
        onFaqClick={handleFaqClick}
      />
    </>
  )
}
