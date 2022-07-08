import { useState } from "react"
import Link from "next/link"
import { Box } from '@mui/system'
import MaterialLink from '@mui/material/Link'
import { grey, pink, purple } from "@mui/material/colors"
import { Grow } from "@mui/material"

export default function HeaderNavItem(props) {
  const [open, setOpen] = useState(false)
  const label = props.label
  const href = props.href
  const subitems = props.subitems ?? []

  return (
    <Box component="span" position='relative' display='flex' alignItems='center' height='100%' sx={{ ':hover div': { display: 'flex' } }} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link href={href} passHref={true}>
        <MaterialLink height='100%' underline='none' px={2} display='flex' alignItems='center' color={grey[100]} bgcolor={purple[800]} fontWeight='light' sx={{ transitionDuration: '0.3s', ':hover': { filter: 'brightness(0.8)' } }}>
          {label}
        </MaterialLink>
      </Link>
      {
        (subitems.length > 0) && (
          <Grow in={open}>
            <Box component="div" position='absolute' display='flex' top='100%' left='-50%' width={260} bgcolor='#fff' zIndex='99' sx={{ boxShadow: 3 }}>
              <Box component="ul" width='100%' bgcolor='#fff' sx={{ display: 'flex', flexDirection: 'column' }}>
                {subitems.map((subitem, index) => (
                  <Box key={index} component="li" width='100%' position='relative' fontSize={14}>
                    <Link href={subitem.href} passHref={true}>
                      <MaterialLink onClick={(subitem.onClickAction ? subitem.onClickAction : false)} component='a' underline='none' p={1} display='flex' alignItems='center' width='100%' borderBottom={1} borderColor={grey[300]} sx={{ ':hover': { bgcolor: grey[200] } }}>
                        <Box component='span' height={24} minHeight={24} width={24} minWidth={24} display='flex' alignItems='center' justifyContent='center' bgcolor={pink[600]} color={grey[100]} mr={2} borderRadius={999} fontSize={18} overflow='hidden' >
                          {subitem.icon}
                        </Box>
                        <Box component='span'>
                          <Box component='p' color={grey[800]} fontWeight='bold'>{subitem.label}</Box>
                          <Box component='p' color={grey[600]}>{subitem.description}</Box>
                        </Box>
                      </MaterialLink>
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grow>
        )
      }
    </Box >
  )
}