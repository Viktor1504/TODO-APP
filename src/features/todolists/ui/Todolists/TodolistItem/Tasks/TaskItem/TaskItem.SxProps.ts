import { SxProps } from '@mui/material'

export const taskItemSxProps = {
  taskItem: {
    borderRadius: 2,
    mb: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      transform: 'translateX(4px)',
    },
  },

  completedTask: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    opacity: 0.7,
    '& .MuiTypography-root': {
      textDecoration: 'line-through',
    },
  },
} as const satisfies Record<string, SxProps>
