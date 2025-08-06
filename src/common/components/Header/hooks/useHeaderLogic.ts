import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { useLogoutMutation } from '@/features/auth/api/authApi.ts'
import { changeThemeMode, selectIsLoggedIn, selectStatus, selectThemeMode, setIsLoggedInAC } from '@/app/appSlice.ts'
import { ResultCode } from '@/common/enums.ts'
import { AUTH_TOKEN } from '@/common/constants'
import { baseApi } from '@/features/todolists/api/baseApi.ts'

export const useHeaderLogic = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const dispatch = useAppDispatch()
  const [logout] = useLogoutMutation()

  const handleThemeChange = () => {
    dispatch(
      changeThemeMode({
        themeMode: themeMode === 'light' ? 'dark' : 'light',
      }),
    )
  }

  const handleLogout = () => {
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedInAC({ isLoggedIn: false }))
          localStorage.removeItem(AUTH_TOKEN)
        }
      })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(['Todolist', 'Task']))
      })
    setMobileMenuOpen(false)
  }

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false)
  }

  const handleFaqClick = () => {
    console.log('FAQ clicked')
  }

  return {
    // State
    themeMode,
    status,
    isLoggedIn,
    mobileMenuOpen,

    // Handlers
    handleThemeChange,
    handleLogout,
    handleMobileMenuToggle,
    handleMobileMenuClose,
    handleFaqClick,
  }
}
