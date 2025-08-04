import { SxProps } from '@mui/material'

export const sxPropsApp = {
  circularProgressContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
} as const satisfies Record<string, SxProps>
