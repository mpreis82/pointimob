import { useState } from "react"
import { Box } from "@mui/system"
import { Select, ToggleButtonGroup, ToggleButton, MenuItem, FormControl, TextField } from '@mui/material';
import AsideNav from "../../../../components/AsideNav"
import ImoveisAsideNav from '../../../../components/imoveis/aside/AsideNav'
import Main from "../../../../components/imoveis/main/Main"
import Form from "../../../../components/imoveis/Form"

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

          <FormControl>
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Tipo/Subtipo</Box>
            <Select native name="subtype" value={state.subtype} onChange={handleChange}>
              <option aria-label="None" value={'0'} />
              <optgroup label="Apartamento">
                <option value={'1'}>Alto Padrão</option>
                <option value={'2'}>Cobertura</option>
                <option value={'3'}>Cobertura Duplex</option>
                <option value={'4'}>Cobertura Triplex</option>
                <option value={'5'}>Duplex</option>
                <option value={'6'}>Flat</option>
                <option value={'7'}>Garden</option>
                <option value={'8'}>Loft</option>
                <option value={'9'}>Padrão</option>
                <option value={'10'}>Penthouse</option>
                <option value={'11'}>Kitnet</option>
                <option value={'12'}>Térreo</option>
                <option value={'13'}>Triplex</option>
                <option value={'14'}>Conjugado</option>
                <option value={'15'}>Cobertura Linear</option>
              </optgroup>
              <optgroup label="Casa">
                <option value={'16'}>Alto Padrão</option>
                <option value={'17'}>Alvenaria</option>
                <option value={'18'}>Em condomínio</option>
                <option value={'19'}>Germinada</option>
                <option value={'20'}>Linear</option>
                <option value={'21'}>Madeira</option>
                <option value={'22'}>Mista</option>
                <option value={'23'}>Padrão</option>
                <option value={'24'}>Kitnet</option>
                <option value={'25'}>Sobrado</option>
                <option value={'26'}>Sobreposta</option>
                <option value={'27'}>Térrea</option>
                <option value={'28'}>Triplex</option>
                <option value={'29'}>Vila</option>
                <option value={'30'}>Pré-moldada</option>
                <option value={'31'}>Sobreloja</option>
                <option value={'32'}>Chalé</option>
              </optgroup>
              <optgroup label="Terreno">
                <option value={'33'}>Em condomínio</option>
                <option value={'34'}>Lote</option>
                <option value={'35'}>Tereno</option>
                <option value={'36'}>Em loteamento</option>
              </optgroup>
              <optgroup label="Sítio">
                <option value={'37'}>Sítio</option>
                <option value={'38'}>Haras</option>
              </optgroup>
              <optgroup label="Garagem">
                <option value={'39'}>Garagem externa</option>
                <option value={'40'}>Garagem externa coberta</option>
                <option value={'41'}>Garagem interna</option>
              </optgroup>
              <optgroup label="Fazenda">
                <option value={'42'}>Fazenda</option>
                <option value={'43'}>Haras</option>
                <option value={'44'}>Pecuária</option>
                <option value={'45'}>Lavoura</option>
                <option value={'46'}>Mista</option>
              </optgroup>
              <optgroup label="Chácara">
                <option value={'47'}>Chácara</option>
              </optgroup>
              <optgroup label="Rancho">
                <option value={'48'}>Rancho</option>
              </optgroup>
              <optgroup label="Pousada">
                <option value={'49'}>Pousada</option>
              </optgroup>
              <optgroup label="Sala">
                <option value={'50'}>Andar comercial</option>
                <option value={'51'}>Comercial</option>
              </optgroup>
              <optgroup label="Loja">
                <option value={'52'}>Loja</option>
                <option value={'53'}>Ponto comercial</option>
              </optgroup>
              <optgroup label="Flat">
                <option value={'54'}>Flat</option>
              </optgroup>
              <optgroup label="Sobrado">
                <option value={'55'}>Alto padrão</option>
                <option value={'56'}>Em condomínio</option>
                <option value={'57'}>Germinado</option>
                <option value={'58'}>Padrão</option>
              </optgroup>
              <optgroup label="Prédio">
                <option value={'59'}>Comercial</option>
                <option value={'60'}>Residêncial</option>
              </optgroup>
              <optgroup label="Indústria">
                <option value={'61'}>Indústria</option>
              </optgroup>
              <optgroup label="Pavilhão/Galpão">
                <option value={'62'}>Industrial</option>
                <option value={'63'}>Salão comercial</option>
              </optgroup>
              <optgroup label="Área">
                <option value={'64'}>Comercial</option>
                <option value={'65'}>Industrial</option>
                <option value={'66'}>Residêncial</option>
                <option value={'67'}>Residêncial/Comercial</option>
                <option value={'68'}>Rural</option>
                <option value={'69'}>Reflorestamento</option>
              </optgroup>
              <optgroup label="Ponto comercial">
                <option value={'70'}>Andar comercial</option>
                <option value={'71'}>Coméricio</option>
                <option value={'72'}>Indústria</option>
              </optgroup>
              <optgroup label="Sala comercial">
                <option value={'73'}>Andar comercial</option>
                <option value={'74'}>Duplex</option>
                <option value={'75'}>Em edifício</option>
                <option value={'76'}>Nível de rua</option>
                <option value={'77'}>Sobreposta</option>
                <option value={'78'}>Térreo</option>
              </optgroup>
              <optgroup label="Salão comercial">
                <option value={'79'}>Salão comercial</option>
              </optgroup>
            </Select>
          </FormControl>

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
              <MenuItem value={'Quadra do mar'}>Quadra do mar</MenuI
              tem>
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
