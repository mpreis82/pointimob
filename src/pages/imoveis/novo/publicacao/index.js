import { Box } from "@mui/system"
import { grey } from '@mui/material/colors'
import AsideNav from "../../../../components/AsideNav"
import ImoveisAsideNav from '../../../../components/imoveis/aside/AsideNav'

export default function Publicacao() {
  return (
    <Box display='flex' height='calc(100% - 45px)' bgcolor='silver' overflow='hidden'>
      <AsideNav>
        <ImoveisAsideNav />
      </AsideNav>

      <Box
        component='main'
        width='100%'
        bgcolor={grey[100]}
      >
        Comodos
      </Box>
    </Box >
  )
}
