import { Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import Head from "next/head"
import { Header } from "../Header"

function Layout({ children }) {
  return (
    <Box bgcolor={grey[100]} height='100vh'>
      <Header />
      {children}
    </Box>
  )
}

export { Layout }