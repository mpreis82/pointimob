import { useEffect } from 'react'

import { Box } from "@mui/system"
import { Button } from '@mui/material'

import AsideNav from "../../components/AsideNav"
import Main from '../../components/imoveis/main/Main'
import ImoveisListAside from '../../components/imoveis/list/ImoveisListAside'

import { Firestore } from "../../Firebase"
import { collection, getDocs, query } from 'firebase/firestore'

export default function Imoveis() {

  useEffect(async () => {
    const q = query(collection(Firestore, 'properties'))
    const querySnap = await getDocs(q)
    querySnap.forEach((doc) => {
      console.log('entrou')
      console.log(doc.data())
    })
  }, [])

  return (
    <Box display='flex' height='calc(100% - 45px)' bgcolor='silver' overflow='hidden'>
      <AsideNav>
        <ImoveisListAside />

        <Box width='100%' position='sticky' bottom='0' bgcolor='#fff' zIndex='99' display='grid' gridTemplateColumns='1fr 1fr' gap={1} pb={1}>
          <Button variant='outlined' color='primary' fullWidth>Limpar</Button>
          <Button variant='contained' color='primary' fullWidth>Filtrar</Button>
        </Box>
      </AsideNav>

      <Main title='Informações iniciais'>

      </Main>
    </Box>
  )
}