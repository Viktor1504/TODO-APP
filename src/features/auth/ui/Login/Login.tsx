import { useAppDispatch } from '@/common/hooks'
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Login as LoginIcon,
  Task as TaskIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import { setIsLoggedInAC } from '@/app/appSlice.ts'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginInputs, loginSchema } from '@/features/auth/lib/schemas'
import { useLoginMutation } from '@/features/auth/api/authApi.ts'
import { ResultCode } from '@/common/enums.ts'
import { AUTH_TOKEN } from '@/common/constants'
import ReCAPTCHA from 'react-google-recaptcha'
import { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  Fade,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { sxProps } from '@/features/auth/ui/Login/login.styles.ts'
import Alert from '@mui/material/Alert'

export const Login = () => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useAppDispatch()

  const [login, { isLoading }] = useLoginMutation()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const res = await login(data)

    if (res.data?.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedInAC({ isLoggedIn: true }))
      localStorage.setItem(AUTH_TOKEN, res.data.data.token)
      reset()
      setCaptchaToken(null)
    }
  }

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Box sx={sxProps.container}>
      <Container maxWidth="sm">
        <Paper elevation={24} sx={sxProps.paper}>
          {/* Header */}
          <Box sx={sxProps.header}>
            <Avatar sx={sxProps.avatar}>
              <TaskIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              TODO App
            </Typography>
            <Typography variant="body1" sx={sxProps.subtitle}>
              Добро пожаловать! Войдите в свой аккаунт
            </Typography>
          </Box>

          {/* Form */}
          <Box sx={sxProps.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth>
                <FormGroup sx={sxProps.formGroup}>
                  <TextField
                    {...register('email')}
                    label="Email"
                    id="outlined-start-adornment"
                    type="email"
                    placeholder="Введите email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="action" />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />

                  <TextField
                    {...register('password')}
                    label="Пароль"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Введите пароль"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label={showPassword ? 'hide the password' : 'display the password'}
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />

                  <FormControlLabel
                    control={
                      <Controller
                        name="rememberMe"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Checkbox
                            onChange={(e) => onChange(e.currentTarget.checked)}
                            checked={value}
                            sx={sxProps.checkbox}
                          />
                        )}
                      />
                    }
                    label={
                      <Typography variant="body2" color="text.secondary">
                        Запомнить меня
                      </Typography>
                    }
                  />

                  <Box sx={sxProps.captchaContainer}>
                    <ReCAPTCHA sitekey="6LenmZgrAAAAAGsrhmmJ4dddzvGAWTgGv2v4BYek" onChange={handleCaptchaChange} />
                    <Fade in={!captchaToken} timeout={2000}>
                      <Alert severity="warning" sx={{ mt: 1, width: 'fit-content' }}>
                        Для продолжения необходимо пройти проверку
                      </Alert>
                    </Fade>
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={!captchaToken || isLoading}
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                    sx={sxProps.submitButton}
                  >
                    {isLoading ? 'Вход...' : 'Войти в систему'}
                  </Button>
                </FormGroup>
              </FormControl>
            </form>

            <Divider sx={sxProps.divider} />

            <Box sx={sxProps.signupContainer}>
              <Typography variant="body2" color="text.secondary">
                Нет аккаунта?{' '}
                <Typography component="span" sx={sxProps.signupLink}>
                  Зарегистрироваться
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
