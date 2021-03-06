import { useState, useContext } from 'react';
import Link from 'next/link'

import { Box } from "@mui/system";
import MaterialLink from '@mui/material/Link'
import { grey, pink } from "@mui/material/colors"
import { Grow } from "@mui/material"

import { MdSettings, MdKeyboardArrowDown, MdPerson, MdOutlineLanguage, MdOutlineShare, MdEmail, MdOutlineCardTravel, MdExitToApp } from 'react-icons/md'

import { FirebaseApp } from '../../Firebase'
import { getAuth } from 'firebase/auth'

import { AuthContext } from '../../contexts/AuthContext';

export default function SettingsNav() {
  const settingsItems = [
    { label: 'Meus dados', href: '/configuracoes/meus-dados', icon: <MdPerson /> },
    // { label: 'Corretores/Usuários', href: '/', icon: <MdPerson />, action: handleActionCick },
    // { label: 'Portais imobiliários', href: '/', icon: <MdOutlineLanguage />, action: handleActionCick },
    // { label: 'Integrações', href: '/', icon: <MdOutlineShare />, action: handleActionCick },
    // { label: 'Contas de e-mail', href: '/', icon: <MdEmail />, action: handleActionCick },
    { label: 'Financeiro', href: '/configuracoes/financeiro', icon: <MdOutlineCardTravel /> },
    { label: 'Sair', href: '/', icon: <MdExitToApp />, action: handleExitClick },
  ]

  const [open, setOpen] = useState(false)

  const authContext = useContext(AuthContext)

  async function handleExitClick(event) {
    event.preventDefault()
    await authContext.logout()
  }

  function handleActionCick(event) {
    event.preventDefault()
    const auth = getAuth()
    console.log(auth.currentUser)
  }

  return (
    <Box
      height='100%'
      position='relative'
      display='flex'
      alignItems='center'
      zIndex='99999'
      sx={{ cursor: 'pointer' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Box
        color={'white'}
        display='flex'
        alignItems='center'
        sx={{ padding: 0, minWidth: 0, ml: '8px' }}
      >
        <MdSettings fontSize={16} />
        <MdKeyboardArrowDown fontSize={16} />
      </Box>

      <Grow in={open}>
        <Box
          component="div"
          position='absolute'
          display='flex'
          top='100%'
          right='0'
          width={180}
          bgcolor='#fff'
          sx={{ boxShadow: 3 }}
        >
          <Box
            component="ul"
            width='100%'
            bgcolor='white'
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            {settingsItems.map((item, index) => (
              <Box
                key={index}
                component="li"
                width='100%'
                position='relative'
                fontSize={14}
                bgcolor='white'
                sx={{
                  ':last-of-type': { borderTop: 1, borderColor: grey[300] }
                }}
              >
                <Link href={item.href} passHref={true}>
                  <MaterialLink
                    onClick={item.action}
                    component='a'
                    underline='none'
                    p={1}
                    display='flex'
                    alignItems='center'
                    width='100%'
                    borderColor={grey[300]}
                    sx={{
                      ':hover': { bgcolor: grey[200] }
                    }}
                  >
                    <Box
                      component='span'
                      height={20}
                      minHeight={20}
                      width={20}
                      minWidth={20}
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                      bgcolor={pink[600]}
                      color={grey[100]}
                      mr={1}
                      borderRadius={999}
                      fontSize={14}
                      overflow='hidden'
                    >
                      {item.icon}
                    </Box>
                    <Box component='span'>
                      <Box component='p' color={grey[800]}>{item.label}</Box>
                    </Box>
                  </MaterialLink>
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
      </Grow>
    </Box >
  )
}