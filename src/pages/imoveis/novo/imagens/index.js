import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { doc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'

import { Box } from "@mui/system"
import { Tabs, Tab } from '@mui/material'
import PropTypes from 'prop-types'

import AsideNav from "../../../../components/AsideNav"
import ImoveisAsideNav from '../../../../components/imoveis/aside/AsideNav'
import Main from "../../../../components/imoveis/main/Main"
import Form from "../../../../components/imoveis/Form"
import ImagesList from '../../../../components/imoveis/images/ImagesList'

import { Firestore, Storage } from '../../../../Firebase'

export default function Imagens() {
  const [value, setValue] = useState(0)
  const [list, setList] = useState([])

  const router = useRouter()

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

  async function handleSubmit(event) {
    event.preventDefault()

    const refDoc = doc(Firestore, 'initial_informations', localStorage.getItem('new_property_id'))

    if (list.length) {
      list.map((file, index) => {
        const storageRef = ref(Storage, `imoveis/images/${localStorage.getItem('new_property_id')}/${file.name}`)
        uploadBytes(storageRef, file).then(async (snapshot) => {
          console.log(snapshot)
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
    }

    router.push('/imoveis/novo/publicacao')
  }

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
              <ImagesList list={list} setList={setList} />
            </TabPanel>

            <TabPanel value={value} index={1}>
            </TabPanel>
          </Box>
        </Form >
      </Main >
    </Box >
  )
}
