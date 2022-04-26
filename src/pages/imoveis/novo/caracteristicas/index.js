import { useState } from 'react'
import { useRouter } from 'next/router'
import { doc, updateDoc } from 'firebase/firestore'

import { Box } from "@mui/system"
import { FormControlLabel, Checkbox, FormGroup } from "@mui/material"

import AsideNav from "../../../../components/AsideNav"
import ImoveisAsideNav from '../../../../components/imoveis/aside/AsideNav'
import Main from "../../../../components/imoveis/main/Main"
import Form from "../../../../components/imoveis/Form"

import { Firestore } from '../../../../Firebase'

export default function Caracteristicas() {
  const [characteristChecked, setCharacteristChecked] = useState({})
  const [characteristcs, setCharacteristcs] = useState({
    'Academia': false,
    'Aquecimento a gás': false,
    'Aquecimento central': false,
    'Aquecimento solar': false,
    'Ar condicionado central': false,
    'Área de lazer': false,
    'Área esportiva': false,
    'Calefação': false,
    'Churrasqueira': false,
    'Circuito de segurança': false,
    'Deck Molhado': false,
    'Depósito': false,
    'Elevador': false,
    'Espaço Gourmet': false,
    'Espaço verde': false,
    'Estacionamento': false,
    'Forro de gesso': false,
    'Forro de madeira': false,
    'Forro de PVC': false,
    'Gás central': false,
    'Gás individual': false,
    'Hidromassagem': false,
    'Hidrômetro individual': false,
    'Interfone': false,
    'Internet': false,
    'Lareira': false,
    'Lavanderia': false,
    'Piscina': false,
    'Playground': false,
    'Portaria': false,
    'Sacada': false,
    'Salão de festas': false,
    'Sauna': false,
    'Sistema de alarme': false,
    'SPA': false,
    'Vigia': false,
  })

  const router = useRouter()

  router.prefetch('/imoveis/novo/condominio')

  function handleChange(event) {
    const checkeds = { ...characteristcs, [event.currentTarget.name]: event.currentTarget.checked }
    Object.keys(checkeds).map(key => {
      (checkeds[key] == false && delete checkeds[key])
      return
    })
    setCharacteristChecked(checkeds)
    setCharacteristcs({ ...characteristcs, [event.currentTarget.name]: event.currentTarget.checked })
  }

  function handleSubmit(event) {
    event.preventDefault();

    const ref = doc(Firestore, 'initial_informations', localStorage.getItem('new_property_id'))

    updateDoc(ref, {
      characteristics: {
        characteristcs
      }
    })

    router.push('/imoveis/novo/condominio')
  }

  return (
    <Box display='flex' height='calc(100% - 45px)' bgcolor='silver' overflow='hidden'>
      <AsideNav>
        <ImoveisAsideNav />
      </AsideNav>

      <Main title='Características do imóvel'>
        <Form gridTemplateColumnsCustom={'1fr'} handleSubmit={handleSubmit}>
          <FormGroup position='relative' display='block' width='100%'>
            <Box position='relative' display='block' width='100%' sx={{ columnCount: 3 }}>
              {Object.keys(characteristcs).map(key => (
                <Box key={key}>
                  <FormControlLabel
                    name={key}
                    control={<Checkbox />}
                    label={key}
                    display='block'
                    width='100%'
                    onChange={handleChange}
                  />
                </Box>
              ))}
            </Box>
          </FormGroup>
        </Form>

      </Main>
    </Box >
  )
}