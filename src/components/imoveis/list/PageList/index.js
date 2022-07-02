import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { Box } from '@mui/system'
import { Backdrop, CircularProgress } from '@mui/material'

import AsideNav from '../../../AsideNav'
import Main from '../../main/Main'
import { Firestore } from '../../../../Firebase'
import ImoveisListAside from '../ImoveisListAside'
import PropertiesList from '../PropertiesList'

import { AuthContext } from '../../../../contexts/AuthContext'

const listStatus = [
  { status: 'done', title: 'Sua lista de imóveis' },
  { status: 'sold', title: 'Sua lista de imóveis vendidos' },
  { status: 'rented', title: 'Sua lista de imóveis alugados' },
  { status: 'inactive', title: 'Sua lista de imóveis inativos' }
]

export default function PageList({ propertiesStatus }) {
  const [propertiesList, setPropertiesList] = useState([])
  const [isBackdrop, setIsBackdrop] = useState(false)
  const [user, setUser] = useState(null)
  const [trigger, setTrigger] = useState(false)

  const router = useRouter()

  const authContext = useContext(AuthContext)

  const status = listStatus.filter(item => item.status == propertiesStatus)[0] ?? { status: 'default', title: 'Sua lista de imóveis' }

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
      where('steps_progress.rooms', '==', 'done'),
      where('register_status.status', '==', propertiesStatus))

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

  }, [router.isReady, trigger])

  if (user) {
    return (
      <>
        <Box display='flex' height='calc(100% - 45px)' bgcolor='silver' overflow='hidden'>
          <AsideNav>
            <ImoveisListAside setPropertiesList={setPropertiesList} setIsBackdrop={setIsBackdrop} user={user} propertiesStatus={propertiesStatus} />
          </AsideNav>

          <Main title={status.title}>
            <Box mb={3}>{propertiesList.length} resultados encontrados</Box>

            <Box display='grid' sx={{ gridTemplateColumns: { md: '1fr', lg: '1fr 1fr' } }} gap={2}>
              <PropertiesList list={propertiesList} setList={setPropertiesList} setIsBackdrop={setIsBackdrop} setTrigger={setTrigger} trigger={trigger} />
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