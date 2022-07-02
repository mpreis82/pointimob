import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import { Box } from '@mui/system'
import { FormControl, TextField, InputAdornment, Select, MenuItem, ToggleButtonGroup, ToggleButton, Stack, Snackbar, Alert, Backdrop, CircularProgress, FormHelperText } from '@mui/material'

import AsideNav from '../../../../../../components/AsideNav'
import ImoveisAsideNav from '../../../../../../components/imoveis/aside/AsideNav'
import Main from '../../../../../../components/imoveis/main/Main'
import Form from '../../../../../../components/imoveis/Form'

import { Firestore } from '../../../../../../Firebase'

import { AuthContext } from '../../../../../../contexts/AuthContext'

export default function Preco() {
  const [state, setState] = useState({
    transaction: '',
    price: '',
    price_alternative_text: '',
    territorial_tax_price: '',
    condominium_price: '',
  })

  const [formValidate, setFormValidate] = useState({
    transaction: { error: false, message: 'Campo obrigatório' },
    price: { error: false, message: 'Campo obrigatório' },
  })

  const [price_show, setPriceShow] = useState('sim')
  const [territorial_tax_type, setTerritorialTaxType] = useState('')
  const [has_finance, setHasFinance] = useState('')
  const [is_financeable, setIsFinanceable] = useState('')
  const [is_exchangeable, setIsExchangeable] = useState('')

  const [alert, setAlert] = useState({
    severity: 'success',
    message: '',
    open: false
  })

  const [loaded, setLoaded] = useState(false)

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

    if (docSnap.data().financial) {
      const data = docSnap.data().financial
      setState({
        transaction: data.transaction,
        price: data.price,
        price_alternative_text: data.price_alternative_text,
        territorial_tax_price: data.territorial_tax_price,
        condominium_price: data.condominium_price,
      })
      setPriceShow(data.price_show)
      setTerritorialTaxType(data.territorial_tax_type)
      setHasFinance(data.has_finance)
      setIsFinanceable(data.is_financeable)
      setIsExchangeable(data.is_exchangeable)
    }

    setLoaded(true)

    return () => {
      abortController.abort()
    }

  }, [router.isReady])

  const handlePriceShow = (event, newValue) => {
    if (newValue == 'sim') {
      setState({ ...state, price_alternative_text: '' })
    } else {
      setState({ ...state, price_alternative_text: 'Consulte' })
    }
    setPriceShow(newValue);
  };

  const handleTerritorialTaxType = (event, newValue) => {
    setTerritorialTaxType(newValue);
  };

  const handleHasFinance = (event, newValue) => {
    setHasFinance(newValue);
  };

  const handleIsFinanceable = (event, newValue) => {
    setIsFinanceable(newValue);
  };

  const handleIsExchangeable = (event, newValue) => {
    setIsExchangeable(newValue);
  };

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

  function handleFormValidateBlur(event) {
    if (formValidate[event.target.name]['error']) {
      handleFormValidate()
    }
  }

  function handleFormValidate() {
    let isValidated = true
    let validate = { ...formValidate }

    Object.keys(formValidate).forEach(formComponent => {
      if (state[formComponent]) {
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
    event.preventDefault();

    if (!handleFormValidate()) return

    try {
      const ref = doc(Firestore, 'properties', propertyId)

      await updateDoc(ref, {
        financial: {
          transaction: state.transaction,
          price: state.price,
          price_alternative_text: state.price_alternative_text,
          territorial_tax_price: state.territorial_tax_price,
          condominium_price: state.condominium_price,
          price_show: price_show,
          territorial_tax_type: territorial_tax_type,
          has_finance: has_finance,
          is_financeable: is_financeable,
          is_exchangeable: is_exchangeable,
        },
        'steps_progress.financial': 'done'
      })

      setAlert({
        severity: 'success',
        message: 'Salvo.',
        open: true
      })

      setTimeout(() => {
        router.push(`/imoveis/editar/${propertyId}/caracteristicas`)
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

        <Main title='Preço'>
          <Form handleSubmit={handleSubmit}>
            <FormControl>
              <Box component='label' fontWeight='bold' mb={1}>Perfil do imóvel</Box>
              <Select name='transaction' value={state.transaction} onChange={handleChange} onBlur={handleFormValidateBlur} error={formValidate.transaction.error} placeholder='Venda ou aluguel'>
                <MenuItem value={'Venda'}>Venda</MenuItem>
                <MenuItem value={'Aluguel'}>Aluguel</MenuItem>
              </Select>
              <FormHelperText error={formValidate.transaction.error}>{formValidate.transaction.error ? formValidate.transaction.message : ''}</FormHelperText>
            </FormControl>

            <FormControl variant='outlined'>
              <Box component='label' fontWeight='bold' mb={1}>Valor do Imóvel</Box>
              <TextField type='number' name='price' value={state.price} onChange={handleChange} onBlur={handleFormValidateBlur} error={formValidate.price.error} helperText={formValidate.price.error ? formValidate.price.message : ''} InputProps={{ startAdornment: <InputAdornment position='start'>R$</InputAdornment> }} />
            </FormControl>

            <FormControl>
              <Box component='label' htmlFor='' fontWeight='bold' mb={1}>Mostrar valor no site?</Box>
              <ToggleButtonGroup
                name='price_show'
                value={price_show}
                exclusive
                color='primary'
                position='relative'
                sx={{ height: '100%' }}
                onChange={handlePriceShow}
              >
                <ToggleButton sx={{ width: '50%', height: '100%' }} value='sim'>Sim</ToggleButton>
                <ToggleButton sx={{ width: '50%', height: '100%' }} value='não'>Não</ToggleButton>
              </ToggleButtonGroup>
            </FormControl>

            <FormControl variant='outlined' sx={{ display: (price_show == 'não' ? 'flex' : 'none') }}>
              <Box component='label' fontWeight='bold' mb={1}>Mostrar no lugar do preço:</Box>
              <TextField name='price_alternative_text' value={state.price_alternative_text} onChange={handleChange} disabled={price_show == 'sim'} />
            </FormControl>

            <FormControl variant='outlined'>
              <Box component='label' fontWeight='bold' mb={1}>Valor do IPTU</Box>
              <TextField type='number' name='territorial_tax_price' value={state.territorial_tax_price} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position='start'>R$</InputAdornment> }} placeholder='100,00' />
            </FormControl>

            <FormControl>
              <Box component='label' htmlFor='' fontWeight='bold' mb={1}>Período da tarifa do IPTU</Box>
              <ToggleButtonGroup
                name='territorial_tax_type'
                value={territorial_tax_type}
                exclusive
                color='primary'
                bgcolor='yellow'
                position='relative'
                sx={{ height: '100%' }}
                onChange={handleTerritorialTaxType}
              >
                <ToggleButton sx={{ width: '50%', height: '100%' }} value='anual'>Anual</ToggleButton>
                <ToggleButton sx={{ width: '50%', height: '100%' }} value='mensal'>Mensal</ToggleButton>
              </ToggleButtonGroup>
            </FormControl>

            <FormControl variant='outlined'>
              <Box component='label' fontWeight='bold' mb={1}>Valor Condomínio</Box>
              <TextField type='number' name='condominium_price' value={state.condominium_price} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position='start'>R$</InputAdornment> }} />
            </FormControl>

            <FormControl>
              <Box component='label' htmlFor='' fontWeight='bold' mb={1}>Está financiado?</Box>
              <ToggleButtonGroup
                name='has_finance'
                value={has_finance}
                exclusive
                color='primary'
                bgcolor='yellow'
                position='relative'
                sx={{ height: '100%' }}
                onChange={handleHasFinance}
              >
                <ToggleButton sx={{ width: '50%', height: '100%' }} value='sim'>Sim</ToggleButton>
                <ToggleButton sx={{ width: '50%', height: '100%' }} value='não'>Não</ToggleButton>
              </ToggleButtonGroup>
            </FormControl>

            <FormControl>
              <Box component='label' htmlFor='' fontWeight='bold' mb={1}>Aceita financiamento?</Box>
              <ToggleButtonGroup
                name='is_financeable'
                value={is_financeable}
                exclusive
                color='primary'
                bgcolor='yellow'
                position='relative'
                sx={{ height: '100%' }}
                onChange={handleIsFinanceable}
              >
                <ToggleButton sx={{ width: '50%', height: '100%' }} value='sim'>Sim</ToggleButton>
                <ToggleButton sx={{ width: '50%', height: '100%' }} value='não'>Não</ToggleButton>
              </ToggleButtonGroup>
            </FormControl>

            <FormControl>
              <Box component='label' htmlFor='' fontWeight='bold' mb={1}>Aceita permuta?</Box>
              <ToggleButtonGroup
                name='is_exchangeable'
                value={is_exchangeable}
                exclusive
                color='primary'
                bgcolor='yellow'
                position='relative'
                sx={{ height: '100%' }}
                onChange={handleIsExchangeable}
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
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  }
}