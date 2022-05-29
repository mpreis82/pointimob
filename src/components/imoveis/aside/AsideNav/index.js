import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box } from '@mui/system'
import AsideNavItem from '../AsideNavItem'

export default function AsideNav() {
  const [currentStep, setCurrentStep] = useState()
  const [propertyId, setPropertyId] = useState('')
  const [steps, setSteps] = useState([])

  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return

    const localPropertyId = router.query.id

    if (localPropertyId) {
      setPropertyId(localPropertyId)
    }
  }, [router.isReady])

  useEffect(() => {
    handleStep()
  }, [propertyId])

  function handleStep() {
    const listSteps = [
      { label: 'Informações', href: (propertyId.length > 0 ? `/imoveis/novo/${propertyId}/informacoes` : '/imoveis/novo/informacoes'), disabled: false },
      { label: 'Cômodos', href: (propertyId.length > 0 ? `/imoveis/novo/${propertyId}/comodos` : '#'), disabled: (propertyId.length > 0 ? false : true) },
      { label: 'Medidas', href: (propertyId.length > 0 ? `/imoveis/novo/${propertyId}/medidas` : '#'), disabled: (propertyId.length > 0 ? false : true) },
      { label: 'Preço', href: (propertyId.length > 0 ? `/imoveis/novo/${propertyId}/preco` : '#'), disabled: (propertyId.length > 0 ? false : true) },
      { label: 'Características', href: (propertyId.length > 0 ? `/imoveis/novo/${propertyId}/caracteristicas` : '#'), disabled: (propertyId.length > 0 ? false : true) },
      { label: 'Condomínio', href: (propertyId.length > 0 ? `/imoveis/novo/${propertyId}/condominio` : '#'), disabled: (propertyId.length > 0 ? false : true) },
      { label: 'Localização', href: (propertyId.length > 0 ? `/imoveis/novo/${propertyId}/localizacao` : '#'), disabled: (propertyId.length > 0 ? false : true) },
      { label: 'Proximidades', href: (propertyId.length > 0 ? `/imoveis/novo/${propertyId}/proximidades` : '#'), disabled: (propertyId.length > 0 ? false : true) },
      { label: 'Descrição', href: (propertyId.length > 0 ? `/imoveis/novo/${propertyId}/descricao` : '#'), disabled: (propertyId.length > 0 ? false : true) },
      { label: 'Imagens', href: (propertyId.length > 0 ? `/imoveis/novo/${propertyId}/imagens` : '#'), disabled: (propertyId.length > 0 ? false : true) },
      { label: 'Publicação', href: (propertyId.length > 0 ? `/imoveis/novo/${propertyId}/publicacao` : '#'), disabled: (propertyId.length > 0 ? false : true) },
    ]

    setSteps(listSteps)

    listSteps.map((step, index) => {
      if (router.asPath == step.href) {
        setCurrentStep(index)
      }
    })
  }

  return (
    <>
      <Box p={2}>
        <Box fontWeight='bold' mb={2}>Passo a passo:</Box>
        <Box component='ul'>
          {steps.map((step, index) => {
            return (
              <AsideNavItem
                key={index}
                label={step.label}
                href={step.href}
                currentStep={currentStep}
                index={index}
                disabled={step.disabled}
              />
            )
          })}
        </Box>
      </Box>
    </>
  )
}