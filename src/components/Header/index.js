import { useState } from 'react'
import Link from 'next/link'
import { Avatar, Badge, Button, IconButton } from "@mui/material"
import { green, grey, pink, purple } from "@mui/material/colors"
import { Box } from "@mui/system"
import { MdNotifications } from 'react-icons/md'
import HeaderNav from "../HeaderNav"
import SettingsNav from '../SettingsNav'

function Header() {
  const [notification, setNotification] = useState(1)

  return (
    <Box
      height={45}
      position='relative'
      component='header'
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      px={2}
      bgcolor={purple[800]}
      color={grey[200]}
    >
      <Box component='h1' fontSize={16}>Pointimob</Box>

      <HeaderNav />

      <Box display='flex' alignItems='center' height='100%'>
        <Box mx={1}>
          <Link href='/' passHref={true}>
            <Button
              variant="contained"
              size='small'
              sx={{
                fontWeight: 'regular',
                backgroundColor: green[400],
                boxShadow: 0,
                fontSize: '12px',
                ':hover': {
                  backgroundColor: green[500],
                  boxShadow: 0,
                }
              }}>
              Ver site
            </Button>
          </Link>
        </Box>

        <Box width='1px' minHeight='30%' bgcolor={purple[300]} mx={0.5}></Box>

        <IconButton mx={1} color='white' onClick={() => setNotification(0)}>
          <Badge
            badgeContent={notification}
            variant='dot'
            color='error'
            overlap="circular"
          >
            <MdNotifications fontSize={20} />
          </Badge>
        </IconButton>

        <Box width='1px' minHeight='30%' bgcolor={purple[300]} mx={0.5}></Box>

        <Avatar sx={{ mx: 1, bgcolor: pink[600], width: 24, height: 24, fontSize: 12 }} >M</Avatar>

        <Box width='1px' minHeight='30%' bgcolor={purple[300]} mx={0.5}></Box>

        <SettingsNav />

      </Box>
    </Box >
  )
}

export { Header }