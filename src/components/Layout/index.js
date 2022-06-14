import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import { Header } from "../Header"

import { AuthContext } from '../../contexts/AuthContext'

function Layout({ children }) {
  const authContext = useContext(AuthContext)

  const router = useRouter()

  if (authContext.user() && router.asPath != '/login') {
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