import { SxProps } from '@mui/material'

export const todolistItemSxProps = {
  // Контент тудулиста
  todolistContent: {
    p: 3,
  },

  // Форма создания задачи
  createTaskForm: {
    mb: 2,
    '& .MuiTextField-root': {
      '& .MuiOutlinedInput-root': {
        borderRadius: 2,
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#667eea',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#667eea',
        },
      },
    },
  },

  // Разделитель
  divider: {
    my: 2,
  },
} as const satisfies Record<string, SxProps>
