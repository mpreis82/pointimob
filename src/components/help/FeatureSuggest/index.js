import { useState } from 'react'

import { Box } from '@mui/system'
import { Backdrop, Fade, Modal, Typography } from '@mui/material'
import { grey, pink, purple } from '@mui/material/colors'

import { MdOutlineRecordVoiceOver, MdCancel } from 'react-icons/md'
import FeatureSuggestForm from '../FeatureSuggestForm'
import FeatureSuggestSended from '../FeatureSuggestSended'
import FeatureSuggestSendError from '../FeatureSuggestSendError'

export default function FeatureSuggest({ openFeatureSuggest, setOpenFeatureSuggest }) {
  const [sended, setSended] = useState(false)
  const [sendError, setSendError] = useState(false)

  function handleCloseClick() {
    setOpenFeatureSuggest(false)

    setTimeout(() => {
      setSended(false)
      setSendError(false)
    }, 500);
  }

  return (
    <Modal open={openFeatureSuggest} onClose={handleCloseClick} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', pt: 5, backgroundColor: '#000000a6' }} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, }}>
      <Fade in={openFeatureSuggest}>
        <Box position='relative' width='90%' maxWidth='480px' maxHeight={'90vh'} borderRadius={2} overflow='hidden' sx={{ backgroundColor: '#f5f5f5', border: 'none', outline: 0 }} >

          <Box onClick={handleCloseClick} position='absolute' top={8} right={8} fontSize={20} sx={{ cursor: 'pointer' }}>
            <Typography fontSize={20} color={purple[200]} lineHeight={0} sx={{ ':hover': { color: purple[100] } }}>
              <MdCancel />
            </Typography>
          </Box>

          <Box sx={{ backgroundColor: purple[700], px: 3, py: 3 }}>
            <Box display='flex' alignItems='center'>
              <Typography variant='h5' lineHeight={1} color='#f5f5f5' display='flex' alignItems='center'><MdOutlineRecordVoiceOver /></Typography>
              <Typography variant='h5' lineHeight={1} color='#f5f5f5' ml={1}>
                Enviar sugestão
              </Typography>
            </Box>
            <Typography variant='body2' lineHeight={1} mt={1} color={purple[200]}>
              Envie a sua sugestão para melhorar a plataforma.
            </Typography>
          </Box>

          <Box maxHeight='100%' overflow='auto' py={4}
            sx={{
              maxHeight: `calc(100vh - 200px)`,
              '::-webkit-scrollbar': {
                width: '8px',
                backgroundColor: grey[300],
                borderRadius: 3
              },
              '::-webkit-scrollbar-thumb': {
                backgroundColor: grey[400],
                borderRadius: 3,
                cursor: 'pointer',
                transition: {}
              },
              '::-webkit-scrollbar-thumb:hover': {
                backgroundColor: pink[400],
              }
            }}
          >
            {(sended == false && <FeatureSuggestForm setSended={setSended} handleCloseClick={handleCloseClick} setSendError={setSendError} />)}
            {(sended == true && sendError == false && <FeatureSuggestSended />)}
            {(sended == true && sendError == true && <FeatureSuggestSendError />)}
          </Box>
        </Box>
      </Fade>
    </Modal >
  )
}