import { SxProps } from '@mui/material'

export const todolistsTitleSxProps = {
  // Заголовок тудулиста
  todolistHeader: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    p: 2,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // Стили для заголовка
  titleText: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: 'white',
  },
} as const satisfies Record<string, SxProps>
