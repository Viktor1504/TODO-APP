import { SxProps } from '@mui/material'

export const sxProps: Record<string, SxProps> = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    p: 2,
  },

  paper: {
    borderRadius: 4,
    overflow: 'hidden',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
  },

  header: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    p: 4,
    textAlign: 'center',
    color: 'white',
    position: 'relative',
  },

  avatar: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    margin: '0 auto 16px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
  },

  subtitle: {
    opacity: 0.9,
  },

  formContainer: {
    p: 4,
  },

  formGroup: {
    gap: 2,
  },

  checkbox: {
    color: '#667eea',
    '&.Mui-checked': {
      color: '#667eea',
    },
  },

  captchaContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },

  submitButton: {
    py: 1.5,
    borderRadius: 2,
    textTransform: 'none',
    fontSize: '1.1rem',
    fontWeight: 600,
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
    '&:hover': {
      background: 'linear-gradient(135deg, #5a6fd8, #6a4190)',
      boxShadow: '0 6px 25px rgba(102, 126, 234, 0.5)',
      transform: 'translateY(-2px)',
    },
    '&:disabled': {
      background: '#e0e0e0',
      color: '#9e9e9e',
      boxShadow: 'none',
      transform: 'none',
    },
    transition: 'all 0.3s ease',
  },

  divider: {
    my: 3,
  },

  signupContainer: {
    textAlign: 'center',
  },

  signupLink: {
    color: '#667eea',
    fontWeight: 600,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}
