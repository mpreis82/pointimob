import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { collection, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'

import { Box } from '@mui/system'
import { FormControlLabel, Checkbox, FormGroup, Stack, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material'

import AsideNav from '../../../../../../components/AsideNav'
import ImoveisAsideNav from '../../../../../../components/imoveis/aside/AsideNav'
import Main from '../../../../../../components/imoveis/main/Main'
import Form from '../../../../../../components/imoveis/Form'

import { Firestore } from '../../../../../../Firebase'

import { AuthContext } from '../../../../../../contexts/AuthContext'

export default function Caracteristicas() {
  const [characteristics, setCharacteristics] = useState([
    { name: 'Academia', checked: false },
    { name: 'Aquecimento a gás', checked: false },
    { name: 'Aquecimento central', checked: false },
    { name: 'Aquecimento solar', checked: false },
    { name: 'Ar condicionado central', checked: false },
    { name: 'Área de lazer', checked: false },
    { name: 'Área esportiva', checked: false },
    { name: 'Calefação', checked: false },
    { name: 'Churrasqueira', checked: false },
    { name: 'Circuito de segurança', checked: false },
    { name: 'Deck Molhado', checked: false },
    { name: 'Depósito', checked: false },
    { name: 'Elevador', checked: false },
    { name: 'Espaço Gourmet', checked: false },
    { name: 'Espaço verde', checked: false },
    { name: 'Estacionamento', checked: false },
    { name: 'Forro de gesso', checked: false },
    { name: 'Forro de madeira', checked: false },
    { name: 'Forro de PVC', checked: false },
    { name: 'Gás central', checked: false },
    { name: 'Gás individual', checked: false },
    { name: 'Hidromassagem', checked: false },
    { name: 'Hidrômetro individual', checked: false },
    { name: 'Interfone', checked: false },
    { name: 'Internet', checked: false },
    { name: 'Lareira', checked: false },
    { name: 'Lavanderia', checked: false },
    { name: 'Piscina', checked: false },
    { name: 'Playground', checked: false },
    { name: 'Portaria', checked: false },
    { name: 'Sacada', checked: false },
    { name: 'Salão de festas', checked: false },
    { name: 'Sauna', checked: false },
    { name: 'Sistema de alarme', checked: false },
    { name: 'SPA', checked: false },
    { name: 'Vigia', checked: false },
  ])

  const [alert, setAlert] = useState({
    severity: 'success',
    message: '',
    open: false,
  })

  const [loaded, setLoaded] = useState(false)

  const [propertyId, setPropertyId] = useState('')
  const [property, setProperty] = useState([])

  const router = useRouter()

  const authContext = useContext(AuthContext)

  useEffect(async () => {
    if (!router.isReady) return

    const abortController = new AbortController

    if (!(await authContext.user())) {
      router.push('/login')
      return
    }

    if (!router.query.id) {
      router.push('/imoveis')
      return
    }

    setPropertyId(router.query.id)

    const docRef = doc(Firestore, 'properties', router.query.id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) router.push('/imoveis')

    setProperty(docSnap.data())

    const propertyType = docSnap.data().initial_informations.subtype.type

    const docCharacteristicsRef = collection(Firestore, "characteristics");
    const queryCharacteristics = query(docCharacteristicsRef, where("property_type", "==", propertyType), orderBy('characteristic'));
    const characteristicsSnapshot = await getDocs(queryCharacteristics);

    const characteristicsList = []
    let checkedList = []

    if (docSnap.data().characteristics) {
      checkedList = docSnap.data().characteristics
    }

    characteristicsSnapshot.forEach(doc => {
      const checked = checkedList.find(c => c.id == doc.data().id)
      characteristicsList.push({ ...doc.data(), checked: (checked ? true : false) })
    })

    if (characteristicsList.length) setCharacteristics(characteristicsList)

    setLoaded(true)

    return () => {
      abortController.abort()
    }

  }, [router.isReady])

  function handleChange(event) {
    let newCharacteristics = [...characteristics]
    const index = newCharacteristics.findIndex((c) => c.characteristic == event.target.name)
    newCharacteristics[index]['checked'] = event.target.checked
    setCharacteristics(newCharacteristics)
  }

  function handleSnackbarClose() {
    setAlert({ ...alert, open: false })
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const ref = doc(Firestore, 'properties', propertyId)

      await updateDoc(ref, {
        characteristics: [...characteristics.filter(c => c.checked)],
        'steps_progress.characteristics': 'done'
      })

      setAlert({
        severity: 'success',
        message: 'Salvo.',
        open: true
      })

      setTimeout(() => {
        router.push(`/imoveis/editar/${propertyId}/condominio`)
      }, 2000);

    } catch (err) {
      setAlert({
        severity: 'error',
        message: 'Desculpe! Algo deu errado e estamos corrigindo.',
        open: true
      })
    }
  }

  if (loaded) {
    return (
      <Box display='flex' height='calc(100% - 45px)' bgcolor='silver' overflow='hidden'>
        <AsideNav>
          <ImoveisAsideNav property={property} />
        </AsideNav>

        <Main title='Características do imóvel'>
          <Form gridTemplateColumnsCustom={'1fr'} handleSubmit={handleSubmit}>
            <FormGroup position='relative' display='block' width='100%'>
              <Box position='relative' width='100%' sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr' } }}>
                {characteristics.map((characteristic, index) => (
                  <Box key={index}>
                    <FormControlLabel
                      name={characteristic.characteristic}
                      control={<Checkbox />}
                      label={characteristic.characteristic}
                      display='block'
                      width='100%'
                      onChange={handleChange}
                      checked={characteristic.checked}
                    />
                  </Box>
                ))}
              </Box>
            </FormGroup>
          </Form>

          <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={alert.open} autoHideDuration={(alert.severity == 'success' ? 2000 : 6000)} onClose={handleSnackbarClose}>
              <Alert severity={alert.severity} sx={{ boxShadow: 5 }}>{alert.message}</Alert>
            </Snackbar>
          </Stack>
        </Main>
      </Box >
    )
  } else {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  }
}