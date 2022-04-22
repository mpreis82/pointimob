import { useState } from "react"
import { Box } from "@mui/system"
import { FormControl, TextField, ToggleButtonGroup, ToggleButton } from "@mui/material"

import AsideNav from "../../../../components/AsideNav"
import ImoveisAsideNav from '../../../../components/imoveis/aside/AsideNav'
import Main from "../../../../components/imoveis/main/Main"
import Form from "../../../../components/imoveis/Form"

export default function Comodos() {
  const [state, setState] = useState({
    bedroom: '',
    suite: '',
    bathroom: '',
    garage: '',
    covered_garage: '',
    tvroom: '',
    diningroom: '',
    livingroom: '',
    washbasin: '',
    service_area: '',
    kitchen: '',
    closet: '',
    office: '',
    employeeDependency: '',
    pantry: ''
  })

  const [coveredGarage, setCoveredGarage] = useState()

  function handleChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleCoveredGarage = (event, newValue) => {
    setCoveredGarage(newValue);
  };

  function handleSubmit(event) {
    event.preventDefault();
    alert('comodos')
  }

  return (
    <Box display='flex' height='calc(100% - 45px)' bgcolor='silver' overflow='hidden'>
      <AsideNav>
        <ImoveisAsideNav />
      </AsideNav>

      <Main title='Comodos'>
        <Form handleSubmit={handleSubmit}>
          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Dormitórios</Box>
            <TextField type='number' name="bedroom" value={state.bedroom} onChange={handleChange} helperText='' />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Sendo suíte</Box>
            <TextField type='number' name="suite" value={state.suite} onChange={handleChange} helperText='' />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Banheiro</Box>
            <TextField type='number' name="bathroom" value={state.bathroom} onChange={handleChange} helperText='' />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Garagem</Box>
            <TextField type='number' name="garage" value={state.garage} onChange={handleChange} helperText='' />
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

          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Sala de TV</Box>
            <TextField type='number' name="tvroom" value={state.tvroom} onChange={handleChange} helperText='' />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Sala de jantar</Box>
            <TextField type='number' name="diningroom" value={state.diningroom} onChange={handleChange} helperText='' />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Sala de estar</Box>
            <TextField type='number' name="livingroom" value={state.livingroom} onChange={handleChange} helperText='' />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Lavabo</Box>
            <TextField type='number' name="washbasin" value={state.washbasin} onChange={handleChange} helperText='' />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Área de serviço</Box>
            <TextField type='number' name="service_area" value={state.service_area} onChange={handleChange} helperText='' />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Cozinha</Box>
            <TextField type='number' name="kitchen" value={state.kitchen} onChange={handleChange} helperText='' />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Closet</Box>
            <TextField type='number' name="closet" value={state.closet} onChange={handleChange} helperText='' />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Escritório</Box>
            <TextField type='number' name="office" value={state.office} onChange={handleChange} helperText='' />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Dependência para empregada</Box>
            <TextField type='number' name="employeeDependency" value={state.employeeDependency} onChange={handleChange} helperText='' />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Copa</Box>
            <TextField type='number' name="pantry" value={state.pantry} onChange={handleChange} helperText='' />
          </FormControl>

        </Form>
      </Main>
    </Box >
  )
}