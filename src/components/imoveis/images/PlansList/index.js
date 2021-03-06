import { useState, useEffect } from 'react'
import Image from 'next/image'
import { deleteObject, getDownloadURL, ref, uploadBytes, listAll } from 'firebase/storage'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import { Box } from "@mui/system"
import { Button, Input, IconButton } from '@mui/material'
import { FcAddImage } from 'react-icons/fc'
import { MdClose, MdStarRate, MdDelete, MdCameraEnhance } from 'react-icons/md'

import { Firestore, Storage } from '../../../../Firebase'

import style from './style.module.css'

function renderImage({ image, handleRemoveImage, index, handleDragStart }) {
  return (
    <Box
      key={index}
      lineHeight='0'
      width='100%'
      height='auto'
      position='relative'
      dragabble='true'
      onDragStart={handleDragStart}
      sx={{ cursor: 'move', ':hover div': { display: 'block' } }}
    >
      <Box
        lineHeight='0'
        borderRadius={2}
        overflow='hidden'
      >
        <Image
          order={index}
          src={image.src}
          layout='responsive'
          priority={true}
          width='100%'
          height='100%'
          className={style.image}
        />
      </Box>
      <Box
        position='absolute'
        top='-15px'
        right='-5px'
        display='none'
      >
        <IconButton
          size='small'
          sx={{
            color: '#fff',
            backgroundColor: 'secondary.main',
            ':hover': {
              backgroundColor: 'secondary.main',
            },
          }}
          onClick={() => handleRemoveImage(image)}
        >
          <MdClose />
        </IconButton>
      </Box>
      {index == 0 && (
        <Box
          component='span'
          position='absolute'
          display='flex'
          alignItems='center'
          top='15px'
          left='15px'
          bgcolor='secondary.main'
          color='#fff'
          padding='4px'
          borderRadius={1}
          sx={{ opacity: 0.75 }}
        >
          <Box component='p' fontSize={'0.875rem'} display='flex' alignItems='center'>
            <MdStarRate />
            <Box component='span' ml='4px'>Capa</Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default function PlansList({
  setShowAddImages,
  showAddImages,
  plansList,
  setPlansList
}) {

  const [dragableIndex, setDragableIndex] = useState(null);

  useEffect(() => {
    if (showAddImages == true && plansList.length > 0) {
      setShowAddImages(false)
    }

    if (showAddImages == false && plansList.length == 0) {
      setShowAddImages(true)
    }
  }, [plansList])

  async function addImages(files) {
    const propertyId = localStorage.getItem('new_property_id')
    if (propertyId) {
      const refDoc = doc(Firestore, 'properties', propertyId)

      const docSnap = await getDoc(refDoc)

      if (!docSnap.exists()) return

      const images = Promise.all(Array.from(files).map(async (file, index) => {
        const storageRef = ref(Storage, `imoveis/plans/${propertyId}/${file.name}`)
        const uploadResult = await uploadBytes(storageRef, file)
        return {
          isThumb: index == 0,
          name: uploadResult.ref.name,
          fullPath: uploadResult.ref.fullPath,
          bucket: uploadResult.ref.bucket,
          src: await getDownloadURL(ref(Storage, uploadResult.ref.fullPath))
        }
      }))

      await updateDoc(refDoc, { plans: [...plansList, ... await images] })

      setPlansList([...plansList, ... await images])

      document.getElementsByTagName('form')[0].reset()
    }
  }

  async function deleteImage(plan) {
    const propertyId = localStorage.getItem('new_property_id')

    if (propertyId) {
      const newList = plansList.filter(planList => planList != plan)

      const refDoc = doc(Firestore, 'properties', propertyId)

      const docSnap = await getDoc(refDoc)

      if (!docSnap.exists() && docSnap.data().plans) return

      const storageRef = ref(Storage, `imoveis/plans/${propertyId}/${plan.name}`)
      await deleteObject(storageRef)

      await updateDoc(refDoc, { plans: newList })

      setPlansList(newList)
    }
  }

  async function deleteAllImages() {
    const propertyId = localStorage.getItem('new_property_id')

    if (propertyId) {
      const listRef = ref(Storage, `imoveis/plans/${propertyId}`)
      const listResult = await listAll(listRef)
      listResult.items.forEach(async (item) => deleteObject(item))

      const refDoc = doc(Firestore, 'properties', propertyId)

      const docSnap = await getDoc(refDoc)

      if (docSnap.exists() && docSnap.data().plans) {
        await updateDoc(refDoc, { plans: [] })
        setPlansList([])
      }
    }
  }

  function handleImobImagesChange(event) {
    const files = event.target.files
    addImages(files)
  }

  function handleImageAddMoreChange(event) {
    const files = event.target.files
    addImages(files)
  }

  async function handleRemoveImage(image) {
    deleteImage(image)
  }

  function handleImageRemoveAll() {
    deleteAllImages()
  }

  function handleDragStart(event) {
    setDragableIndex(event.target.attributes.order.value)
  }

  function handleDrop(event) {
    if (event.target.attributes.order !== undefined) {
      const droppedIndex = event.target.attributes.order.value
      const item = plansList[dragableIndex];
      plansList.splice(dragableIndex, 1)
      plansList.splice(droppedIndex, 0, item)
    }
  }

  function handleDragOver(event) {
    event.preventDefault()
  }

  function handleDragEnd(event) {
    setDragableIndex(null)
  }

  return (
    <>
      <Box display='flex' alignItems='center' flexDirection='column' p={3}>

        <Box display={plansList?.length ? 'none' : 'flex'} flexDirection='column' alignItems='center' >
          <Box mb={1}><FcAddImage fontSize={(8 * 8)} opacity='0.5' /></Box>
          <Box component='div' mb={3} fontWeight='bold' >Voc?? ainda n??o enviou nenhuma foto.</Box>

          <label htmlFor='imobImagesButton'>
            <Input sx={{ display: 'none' }} accept='images/*' id='imobImagesButton' type='file' inputProps={{ multiple: true }} onChange={handleImobImagesChange} />

            <Button component='span' variant='contained' color='secondary' size='large'>
              Enviar fotos
            </Button>
          </label>
        </Box>

        <Box width='100%' display={plansList?.length ? 'flex' : 'none'} alignItems='center' justifyContent='space-between'>
          <Box>
            <Box component='span' fontWeight='bold'>Imagens:</Box> {plansList?.length}
          </Box>
          <Box>
            <label htmlFor='imagesRemoveAll'>
              <Button variant='outlined' color='error' onClick={handleImageRemoveAll}>
                <MdDelete size={18} />
                <Box component='span' ml={1}>Remover todas</Box>
              </Button>
            </label>

            <label htmlFor='imageAddMore'>
              <Input sx={{ display: 'none' }} accept='images/*' id='imageAddMore' type='file' inputProps={{ multiple: true }} onChange={handleImageAddMoreChange} />
              <Button component='span' variant='outlined' color='success' sx={{ marginLeft: 1 }}>
                <MdCameraEnhance size={18} />
                <Box component='span' ml={1}>Enviar mais imagens</Box>
              </Button>
            </label>
          </Box>
        </Box>

        <Box
          width='100%'
          position='relative'
          mt={3}
          display='grid'
          gap='1rem'
          sx={{
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr', xl: '1fr 1fr 1fr 1fr 1fr' },
            objectFit: 'cover'
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {plansList?.map((image, index) => (
            renderImage({ image, handleRemoveImage, index, handleDragStart })
          ))}
        </Box>
      </Box>
    </>
  )
}