import { useState } from 'react'

import { Box } from "@mui/system"
import { Stack, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material'

import AsideNav from "../../../../../components/AsideNav"
import ImoveisAsideNav from '../../../../../components/imoveis/aside/AsideNav'
import Main from "../../../../../components/imoveis/main/Main"
import ImageTabs from '../../../../../components/imoveis/images/ImageTabs'

export default function Imagens() {
  const [alert, setAlert] = useState({
    severity: 'success',
    message: '',
    open: false
  })

  function handleSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ ...alert, open: false });
  }

  return (
    <Box display='flex' height='calc(100% - 45px)' bgcolor='silver' overflow='hidden'>
      <AsideNav>
        <ImoveisAsideNav />
      </AsideNav>

      <Main title='Imagens'>
        <ImageTabs setAlert={setAlert} />

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={alert.open} autoHideDuration={(alert.severity == 'success' ? 2000 : 6000)} onClose={handleSnackbarClose}>
            <Alert severity={alert.severity} sx={{ boxShadow: 5 }}>{alert.message}</Alert>
          </Snackbar>
        </Stack>
      </Main >
    </Box >
  )
}