import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Box } from "@mui/system"
import { Button, Input, IconButton } from '@mui/material'
import { FcAddImage } from 'react-icons/fc'
import { MdClose, MdStarRate } from 'react-icons/md'

function renderImage({ image, handleRemoveImage, index, handleDragStart }) {
  return (
    <Box
      key={index}
      lineHeight='0'
      width='100%'
      position='relative'
      dragabble='true'
      onDragStart={handleDragStart}
      sx={{
        cursor: 'move',
        ':hover div': {
          display: 'block'
        },
      }}
    >
      <Image
        order={index}
        src={URL.createObjectURL(image)}
        width='100%'
        height='100%'
        layout='responsive'
      />
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

export default function ImagesList({ setShowAddImages, showAddImages, list, setList }) {

  const [dragableIndex, setDragableIndex] = useState(null);

  useEffect(() => {
    if (showAddImages == true && list.length > 0) {
      setShowAddImages(false)
    }

    if (showAddImages == false && list.length == 0) {
      setShowAddImages(true)
    }
  }, [list])

  function handleImobImagesChange(event) {
    const files = event.target.files
    setList([...files])
    event.target.form.reset()
  }

  function handleRemoveImage(image) {
    setList((prev) => [...prev.filter(i => i != image)])
  }

  function handleDragStart(event) {
    setDragableIndex(event.target.attributes.order.value)
  }

  function handleDrop(event) {
    if (event.target.attributes.order !== undefined) {
      const droppedIndex = event.target.attributes.order.value
      const item = list[dragableIndex];
      list.splice(dragableIndex, 1)
      list.splice(droppedIndex, 0, item)
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

        <Box
          display={list.length ? 'none' : 'flex'}
          flexDirection='column'
          alignItems='center'
        >
          <Box mb={1}><FcAddImage fontSize={(8 * 8)} opacity='0.5' /></Box>
          <Box component='div' mb={3} fontWeight='bold' >Você ainda não enviou nenhuma foto.</Box>

          <label htmlFor='imobImagesButton'>
            <Input
              sx={{ display: 'none' }}
              accept='images/*'
              id='imobImagesButton'
              type='file'
              inputProps={{ multiple: true }}
              onChange={handleImobImagesChange}
            />

            <Button
              component='span'
              variant='contained'
              color='secondary'
              size='large'
            >
              Enviar fotos
            </Button>
          </label>
        </Box>

        <Box width='100%' display={list.length ? 'block' : 'none'}>
          <Box component='span' fontWeight='bold'>Imagens:</Box> {list.length}
        </Box>

        <Box
          width='100%'
          position='relative'
          mt={3}
          display='grid'
          gap='1rem'
          sx={{
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr',
              lg: '1fr 1fr 1fr 1fr',
              xl: '1fr 1fr 1fr 1fr 1fr'
            },
            objectFit: 'cover'
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {list.map((image, index) => (
            renderImage({ image, handleRemoveImage, index, handleDragStart })
          ))}
        </Box>
      </Box>
    </>
  )
}