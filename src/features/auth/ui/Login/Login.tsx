import { useAppDispatch } from '@/common/hooks'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import { setIsLoggedInAC } from '@/app/appSlice.ts'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import styles from './Login.module.css'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginInputs, loginSchema } from '@/features/auth/lib/schemas'
import { useLoginMutation } from '@/features/auth/api/authApi.ts'
import { ResultCode } from '@/common/enums.ts'
import { AUTH_TOKEN } from '@/common/constants'
import { FormLabel, Typography } from '@mui/material'

export const Login = () => {
  // const [captchaToken, setCaptchaToken] = useState<string | null>(null)
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
        // Сбрасываем капчу после успешной авторизации
        // setCaptchaToken(null)
      }
    })
  }

  // const handleCaptchaChange = (token: string | null) => {
  //   setCaptchaToken(token)
  // }

  return (
    <Grid container justifyContent={'center'} alignItems={'center'} height={'100vh'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel sx={{ display: 'flex', justifyContent: 'center' }}>
            <h2>Вход в систему</h2>
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

            {/*<ReCAPTCHA sitekey="6LenmZgrAAAAAGsrhmmJ4dddzvGAWTgGv2v4BYek" onChange={handleCaptchaChange} />*/}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              // disabled={!captchaToken} // Отключаем кнопку, если капча не пройдена
            >
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  )
}
