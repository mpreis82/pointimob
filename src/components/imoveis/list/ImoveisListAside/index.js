import { createRef, useEffect, useState } from 'react'
import { Box } from "@mui/system"
import { Autocomplete, Button, FormControl, InputAdornment, MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material"

import SelectPropertyTypes from '../../../SelectPropertyTypes'
import { grey } from "@mui/material/colors"

const ufList = ['Todos', 'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO',]
const cityList = ['Todas']

export default function ImoveisListAside() {
  const asideFilterBoxRef = createRef()
  const [positionButtons, setPositionButtons] = useState('sticky')

  useEffect(() => {

  }, [])

  useEffect(() => {
    const asideEl = asideFilterBoxRef.current.parentNode

    if (asideEl.scrollHeight <= asideEl.offsetHeight) {
      setPositionButtons('absolute')
    } else {
      setPositionButtons('sticky')
    }

    if (asideFilterBoxRef.current != null) {
      function asideButtonsPosition() {
        if (asideFilterBoxRef.current) {
          if (asideEl.scrollHeight <= asideEl.offsetHeight) {
            setPositionButtons('absolute')
          } else {
            setPositionButtons('sticky')
          }
        }
      }
      window.removeEventListener('resize', asideButtonsPosition, true)
      window.addEventListener('resize', asideButtonsPosition, true)
    }
  }, [asideFilterBoxRef])

  return (
    <>
      <Box padding={2} ref={asideFilterBoxRef}>
        <Box fontWeight='bold' mb={2}>FILTROS:</Box>

        <SelectPropertyTypes size='small' />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <Box component='label' fontWeight='bold' mb={1}>Tipo de transação</Box>
          <ToggleButtonGroup
            name='showStreet'
            id='showStreet'
            value={'venda'}
            exclusive
            color='primary'
            position='relative'
            sx={{ height: '100%' }}
          // onChange={handleToggleChange}
          >
            <ToggleButton name='showStreet' size="small" sx={{ width: '50%', height: '100%' }} value='venda'>Venda</ToggleButton>
            <ToggleButton name='showStreet' size="small" sx={{ width: '50%', height: '100%' }} value='alugue'>Aluguel</ToggleButton>
          </ToggleButtonGroup>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }} size='small'>
          <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Perfil do imóvel</Box>
          <Select name="profile" value={''}>
            <MenuItem value={'Residencial'}>Residencial</MenuItem>
            <MenuItem value={'Comercial'}>Comercial</MenuItem>
            <MenuItem value={'Residencial/Comercial'}>Residencial/Comercial</MenuItem>
            <MenuItem value={'Industrial'}>Industrial</MenuItem>
            <MenuItem value={'Rural'}>Rural</MenuItem>
            <MenuItem value={'Temporada'}>Temporada</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} size='small'>
          <Box component='label' fontWeight='bold' mb={1}>Valor do Imóvel</Box>
          <Box display='flex' flexDirection='row'>
            <TextField type='number' name="price" value={100} sx={{ mr: 1 }} size='small' InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }} />
            <TextField type='number' name="price" value={100} size='small' InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }} />
          </Box>
        </FormControl>

        <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} size='small'>
          <Box component='label' fontWeight='bold' mb={1}>Estado</Box>
          <Autocomplete
            value={'Todos'}
            name='uf'
            size='small'
            // onChange={(event, newValue) => handleUfChange(event, newValue)}
            options={ufList}
            renderInput={(params) => <TextField {...params} />}
          />
        </FormControl>

        <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
          <Box component='label' fontWeight='bold' mb={1}>Cidade</Box>
          <Autocomplete
            value={'Todas'}
            name='city'
            size="small"
            // onChange={(event, newValue) => handleAutocompleteChange('city', newValue)}
            // isOptionEqualToValue={(option, value) => option.id === value.id}
            options={cityList}
            renderInput={(params) => <TextField {...params} />}
          />
        </FormControl>
      </Box>

      <Box width='100%' position={positionButtons} bottom='0' bgcolor={grey[300]} zIndex='99' display='grid' gridTemplateColumns='1fr 1fr' gap={1} p={1}>
        <Button variant='outlined' color='primary' fullWidth>Limpar</Button>
        <Button variant='contained' color='primary' fullWidth>Filtrar</Button>
      </Box>
    </>
  )
}