import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import { Box } from '@mui/system'
import { FormControl, FormGroup, FormControlLabel, ToggleButtonGroup, ToggleButton, TextField, Checkbox, Stack, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material'

import AsideNav from '../../../../../../components/AsideNav'
import ImoveisAsideNav from '../../../../../../components/imoveis/aside/AsideNav'
import Main from '../../../../../../components/imoveis/main/Main'
import Form from '../../../../../../components/imoveis/Form'

import { Firestore } from '../../../../../../Firebase'

import { AuthContext } from '../../../../../../contexts/AuthContext'

export default function Condominio() {
  const [condoCharacteristics, setCondoCharacteristics] = useState([
    { name: 'Academia de ginástica', checked: false },
    { name: 'Área verde preservada', checked: false },
    { name: 'Brinquedoteca', checked: false },
    { name: 'Campo de futebol gramado', checked: false },
    { name: 'Cerca elétrica', checked: false },
    { name: 'Churrasqueira', checked: false },
    { name: 'Cinema', checked: false },
    { name: 'Elevador de serviço', checked: false },
    { name: 'Elevador social', checked: false },
    { name: 'Interfone', checked: false },
    { name: 'Jacuzzi', checked: false },
    { name: 'Lago', checked: false },
    { name: 'Lan house', checked: false },
    { name: 'Lanchonete', checked: false },
    { name: 'Piscina adulto', checked: false },
    { name: 'Piscina infantil', checked: false },
    { name: 'Pista de caminhada', checked: false },
    { name: 'Playground', checked: false },
    { name: 'Portão Elétrico', checked: false },
    { name: 'Portaria 24 horas', checked: false },
    { name: 'Porteiro eletrônico', checked: false },
    { name: 'Quadra de areia', checked: false },
    { name: 'Quadra de tênis', checked: false },
    { name: 'Quadra poliesportiva', checked: false },
    { name: 'Ronda motorizada', checked: false },
    { name: 'Sala de jogos', checked: false },
    { name: 'Salão de festas', checked: false },
    { name: 'Salão de festas infantil', checked: false },
    { name: 'Sauna', checked: false },
  ])
  const [condominiumName, setCondominiumName] = useState('')
  const [isCondo, setIsCondo] = useState('não')
  const [showCondoCharacteristics, setShowCondoCharacteristics] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const [alert, setAlert] = useState({
    severity: 'success',
    message: '',
    open: false
  })

  const [propertyId, setPropertyId] = useState('')
  const [property, setProperty] = useState([])

  const router = useRouter()

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

    if (docSnap.data().condominium) {
      const data = docSnap.data().condominium
      setCondominiumName(data.condominiumName)
      setIsCondo(data.inCondominium)
      setCondoCharacteristics(data.condominiumCharact)
    }

    setLoaded(true)

    return () => {
      abortController.abort()
    }

  }, [router.isReady])

  const handleIsCondo = (event, newValue) => {
    setIsCondo(newValue);
  };

  function handleCondoCharacteristics(event) {
    let newCondoCharacteristics = [...condoCharacteristics]
    const index = newCondoCharacteristics.findIndex((characteristic) => characteristic.name == event.target.name)
    newCondoCharacteristics[index]['checked'] = event.target.checked
    setCondoCharacteristics(newCondoCharacteristics)
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
        condominium: {
          condominiumCharact: condoCharacteristics,
          condominiumName: condominiumName,
          inCondominium: isCondo
        },
        'steps_progress.condominium': 'done'
      })

      setAlert({
        severity: 'success',
        message: 'Salvo.',
        open: true
      })

      setTimeout(() => {
        router.push(`/imoveis/editar/${propertyId}/localizacao`)
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

        <Main title='Características do condomínio '>
          <Form handleSubmit={handleSubmit} gridTemplateColumnsCustom='1fr'>
            <Box display='grid' gridTemplateColumns='1fr 2fr' gap='1rem'>
              <FormControl>
                <Box component='label' fontWeight='bold' mb={1}>Em condomínio?</Box>
                <ToggleButtonGroup
                  name='isCondo'
                  value={isCondo}
                  exclusive
                  color='primary'
                  position='relative'
                  sx={{ height: '100%' }}
                  onChange={handleIsCondo}
                >
                  <ToggleButton sx={{ width: '50%', height: '100%' }} value='sim'>Sim</ToggleButton>
                  <ToggleButton sx={{ width: '50%', height: '100%' }} value='não'>Não</ToggleButton>
                </ToggleButtonGroup>
              </FormControl>

              <FormControl variant='outlined' sx={{ opacity: (isCondo == 'sim' ? '100' : '0') }}>
                <Box component='label' fontWeight='bold' mb={1}>Nome do condomínio:</Box>
                <TextField value={condominiumName} onChange={event => setCondominiumName(event.target.value)} helperText='' />
              </FormControl>
            </Box>

            <Box display={(isCondo == 'sim' ? 'block' : 'none')}>
              <FormGroup position='relative' display='block' width='100%'>
                <Box position='relative' width='100%' sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr' } }}>
                  {condoCharacteristics.map((characteristic, index) => (
                    <Box key={index}>
                      <FormControlLabel
                        name={characteristic.name}
                        control={<Checkbox />}
                        label={characteristic.name}
                        display='block'
                        width='100%'
                        checked={characteristic.checked}
                        onChange={handleCondoCharacteristics}
                      />
                    </Box>
                  ))}
                </Box>
              </FormGroup>
            </Box>
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