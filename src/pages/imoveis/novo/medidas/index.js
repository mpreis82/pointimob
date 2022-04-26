import { useState } from 'react'
import { useRouter } from 'next/router'
import { doc, updateDoc } from 'firebase/firestore'

import { Box } from "@mui/system"
import { FormControl, TextField, InputAdornment } from "@mui/material"

import AsideNav from "../../../../components/AsideNav"
import ImoveisAsideNav from '../../../../components/imoveis/aside/AsideNav'
import Main from "../../../../components/imoveis/main/Main"
import Form from "../../../../components/imoveis/Form"

import { Firestore } from '../../../../Firebase'

export default function Medidas() {
  const [state, setState] = useState({
    built_area: '',
    private_area: '',
    total_area: '',
    front_ground: '',
    right_ground: '',
    left_ground: '',
    back_ground: '',
  })

  const router = useRouter()

  router.prefetch('/imoveis/novo/preco')

  function handleChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  function handleSubmit(event) {
    event.preventDefault();

    const ref = doc(Firestore, 'initial_informations', localStorage.getItem('new_property_id'))

    updateDoc(ref, {
      measures: {
        built_area: state.built_area,
        private_area: state.private_area,
        total_area: state.total_area,
        front_ground: state.front_ground,
        right_ground: state.right_ground,
        left_ground: state.left_ground,
        back_ground: state.back_ground,
      }
    })

    router.push('/imoveis/novo/preco')
  }

  return (
    <Box display='flex' height='calc(100% - 45px)' bgcolor='silver' overflow='hidden'>
      <AsideNav>
        <ImoveisAsideNav />
      </AsideNav>

      <Main title='Medidas'>
        <Form handleSubmit={handleSubmit}>
          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Área construída</Box>
            <TextField
              type='number'
              name="built_area"
              value={state.built_area}
              onChange={handleChange}
              helperText=''
              InputProps={{ endAdornment: <InputAdornment position="end">m²</InputAdornment> }}
            />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Área privada</Box>
            <TextField type='number' name="private_area" value={state.private_area} onChange={handleChange} helperText='' InputProps={{ endAdornment: <InputAdornment position="end">m²</InputAdornment> }} />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Terreno área total</Box>
            <TextField type='number' name="total_area" value={state.total_area} onChange={handleChange} helperText='' InputProps={{ endAdornment: <InputAdornment position="end">m²</InputAdornment> }} />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Terreno frente</Box>
            <TextField type='number' name="front_ground" value={state.front_ground} onChange={handleChange} helperText='' InputProps={{ endAdornment: <InputAdornment position="end">m²</InputAdornment> }} />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Terreno direita</Box>
            <TextField type='number' name="right_ground" value={state.right_ground} onChange={handleChange} helperText='' InputProps={{ endAdornment: <InputAdornment position="end">m²</InputAdornment> }} />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Terreno esquerda</Box>
            <TextField type='number' name="left_ground" value={state.left_ground} onChange={handleChange} helperText='' InputProps={{ endAdornment: <InputAdornment position="end">m²</InputAdornment> }} />
          </FormControl>

          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Terreno fundo</Box>
            <TextField type='number' name="back_ground" value={state.back_ground} onChange={handleChange} helperText='' InputProps={{ endAdornment: <InputAdornment position="end">m²</InputAdornment> }} />
          </FormControl>
        </Form>
      </Main>

    </Box >
  )
}