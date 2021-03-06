import { useState, useEffect, useLayoutEffect } from 'react'
import { useRouter } from 'next/router'
import { doc, updateDoc, Timestamp, getDoc } from 'firebase/firestore'

import { Box } from '@mui/system'
import { FormControl, ToggleButtonGroup, ToggleButton, Stack, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material'

import AsideNav from '../../../../../../components/AsideNav'
import ImoveisAsideNav from '../../../../../../components/imoveis/aside/AsideNav'
import Main from '../../../../../../components/imoveis/main/Main'
import Form from '../../../../../../components/imoveis/Form'

import { Firestore } from '../../../../../../Firebase'

export default function Publicacao() {
  const [state, setState] = useState({
    show_property: 'sim',
    is_highlighted: 'não',
  })

  const [alert, setAlert] = useState({ severity: 'success', message: '', open: false })

  const [loaded, setLoaded] = useState(false)

  const [propertyId, setPropertyId] = useState('')
  const [property, setProperty] = useState([])

  const router = useRouter()

  useEffect(async () => {
    if (!router.isReady) return

    const abortController = new AbortController

    if (!router.query.id) router.push('/imoveis')

    setPropertyId(router.query.id)

    const docRef = doc(Firestore, 'properties', router.query.id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) router.push('/imoveis')

    setProperty(docSnap.data())

    if (docSnap.data().publish) {
      const data = docSnap.data().publish
      setState({
        show_property: data.show_property,
        is_highlighted: data.is_highlighted,
      })
    }

    setLoaded(true)

    return () => {
      abortController.abort()
    }

  }, [router.isReady])

  const handleToggleChange = (event, newValue) => {
    setState({ ...state, [event.target.name]: newValue })
  }

  function handleSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ ...alert, open: false });
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const ref = doc(Firestore, 'properties', propertyId)

      await updateDoc(ref, {
        publish: {
          show_property: state.show_property,
          is_highlighted: state.is_highlighted,
        },
        'steps_progress.publish': 'done',
        'register_status.status': 'done',
        'register_status.update_date': Timestamp.fromDate(new Date())
      })

      setAlert({
        severity: 'success',
        message: 'Mais um imóvel cadastrado! 🎊🎉',
        open: true
      })

      setTimeout(() => {
        router.push('/imoveis')
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
          <ImoveisAsideNav property={property} />
        </AsideNav>

        <Main title='Publicação'>
          <Form handleSubmit={handleSubmit} gridTemplateColumnsCustom='1fr'>
            <FormControl variant='outlined' sx={{ display: 'flex', flexDirection: { sm: 'column', md: 'row' }, alignItems: { sm: 'flex-start', md: 'center' }, justifyContent: 'space-between' }}>
              <Box sx={{ mb: { sm: 1, md: 0 } }}>
                <Box component='p' fontWeight='bold' display='block'>Mostrar imovél no site?</Box>
                <Box component='p' display='block'>Determine se o imóvel será publicado em seu site.</Box>
              </Box>
              <ToggleButtonGroup
                value={state.show_property}
                exclusive
                color='primary'
                height='100%'
                position='relative'
                onChange={handleToggleChange}
              >
                <ToggleButton sx={{ width: 100 }} name='show_property' value='sim'>Sim</ToggleButton>
                <ToggleButton sx={{ width: 100 }} name='show_property' value='não'>Não</ToggleButton>
              </ToggleButtonGroup>
            </FormControl>

            <hr />

            <FormControl variant='outlined' sx={{ display: 'flex', flexDirection: { sm: 'column', md: 'row' }, alignItems: { sm: 'flex-start', md: 'center' }, justifyContent: 'space-between' }}>
              <Box sx={{ mb: { sm: 1, md: 0 } }}>
                <Box component='p' fontWeight='bold' display='block'>Destaque</Box>
                <Box component='p' display='block'>Defina se esse imóvel aparecerá na sessão de “imóveis em destaque” na página inicial do seu site.</Box>
              </Box>

              <ToggleButtonGroup
                value={state.is_highlighted}
                exclusive
                color='primary'
                height='100%'
                position='relative'
                onChange={handleToggleChange}
              >
                <ToggleButton sx={{ width: 100 }} name='is_highlighted' value='sim'>Sim</ToggleButton>
                <ToggleButton sx={{ width: 100 }} name='is_highlighted' value='não'>Não</ToggleButton>
              </ToggleButtonGroup>
            </FormControl>
          </Form>

          <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
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