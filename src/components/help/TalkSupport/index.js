import { Box } from '@mui/system'
import { Backdrop, Fade, Link, Modal, Typography } from '@mui/material'
import { grey, purple } from '@mui/material/colors'

import { MdPhone, MdMail, MdSupportAgent, MdCancel } from 'react-icons/md'
import { FaWhatsapp } from 'react-icons/fa'

export default function TalkSupport({ openTalkSupport, setOpenTalkSupport }) {
  return (
    <Modal open={openTalkSupport} onClose={() => setOpenTalkSupport(false)} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', pt: 10, backgroundColor: '#000000a6' }} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, }}>
      <Fade in={openTalkSupport}>
        <Box position='relative' width='90%' maxWidth='480px' maxHeight={'90vh'} borderRadius={2} overflow='hidden' sx={{ backgroundColor: '#f5f5f5', border: 'none', outline: 0 }} >
          <Box onClick={() => setOpenTalkSupport(false)} position='absolute' top={8} right={8} fontSize={20} sx={{ cursor: 'pointer' }}>
            <Typography fontSize={20} color={purple[200]} lineHeight={0} sx={{ ':hover': { color: purple[100] } }}>
              <MdCancel />
            </Typography>
          </Box>

          <Box sx={{ backgroundColor: purple[700], px: 3, py: 3, mb: 4 }}>
            <Box display='flex' alignItems='center'>
              <Typography variant='h5' lineHeight={1} color='#f5f5f5' display='flex' alignItems='center'><MdSupportAgent /></Typography>
              <Typography variant='h5' lineHeight={1} color='#f5f5f5' ml={1}>Suporte Técnico</Typography>
            </Box>
            <Typography variant='body2' lineHeight={1} mt={1} color={purple[200]}>Entre em contato através de um dos canais de atendimento.</Typography>
          </Box>

          <Box px={3} pb={2} mb={2} borderBottom={1} borderColor={grey[300]}>
            <Box display='flex' alignItems='center' mb={1}>
              <Typography variant='subtitle2' display='flex' alignItems='center' color='secondary'><MdPhone /></Typography>
              <Typography variant='subtitle2' ml={0.5} color='secondary'>Telefone</Typography>
            </Box>

            <Box display='flex' alignItems='center'>
              <Typography display='flex' alignItems='center' fontSize={16} fontWeight='bold' lineHeight={1} color='primary'>(11) 98761-8194</Typography>
            </Box>
          </Box>

          <Box px={3} pb={2} mb={2} borderBottom={1} borderColor={grey[300]}>
            <Box display='flex' alignItems='center' mb={1}>
              <Typography variant='subtitle2' display='flex' alignItems='center' color='secondary'><FaWhatsapp /></Typography>
              <Typography variant='subtitle2' ml={1} color='secondary'>Whatsapp</Typography>
            </Box>

            <Box display='flex' alignItems='center'>
              <Link href='https://api.whatsapp.com/send?phone=5511987618194' target='_blank' display='flex' alignItems='center'>
                <Typography display='flex' alignItems='center' fontSize={16} fontWeight='bold' lineHeight={1} color='primary'>(11) 98761-8194</Typography>
              </Link>
            </Box>
          </Box>

          <Box px={3} mb={6}>
            <Box display='flex' alignItems='center' mb={0.5}>
              <Typography variant='subtitle2' display='flex' alignItems='center' color='secondary'><MdMail /></Typography>
              <Typography variant='subtitle2' ml={1} color='secondary'>E-mail</Typography>
            </Box>
            <Link href='#' target='_blank'>
              <Typography fontSize={16} fontWeight='bold' lineHeight={1} display='flex' alignItems='center' color='primary'>suporte@pointimob.com.br</Typography>
            </Link>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}