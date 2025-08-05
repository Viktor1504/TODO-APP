import { SxProps } from '@mui/material'

export const filterButtonsSxProps = {
  // Кнопки фильтра
  filterButtons: {
    '& .MuiButton-root': {
      borderRadius: 2,
      textTransform: 'none',
      fontWeight: 500,
      minWidth: 60,
      transition: 'all 0.3s ease',
    },
    '& .MuiButton-contained': {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      '&:hover': {
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      },
    },
    '& .MuiButton-outlined': {
      borderColor: 'rgba(0, 0, 0, 0.2)',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        borderColor: 'rgba(0, 0, 0, 0.3)',
      },
    },
  },
} as const satisfies Record<string, SxProps>
