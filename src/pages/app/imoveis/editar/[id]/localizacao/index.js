import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { Box } from '@mui/system'
import { FormControl, ToggleButtonGroup, ToggleButton, TextField, Autocomplete, Stack, Snackbar, Alert, Backdrop, CircularProgress, FormHelperText } from '@mui/material'
import AsideNav from '../../../../../../components/AsideNav'
import ImoveisAsideNav from '../../../../../../components/imoveis/aside/AsideNav'
import Main from '../../../../../../components/imoveis/main/Main'
import Form from '../../../../../../components/imoveis/Form'
import { Firestore } from '../../../../../../Firebase'

const ufList = ['Escolha um estado', 'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO',]

export default function Localizacao() {
  const [zipcode, setZipcode] = useState('')

  const [cityList, setCityList] = useState(['Escolha uma cidade'])

  const [state, setState] = useState({
    uf: 'Escolha um estado',
    city: 'Escolha uma cidade',
    street: '',
    district: '',
    number: '',
    complement: '',
    zipcode: '',
  })

  const [toggle, setToggle] = useState({
    showStreet: 'sim',
    showDistrict: 'sim',
    showNumberComplement: 'sim',
    showCondoName: 'sim',
    showMap: 'sim',
    showExactLocation: 'sim',
    showApartamentFloor: 'sim',
    showApartamentNumber: 'sim',
  })

  const [alert, setAlert] = useState({
    severity: 'success',
    message: '',
    open: false
  })

  const [loaded, setLoaded] = useState(false)

  const [formValidate, setFormValidate] = useState({
    uf: { error: false, message: 'Campo obrigatório' },
    city: { error: false, message: 'Campo obrigatório' },
    street: { error: false, message: 'Campo obrigatório' },
    district: { error: false, message: 'Campo obrigatório' },
    number: { error: false, message: 'Campo obrigatório' },
    zipcode: { error: false, message: 'Campo obrigatório' },
  })

  const [propertyId, setPropertyId] = useState('')

  const router = useRouter()

  useEffect(async () => {
    if (!router.isReady) return

    if (!router.query.id) router.push('/imoveis')

    setPropertyId(router.query.id)

    const docRef = doc(Firestore, 'properties', router.query.id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) router.push('/imoveis')

    if (docSnap.data().location) {
      const data = docSnap.data().location
      setState({
        uf: data.uf,
        city: data.city,
        street: data.street,
        district: data.district,
        number: data.number,
        complement: data.complement,
        zipcode: data.zipcode,
      })
      setToggle({
        showStreet: data.showStreet,
        showDistrict: data.showDistrict,
        showNumberComplement: data.showNumberComplement,
        showCondoName: data.showCondoName,
        showMap: data.showMap,
        showExactLocation: data.showExactLocation,
        showApartamentFloor: data.showApartamentFloor,
        showApartamentNumber: data.showApartamentNumber,
      })
      setZipcode(data.zipcode)
    }

    setLoaded(true)

  }, [router.isReady])

  const handleToggleChange = (event, newValue) => {
    setToggle({ ...toggle, [event.target.name]: newValue })
  }

  async function handleZipcodeChange(event) {
    setZipcode(event.target.value)

    let validate = { ...formValidate }

    validate.zipcode.error = false
    validate.zipcode.message = 'Campo obrigatório'

    if (event.target.value.length == 8) {

      setLoaded(false)
      const result = await fetch(`https://brasilapi.com.br/api/cep/v2/${event.target.value}`)
      setLoaded(true)

      if (result.status == 200) {
        const data = await result.json()

        setCityList([data.city])

        setState({
          ...state,
          uf: data.state,
          city: data.city,
          street: data.street,
          district: data.neighborhood,
          zipcode: event.target.value,
        })
      }

      if (result.status == 404) {
        validate.zipcode.error = true
        validate.zipcode.message = 'CEP inválido'
      }
    }
    setFormValidate(validate)
  }

  function handleStateChange(event) {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  function handleAutocompleteChange(target, newValue) {
    setState({ ...state, [target]: newValue })
  }

  async function handleUfChange(event, newValue) {
    if (newValue != '' && newValue != 'Escolha um estado') {
      const result = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${newValue}/distritos`)

      if (result.status == 200) {
        const data = await result.json()
        let newCityList = data.map(c => c.municipio.nome)
        newCityList.unshift('Escolha uma cidade')
        setCityList([...new Set(newCityList)])
        setState({ ...state, uf: newValue, city: 'Escolha uma cidade' })
      }
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
      if (state[formComponent].length > 0 && state[formComponent].search('Escolha um') == -1) {
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
      const ref = doc(Firestore, 'properties', propertyId)

      await updateDoc(ref, {
        location: {
          uf: state.uf,
          city: state.city,
          street: state.street,
          district: state.district,
          number: state.number,
          complement: state.complement,
          zipcode: zipcode,
          showStreet: toggle.showStreet,
          showDistrict: toggle.showDistrict,
          showNumberComplement: toggle.showNumberComplement,
          showCondoName: toggle.showCondoName,
          showMap: toggle.showMap,
          showExactLocation: toggle.showExactLocation,
          showApartamentFloor: toggle.showApartamentFloor,
          showApartamentNumber: toggle.showApartamentNumber,
        },
        'steps_progress.location': 'done'
      })

      setAlert({
        severity: 'success',
        message: 'Salvo.',
        open: true
      })

      setTimeout(() => {
        router.push(`/imoveis/editar/${propertyId}/proximidades`)
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

        <Main title='Localização'>
          <Form handleSubmit={handleSubmit} gridTemplateColumnsCustom='1fr'>
            <Box>
              <FormControl variant='outlined' >
                <Box component='label' fontWeight='bold' mb={1}>CEP</Box>
                <TextField value={zipcode} onChange={handleZipcodeChange} error={formValidate.zipcode.error} helperText={formValidate.zipcode.error ? formValidate.zipcode.message : ''} />
              </FormControl>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }, gap: '1rem' }}>
              <FormControl variant='outlined' error={formValidate.uf.error}>
                <Box component='label' fontWeight='bold' mb={1}>Estado</Box>
                <Autocomplete
                  value={state.uf}
                  name='uf'
                  onChange={(event, newValue) => handleUfChange(event, newValue)}
                  options={ufList}
                  renderInput={(params) => <TextField {...params} error={formValidate.uf.error} />}
                />
                <FormHelperText error={formValidate.uf.error}>{formValidate.uf.error ? formValidate.uf.message : ''}</FormHelperText>
              </FormControl>
              {formValidate.uf.error}

              <FormControl variant='outlined' >
                <Box component='label' fontWeight='bold' mb={1}>Cidade</Box>
                <Autocomplete
                  value={state.city}
                  name='city'
                  onChange={(event, newValue) => handleAutocompleteChange('city', newValue)}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  options={cityList}
                  renderInput={(params) => <TextField {...params} error={formValidate.city.error} />}
                />
                <FormHelperText error={formValidate.city.error}>{formValidate.city.error ? formValidate.city.message : ''}</FormHelperText>
              </FormControl>

              <FormControl variant='outlined' >
                <Box component='label' fontWeight='bold' mb={1}>Bairro</Box>
                <TextField name='district' value={state.district} onChange={handleStateChange} error={formValidate.district.error} helperText={formValidate.district.error ? formValidate.district.message : ''} />
              </FormControl>

              <FormControl variant='outlined' >
                <Box component='label' fontWeight='bold' mb={1}>Logradouro</Box>
                <TextField name='street' value={state.street} error={formValidate.street.error} helperText={formValidate.street.error ? formValidate.street.message : ''} onChange={handleStateChange} />
              </FormControl>

              <FormControl variant='outlined' >
                <Box component='label' fontWeight='bold' mb={1}>Número</Box>
                <TextField name='number' value={state.number} error={formValidate.number.error} helperText={formValidate.number.error ? formValidate.number.message : ''} onChange={handleStateChange} />
              </FormControl>

              <FormControl variant='outlined' >
                <Box component='label' fontWeight='bold' mb={1}>Complemento</Box>
                <TextField name='complement' value={state.complement} onChange={handleStateChange} />
              </FormControl>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }, gap: '1rem' }}>
              <FormControl>
                <Box component='label' fontWeight='bold' mb={1}>Mostrar logradouro no site?</Box>
                <ToggleButtonGroup
                  name='showStreet'
                  id='showStreet'
                  value={toggle.showStreet}
                  exclusive
                  color='primary'
                  position='relative'
                  sx={{ height: '100%' }}
                  onChange={handleToggleChange}
                >
                  <ToggleButton name='showStreet' sx={{ width: '50%', height: '100%' }} value='sim'>Sim</ToggleButton>
                  <ToggleButton name='showStreet' sx={{ width: '50%', height: '100%' }} value='não'>Não</ToggleButton>
                </ToggleButtonGroup>
              </FormControl>

              <FormControl>
                <Box component='label' fontWeight='bold' mb={1}>Mostrar bairro no site?</Box>
                <ToggleButtonGroup
                  name='showDistrict'
                  value={toggle.showDistrict}
                  exclusive
                  color='primary'
                  position='relative'
                  sx={{ height: '100%' }}
                  onChange={handleToggleChange}
                >
                  <ToggleButton name='showDistrict' sx={{ width: '50%', height: '100%' }} value='sim'>Sim</ToggleButton>
                  <ToggleButton name='showDistrict' sx={{ width: '50%', height: '100%' }} value='não'>Não</ToggleButton>
                </ToggleButtonGroup>
              </FormControl>

              <FormControl>
                <Box component='label' fontWeight='bold' mb={1}>Mostrar número e complemento no site?</Box>
                <ToggleButtonGroup
                  name='showNumberComplement'
                  value={toggle.showNumberComplement}
                  exclusive
                  color='primary'
                  position='relative'
                  sx={{ height: '100%' }}
                  onChange={handleToggleChange}
                >
                  <ToggleButton name='showNumberComplement' sx={{ width: '50%', height: '100%' }} value='sim'>Sim</ToggleButton>
                  <ToggleButton name='showNumberComplement' sx={{ width: '50%', height: '100%' }} value='não'>Não</ToggleButton>
                </ToggleButtonGroup>
              </FormControl>

              <FormControl>
                <Box component='label' fontWeight='bold' mb={1}>Mostrar nome do condomínio no site?</Box>
                <ToggleButtonGroup
                  name='showCondoName'
                  value={toggle.showCondoName}
                  exclusive
                  color='primary'
                  position='relative'
                  sx={{ height: '100%' }}
                  onChange={handleToggleChange}
                >
                  <ToggleButton name='showCondoName' sx={{ width: '50%', height: '100%' }} value='sim'>Sim</ToggleButton>
                  <ToggleButton name='showCondoName' sx={{ width: '50%', height: '100%' }} value='não'>Não</ToggleButton>
                </ToggleButtonGroup>
              </FormControl>

              <FormControl>
                <Box component='label' fontWeight='bold' mb={1}>Mostrar mapa no site?</Box>
                <ToggleButtonGroup
                  name='showMap'
                  value={toggle.showMap}
                  exclusive
                  color='primary'
                  position='relative'
                  sx={{ height: '100%' }}
                  onChange={handleToggleChange}
                >
                  <ToggleButton name='showMap' sx={{ width: '50%', height: '100%' }} value='sim'>Sim</ToggleButton>
                  <ToggleButton name='showMap' sx={{ width: '50%', height: '100%' }} value='não'>Não</ToggleButton>
                </ToggleButtonGroup>
              </FormControl>

              <FormControl>
                <Box component='label' fontWeight='bold' mb={1}>Mostrar localização exata no mapa?</Box>
                <ToggleButtonGroup
                  name='showExactLocation'
                  value={toggle.showExactLocation}
                  exclusive
                  color='primary'
                  position='relative'
                  sx={{ height: '100%' }}
                  onChange={handleToggleChange}
                >
                  <ToggleButton name='showExactLocation' sx={{ width: '50%', height: '100%' }} value='sim'>Sim</ToggleButton>
                  <ToggleButton name='showExactLocation' sx={{ width: '50%', height: '100%' }} value='não'>Não</ToggleButton>
                </ToggleButtonGroup>
              </FormControl>

              <FormControl>
                <Box component='label' fontWeight='bold' mb={1}>Mostrar andar do apartamento no site?</Box>
                <ToggleButtonGroup
                  name='showApartamentFloor'
                  value={toggle.showApartamentFloor}
                  exclusive
                  color='primary'
                  position='relative'
                  sx={{ height: '100%' }}
                  onChange={handleToggleChange}
                >
                  <ToggleButton name='showApartamentFloor' sx={{ width: '50%', height: '100%' }} value='sim'>Sim</ToggleButton>
                  <ToggleButton name='showApartamentFloor' sx={{ width: '50%', height: '100%' }} value='não'>Não</ToggleButton>
                </ToggleButtonGroup>
              </FormControl>

              <FormControl>
                <Box component='label' fontWeight='bold' mb={1}>Mostrar número do apartamento no site?</Box>
                <ToggleButtonGroup
                  name='showApartamentNumber'
                  value={toggle.showApartamentNumber}
                  exclusive
                  color='primary'
                  position='relative'
                  sx={{ height: '100%' }}
                  onChange={handleToggleChange}
                >
                  <ToggleButton name='showApartamentNumber' sx={{ width: '50%', height: '100%' }} value='sim'>Sim</ToggleButton>
                  <ToggleButton name='showApartamentNumber' sx={{ width: '50%', height: '100%' }} value='não'>Não</ToggleButton>
                </ToggleButtonGroup>
              </FormControl>
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