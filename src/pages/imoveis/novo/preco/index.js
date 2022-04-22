import { useState } from 'react'
import { Box } from "@mui/system"
import { FormControl, TextField, InputAdornment, Select, MenuItem, ToggleButtonGroup, ToggleButton } from "@mui/material"
import AsideNav from "../../../../components/AsideNav"
import ImoveisAsideNav from '../../../../components/imoveis/aside/AsideNav'
import Main from "../../../../components/imoveis/main/Main"
import Form from "../../../../components/imoveis/Form"

export default function Preco() {
  const [state, setState] = useState({
    transaction: '',
    price: '',
    price_alternative_text: '',
    territorial_tax_price: '',
    condominium_price: '',
  })

  const [price_show, setPriceShow] = useState('sim')
  const [territorial_tax_type, setTerritorialTaxType] = useState()
  const [has_finance, setHasFinance] = useState()
  const [is_financeable, setIsFinanceable] = useState()
  const [is_exchangeable, setIsExchangeable] = useState()

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

  function handleSubmit(event) {
    event.preventDefault();
    alert('preco')
  }

  return (
    <Box display='flex' height='calc(100% - 45px)' bgcolor='silver' overflow='hidden'>
      <AsideNav>
        <ImoveisAsideNav />
      </AsideNav>

      <Main title='Preço'>
        <Form handleSubmit={handleSubmit}>
          <FormControl>
            <Box component='label' fontWeight='bold' mb={1}>Perfil do imóvel</Box>
            <Select name="transaction" value={state.transaction} onChange={handleChange} placeholder='Venda ou aluguel'>
              <MenuItem value={'Venda'}>Venda</MenuItem>
              <MenuItem value={'Venda'}>Aluguel</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Valor do Imóvel</Box>
            <TextField type='number' name="price" value={state.price} onChange={handleChange} helperText='' InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }} />
          </FormControl>

          <FormControl>
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Mostrar valor no site?</Box>
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

          <FormControl variant="outlined" sx={{ display: (price_show == 'não' ? 'flex' : 'none') }}>
            <Box component='label' fontWeight='bold' mb={1}>Mostrar no lugar do preço:</Box>
            <TextField name="price_alternative_text" value={state.price_alternative_text} onChange={handleChange} helperText='' disabled={price_show == 'sim'} />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Valor do IPTU</Box>
            <TextField type='number' name="territorial_tax_price" value={state.territorial_tax_price} onChange={handleChange} helperText='' InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }} placeholder='100,00' />
          </FormControl>

          <FormControl>
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Período da tarifa do IPTU</Box>
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

          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Valor Condomínio</Box>
            <TextField type='number' name="condominium_price" value={state.condominium_price} onChange={handleChange} helperText='' InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }} />
          </FormControl>

          <FormControl>
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Está financiado?</Box>
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
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Aceita financiamento?</Box>
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
            <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Aceita permuta?</Box>
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
      </Main>
    </Box >
  )
}