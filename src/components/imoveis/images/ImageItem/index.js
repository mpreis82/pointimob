import { useState } from 'react'
import { Box } from '@mui/system'
import { Button, Input } from '@mui/material'
import { MdDelete, MdCameraEnhance } from 'react-icons/md'
import ImageProperty from '../ImageProperty'

export default function ImageItem({ propertyListImages, handleImageAddMoreChange, handleRemoveImage, handleImageRemoveAll }) {
  const [dragableIndex, setDragableIndex] = useState(null);

  function handleDragStart(event) {
    setDragableIndex(event.target.attributes.order.value)
  }

  function handleDrop(event) {
    if (event.target.attributes.order !== undefined) {
      const droppedIndex = event.target.attributes.order.value
      const item = propertyListImages[dragableIndex];
      propertyListImages.forEach(image => {
        if (image.name == item.name) {
          image.isThumb = true
        } else {
          image.isThumb = false
        }
      })
      propertyListImages.splice(dragableIndex, 1)
      propertyListImages.splice(droppedIndex, 0, item)
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
      <Box width='100%' display={'flex'} alignItems='center' justifyContent='space-between'>
        <Box>
          <Box component='span' fontWeight='bold'>Imagens:</Box> {propertyListImages.length}
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
        width='100%' position='relative' mt={3} display='grid' gap='1rem' sx={{ gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr', xl: '1fr 1fr 1fr 1fr 1fr' }, objectFit: 'cover' }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {propertyListImages.map((image, index) => (
          <ImageProperty key={index} image={image} index={index} handleDragStart={handleDragStart} handleRemoveImage={handleRemoveImage} />
        ))}
      </Box>
    </>
  )
}