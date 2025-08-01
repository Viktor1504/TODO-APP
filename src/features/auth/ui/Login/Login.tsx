import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { getTheme } from '@/common/theme'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import { selectThemeMode, setIsLoggedInAC } from '@/app/appSlice.ts'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import styles from './Login.module.css'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginInputs, loginSchema } from '@/features/auth/lib/schemas'
import { useLoginMutation } from '@/features/auth/api/authApi.ts'
import { ResultCode } from '@/common/enums.ts'
import { AUTH_TOKEN } from '@/common/constants'
import { Typography } from '@mui/material'

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()

  const [login] = useLoginMutation()

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

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    login(data).then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC({ isLoggedIn: true }))
        localStorage.setItem(AUTH_TOKEN, res.data.data.token)
        reset()
      }
    })
  }

  return (
    <Grid container justifyContent={'center'} alignItems={'center'} height={'100vh'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: '5px' }}
                href="https://social-network.samuraijs.com"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <FormGroup>
            <TextField label="Email" margin="normal" error={!!errors.email} {...register('email')} />
            {errors.email && (
              <Typography variant={'body2'} className={styles.errorMessage}>
                {errors.email.message}
              </Typography>
            )}
            <TextField
              type="password"
              label="Password"
              margin="normal"
              error={!!errors.password}
              {...register('password')}
            />
            {errors.password && (
              <Typography variant={'body2'} className={styles.errorMessage}>
                {errors.password.message}
              </Typography>
            )}
            <FormControlLabel
              label="Remember me"
              control={
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Checkbox onChange={(e) => onChange(e.currentTarget.checked)} checked={value} />
                  )}
                />
              }
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  )
}
