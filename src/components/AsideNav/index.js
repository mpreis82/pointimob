import { Box } from "@mui/system"
import { grey, pink } from '@mui/material/colors'

export default function AsideNav({ children }) {

  return (
    <Box
      component='aside'
      maxWidth='240px'
      width='100%'
      bgcolor='#fff'
      padding={2}
      overflow='auto'
      zIndex='88'
      position='relative'
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
      {children}
    </Box >
  )
}
