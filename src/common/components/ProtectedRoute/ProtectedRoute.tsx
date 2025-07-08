import { Navigate, Outlet } from 'react-router'
import { Path } from '@/common/routing'
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  isAllowed: boolean
}>

export const ProtectedRoute = ({ isAllowed, children }: Props) => {
  if (!isAllowed) {
    return <Navigate to={Path.Login} />
  }

  return children ? children : <Outlet />
}
