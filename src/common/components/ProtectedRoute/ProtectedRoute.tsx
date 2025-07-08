import { Navigate } from 'react-router'
import { Path } from '@/common/routing'
import { ReactNode } from 'react'

export const ProtectedRoute = ({ children, isAllowed }: { children: ReactNode; isAllowed: boolean }) => {
  if (!isAllowed) {
    return <Navigate to={Path.Login} />
  }

  return children
}
