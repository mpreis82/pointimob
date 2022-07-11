import React, { useState } from 'react'

import { Box } from '@mui/system'
import { Backdrop, Fade, Modal, Typography } from '@mui/material'
import { grey, pink, purple } from '@mui/material/colors'

import { MdCancel } from 'react-icons/md'

export default function HelpBasePage({ title, subtitle, icon, open, setOpen, children }) {
  const [sended, setSended] = useState(false)
  const [sendError, setSendError] = useState(false)

  function handleCloseClick() {
    setOpen(false)
    setTimeout(() => {
      setSended(false)
      setSendError(false)
    }, 500);
  }

  const childrenCloned = React.cloneElement(children, {
    sended: sended,
    setSended: setSended,
    sendError: sendError,
    setSendError: setSendError,
    handleCloseClick: handleCloseClick
  })

  return (
    <Modal open={open} onClose={handleCloseClick} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', pt: 5, backgroundColor: '#000000a6' }} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, }}>
      <Fade in={open}>
        <Box position='relative' width='90%' maxWidth='480px' maxHeight={'90vh'} borderRadius={2} overflow='hidden' sx={{ backgroundColor: '#f5f5f5', border: 'none', outline: 0 }} >

          <Box onClick={handleCloseClick} position='absolute' top={8} right={8} fontSize={20} sx={{ cursor: 'pointer' }}>
            <Typography fontSize={20} color={purple[200]} lineHeight={0} sx={{ ':hover': { color: purple[100] } }}>
              <MdCancel />
            </Typography>
          </Box>

          <Box sx={{ backgroundColor: purple[700], px: 3, py: 3 }}>
            <Box display='flex' alignItems='center'>
              <Typography variant='h5' lineHeight={1} color='#f5f5f5' display='flex' alignItems='center'>
                {icon}
              </Typography>
              <Typography variant='h5' lineHeight={1} color='#f5f5f5' ml={1}>
                {title}
              </Typography>
            </Box>
            <Typography variant='body2' lineHeight={1} mt={1} color={purple[200]}>
              {subtitle}
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
            {childrenCloned}
          </Box>
        </Box>
      </Fade>
    </Modal >
  )
}