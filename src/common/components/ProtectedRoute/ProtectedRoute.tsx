import { Navigate, Outlet } from 'react-router'
import { Path } from '@/common/routing'
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  isAllowed: boolean
  redirectPath?: string
}>

export const ProtectedRoute = ({ isAllowed, children, redirectPath = Path.Login }: Props) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} />
  }

  return children ? children : <Outlet />
}
