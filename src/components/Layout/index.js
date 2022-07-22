import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import { Header } from "../Header"

import { AuthContext } from '../../contexts/AuthContext'

const headerBlockRoutes = ['/login', '/register']

function Layout({ children }) {
  const authContext = useContext(AuthContext)

  const router = useRouter()

  if (authContext.currentUser && headerBlockRoutes.indexOf(router.asPath) == -1) {
    return (
      <Box bgcolor={grey[100]} height='100vh'>
        <Header />
        {children}
      </Box>
    )
  }

  return (
    <Box bgcolor={grey[100]} height='100vh'>
      {children}
    </Box>
  )
}

export { Layout }