import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import { ArrowBack as ArrowBackIcon, ErrorOutline as ErrorIcon, Home as HomeIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/appSlice.ts'
import { getTheme } from '@/common/theme'

export const PageNotFound = () => {
  const navigate = useNavigate()
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Stack spacing={3} alignItems="center">
            <ErrorIcon
              sx={{
                fontSize: 80,
                color: theme.palette.error.main,
                opacity: 0.8,
              }}
            />

            <Typography
              variant="h2"
              component="h1"
              color="text.primary"
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '3rem', sm: '4rem' },
              }}
            >
              404
            </Typography>

            <Typography variant="h5" component="h2" color="text.primary" gutterBottom>
              Страница не найдена
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '400px' }}>
              К сожалению, запрашиваемая вами страница не существует. Возможно, она была перемещена или удалена.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
              <Button variant="contained" color="primary" startIcon={<HomeIcon />} onClick={handleGoHome} size="large">
                На главную
              </Button>

              <Button
                variant="outlined"
                color="primary"
                startIcon={<ArrowBackIcon />}
                onClick={handleGoBack}
                size="large"
              >
                Назад
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Container>
  )
}
