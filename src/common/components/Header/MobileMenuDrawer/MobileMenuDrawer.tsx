import { Box, Drawer, MenuItem, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useAppSelector } from '@/common/hooks'
import { selectIsLoggedIn, selectThemeMode } from '@/app/appSlice.ts'

export const MobileMenuDrawer = ({
  handleMobileMenuClose,
  mobileMenuOpen,
  logoutHandler,
  onFaqClick,
}: {
  handleMobileMenuClose: () => void
  mobileMenuOpen: boolean
  logoutHandler: () => void
  onFaqClick: () => void
}) => {
  const themeMode = useAppSelector(selectThemeMode)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          width: 250,
          backgroundColor: themeMode === 'light' ? '#f5f5f5' : '#333',
          color: themeMode === 'light' ? '#333' : '#fff',
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Заголовок с кнопкой закрытия */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            borderBottom: `1px solid ${themeMode === 'light' ? '#ddd' : '#555'}`,
            pb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Menu
          </Typography>
          <IconButton
            onClick={handleMobileMenuClose}
            sx={{
              color: themeMode === 'light' ? '#333' : '#fff',
              '&:hover': {
                backgroundColor: themeMode === 'light' ? '#e0e0e0' : '#555',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Пункты меню */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <MenuItem
            onClick={onFaqClick}
            sx={{
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: themeMode === 'light' ? '#e3f2fd' : '#444',
              },
              py: 1.5,
              px: 2,
            }}
          >
            <Typography>FAQ</Typography>
          </MenuItem>

          {isLoggedIn && (
            <MenuItem
              onClick={logoutHandler}
              sx={{
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: themeMode === 'light' ? '#ffebee' : '#444',
                },
                py: 1.5,
                px: 2,
                color: themeMode === 'light' ? '#d32f2f' : '#ff6b6b',
              }}
            >
              <Typography>Sign out</Typography>
            </MenuItem>
          )}
        </Box>
      </Box>
    </Drawer>
  )
}
