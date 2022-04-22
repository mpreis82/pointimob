import { useState } from "react"
import { Box } from "@mui/system"
import { Select, ToggleButtonGroup, ToggleButton, MenuItem, FormControl, TextField } from '@mui/material';
import AsideNav from "../../../../components/AsideNav"
import ImoveisAsideNav from '../../../../components/imoveis/aside/AsideNav'
import Main from "../../../../components/imoveis/main/Main"
import Form from "../../../../components/imoveis/Form"
import SubtypeSelector from "../../../../components/SubtypeSelector";

export default function ImoveisNovoInformacoes() {
  const [state, setState] = useState({
    id: '101',
    people: '',
    user: '',
    subtype: '0',
    profile: '',
    situation: '',
    lifetime: '',
    incorporation: '',
    near_sea: '',
    floor: '',
  })

  const [mobiliado, setMobiliado] = useState('não')

  function handleChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    alert('informacoes iniciais')
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
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Código de referência</Box>
            <TextField name="id" value={state.id} onChange={handleChange} helperText='' disabled />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Proprietario</Box>
            <TextField name="people" value={state.people} onChange={handleChange} helperText='' />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Corretor/Agenciador</Box>
            <TextField name="user" value={state.user} onChange={handleChange} helperText='' />
          </FormControl>

          <SubtypeSelector value={state.subtype} setValue={handleChange} />

          <FormControl>
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Perfil do imóvel</Box>
            <Select name="profile" value={state.profile} onChange={handleChange}>
              <MenuItem value={'Residencial'}>Residencial</MenuItem>
              <MenuItem value={'Comercial'}>Comercial</MenuItem>
              <MenuItem value={'Residencial/Comercial'}>Residencial/Comercial</MenuItem>
              <MenuItem value={'Industrial'}>Industrial</MenuItem>
              <MenuItem value={'Rural'}>Rural</MenuItem>
              <MenuItem value={'Temporada'}>Temporada</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Situação</Box>
            <Select name="situation" value={state.situation} onChange={handleChange}>
              <MenuItem value={'Breve lançamento'}>Breve lançamento</MenuItem>
              <MenuItem value={'Em construção'}>Em construção</MenuItem>
              <MenuItem value={'Indefinido'}>Indefinido</MenuItem>
              <MenuItem value={'Lançamento'}>Lançamento</MenuItem>
              <MenuItem value={'Na plata'}>Na plata</MenuItem>
              <MenuItem value={'Pronto para morar'}>Pronto para morar</MenuItem>
              <MenuItem value={'Reformado'}>Reformado</MenuItem>
              <MenuItem value={'Semi-novo'}>Semi-novo</MenuItem>
              <MenuItem value={'Usado'}>Usado</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Ano da construção</Box>
            <TextField type='number' name="lifetime" value={state.lifetime} onChange={handleChange} helperText='' InputProps={{ inputProps: { min: 1900, max: new Date().getFullYear() } }} />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Incorporação</Box>
            <TextField name="incorporation" value={state.incorporation} onChange={handleChange} helperText='' />
          </FormControl>

          <FormControl>
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Próximo ao mar?</Box>
            <Select name="near_sea" value={state.near_sea} onChange={handleChange}>
              <MenuItem value={'Frente pro mar'}>Frente pro mar</MenuItem>
              <MenuItem value={'Quadra do mar'}>Quadra do mar</MenuItem>
              <MenuItem value={'Próximo ao mar'}>Próximo ao mar</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" sx={{
            display: ((Number(state.subtype) > 0 && Number(state.subtype) < 16) ? 'flex' : 'none')
          }}>
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Andar</Box>
            <TextField name="floor" value={state.floor} onChange={handleChange} helperText='' />
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
      </Main>
    </Box >
  )
}
