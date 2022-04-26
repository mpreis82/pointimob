import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { doc, updateDoc } from 'firebase/firestore'

import { Box } from "@mui/system"
import { FormControl, FormGroup, FormControlLabel, ToggleButtonGroup, ToggleButton, TextField, Checkbox } from '@mui/material'

import AsideNav from "../../../../components/AsideNav"
import ImoveisAsideNav from '../../../../components/imoveis/aside/AsideNav'
import Main from "../../../../components/imoveis/main/Main"
import Form from "../../../../components/imoveis/Form"

import { Firestore } from '../../../../Firebase'

export default function Condominio() {
  const [condoCharact, setCondoCharact] = useState({
    'Academia de ginástica': false,
    'Área verde preservada': false,
    'Brinquedoteca': false,
    'Campo de futebol gramado': false,
    'Cerca elétrica': false,
    'Churrasqueira': false,
    'Cinema': false,
    'Elevador de serviço': false,
    'Elevador social': false,
    'Interfone': false,
    'Jacuzzi': false,
    'Lago': false,
    'Lan house': false,
    'Lanchonete': false,
    'Piscina adulto': false,
    'Piscina infantil': false,
    'Pista de caminhada': false,
    'Playground': false,
    'Portão Elétrico': false,
    'Portaria 24 horas': false,
    'Porteiro eletrônico': false,
    'Quadra de areia': false,
    'Quadra de tênis': false,
    'Quadra poliesportiva': false,
    'Ronda motorizada': false,
    'Sala de jogos': false,
    'Salão de festas': false,
    'Salão de festas infantil': false,
    'Sauna': false,
  })
  const [condoCharactChecked, setCondoCharactChecked] = useState()
  const [condominiumName, setCondominiumName] = useState('')
  const [isCondo, setIsCondo] = useState('')

  const router = useRouter()

  router.prefetch('/imoveis/novo/localizacao')

  const handleIsCondo = (event, newValue) => {
    setIsCondo(newValue);
  };

  function handleCondoCharactChange(event) {
    const checked = { ...condoCharactChecked, [event.target.name]: event.currentTarget.checked }
    Object.keys(checked).map(key => {
      (checked[key] == false && delete checked[key])
    })
    setCondoCharactChecked(checked)
    setCondoCharact({ ...condoCharact, [event.currentTarget.name]: event.currentTarget.checked })
  }

  function handleSubmit(event) {
    event.preventDefault();

    const ref = doc(Firestore, 'initial_informations', localStorage.getItem('new_property_id'))

    updateDoc(ref, {
      condominium: {
        condominiumCharact: condoCharact,
        condominiumName: condominiumName,
        inCondominium: isCondo
      }
    })

    router.push('/imoveis/novo/localizacao')
  }

  return (
    <Box display='flex' height='calc(100% - 45px)' bgcolor='silver' overflow='hidden'>
      <AsideNav>
        <ImoveisAsideNav />
      </AsideNav>

      <Main title='Características do condomínio '>
        <Form handleSubmit={handleSubmit} gridTemplateColumnsCustom='1fr'>
          <Box display='grid' gridTemplateColumns='1fr 2fr' gap='1rem'>
            <FormControl>
              <Box component='label' fontWeight='bold' mb={1}>Em condomínio?</Box>
              <ToggleButtonGroup
                name='isCondo'
                value={isCondo}
                exclusive
                color='primary'
                position='relative'
                sx={{ height: '100%' }}
                onChange={handleIsCondo}
              >
                <ToggleButton sx={{ width: '50%', height: '100%' }} value='sim'>Sim</ToggleButton>
                <ToggleButton sx={{ width: '50%', height: '100%' }} value='não'>Não</ToggleButton>
              </ToggleButtonGroup>
            </FormControl>

            <FormControl variant="outlined" sx={{ opacity: (isCondo == 'sim' ? '100' : '0') }}>
              <Box component='label' fontWeight='bold' mb={1}>Nome do condomínio:</Box>
              <TextField value={condominiumName} onChange={event => setCondominiumName(event.target.value)} helperText='' />
            </FormControl>
          </Box>

          <Box>
            <FormGroup position='relative' display='block' width='100%'>
              <Box position='relative' display='block' width='100%' sx={{ columnCount: 3 }}>
                {Object.keys(condoCharact).map((key, index) => (
                  <Box key={index}>
                    <FormControlLabel
                      name={key}
                      control={<Checkbox />}
                      label={key}
                      display='block'
                      width='100%'
                      onChange={handleCondoCharactChange}
                    />
                  </Box>
                ))}
              </Box>
            </FormGroup>
          </Box>
        </Form>
      </Main>
    </Box >
  )
}