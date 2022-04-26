import { useRouter } from 'next/router'
import { Box } from "@mui/system"
import { Button } from "@mui/material"
import { pink } from '@mui/material/colors'

export default function Form({ children, handleSubmit, gridTemplateColumnsCustom }) {
  const gridTemplateColumns = (gridTemplateColumnsCustom ?? { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' })

  const router = useRouter()

  function handleCancelClick(event) {
    event.preventDefault()
    localStorage.removeItem('new_property_id')
    router.push('/')
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
    </Box>
  )
}