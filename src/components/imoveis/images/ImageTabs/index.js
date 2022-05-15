import { useEffect, useState } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import { Box } from "@mui/system"
import { Tabs, Tab } from '@mui/material'
import PropTypes from 'prop-types'

import Form from '../../Form'
import ImagesList from '../ImagesList'
import PlansList from '../PlansList'

import { Firestore } from '../../../../Firebase'

export default function ImageTabs({ setAlert }) {
  const [value, setValue] = useState(0)
  const [list, setList] = useState([])
  const [plansList, setPlansList] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(async () => {
    setLoaded(false)
    const data = await getStorageImages()
    if (data.images) {
      setList(data.images.filter(image => image != undefined))
    }

    if (data.plans) {
      setPlansList(data.plans.filter(plan => plan != undefined))
    }
    setLoaded(true)
  }, [])

  async function getStorageImages() {
    const propertyId = localStorage.getItem('new_property_id')

    if (propertyId) {
      const docRef = doc(Firestore, 'properties', propertyId)

      const docSnap = await getDoc(docRef)

      if (docSnap.exists) {
        return docSnap.data()
      }
    }
  }

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

    const propertyId = localStorage.getItem('new_property_id')

    if (propertyId) {
      const refDoc = doc(Firestore, 'properties', propertyId)

      const docSnap = await getDoc(refDoc)

      if (docSnap.exists()) {
        await updateDoc(refDoc, { images: list, plans: plansList, 'steps_progress.images': 'done' })
      }

      setAlert({
        severity: 'success',
        message: 'Salvo.',
        open: true
      })
    }
  }

  return (
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
          <PlansList plansList={plansList} setPlansList={setPlansList} />
        </TabPanel>
      </Box>
    </Form >
  )
}