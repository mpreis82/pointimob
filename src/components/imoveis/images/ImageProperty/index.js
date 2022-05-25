import Image from 'next/image'
import { Box } from '@mui/system'
import { IconButton } from '@mui/material'
import { MdClose, MdStarRate } from 'react-icons/md'

import style from './style.module.css'

export default function ImageProperty({ image, index, handleDragStart, handleRemoveImage }) {

  return (
    <Box key={index} lineHeight='0' width='100%' height='auto' position='relative' dragabble='true' onDragStart={handleDragStart} sx={{ cursor: 'move', ':hover div': { display: 'block' } }}>
      <Box lineHeight='0' borderRadius={2} overflow='hidden'>
        <Image order={index} src={image.src} layout='responsive' priority={true} width='100%' height='100%' className={style.image} />
      </Box>

      <Box position='absolute' top='-15px' right='-5px' display='none'>
        <IconButton onClick={() => handleRemoveImage(image)} size='small' sx={{ color: '#fff', backgroundColor: 'secondary.main', ':hover': { backgroundColor: 'secondary.main', }, }}>
          <MdClose />
        </IconButton>
      </Box>

      {index == 0 && (
        <Box component='span' position='absolute' display='flex' alignItems='center' top='15px' left='15px' bgcolor='secondary.main' color='#fff' padding='4px' borderRadius={1} sx={{ opacity: 0.75 }} >
          <Box component='p' fontSize={'0.875rem'} display='flex' alignItems='center'>
            <MdStarRate />
            <Box component='span' ml='4px'>Capa</Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}