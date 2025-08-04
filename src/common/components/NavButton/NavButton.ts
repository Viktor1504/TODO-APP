import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

type Props = {
  background?: string
}

export const NavButton = styled(Button)<Props>(({ theme }) => ({
  minWidth: '120px',
  fontWeight: '500',
  borderRadius: '16px',
  textTransform: 'none',
  padding: '12px 24px',
  background: 'rgba(255, 255, 255, 0.1)',
  color: theme.palette.primary.contrastText,
  border: '1px solid rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
  transition: 'all 0.3s ease',

  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-1px)',
    boxShadow: '0 12px 40px rgba(31, 38, 135, 0.5)',
  },
}))
