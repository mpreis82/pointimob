import { useState, useContext } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Layout } from '../components/Layout'
import '../../styles/globals.css'
import { pink, purple, grey, blue } from '@mui/material/colors'
import { AuthContextProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    typography: {
      fontFamily: 'Roboto',
      htmlFontSize: 14,
      fontSize: 14,
      subtitle1: { fontSize: 14 },
      subtitle2: { fontSize: 14 },
      body1: { fontSize: 14 },
      body2: { fontSize: 14 }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: '* {margin: 0; padding: 0; box-sizing: border-box; list-style: none;} html{font-size: 14px;}'
      },
      MuiButton: {
        styleOverrides: {
          root: {
            lineHeight: 1,
            fontSize: '1rem',
            padding: '8px 12px'
          }
        }
      }
    },
    palette: {
      primary: {
        main: purple[800]
      },
      secondary: {
        main: pink[600],
        light: pink[500],
        dark: pink[700],
      },
      white: {
        main: grey[200],
        contrastText: blue[600]
      },
    }
  })

  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CssBaseline>
      </ThemeProvider>
    </AuthContextProvider>
  )
}

export default MyApp
