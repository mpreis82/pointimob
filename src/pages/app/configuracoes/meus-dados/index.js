import { useState, useEffect, useContext } from 'react'

import { Alert, Backdrop, CircularProgress, FormControl, FormHelperText, MenuItem, Select, Snackbar, Stack, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Box } from "@mui/system";

import Form from "../../../../components/imoveis/Form";
import Main from "../../../../components/imoveis/main/Main";
import AsideNav from '../../../../components/AsideNav';
import { AuthContext } from '../../../../contexts/AuthContext';
import { collection, doc, getDoc, getDocs, query, Timestamp, updateDoc, where } from 'firebase/firestore';
import { Firestore } from '../../../../Firebase';
import AsideNavConfig from '../../../../components/Configuracoes/AsideNavConfig';
import HelpSendError from '../../../../components/help/HelpSendError';

export default function MeusDados() {
  const [state, setState] = useState({
    name: '',
    group: 'Administrador',
    email: '',
    cellphone: '',
    phone: '',
    is_realtor: true,
    creci: '',
    createdAt: '',
    updatedAt: ''
  })

  const [formValidate, setFormValidate] = useState({
    name: { error: false, message: 'Campo obrigatório.' },
    group: { error: false, message: 'Campo obrigatório.' },
    cellphone: { error: false, message: 'Campo obrigatório.' },
    creci: { error: false, message: 'Campo obrigatório.' },
  })

  const [alert, setAlert] = useState({
    severity: 'success',
    message: '',
    open: false
  })

  const [loaded, setLoaded] = useState(false)
  const [client, setClient] = useState(null)
  const [error, setError] = useState(false)

  const authContext = useContext(AuthContext)

  useEffect(async () => {
    try {
      const currentUser = await authContext.user()

      if (!currentUser) throw new Error('User not authenticated')

      const clientRef = collection(Firestore, 'clients')
      const q = query(clientRef, where('uid', '==', currentUser.uid))
      const querySnap = await getDocs(q)

      if (querySnap.size == 0) throw new Error('Client not found')

      const data = querySnap.docs[0].data()

      setState({
        name: data.name,
        group: data.group,
        email: data.email,
        cellphone: data.cellphone,
        phone: data.phone,
        is_realtor: data.is_realtor,
        creci: data.creci,
      })

      setClient({ ...data, id: querySnap.docs[0].id })

      setLoaded(true)

    } catch (error) {
      setError(true)
      setLoaded(true)
    }
  }, [])

  function handleFormValidate() {
    let isValidated = true

    let validate = { ...formValidate }

    Object.keys(formValidate).forEach(formComponent => {
      if (formComponent == 'creci' && !state.is_realtor) return

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

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  function handleIsRealtorChange(event, newValue) {
    setState({ ...state, is_realtor: newValue })
  }

  function handleSnackbarClose(event, reason) {
    if (reason === 'clickaway') return
    setAlert({ ...alert, open: false });
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setLoaded(false)

    if (!handleFormValidate()) return

    const clientRef = doc(Firestore, 'clients', client.id)

    try {

      await updateDoc(clientRef, {
        name: state.name,
        group: state.group,
        cellphone: state.cellphone,
        phone: state.phone,
        is_realtor: state.is_realtor,
        creci: state.creci,
        update_date: Timestamp.fromDate(new Date())
      })

      setLoaded(true)

      setAlert({ ...alert, open: true, message: 'Os seus dados foram salvos!' })
    } catch (error) {
      setError(true)
      setLoaded(true)
    }
  }

  if (loaded) {

    return (
      <Box display='flex' height='calc(100% - 45px)' bgcolor='silver' overflow='hidden'>
        <AsideNav>
          <AsideNavConfig />
        </AsideNav>

        <Main title='Meus dados'>
          {!error && (
            <Form handleSubmit={handleSubmit} gridTemplateColumnsCustom='1fr' buttonSubmitText='Salvar' showCancel={false}>
              <Box display='grid' gridTemplateColumns='1fr 1fr' gap={2}>
                <FormControl variant='outlined'>
                  <Box component='label' fontWeight='bold' mb={1}>Nome</Box>
                  <TextField
                    name='name'
                    value={state.name}
                    onChange={handleChange}
                    error={formValidate.name.error}
                    helperText={formValidate.name.error ? formValidate.name.message : ''}
                  />
                </FormControl>

                <FormControl>
                  <Box component='label' htmlFor='' fontWeight='bold' mb={1}>Grupo</Box>
                  <Select
                    name='group'
                    value={state.group}
                    onChange={handleChange}
                    error={formValidate.group.error}
                  >
                    <MenuItem value={'Administrador'}>Administrador</MenuItem>
                    <MenuItem value={'Corretor'}>Corretor</MenuItem>
                  </Select>
                  <FormHelperText error={formValidate.group.error}>{formValidate.group.error ? formValidate.group.message : ''}</FormHelperText>
                </FormControl>
              </Box>

              <Box display='grid' gridTemplateColumns='1fr 1fr 1fr' gap={2}>
                <FormControl variant='outlined'>
                  <Box component='label' fontWeight='bold' mb={1}>E-mail</Box>
                  <TextField
                    name='email'
                    value={state.email}
                    disabled={true}
                  />
                </FormControl>

                <FormControl variant='outlined'>
                  <Box component='label' fontWeight='bold' mb={1}>Celular</Box>
                  <TextField
                    name='cellphone'
                    value={state.cellphone}
                    onChange={handleChange}
                    error={formValidate.cellphone.error}
                    helperText={formValidate.cellphone.error ? formValidate.cellphone.message : ''}
                  />
                </FormControl>

                <FormControl variant='outlined'>
                  <Box component='label' fontWeight='bold' mb={1}>Telefone</Box>
                  <TextField
                    name='phone'
                    value={state.phone}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>

              <Box display='grid' gridTemplateColumns='1fr 1fr' gap={2}>

                <FormControl>
                  <Box component='label' htmlFor='' fontWeight='bold' mb={1}>É corretor?</Box>
                  <ToggleButtonGroup
                    value={state.is_realtor}
                    exclusive
                    color='primary'
                    height='100%'
                    position='relative'
                    onChange={handleIsRealtorChange}
                  >
                    <ToggleButton sx={{ width: 100 }} value={true}>Sim</ToggleButton>
                    <ToggleButton sx={{ width: 100 }} value={false}>Não</ToggleButton>
                  </ToggleButtonGroup>
                </FormControl>

                {(state.is_realtor && (
                  <FormControl variant='outlined'>
                    <Box component='label' fontWeight='bold' mb={1}>CRECI</Box>
                    <TextField
                      name='creci'
                      value={state.creci}
                      onChange={handleChange}
                      error={formValidate.creci.error}
                      helperText={formValidate.creci.error ? formValidate.creci.message : ''}
                    />
                  </FormControl>
                ))}
              </Box>
            </Form>
          )}

          {error && (
            <HelpSendError />
          )}

          <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleSnackbarClose}>
              <Alert severity={alert.severity} sx={{ boxShadow: 5 }}>{alert.message}</Alert>
            </Snackbar>
          </Stack>
        </Main>
      </Box>
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