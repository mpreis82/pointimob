import { Box } from "@mui/system";

import Main from "../../../../components/imoveis/main/Main"
import AsideNav from '../../../../components/AsideNav'
import AsideNavConfig from '../../../../components/Configuracoes/AsideNavConfig'

export default function Financeiro() {
  return (
    <Box display='flex' height='calc(100% - 45px)' bgcolor='silver' overflow='hidden'>
      <AsideNav>
        <AsideNavConfig />
      </AsideNav>

      <Main title='Financeiro'>

      </Main>
    </Box>
  )
}