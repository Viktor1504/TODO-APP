import { Avatar, Box, Typography } from '@mui/material'
import { Task as TaskIcon } from '@mui/icons-material'
import { sxPropsLogin } from '@/features/auth/ui/Login/Login.styles.ts'

export const HeaderLogo = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Avatar sx={sxPropsLogin.avatar}>
        <TaskIcon sx={{ fontSize: 32 }} />
      </Avatar>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          whiteSpace: 'nowrap',
        }}
      >
        TODO App
      </Typography>
    </Box>
  )
}
