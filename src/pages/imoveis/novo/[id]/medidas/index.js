import { useState, useEffect, useLayoutEffect } from 'react'
import { useRouter } from 'next/router'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import { Box } from '@mui/system'
import { FormControl, TextField, InputAdornment, Stack, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material'

import AsideNav from '../../../../../components/AsideNav'
import ImoveisAsideNav from '../../../../../components/imoveis/aside/AsideNav'
import Main from '../../../../../components/imoveis/main/Main'
import Form from '../../../../../components/imoveis/Form'

import { Firestore } from '../../../../../Firebase'

export default function Medidas() {
  const [state, setState] = useState({
    built_area: '',
    private_area: '',
    total_area: '',
  })

  const [alert, setAlert] = useState({
    severity: 'success',
    message: '',
    open: false
  })

  const [loaded, setLoaded] = useState(false)

  const [propertyId, setPropertyId] = useState('')

  const router = useRouter()

  useEffect(async () => {
    if (!router.isReady) return

    if (!router.query.id) router.push('/imoveis')

    setPropertyId(router.query.id)

    const docRef = doc(Firestore, 'properties', router.query.id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) router.push('/imoveis')

    if (docSnap.data().measures) {
      const data = docSnap.data().measures
      setState({
        built_area: data.built_area,
        private_area: data.private_area,
        total_area: data.total_area,
      })
    }

    setLoaded(true)
  }, [router.isReady])

  function handleChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  function handleSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ ...alert, open: false });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const ref = doc(Firestore, 'properties', propertyId)

      await updateDoc(ref, {
        measures: {
          built_area: state.built_area,
          private_area: state.private_area,
          total_area: state.total_area,
        },
        'steps_progress.measures': 'done'
      })

      setAlert({
        severity: 'success',
        message: 'Salvo.',
        open: true
      })

      setTimeout(() => {
        router.push(`/imoveis/novo/${propertyId}/preco`)
      }, 2000);

    } catch (err) {
      setAlert({
        severity: 'error',
        message: 'Desculpe! Algo deu errado e estamos corrigindo.',
        open: true
      })
    }
  }

  if (loaded) {
    return (
      <Box display='flex' height='calc(100% - 45px)' bgcolor='silver' overflow='hidden'>
        <AsideNav>
          <ImoveisAsideNav />
        </AsideNav>

        <Main title='Medidas'>
          <Form handleSubmit={handleSubmit}>
            <FormControl variant='outlined'>
              <Box component='label' fontWeight='bold' mb={1}>Área construída</Box>
              <TextField type='number' name='built_area' value={state.built_area} onChange={handleChange} InputProps={{ endAdornment: <InputAdornment position='end'>m²</InputAdornment> }} />
            </FormControl>

            <FormControl variant='outlined'>
              <Box component='label' fontWeight='bold' mb={1}>Área privada</Box>
              <TextField type='number' name='private_area' value={state.private_area} onChange={handleChange} InputProps={{ endAdornment: <InputAdornment position='end'>m²</InputAdornment> }} />
            </FormControl>

            <FormControl variant='outlined'>
              <Box component='label' fontWeight='bold' mb={1}>Terreno área total</Box>
              <TextField type='number' name='total_area' value={state.total_area} onChange={handleChange} InputProps={{ endAdornment: <InputAdornment position='end'>m²</InputAdornment> }} />
            </FormControl>
          </Form>

          <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={alert.open} autoHideDuration={(alert.severity == 'success' ? 2000 : 6000)} onClose={handleSnackbarClose}>
              <Alert severity={alert.severity} sx={{ boxShadow: 5 }}>{alert.message}</Alert>
            </Snackbar>
          </Stack>
        </Main>
      </Box >
    )
  } else {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  }
}