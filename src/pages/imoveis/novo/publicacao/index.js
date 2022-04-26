import { useState } from 'react'
import { doc, updateDoc, Timestamp } from 'firebase/firestore'

import { Box } from "@mui/system"
import { FormControl, ToggleButtonGroup, ToggleButton } from '@mui/material'
import AsideNav from "../../../../components/AsideNav"
import ImoveisAsideNav from '../../../../components/imoveis/aside/AsideNav'
import Main from "../../../../components/imoveis/main/Main"
import Form from "../../../../components/imoveis/Form"

import { Firestore } from '../../../../Firebase'

export default function Publicacao() {
  const [state, setState] = useState({
    show_property: 'sim',
    is_highlighted: 'não',

  })

  const handleToggleChange = (target, newValue) => {
    setState({ ...state, [target]: newValue })
  }

  function handleSubmit(event) {
    event.preventDefault()

    console.log('publish')

    const ref = doc(Firestore, 'initial_informations', localStorage.getItem('new_property_id'))

    updateDoc(ref, {
      publish: {
        show_property: state.show_property,
        is_highlighted: state.is_highlighted,
        created_date: Timestamp.fromDate(new Date())
      }
    })
  }

  return (
    <Box display='flex' height='calc(100% - 45px)' bgcolor='silver' overflow='hidden'>
      <AsideNav>
        <ImoveisAsideNav />
      </AsideNav>

      <Main title='Publicação'>
        <Form handleSubmit={handleSubmit} gridTemplateColumnsCustom='1fr'>
          <FormControl variant="outlined" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Box component='p' fontWeight='bold' display='block'>Mostrar imovél no site?</Box>
              <Box component='p' display='block'>Determine se o imóvel será publicado em seu site.</Box>
            </Box>
            <ToggleButtonGroup
              value={state.show_property}
              exclusive
              color='primary'
              height='100%'
              position='relative'
              onChange={handleToggleChange}
            >
              <ToggleButton sx={{ width: 100 }} value='sim'>Sim</ToggleButton>
              <ToggleButton sx={{ width: 100 }} value='não'>Não</ToggleButton>
            </ToggleButtonGroup>
          </FormControl>

          <hr />

          <FormControl variant="outlined" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Box component='p' fontWeight='bold' display='block'>Destaque</Box>
              <Box component='p' display='block'>Defina se esse imóvel aparecerá na sessão de “imóveis em destaque” na página inicial do seu site.</Box>
            </Box>

            <ToggleButtonGroup
              value={state.is_highlighted}
              exclusive
              color='primary'
              height='100%'
              position='relative'
              onChange={handleToggleChange}
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
