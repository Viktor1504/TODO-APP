import { SxProps, Theme } from '@mui/material'

export const todolistsSxProps = {
  // Карточка тудулиста
  todolistPaper: {
    borderRadius: 4,
    overflow: 'hidden',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    },
  },
} as const satisfies Record<string, SxProps<Theme>>
