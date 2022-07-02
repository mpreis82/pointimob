import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

import { Box } from '@mui/system'
import { FormControl, TextField, Stack, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material'

import 'react-quill/dist/quill.snow.css'
import styles from './styles.module.css'

import AsideNav from '../../../../../../components/AsideNav'
import ImoveisAsideNav from '../../../../../../components/imoveis/aside/AsideNav'
import Main from '../../../../../../components/imoveis/main/Main'
import Form from '../../../../../../components/imoveis/Form'

import { Firestore } from '../../../../../../Firebase'

import { AuthContext } from '../../../../../../contexts/AuthContext'

export default function Descricao() {
  const [loaded, setLoaded] = useState(false)

  const [pageTitle, setPageTitle] = useState('')
  const [description, setDescription] = useState('')

  const [alert, setAlert] = useState({
    severity: 'success',
    message: '',
    open: false
  })

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

    const docRef = doc(Firestore, 'properties', router.query.id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      router.push('/imoveis')
      return
    }

    setProperty(docSnap.data())

    const data = docSnap.data().description

    if (data) {
      setPageTitle(data.page_title)
      setDescription(data.description)
    }

    setPropertyId(router.query.id)

    setLoaded(true)

    return () => {
      abortController.abort()
    }

  }, [router.isReady])

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
        description: { page_title: pageTitle, description: description },
        'steps_progress.description': 'done'
      })

      setAlert({
        severity: 'success',
        message: 'Salvo!',
        open: true
      })

      setTimeout(() => {
        router.push(`/imoveis/novo/${propertyId}/imagens`)
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
      <>
        <Box display='flex' height='calc(100% - 45px)' bgcolor='silver' overflow='hidden'>
          <AsideNav>
            <ImoveisAsideNav property={property} />
          </AsideNav>

          <Main title='Descrição'>
            <Form handleSubmit={handleSubmit} gridTemplateColumnsCustom='1fr'>
              <FormControl variant='outlined'>
                <Box component='label' fontWeight='bold' mb={1}>Título da página de detalhamento do imóvel</Box>
                <TextField value={pageTitle} onChange={event => setPageTitle(event.target.value)} helperText='' />
              </FormControl>

              <Box position='relative' mb={6}>
                <ReactQuill theme='snow' value={description} onChange={setDescription} className={styles.quillBox}>
                </ReactQuill>
              </Box>
            </Form>

            <Stack spacing={2} sx={{ width: '100%' }}>
              <Snackbar open={alert.open} autoHideDuration={(alert.severity == 'success' ? 2000 : 6000)} onClose={handleSnackbarClose}>
                <Alert severity={alert.severity} sx={{ boxShadow: 5 }}>{alert.message}</Alert>
              </Snackbar>
            </Stack>
          </Main>
        </Box >
      </>
    )
  }

  return (
    <Backdrop sx={{ color: '#fff', zIndex: 99999 }} open={!loaded}>
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}
