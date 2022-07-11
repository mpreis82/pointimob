import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { collection, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'

import { Box } from '@mui/system'
import { Select, ToggleButtonGroup, ToggleButton, MenuItem, FormControl, TextField, Stack, Snackbar, Alert, FormHelperText, Backdrop, CircularProgress } from '@mui/material';

import AsideNav from '../../../../../../components/AsideNav'
import ImoveisAsideNav from '../../../../../../components/imoveis/aside/AsideNav'
import Main from '../../../../../../components/imoveis/main/Main'
import Form from '../../../../../../components/imoveis/Form'
import SelectPropertyTypes from '../../../../../../components/SelectPropertyTypes';

import { Firestore } from '../../../../../../Firebase';

import { AuthContext } from '../../../../../../contexts/AuthContext'

export default function ImoveisNovoInformacoes() {
  const [state, setState] = useState({
    people: '',
    user: '',
    subtype: '',
    profile: '',
    situation: '',
    lifetime: '',
    incorporation: '',
    near_sea: '',
    floor: '',
  })

  const [formValidate, setFormValidate] = useState({
    people: { error: false, message: 'Campo obrigatório' },
    user: { error: false, message: 'Campo obrigatório' },
    profile: { error: false, message: 'Campo obrigatório' },
    subtype: { error: false, message: 'Campo obrigatório' },
    situation: { error: false, message: 'Campo obrigatório' },
  })

  const [alert, setAlert] = useState({
    severity: 'success',
    message: '',
    open: false
  })

  const [propertyId, setPropertyId] = useState('')
  const [property, setProperty] = useState([])
  const [lastPropertyType, setLastPropertyType] = useState('')
  const [situationList, setSituationList] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [mobiliado, setMobiliado] = useState('não')

  const router = useRouter()

  const authContext = useContext(AuthContext)

  useEffect(async () => {
    if (!router.isReady) return

    const abortController = new AbortController

    if (!(await authContext.user())) {
      router.push('/login')
      return
    }

    const localPropertyId = router.query.id

    setPropertyId(localPropertyId)

    if (localPropertyId) {
      const docRef = doc(Firestore, 'properties', localPropertyId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setProperty(docSnap.data())
        const data = docSnap.data().initial_informations
        setState({
          people: data.people,
          user: data.user,
          subtype: JSON.stringify({
            docId: data.subtype.docId,
            id: data.subtype.id,
            type: data.subtype.type,
            subtype: data.subtype.subtype
          }),
          profile: data.profile,
          situation: data.situation,
          floor: data.floor,
        })

        setMobiliado(data.mobiliado)

      } else {
        router.push('/imoveis')
      }
    }

    setLoaded(true)

    return () => {
      abortController.abort()
    }

  }, [router.isReady])

  useEffect(async () => {
    if (!state.subtype) return

    const currentPropertyType = JSON.parse(state.subtype).type

    if (lastPropertyType == currentPropertyType) return

    let newSituationList = []

    const situationsRef = collection(Firestore, 'situations')
    const q = query(
      situationsRef,
      where('property_type', '==', currentPropertyType),
      orderBy('order')
    )

    const querySnap = await getDocs(q);
    querySnap.forEach(doc => newSituationList.push(doc.data().situation))

    if (newSituationList.indexOf(state.situation) == -1) {
      setState({ ...state, situation: 'Selecione' })
    }

    setSituationList(newSituationList)

    setLastPropertyType(currentPropertyType)

  }, [state.subtype])

  function handleChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  function handleFormValidateBlur(event) {
    if (formValidate[event.target.name]['error']) {
      handleFormValidate()
    }
  }

  function handleSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ ...alert, open: false });
  }

  function handleFormValidate() {
    let isValidated = true

    let validate = { ...formValidate }

    Object.keys(formValidate).forEach(formComponent => {
      if (state[formComponent] && state[formComponent] != '0') {
        validate[formComponent]['error'] = false
      } else {
        validate[formComponent]['error'] = true
        isValidated = false
      }
    })
    setFormValidate(validate)
    return isValidated
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!handleFormValidate()) return

    try {
      const docRef = doc(Firestore, 'properties', propertyId)
      await updateDoc(docRef, {
        initial_informations: {
          people: state.people,
          user: state.user,
          subtype: JSON.parse(state.subtype),
          profile: state.profile,
          situation: state.situation,
          floor: state.floor,
          mobiliado: mobiliado,
        }
      })

      setAlert({
        severity: 'success',
        message: 'Salvo.',
        open: true
      })

      setTimeout(() => {
        if (JSON.parse(state.subtype).type != 'Terreno') {
          router.push(`/imoveis/novo/${propertyId}/comodos`)
        } else {
          router.push(`/imoveis/novo/${propertyId}/medidas`)
        }
      }, 2000);

    } catch (err) {
      console.error(err)
      setAlert({
        severity: 'error',
        message: 'Desculpe! Algo deu errado e estamos corrigindo.',
        open: true
      })
    }
  }

  const handleMobiliado = (event, newValue) => {
    setMobiliado(newValue);
  };

  if (loaded) {
    return (
      <Box display='flex' height='calc(100% - 45px)' bgcolor='silver' overflow='hidden'>
        <AsideNav>
          <ImoveisAsideNav property={property} />
        </AsideNav>

        <Main title='Informações iniciais'>
          <Form handleSubmit={handleSubmit}>
            <FormControl variant='outlined'>
              <Box component='label' htmlFor='' fontWeight='bold' mb={1}>Proprietario</Box>
              <TextField name='people' value={state.people} onChange={handleChange} error={formValidate.people.error} helperText={formValidate.people.error ? formValidate.people.message : ''} onBlur={handleFormValidateBlur} />
            </FormControl>

            <FormControl variant='outlined'>
              <Box component='label' htmlFor='' fontWeight='bold' mb={1}>Corretor/Agenciador</Box>
              <TextField name='user' value={state.user} onChange={handleChange} error={formValidate.user.error} helperText={formValidate.user.error ? formValidate.user.message : ''} onBlur={handleFormValidateBlur} />
            </FormControl>

            <SelectPropertyTypes value={state.subtype} setValue={handleChange} error={formValidate.subtype.error} message={formValidate.subtype.message} validateBlur={handleFormValidateBlur} />

            <FormControl>
              <Box component='label' htmlFor='' fontWeight='bold' mb={1}>Perfil do imóvel</Box>
              <Select name='profile' value={state.profile} onChange={handleChange} error={formValidate.profile.error} onBlur={handleFormValidateBlur} >
                <MenuItem value={'Residencial'}>Residencial</MenuItem>
                <MenuItem value={'Comercial'}>Comercial</MenuItem>
                <MenuItem value={'Residencial/Comercial'}>Residencial/Comercial</MenuItem>
                <MenuItem value={'Industrial'}>Industrial</MenuItem>
                <MenuItem value={'Rural'}>Rural</MenuItem>
                <MenuItem value={'Temporada'}>Temporada</MenuItem>
              </Select>
              <FormHelperText error={formValidate.profile.error}>{formValidate.profile.error ? formValidate.profile.message : ''}</FormHelperText>
            </FormControl>

            <FormControl>
              <Box component='label' htmlFor='' fontWeight='bold' mb={1}>Situação</Box>
              <Select name='situation' value={state.situation} onChange={handleChange} disabled={(situationList.length == 0)} error={formValidate.situation.error} onBlur={handleFormValidateBlur} >
                <MenuItem value='Selecione'>Selecione</MenuItem>
                {situationList.map(situation => (
                  <MenuItem value={situation} key={situation}>{situation}</MenuItem>
                ))}
              </Select>
              <FormHelperText error={formValidate.situation.error}>{formValidate.situation.error ? formValidate.situation.message : ''}</FormHelperText>
            </FormControl>

            {(lastPropertyType.length > 0 && (lastPropertyType == 'Apartamento' || lastPropertyType == 'Sala') && (
              <FormControl variant='outlined'>
                <Box component='label' htmlFor='' fontWeight='bold' mb={1}>Andar</Box>
                <TextField name='floor' value={state.floor} onChange={handleChange} />
              </FormControl>
            ))}

            {(lastPropertyType.length > 0 && (lastPropertyType != 'Terreno') && (
              <FormControl>
                <Box component='label' htmlFor='' fontWeight='bold' mb={1}>Tem mobília?</Box>
                <ToggleButtonGroup
                  value={mobiliado}
                  exclusive
                  color='primary'
                  height='100%'
                  position='relative'
                  onChange={handleMobiliado}
                >
                  <ToggleButton sx={{ width: 100 }} value='sim'>Sim</ToggleButton>
                  <ToggleButton sx={{ width: 100 }} value='não'>Não</ToggleButton>
                </ToggleButtonGroup>
              </FormControl>
            ))}
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
