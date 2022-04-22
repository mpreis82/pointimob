import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Box } from "@mui/system"
import AsideNavItem from '../AsideNavItem'

export default function AsideNav() {
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState()

  const [informationValid, setInformationValid] = useState(true)

  useEffect(() => {
    handleCurrentStep()
  });

  const steps = [
    { label: 'Informações', href: '/imoveis/novo/informacoes' },
    { label: 'Cômodos', href: '/imoveis/novo/comodos' },
    { label: 'Medidas', href: '/imoveis/novo/medidas' },
    { label: 'Preço', href: '/imoveis/novo/preco' },
    { label: 'Características', href: '/imoveis/novo/caracteristicas' },
    { label: 'Condomínio', href: '/imoveis/novo/condominio' },
    { label: 'Localização', href: '/imoveis/novo/localizacao' },
    { label: 'Proximidades', href: '/imoveis/novo/proximidades' },
    { label: 'Descrição', href: '/imoveis/novo/descricao' },
    // { label: 'Vídeo', href: '/imoveis/novo/video' },
    // { label: '360º', href: '/imoveis/novo/visao-360' },
    // { label: 'SEO', href: '/imoveis/novo/seo' },
    // { label: 'Dados privativos', href: '/imoveis/novo/dados-privativos' },
    { label: 'Imagens', href: '/imoveis/novo/imagens' },
    { label: 'Publicação', href: '/imoveis/novo/publicacao' },
  ]

  function handleCurrentStep() {
    steps.map((step, index) => {
      if (router.asPath == step.href) {
        setCurrentStep(index)
      }
    })
  }

  return (
    <>
      <Box fontWeight='bold' mb={2}>Passo a passo:</Box>
      <Box component='ul'>
        {steps.map((step, index) => {
          return (
            <AsideNavItem
              key={index}
              label={step.label}
              href={step.href}
              currentStep={currentStep}
              informationValid={informationValid}
              index={index}
            />
          )
        })}
      </Box>
    </>
  )
}