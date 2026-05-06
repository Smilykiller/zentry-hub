import { useAuth } from '@/context/AuthContext'

export function useIsAdmin() {
  const { admin, loading } = useAuth()
  return { isAdmin: !!admin, loading }
}
