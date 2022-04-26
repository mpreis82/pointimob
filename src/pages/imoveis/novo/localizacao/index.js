import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import { doc, updateDoc } from 'firebase/firestore'

import { Box } from "@mui/system"
import { FormControl, ToggleButtonGroup, ToggleButton, TextField, Checkbox, Autocomplete } from '@mui/material'

import AsideNav from "../../../../components/AsideNav"
import ImoveisAsideNav from '../../../../components/imoveis/aside/AsideNav'
import Main from "../../../../components/imoveis/main/Main"
import Form from "../../../../components/imoveis/Form"

import { Firestore } from '../../../../Firebase'

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

  const handleToggleChange = (event, newValue) => {
    setToggle({ ...toggle, [event.target.name]: newValue })
  }

  const router = useRouter()

  async function handleZipcodeChange(event) {
    setZipcode(event.target.value)

    if (event.target.value.length == 8) {
      const result = await fetch(`https://brasilapi.com.br/api/cep/v2/${event.target.value}`)

      if (result.status == 200) {
        const data = await result.json()
        setState({
          ...state,
          uf: data.state,
          city: data.city,
          street: data.street,
          district: data.neighborhood,
        })
      }
    }
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

  function handleSubmit(event) {
    event.preventDefault()

    const ref = doc(Firestore, 'initial_informations', localStorage.getItem('new_property_id'))

    updateDoc(ref, {
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
      }
    })

    router.push('/imoveis/novo/proximidades')
  }

  return (
    <Box display='flex' height='calc(100% - 45px)' bgcolor='silver' overflow='hidden'>
      <AsideNav>
        <ImoveisAsideNav />
      </AsideNav>

      <Main title='Localização'>
        <Form handleSubmit={handleSubmit} gridTemplateColumnsCustom='1fr'>
          <Box>
            <FormControl variant="outlined" >
              <Box component='label' fontWeight='bold' mb={1}>CEP</Box>
              <TextField value={zipcode} onChange={handleZipcodeChange} helperText='' />
            </FormControl>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }, gap: '1rem' }}>
            <FormControl variant="outlined" >
              <Box component='label' fontWeight='bold' mb={1}>Estado</Box>
              <Autocomplete
                value={state.uf}
                name='uf'
                onChange={(event, newValue) => handleUfChange(event, newValue)}
                options={ufList}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>

            <FormControl variant="outlined" >
              <Box component='label' fontWeight='bold' mb={1}>Cidade</Box>
              <Autocomplete
                value={state.city}
                name='city'
                onChange={(event, newValue) => handleAutocompleteChange('city', newValue)}
                options={cityList}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>

            <FormControl variant="outlined" >
              <Box component='label' fontWeight='bold' mb={1}>Bairro</Box>
              <TextField name='district' value={state.district} onChange={handleStateChange} helperText='' />
            </FormControl>

            <FormControl variant="outlined" >
              <Box component='label' fontWeight='bold' mb={1}>Logradouro</Box>
              <TextField name='street' value={state.street} helperText='' onChange={handleStateChange} />
            </FormControl>

            <FormControl variant="outlined" >
              <Box component='label' fontWeight='bold' mb={1}>Número</Box>
              <TextField name='number' value={state.number} helperText='' onChange={handleStateChange} />
            </FormControl>

            <FormControl variant="outlined" >
              <Box component='label' fontWeight='bold' mb={1}>Complemento</Box>
              <TextField name='complement' value={state.complement} helperText='' onChange={handleStateChange} />
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
      </Main>
    </Box >
  )
}