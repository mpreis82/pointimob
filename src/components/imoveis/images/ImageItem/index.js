import { useState } from 'react'
import { Box } from "@mui/system"
import { Button, Fade, ImageList, ImageListItem } from '@mui/material'

export default function ImageItem({ image, handleRemoveImage }) {
  return (
    <Box width='100%' position='relative'>
      <Box
        component='img'
        width='100%'
        src={URL.createObjectURL(image)}
        loading="lazy"
      />
      <Button
        onClick={() => handleRemoveImage(image)}
      >
        Excluir
      </Button>
    </Box>
  )
}