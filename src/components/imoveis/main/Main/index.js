import { Box } from "@mui/system"
import { grey, pink } from '@mui/material/colors'

export default function Main({ children, title }) {

  return (
    <Box
      component='main'
      width='100%'
      position='relative'
      bgcolor={grey[200]}
      overflow='scroll'
      p={2}
      pb={10}
      sx={{
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
      <Box
        component='h2'
        color={'secondary.main'}
        fontWeight='bold'
        mb={4}
      >
        {title}
      </Box>

      <Box
        position='relative'
        width='100%'
        bgcolor='#fff'
        p={3}
        boxShadow={3}
      >
        {children}
      </Box>
    </Box>
  )
}