import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import { collection, doc, getDoc, addDoc, Timestamp, updateDoc } from 'firebase/firestore'

import { Box } from "@mui/system"
import { Select, ToggleButtonGroup, ToggleButton, MenuItem, FormControl, TextField, Stack, Snackbar, Alert, FormHelperText } from '@mui/material';

import AsideNav from '../../../../../components/AsideNav'
import ImoveisAsideNav from '../../../../../components/imoveis/aside/AsideNav'
import Main from "../../../../../components/imoveis/main/Main"
import Form from "../../../../../components/imoveis/Form"
import SelectPropertyTypes from "../../../../../components/SelectPropertyTypes";

import { Firestore } from "../../../../../Firebase";

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

  const [mobiliado, setMobiliado] = useState('não')

  const [alert, setAlert] = useState({
    severity: 'success',
    message: '',
    open: false
  })

  const router = useRouter()

  useEffect(async () => {
    if (!router.isReady) return

    const propertyId = router.query.id

    if (propertyId) {
      const docRef = doc(Firestore, 'properties', propertyId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data().initial_informations
        setState({
          people: data.people,
          user: data.user,
          subtype: data.subtype.docId,
          profile: data.profile,
          situation: data.situation,
          lifetime: data.lifetime,
          incorporation: data.incorporation,
          near_sea: data.near_sea,
          floor: data.floor,
        })
      }
    }
  }, [router.isReady])

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
      const typeDoc = doc(Firestore, 'propery_types', state.subtype)
      const typeSnap = await getDoc(typeDoc)

      if (!localStorage.getItem('new_property_id')) {
        const doc = await addDoc(collection(Firestore, 'properties'), {
          initial_informations: {
            people: state.people,
            user: state.user,
            subtype: { docId: typeSnap.id, ...typeSnap.data() },
            profile: state.profile,
            situation: state.situation,
            lifetime: state.lifetime,
            incorporation: state.incorporation,
            near_sea: state.near_sea,
            floor: state.floor,
          },
          register_status: {
            status: 'pending',
            created_date: Timestamp.fromDate(new Date()),
            update_date: ''
          },
          steps_progress: {
            initial_informations: 'done',
            rooms: 'pending',
            measures: 'pending',
            financial: 'pending',
            characteristics: 'pending',
            condominium: 'pending',
            location: 'pending',
            nearby: 'pending',
            description: 'pending',
            images: 'pending',
            publish: 'pending',
          }
        })
        localStorage.setItem('new_property_id', doc.id)
      } else {
        const docRef = doc(Firestore, 'properties', localStorage.getItem('new_property_id'))
        await updateDoc(docRef, {
          initial_informations: {
            people: state.people,
            user: state.user,
            subtype: { docId: typeSnap.id, ...typeSnap.data() },
            profile: state.profile,
            situation: state.situation,
            lifetime: state.lifetime,
            incorporation: state.incorporation,
            near_sea: state.near_sea,
            floor: state.floor,
          }
        })
      }

      setAlert({
        severity: 'success',
        message: 'Salvo.',
        open: true
      })

      setTimeout(() => {
        router.push('/imoveis/novo/comodos')
      }, 2300);

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

  return (
    <Box display='flex' height='calc(100% - 45px)' bgcolor='silver' overflow='hidden'>
      <AsideNav>
        <ImoveisAsideNav />
      </AsideNav>

      <Main title='Informações iniciais'>
        <Form handleSubmit={handleSubmit}>
          <FormControl variant="outlined">
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Proprietario</Box>
            <TextField name="people" value={state.people} onChange={handleChange} error={formValidate.people.error} helperText={formValidate.people.error ? formValidate.people.message : ''} onBlur={handleFormValidateBlur} />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Corretor/Agenciador</Box>
            <TextField name="user" value={state.user} onChange={handleChange} error={formValidate.user.error} helperText={formValidate.user.error ? formValidate.user.message : ''} onBlur={handleFormValidateBlur} />
          </FormControl>

          <SelectPropertyTypes value={state.subtype} setValue={handleChange} error={formValidate.subtype.error} message={formValidate.subtype.message} validateBlur={handleFormValidateBlur} />

          <FormControl>
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Perfil do imóvel</Box>
            <Select name="profile" value={state.profile} onChange={handleChange} error={formValidate.profile.error} onBlur={handleFormValidateBlur} >
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
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Situação</Box>
            <Select name="situation" value={state.situation} onChange={handleChange} error={formValidate.situation.error} onBlur={handleFormValidateBlur} >
              <MenuItem value={'Breve lançamento'}>Breve lançamento</MenuItem>
              <MenuItem value={'Na plata'}>Na plata</MenuItem>
              <MenuItem value={'Em construção'}>Em construção</MenuItem>
              <MenuItem value={'Lançamento'}>Lançamento</MenuItem>
              <MenuItem value={'Novo'}>Novo</MenuItem>
              <MenuItem value={'Semi-novo'}>Semi-novo</MenuItem>
              <MenuItem value={'Usado'}>Usado</MenuItem>
              <MenuItem value={'Reformado'}>Reformado</MenuItem>
              <MenuItem value={'Pronto para morar'}>Pronto para morar</MenuItem>
              <MenuItem value={'Indefinido'}>Indefinido</MenuItem>
            </Select>
            <FormHelperText error={formValidate.situation.error}>{formValidate.situation.error ? formValidate.situation.message : ''}</FormHelperText>
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Ano da construção</Box>
            <TextField type='number' name="lifetime" value={state.lifetime} onChange={handleChange} InputProps={{ inputProps: { min: 1900, max: new Date().getFullYear() } }} />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Incorporação</Box>
            <TextField name="incorporation" value={state.incorporation} onChange={handleChange} />
          </FormControl>

          <FormControl>
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Próximo ao mar?</Box>
            <Select name="near_sea" value={state.near_sea} onChange={handleChange} >
              <MenuItem value={'Frente pro mar'}>Frente pro mar</MenuItem>
              <MenuItem value={'Quadra do mar'}>Quadra do mar</MenuItem>
              <MenuItem value={'Próximo ao mar'}>Próximo ao mar</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" sx={{ display: ((Number(state.subtype) > 0 && Number(state.subtype) < 16) ? 'flex' : 'none') }}>
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Andar</Box>
            <TextField name="floor" value={state.floor} onChange={handleChange} />
          </FormControl>

          <FormControl>
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Tem mobília?</Box>
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
        </Form>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={alert.open} autoHideDuration={(alert.severity == 'success' ? 2000 : 6000)} onClose={handleSnackbarClose}>
            <Alert severity={alert.severity} sx={{ boxShadow: 5 }}>{alert.message}</Alert>
          </Snackbar>
        </Stack>
      </Main>
    </Box >
  )
}
