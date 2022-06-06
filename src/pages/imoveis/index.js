import { useState, useEffect } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Box } from '@mui/system'
import { Backdrop, CircularProgress } from '@mui/material'
import AsideNav from '../../components/AsideNav'
import Main from '../../components/imoveis/main/Main'
import { Firestore } from '../../Firebase'
import ImoveisListAside from '../../components/imoveis/list/ImoveisListAside'
import PropertiesList from '../../components/imoveis/list/PropertiesList'

export default function Imoveis() {
  const [propertiesList, setPropertiesList] = useState([])
  const [isBackdrop, setIsBackdrop] = useState(false)

  useEffect(async () => {
    console.log('carregou lista')
    setIsBackdrop(true)
    const q = query(collection(Firestore, 'properties'))
    const querySnap = await getDocs(q)
    const list = []
    querySnap.forEach((doc) => {
      list.push({ docId: doc.id, ...doc.data() })
    })
    setPropertiesList(list)
    setIsBackdrop(false)
  }, [])

  return (
    <>
      <Box display='flex' height='calc(100% - 45px)' bgcolor='silver' overflow='hidden'>
        <AsideNav>
          <ImoveisListAside setPropertiesList={setPropertiesList} setIsBackdrop={setIsBackdrop} />
        </AsideNav>

        <Main title='Sua lista de imóveis'>
          <Box mb={3}>{propertiesList.length} resultados encontrados</Box>

          <Box display='grid' sx={{ gridTemplateColumns: { md: '1fr', lg: '1fr 1fr' } }} gap={2}>
            <PropertiesList list={propertiesList} setList={setPropertiesList} setIsBackdrop={setIsBackdrop} />
          </Box>
        </Main>
      </Box >

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isBackdrop}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  )
}