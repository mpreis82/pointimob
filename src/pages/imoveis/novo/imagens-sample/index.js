import { useLayoutEffect, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { Box } from "@mui/system"
import { Tabs, Tab, Stack, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material'
import PropTypes from 'prop-types'

import AsideNav from "../../../../components/AsideNav"
import ImoveisAsideNav from '../../../../components/imoveis/aside/AsideNav'
import Main from "../../../../components/imoveis/main/Main"
import Form from "../../../../components/imoveis/Form"
import ImagesListSample from '../../../../components/imoveis/images/ImagesListSample'

import { Firestore, Storage } from '../../../../Firebase'

export default function Imagens() {
  const [value, setValue] = useState(0)
  const [list, setList] = useState([])
  const [images, setImages] = useState([])

  const [alert, setAlert] = useState({
    severity: 'success',
    message: '',
    open: false
  })

  const [loaded, setLoaded] = useState(false)

  useEffect(async () => {
    // const propertyId = localStorage.getItem('new_property_id')
    // const imageReference = ref(Storage, `imoveis/images/${propertyId}/img5.jpg`)
    // getDownloadURL(imageReference)
    //   .then((url) => console.log(url))

    const propertyImages = localStorage.getItem('new_property_images')
    setImages(JSON.parse(propertyImages))
  }, [])

  const router = useRouter()

  useLayoutEffect(() => {
    const newPropertyId = localStorage.getItem('new_property_id')

    if (router.asPath != '/imoveis/novo/informacoes' && !newPropertyId) {
      router.push('/imoveis/novo/informacoes')
    } else {
      setLoaded(true)
    }
  }, [])


  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  function handlePlanImagesChange(event) {

  }

  function handleChange(event, newValue) {
    setValue(newValue)
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
      const refDoc = doc(Firestore, 'properties', localStorage.getItem('new_property_id'))
      const docSnap = await getDoc(refDoc)

      if (!docSnap.exists()) {
        throw new Error()
      }

      if (list.length) {
        list.map(async (file, index) => {
          const storageRef = ref(Storage, `imoveis/images/${localStorage.getItem('new_property_id')}/${file.name}`)

          await uploadBytes(storageRef, file).then(async (snapshot) => {
            await updateDoc(refDoc, {
              images: arrayUnion(
                {
                  isThumb: index == 0,
                  name: snapshot.ref.name,
                  fullPath: snapshot.ref.fullPath,
                  bucket: snapshot.ref.bucket,
                }
              )
            })
          })
        })

        const images = list.map(image => URL.createObjectURL(image))

        localStorage.setItem('new_property_images', JSON.stringify(images))
      }

      await updateDoc(refDoc, {
        'steps_progress.images': 'done'
      })

      setAlert({
        severity: 'success',
        message: 'Salvo.',
        open: true
      })

      // setTimeout(() => {
      //   router.push('/imoveis/novo/publicacao')
      // }, 2300);


    } catch (err) {
      console.log(err)
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

        <Main title='Imagens'>
          <Form handleSubmit={handleSubmit} gridTemplateColumnsCustom='1fr'>
            <Box sx={{ width: '100%', mr: 'auto', ml: 'auto' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
                  <Tab label="Fotos do imóvel" {...a11yProps(0)} />
                  <Tab label="Fotos planta" {...a11yProps(1)} />
                </Tabs>
              </Box>

              <TabPanel value={value} index={0} width='100%' position='relative'>
                <ImagesListSample list={list} setList={setList} images={images} />
              </TabPanel>

              <TabPanel value={value} index={1}>
              </TabPanel>
            </Box>
          </Form >

          <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={alert.open} autoHideDuration={(alert.severity == 'success' ? 2000 : 6000)} onClose={handleSnackbarClose}>
              <Alert severity={alert.severity} sx={{ boxShadow: 5 }}>{alert.message}</Alert>
            </Snackbar>
          </Stack>
        </Main >
      </Box >
    )
  } else {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }
}