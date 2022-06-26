import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Box } from '@mui/system'
import { Backdrop, CircularProgress } from '@mui/material'
import AsideNav from '../../../components/AsideNav'
import Main from '../../../components/imoveis/main/Main'
import { Firestore } from '../../../Firebase'
import ImoveisListAside from '../../../components/imoveis/list/ImoveisListAside'
import PropertiesList from '../../../components/imoveis/list/PropertiesList'
import { AuthContext } from '../../../contexts/AuthContext'

export default function Imoveis() {
  const [propertiesList, setPropertiesList] = useState([])
  const [isBackdrop, setIsBackdrop] = useState(false)
  const [user, setUser] = useState(null)

  const router = useRouter()

  const authContext = useContext(AuthContext)

  useEffect(async () => {
    setIsBackdrop(true)

    const abortController = new AbortController

    const currentUser = await authContext.user()

    setUser(currentUser)

    if (!currentUser) {
      router.push('/login')
      return
    }

    const q = query(collection(Firestore, 'properties'),
      where('uid', '==', currentUser.uid),
      where('steps_progress.financial', '==', 'done'),
      where('steps_progress.condominium', '==', 'done'),
      where('steps_progress.description', '==', 'done'),
      where('steps_progress.characteristics', '==', 'done'),
      where('steps_progress.images', '==', 'done'),
      where('steps_progress.initial_informations', '==', 'done'),
      where('steps_progress.location', '==', 'done'),
      where('steps_progress.measures', '==', 'done'),
      where('steps_progress.nearbys', '==', 'done'),
      where('steps_progress.publish', '==', 'done'),
      where('steps_progress.rooms', '==', 'done'))

    const querySnap = await getDocs(q)
    const list = []
    querySnap.forEach((doc) => {
      list.push({ docId: doc.id, ...doc.data() })
    })

    setPropertiesList(list)
    setIsBackdrop(false)

    return () => {
      abortController.abort()
    }

  }, [router.isReady])

  if (user) {
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
          sx={{ color: '#fff', zIndex: 9999 }}
          open={isBackdrop}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      </>
    )
  }
  return <></>
}