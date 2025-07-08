import { Main } from '@/app/Main'
import { Route, Routes } from 'react-router'
import { Login } from '@/features/auth/ui/Login/Login'
import { PageNotFound } from '@/common/components/PageNotFound/PageNotFound.tsx'
import { ProtectedRoute } from '@/common/components/ProtectedRoute/ProtectedRoute.tsx'
import { useAppSelector } from '@/common/hooks'
import { selectIsLoggedIn } from '@/features/auth/model/authSlice.ts'

export const Path = {
  Main: '/',
  Login: 'login',
  Faq: '/faq',
  NotFound: '*',
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      <Route
        path={Path.Main}
        element={
          <ProtectedRoute isAllowed={isLoggedIn}>
            <Main />
          </ProtectedRoute>
        }
      />
      <Route
        path={Path.Faq}
        element={
          <ProtectedRoute isAllowed={isLoggedIn}>
            <h2>Faq</h2>
          </ProtectedRoute>
        }
      />
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
