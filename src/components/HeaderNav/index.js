import { useState } from 'react'
import { Box } from '@mui/system'
import { MdOutlineAdd, MdOutlineCheck, MdOutlineAttachMoney, MdDeleteOutline, MdSupportAgent, MdOutlineAutoStories, MdOutlineFavorite, MdRemoveRedEye, MdSettings, MdPostAdd, MdOutlineWarning, MdOutlineFamilyRestroom } from 'react-icons/md'
import HeaderNavItem from "../HeaderNavItem"
import TalkSupport from '../help/TalkSupport'
import FeatureSuggest from '../help/FeatureSuggest'
import ReportProblem from '../help/ReportProblem'

export default function HeaderNav() {
  const [openTalkSupport, setOpenTalkSupport] = useState(false)
  const [openFeatureSuggest, setOpenFeatureSuggest] = useState(false)
  const [openReportProblem, setOpenReportProblem] = useState(false)

  function handleOpenTalkSupportClick(event) {
    event.preventDefault()
    setOpenTalkSupport(true)
  }

  function handleOpenFeatureSuggest(event) {
    event.preventDefault()
    setOpenFeatureSuggest(true)
  }

  function handleOpenReportProblem(event) {
    event.preventDefault()
    setOpenReportProblem(true)
  }

  return (
    <Box component='nav' height='100%' display='flex' alignItems='center'>
      <HeaderNavItem label='Início' href='/' />

      <HeaderNavItem
        label='Imóveis'
        href='/imoveis'
        subitems={
          [
            { label: 'Imóveis disponíveis', description: 'Seus imóveis disponíveis', href: '/imoveis', icon: < MdOutlineCheck /> },
            { label: 'Novo imóvel', description: 'Cadastre um novo imóvel', href: '/imoveis/novo/informacoes', icon: <MdOutlineAdd /> },
            { label: 'Imóveis vendidos', description: 'Seus imóveis vendidos', href: '/imoveis/vendidos', icon: <MdOutlineAttachMoney /> },
            { label: 'Imóveis alugados', description: 'Seus imóveis alugados', href: '/imoveis/alugados', icon: <MdOutlineFamilyRestroom /> },
            { label: 'Imóveis inativos', description: 'Seus imóveis inativos', href: '/imoveis/inativos', icon: <MdDeleteOutline /> },
          ]
        }
      />

      {/* <HeaderNavItem
        label='Clientes'
        href='/clients/show'
        subitems={
          [
            { label: 'Cadastrar novo cliente', description: 'Cadastre um novo cliente', href: '/#', icon: <MdOutlineAdd /> },
            { label: 'Meus clientes', description: 'Veja todos os seus clientes', href: '/#', icon: <MdPeople /> },
          ]
        }
      /> */}

      <HeaderNavItem
        label='Site'
        href='/site'
        subitems={
          [
            { label: 'Aparência do site', description: 'Capriche nos detalhes', href: '/#', icon: <MdRemoveRedEye /> },
            { label: 'Configurações', description: 'Configure o seu site', href: '/#', icon: <MdSettings /> },
            { label: 'Postagens', description: 'Crie e publique no seu site', href: '/#', icon: <MdPostAdd /> },
          ]
        }
      />

      <HeaderNavItem
        label='Ajuda'
        href='/#'
        subitems={
          [
            { label: 'Falar com o suporte', description: 'Nossos contatos', href: '/#', icon: <MdSupportAgent />, onClickAction: handleOpenTalkSupportClick },
            // { label: 'Central de ajuda', description: 'Manual de uso', href: '/#', icon: <MdOutlineAutoStories />, onClickAction: () => { console.log('Central de ajuda') } },
            { label: 'Sugerir novos recursos', description: 'Nos ajude a melhorar', href: '/#', icon: <MdOutlineFavorite />, onClickAction: handleOpenFeatureSuggest },
            { label: 'Relatar um problema', description: 'Informe um problema de uso', href: '/#', icon: <MdOutlineWarning />, onClickAction: handleOpenReportProblem },
          ]
        }
      />

      <TalkSupport openTalkSupport={openTalkSupport} setOpenTalkSupport={setOpenTalkSupport} />

      <FeatureSuggest open={openFeatureSuggest} setOpen={setOpenFeatureSuggest} />

      <ReportProblem open={openReportProblem} setOpen={setOpenReportProblem} />
    </Box>
  )
}
