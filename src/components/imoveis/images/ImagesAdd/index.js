import { Box } from '@mui/system'
import { Button, Input } from '@mui/material'
import { FcAddImage } from 'react-icons/fc'

export default function ImagesAdd({ handleImobImagesChange }) {
  return (
    <Box display={'flex'} flexDirection='column' alignItems='center' >
      <Box mb={1}><FcAddImage fontSize={(8 * 8)} opacity='0.5' /></Box>
      <Box component='div' mb={3} fontWeight='bold' >Você ainda não enviou nenhuma foto.</Box>

      <label htmlFor='imobImagesButton'>
        <Input sx={{ display: 'none' }} accept='images/*' id='imobImagesButton' type='file' inputProps={{ multiple: true }} onChange={handleImobImagesChange} />

        <Button component='span' variant='contained' color='secondary' size='large'>
          Enviar fotos
        </Button>
      </label>
    </Box>
  )
}