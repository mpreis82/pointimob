import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from "next/link";

import MaterialLink from '@mui/material/Link'
import { Box, Typography } from "@mui/material";

import { MdPerson, MdOutlineCardTravel, MdExitToApp } from 'react-icons/md'
import { grey } from '@mui/material/colors';

const settingsItems = [
  { label: 'Meus dados', href: '/configuracoes/meus-dados', icon: <MdPerson /> },
  { label: 'Financeiro', href: '/configuracoes/financeiro', icon: <MdOutlineCardTravel /> }
]

export default function AsideNavConfig() {
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return
    console.log(router.asPath)

  }, [router.isReady])

  return (
    <Box p={2}>
      <Box fontWeight='bold' mb={2}>Configurações</Box>
      <Box component='ul'>
        {settingsItems.map((item, index) => (
          <Box
            key={index}
            component='li'
            position='relative' borderRadius={1} px={1} mb={0.5} bgcolor={(router.asPath == item.href ? grey[200] : '')}
            sx={{ ':hover': { backgroundColor: grey[200] } }}
          >
            <Link href={item.href} passHref={true}>
              <MaterialLink display='flex' alignItems='center' py={1} underline='none' >
                <Typography color='secondary' lineHeight={1}>
                  {item.icon}
                </Typography>

                <Typography ml={1} >
                  {item.label}
                </Typography>
              </MaterialLink>
            </Link>
          </Box>
        ))}
      </Box>
    </Box >
  )
}