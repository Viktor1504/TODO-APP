import { LinearProgress } from '@mui/material'

interface LoadingProgressProps {
  themeMode: 'light' | 'dark'
}

export const LoadingProgress = ({ themeMode }: LoadingProgressProps) => {
  return (
    <LinearProgress
      sx={{
        height: '4px',
        background: 'rgba(255, 255, 255, 0.2)',
        '& .MuiLinearProgress-bar': {
          background:
            themeMode === 'light'
              ? 'linear-gradient(90deg, #ffffff, #a5b4fc)'
              : 'linear-gradient(90deg, #a5b4fc, #7e57c2)',
          borderRadius: '2px',
        },
        '& .MuiLinearProgress-bar1Indeterminate': {
          animation: 'MuiLinearProgress-keyframes-indeterminate1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite',
        },
        '& .MuiLinearProgress-bar2Indeterminate': {
          animation:
            'MuiLinearProgress-keyframes-indeterminate2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite',
        },
      }}
    />
  )
}
