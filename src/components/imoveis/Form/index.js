import { useState } from 'react'
import { useRouter } from 'next/router'
import { doc, deleteDoc } from 'firebase/firestore'

import { Box } from "@mui/system"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { pink } from '@mui/material/colors'

import { Firestore } from '../../../Firebase'

export default function Form({ children, handleSubmit, gridTemplateColumnsCustom }) {
  const [openDialog, setOpenDialog] = useState(false)

  const gridTemplateColumns = (gridTemplateColumnsCustom ?? { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' })

  const router = useRouter()

  async function handleCancelClick(event) {
    event.preventDefault()
    setOpenDialog(true)
  }

  async function handleDialogCancelClick() {

    const propertyId = router.query.id

    if (propertyId) {
      const ref = doc(Firestore, 'properties', propertyId)
      deleteDoc(ref)
    }

    router.push('/imoveis')
  }

  return (
    <Box
      component='form'
      position='relative'
      display='grid'
      width='100%'
      sx={{
        gridTemplateColumns: gridTemplateColumns,
        gridColumnGap: '2%',
        gridRowGap: 28,
      }}
      onSubmit={handleSubmit}
    >

      {children}

      <Box
        position='fixed'
        display='flex'
        justifyContent='space-between'
        bottom='0'
        left='240px'
        right='8px'
        px={2}
        py={1}
        bgcolor='#fff'
        sx={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.3)' }}
      >
        <Button
          variant='outlined'
          sx={{
            fontSize: 12,
            fontWeight: 'regular',
            px: 3,
            py: 2,
            color: 'secondary.main',
            borderColor: 'secondary.main',
            ':hover': {
              borderColor: 'secondary.light',
              backgroundColor: pink[50]
            }
          }}
          onClick={handleCancelClick}
        >
          Cancelar
        </Button>

        <Button
          variant='contained'
          sx={{
            fontSize: 12,
            fontWeight: 'regular',
            px: 3,
            py: 2,
            backgroundColor: 'secondary.main',
            ':hover': {
              backgroundColor: 'secondary.light'
            }
          }}
          type='submit'
        >
          {(router.asPath == '/imoveis/novo/publicacao' ? 'Finalizar' : 'Próximo')}
        </Button>
      </Box>

      <Dialog open={openDialog}>
        <DialogTitle>Deseja cancelar?</DialogTitle>

        <DialogContent>
          <DialogContentText>Todas as informações serão excluídas.</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color='info' onClick={() => setOpenDialog(false)}>Não</Button>
          <Button variant='contained' color='error' onClick={handleDialogCancelClick}>Sim</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}