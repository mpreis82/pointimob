import { useState } from "react"
import { Box } from "@mui/system"
import { FormControl, FormGroup, FormControlLabel, ToggleButtonGroup, ToggleButton, TextField, Checkbox, Autocomplete } from '@mui/material'
import AsideNav from "../../../../components/AsideNav"
import ImoveisAsideNav from '../../../../components/imoveis/aside/AsideNav'
import Main from "../../../../components/imoveis/main/Main"
import Form from "../../../../components/imoveis/Form"

export default function Localizacao() {
  const [toggle, setToggle] = useState({
    showStreet: '',
    showDistrict: '',
    showNumberComplement: '',
    showCondoName: '',
    showMap: '',
    showExactLocation: '',
    showApartamentFloor: '',
    showApartamentNumber: '',
  })

  const handleToggleChange = (event, newValue) => {
    setToggle({ ...toggle, [event.target.name]: newValue })
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log('localização')
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
              <TextField value={''} helperText='' />
            </FormControl>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: '1fr 1fr',
                lg: '1fr 1fr 1fr'
              },
              gap: '1rem'
            }}
          >
            <FormControl variant="outlined" >
              <Box component='label' fontWeight='bold' mb={1}>Estado</Box>
              <Autocomplete
                options={['São Paulo', 'Rio de Janeiro', 'Rio Grande do Sul', 'Santa Catarina']}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>

            <FormControl variant="outlined" >
              <Box component='label' fontWeight='bold' mb={1}>Cidade</Box>
              <Autocomplete
                options={['São Paulo', 'Rio de Janeiro', 'Porto Alegre', 'Florianópolis']}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>

            <FormControl variant="outlined" >
              <Box component='label' fontWeight='bold' mb={1}>Bairro</Box>
              <Autocomplete
                options={['São Paulo', 'Rio de Janeiro', 'Porto Alegre', 'Florianópolis']}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>

            <FormControl variant="outlined" >
              <Box component='label' fontWeight='bold' mb={1}>Logradouro</Box>
              <TextField value={''} helperText='' />
            </FormControl>

            <FormControl variant="outlined" >
              <Box component='label' fontWeight='bold' mb={1}>Número</Box>
              <TextField value={''} helperText='' />
            </FormControl>

            <FormControl variant="outlined" >
              <Box component='label' fontWeight='bold' mb={1}>Complemento</Box>
              <TextField value={''} helperText='' />
            </FormControl>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' },
              gap: '1rem'
            }}
          >
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