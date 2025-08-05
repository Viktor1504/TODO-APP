import { SxProps } from '@mui/material'

export const tasksSxProps = {
  // Счетчик задач
  taskCounter: {
    fontSize: '0.875rem',
    color: 'text.secondary',
    fontWeight: 500,
  },

  // Список задач
  tasksList: {
    maxHeight: '300px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 6,
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(0, 0, 0, 0.05)',
      borderRadius: 3,
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(102, 126, 234, 0.3)',
      borderRadius: 3,
      '&:hover': {
        background: 'rgba(102, 126, 234, 0.5)',
      },
    },
  },

  // Пагинация
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mt: 2,
    '& .MuiPaginationItem-root': {
      borderRadius: 2,
      '&.Mui-selected': {
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: 'white',
        '&:hover': {
          background: 'linear-gradient(135deg, #5a6fd8, #6a4190)',
        },
      },
    },
  },

  // Сообщение "No tasks"
  noTasksMessage: {
    textAlign: 'center',
    py: 4,
    color: 'text.secondary',
    fontStyle: 'italic',
  },
} as const satisfies Record<string, SxProps>
