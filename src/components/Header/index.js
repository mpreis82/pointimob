import { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Avatar, Badge, Button, IconButton } from "@mui/material"
import { green, grey, pink, purple } from "@mui/material/colors"
import { Box } from "@mui/system"

import { MdNotifications } from 'react-icons/md'

import HeaderNav from "../HeaderNav"
import SettingsNav from '../SettingsNav'

import { AuthContext } from '../../contexts/AuthContext'

import logo from '../../../public/images/logoBranco.png'

function Header() {
  const [notification, setNotification] = useState(1)

  const authContext = useContext(AuthContext)

  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(authContext.currentUser)
  }, [user])

  if (user) {
    return (
      <Box component='header' height={45} position='relative' display='flex' alignItems='center' justifyContent='space-between' px={2} bgcolor={purple[800]} color={grey[200]}>
        <Box>
          <Box width='80px' display='flex' alignItems='center'>
            <Image src={logo} priority />
          </Box>
        </Box>

        <HeaderNav />

        <Box display='flex' alignItems='center' height='100%'>
          <Box mx={1}>
            <Link href='/' passHref={true}>
              <Button variant="contained" size='small' sx={{ fontWeight: 'regular', backgroundColor: green[400], boxShadow: 0, fontSize: '12px', ':hover': { backgroundColor: green[500], boxShadow: 0, } }}>
                Ver site
              </Button>
            </Link>
          </Box>

          <Box width='1px' minHeight='30%' bgcolor={purple[300]} mx={0.5}></Box>

          <IconButton mx={1} color='white' onClick={() => setNotification(0)}>
            <Badge badgeContent={notification} variant='dot' color='error' overlap="circular" >
              <MdNotifications fontSize={20} />
            </Badge>
          </IconButton>

          <Box width='1px' minHeight='30%' bgcolor={purple[300]} mx={0.5}></Box>

          <Avatar sx={{ mx: 1, bgcolor: pink[600], width: 24, height: 24, fontSize: 12 }} >
            {(user.username ? user.username.charAt(0) : '')}
          </Avatar>

          <Box width='1px' minHeight='30%' bgcolor={purple[300]} mx={0.5}></Box>

          <SettingsNav />

        </Box>
      </Box >
    )
  }
  return <></>
}

export { Header }