import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import { Box } from '@mui/system'
import { FormControl, TextField, ToggleButtonGroup, ToggleButton, Stack, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material'

import AsideNav from '../../../../../../components/AsideNav'
import ImoveisAsideNav from '../../../../../../components/imoveis/aside/AsideNav'
import Main from '../../../../../../components/imoveis/main/Main'
import Form from '../../../../../../components/imoveis/Form'

import { Firestore } from '../../../../../../Firebase'

import { AuthContext } from '../../../../../../contexts/AuthContext'

export default function Comodos() {
  const [state, setState] = useState({
    bedroom: '',
    suite: '',
    bathroom: '',
    garage: '',
    covered_garage: '',
    tvroom: '',
    service_area: '',
    kitchen: '',
    office: '',
    employeeDependency: ''
  })

  const [coveredGarage, setCoveredGarage] = useState('')

  const [alert, setAlert] = useState({
    severity: 'success',
    message: '',
    open: false
  })

  const [loaded, setLoaded] = useState(false)

  const [propertyId, setPropertyId] = useState('')
  const [property, setProperty] = useState([])

  const router = useRouter();

  const authContext = useContext(AuthContext)

  useEffect(async () => {
    if (!router.isReady) return

    const abortController = new AbortController

    if (!(await authContext.user())) {
      router.push('/login')
      return
    }

    if (!router.query.id) router.push('/imoveis')

    setPropertyId(router.query.id)

    const docRef = doc(Firestore, 'properties', router.query.id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) router.push('/imoveis')

    setProperty(docSnap.data())

    if (docSnap.data().rooms) {
      const data = docSnap.data().rooms
      setState({
        ...state,
        bedroom: data.bedroom,
        suite: data.suite,
        bathroom: data.bathroom,
        garage: data.garage,
        covered_garage: data.covered_garage,
        tvroom: data.tvroom,
        service_area: data.service_area,
        kitchen: data.kitchen,
        office: data.office,
        employeeDependency: data.employeeDependency
      })
      setCoveredGarage(data.covered_garage)
    }
    setLoaded(true)

    return () => {
      abortController.abort()
    }

  }, [router.isReady])

  function handleChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleCoveredGarage = (event, newValue) => {
    setCoveredGarage(newValue);
    setState({ ...state, covered_garage: newValue })
  };

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
        rooms: {
          bedroom: state.bedroom,
          suite: state.suite,
          bathroom: state.bathroom,
          garage: state.garage,
          covered_garage: state.covered_garage,
          tvroom: state.tvroom,
          service_area: state.service_area,
          kitchen: state.kitchen,
          office: state.office,
          employeeDependency: state.employeeDependency,
        },
        'steps_progress.rooms': 'done'
      })

      setAlert({
        severity: 'success',
        message: 'Salvo.',
        open: true
      })

      setTimeout(() => {
        router.push(`/imoveis/editar/${propertyId}/medidas`)
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

        <Main title='Comodos'>
          <Form handleSubmit={handleSubmit}>
            {(property.initial_informations.subtype.type == 'Sala' && (
              <FormControl variant="outlined">
                <Box component='label' fontWeight='bold' mb={1}>Escritório</Box>
                <TextField type='number' name="office" value={state.office} onChange={handleChange} />
              </FormControl>
            ))}

            {(property.initial_informations.subtype.type != 'Sala' && (
              <FormControl variant="outlined">
                <Box component='label' fontWeight='bold' mb={1}>Dormitórios</Box>
                <TextField type='number' name="bedroom" value={state.bedroom} onChange={handleChange} />
              </FormControl>
            ))}

            {(property.initial_informations.subtype.type != 'Sala' && (
              <FormControl variant="outlined">
                <Box component='label' fontWeight='bold' mb={1}>Sendo suíte</Box>
                <TextField type='number' name="suite" value={state.suite} onChange={handleChange} />
              </FormControl>
            ))}

            <FormControl variant="outlined">
              <Box component='label' fontWeight='bold' mb={1}>Banheiro</Box>
              <TextField type='number' name="bathroom" value={state.bathroom} onChange={handleChange} />
            </FormControl>

            {(property.initial_informations.subtype.type != 'Sala' && (
              <FormControl variant="outlined">
                <Box component='label' fontWeight='bold' mb={1}>Sala de TV</Box>
                <TextField type='number' name="tvroom" value={state.tvroom} onChange={handleChange} />
              </FormControl>
            ))}

            <FormControl variant="outlined">
              <Box component='label' fontWeight='bold' mb={1}>Cozinha</Box>
              <TextField type='number' name="kitchen" value={state.kitchen} onChange={handleChange} />
            </FormControl>

            <FormControl variant="outlined">
              <Box component='label' fontWeight='bold' mb={1}>Área de serviço</Box>
              <TextField type='number' name="service_area" value={state.service_area} onChange={handleChange} />
            </FormControl>

            {(property.initial_informations.subtype.type != 'Sala' && (
              <FormControl variant="outlined">
                <Box component='label' fontWeight='bold' mb={1}>Dependência para empregada</Box>
                <TextField type='number' name="employeeDependency" value={state.employeeDependency} onChange={handleChange} />
              </FormControl>
            ))}

            <FormControl variant="outlined">
              <Box component='label' fontWeight='bold' mb={1}>Garagem</Box>
              <TextField type='number' name="garage" value={state.garage} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Garagem coberta?</Box>
              <ToggleButtonGroup
                name='covered_garage'
                value={coveredGarage}
                exclusive
                color='primary'
                bgcolor='yellow'
                position='relative'
                sx={{ height: '100%' }}
                onChange={handleCoveredGarage}
              >
                <ToggleButton sx={{ width: '50%', height: '100%' }} value='sim'>Sim</ToggleButton>
                <ToggleButton sx={{ width: '50%', height: '100%' }} value='não'>Não</ToggleButton>
              </ToggleButtonGroup>
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
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }
}