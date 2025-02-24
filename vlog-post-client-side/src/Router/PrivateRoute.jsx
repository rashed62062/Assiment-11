/* eslint-disable react/prop-types */
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import LoadingSpinner from './LoadingSpinner'
import { AuthContext } from '../Provider/AuthProvider'

const PrivateRoute = ({ children }) => {
  // Check if user is authenticated
  const { user, loading } = useContext(AuthContext)

  const location = useLocation()

  if (loading) return <LoadingSpinner />
  if (user) return children
  return <Navigate to={{ pathname: '/login', state: { from: location } }} />
  return ;
}

export default PrivateRoute
