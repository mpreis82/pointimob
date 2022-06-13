import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import { Box } from '@mui/system'
import { FormGroup, FormControlLabel, Checkbox, Stack, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material'

import AsideNav from '../../../../../../components/AsideNav'
import ImoveisAsideNav from '../../../../../../components/imoveis/aside/AsideNav'
import Main from '../../../../../../components/imoveis/main/Main'
import Form from '../../../../../../components/imoveis/Form'

import { Firestore } from '../../../../../../Firebase'

import { AuthContext } from '../../../../../../contexts/AuthContext'

export default function Proximidades() {
  const [nearbys, setNearbys] = useState([
    { name: 'Banco', checked: false },
    { name: 'Escola', checked: false },
    { name: 'Escola de idioma', checked: false },
    { name: 'Faculdade', checked: false },
    { name: 'Farmácia', checked: false },
    { name: 'Hospital', checked: false },
    { name: 'Igreja', checked: false },
    { name: 'Padaria', checked: false },
    { name: 'Praça', checked: false },
    { name: 'Rodovia', checked: false },
    { name: 'Shopping', checked: false },
    { name: 'Supermercado', checked: false },
  ])

  const [alert, setAlert] = useState({
    severity: 'success',
    message: '',
    open: false
  })

  const [loaded, setLoaded] = useState(false)

  const [propertyId, setPropertyId] = useState('')

  const router = useRouter()

  const authContext = useContext(AuthContext)

  useEffect(async () => {
    if (!router.isReady) return

    if (!authContext.user()) {
      router.push('/login')
      return
    }

    if (!router.query.id) router.push('/imoveis')

    setPropertyId(router.query.id)

    const docRef = doc(Firestore, 'properties', router.query.id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) router.push('/imoveis')

    if (docSnap.data().nearbys) {
      const data = docSnap.data().nearbys
      setNearbys(data)
    }

    setLoaded(true)

  }, [router.isReady])

  function handleChange(event) {
    let newNearbys = [...nearbys]
    const index = newNearbys.findIndex(nearby => nearby.name == event.target.name)
    newNearbys[index]['checked'] = event.target.checked
    setNearbys(newNearbys)
  }

  function handleSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ ...alert, open: false });
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const ref = doc(Firestore, 'properties', propertyId)

      await updateDoc(ref, {
        nearbys,
        'steps_progress.nearbys': 'done'
      })

      setAlert({
        severity: 'success',
        message: 'Salvo.',
        open: true
      })

      setTimeout(() => {
        router.push(`/imoveis/novo/${propertyId}/descricao`)
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
          <ImoveisAsideNav />
        </AsideNav>

        <Main title='Proximidades'>
          <Form handleSubmit={handleSubmit} gridTemplateColumnsCustom='1fr'>
            <FormGroup position='relative' display='block' width='100%'>
              <Box position='relative' display='block' width='100%' sx={{ columnCount: { xs: 1, sm: 2, md: 3, lg: 4 } }}>
                {nearbys.map((nearby, index) => (
                  <Box key={index}>
                    <FormControlLabel
                      name={nearby.name}
                      control={<Checkbox />}
                      label={nearby.name}
                      display='block'
                      width='100%'
                      checked={nearby.checked}
                      onChange={handleChange}
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