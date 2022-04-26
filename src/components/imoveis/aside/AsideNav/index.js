import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box } from "@mui/system"
import AsideNavItem from '../AsideNavItem'

export default function AsideNav() {
  const [currentStep, setCurrentStep] = useState()

  const [disabled, setDisabled] = useState(true)

  const router = useRouter()

  useEffect(() => {
    console.log(localStorage.getItem('new_property_id'))
    if (localStorage.getItem('new_property_id')) {
      setDisabled(false)
    }
  }, [])

  const [informationValid, setInformationValid] = useState(true)

  useEffect(() => {
    handleCurrentStep()
  });

  const steps = [
    { label: 'Informações', href: '/imoveis/novo/informacoes', disabled: false },
    { label: 'Cômodos', href: '/imoveis/novo/comodos', disabled },
    { label: 'Medidas', href: '/imoveis/novo/medidas', disabled },
    { label: 'Preço', href: '/imoveis/novo/preco', disabled },
    { label: 'Características', href: '/imoveis/novo/caracteristicas', disabled },
    { label: 'Condomínio', href: '/imoveis/novo/condominio', disabled },
    { label: 'Localização', href: '/imoveis/novo/localizacao', disabled },
    { label: 'Proximidades', href: '/imoveis/novo/proximidades', disabled },
    { label: 'Descrição', href: '/imoveis/novo/descricao', disabled },
    // { label: 'Vídeo', href: '/imoveis/novo/video', disabled },
    // { label: '360º', href: '/imoveis/novo/visao-360', disabled },
    // { label: 'SEO', href: '/imoveis/novo/seo', disabled },
    // { label: 'Dados privativos', href: '/imoveis/novo/dados-privativos', disabled },
    { label: 'Imagens', href: '/imoveis/novo/imagens', disabled },
    { label: 'Publicação', href: '/imoveis/novo/publicacao', disabled },
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
              disabled={step.disabled}
            />
          )
        })}
      </Box>
    </>
  )
}