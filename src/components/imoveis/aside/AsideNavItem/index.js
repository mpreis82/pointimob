import Link from 'next/link'
import { useRouter } from 'next/router'
import { Box } from "@mui/system"
import { grey, pink } from '@mui/material/colors'
import MaterialLink from '@mui/material/Link'

export default function AsideNavItem({ label, href, currentStep, index, disabled = false }) {

  const router = useRouter()

  return (
    <Box
      component='li'
      position='relative'
      borderRadius={1}
      bgcolor={(router.asPath == href ? grey[100] : 'transparent')}
      px={1}
      sx={{
        '::after': {
          content: '""',
          position: 'absolute',
          width: 2,
          height: '100%',
          backgroundColor: (index <= currentStep ? pink[600] : grey[300]),
          top: '50%',
          left: 13,
          zIndex: 1,
        },
        ':last-of-type': {
          '::after': {
            height: 0
          }
        }
      }}
    >
      <Link href={(disabled == true ? '#' : href)} passHref={true} >
        <MaterialLink
          display='flex'
          alignItems='center'
          py={1}
          underline='none'
          sx={{ pointerEvents: (!disabled ? 'auto' : 'none'), cursor: (disabled == true ? 'not-allowed' : 'pointer') }}
        >
          <Box
            component='span'
            display='inline-block'
            width='12px'
            height='12px'
            mr={1}
            borderRadius={999}
            zIndex='999'
            bgcolor={((index <= currentStep) ? pink[600] : grey[300])}
          >
          </Box>

          <Box color={(disabled == true ? grey[400] : 'primary')}>{label}</Box>

        </MaterialLink>
      </Link>
    </Box>
  )
}
