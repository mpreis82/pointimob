import { Box } from '@mui/system'
import { MdOutlineAdd, MdOutlineCheck, MdOutlineAttachMoney, MdDeleteOutline, MdPeople, MdSupportAgent, MdOutlineReport, MdOutlineAutoStories, MdOutlineFavorite, MdRemoveRedEye, MdSettings, MdPostAdd, MdOutlineWarning } from 'react-icons/md'
import HeaderNavItem from "../HeaderNavItem"

export default function HeaderNav() {
  return (
    <Box component='nav' height='100%' display='flex' alignItems='center'>
      <HeaderNavItem
        label='Início'
        href='/'
      />

      <HeaderNavItem
        label='Imóveis'
        href='/imoveis'
        subitems={
          [
            { label: 'Novo imóvel', description: 'Cadastre um novo imóvel', href: '/imoveis/novo/informacoes', icon: <MdOutlineAdd /> },
            { label: 'Imóveis disponíveis', description: 'Seus imóveis disponíveis', href: '/#', icon: < MdOutlineCheck /> },
            { label: 'Imóveis vendidos', description: 'Seus imóveis vendidos', href: '/#', icon: <MdOutlineAttachMoney /> },
            { label: 'Imóveis inativos', description: 'Seus imóveis inativos', href: '/#', icon: <MdDeleteOutline /> },
          ]
        }
      />

      <HeaderNavItem
        label='Clientes'
        href='/clients/show'
        subitems={
          [
            { label: 'Cadastrar novo cliente', description: 'Cadastre um novo cliente', href: '/#', icon: <MdOutlineAdd /> },
            { label: 'Meus clientes', description: 'Veja todos os seus clientes', href: '/#', icon: <MdPeople /> },
          ]
        }
      />

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
        href='/ajuda'
        subitems={
          [
            { label: 'Falar com o suporte', description: 'Nossos contatos', href: '/#', icon: <MdSupportAgent /> },
            { label: 'Central de ajuda', description: 'Manual de uso', href: '/#', icon: <MdOutlineAutoStories /> },
            { label: 'Sugerir novos recursos', description: 'Nos ajude a melhorar', href: '/#', icon: <MdOutlineFavorite /> },
            { label: 'Relatar um problema', description: 'Informe um problema de uso', href: '/#', icon: <MdOutlineWarning /> },
          ]
        }
      />
    </Box>
  )
}
