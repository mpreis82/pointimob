import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box } from '@mui/system'
import AsideNavItem from '../AsideNavItem'

export default function AsideNav({ property }) {
  const [currentStep, setCurrentStep] = useState()
  const [propertyId, setPropertyId] = useState('')
  const [steps, setSteps] = useState([])
  const [action, setAction] = useState('')

  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return

    const localPropertyId = router.query.id

    setAction((/\/imoveis\/editar\/.+/).test(router.asPath) ? 'editar' : 'novo')

    if (localPropertyId) {
      setPropertyId(localPropertyId)
    }
  }, [router.isReady])

  useEffect(() => {
    handleStep()
  }, [propertyId, property])

  function handleStep() {
    let listSteps = []

    if (property.initial_informations.subtype.type != 'Terreno') {
      listSteps = [
        { label: 'Informações', href: (propertyId.length > 0 ? `/imoveis/${action}/${propertyId}/informacoes` : '/imoveis/novo/informacoes'), disabled: false },
        { label: 'Cômodos', href: (propertyId.length > 0 ? `/imoveis/${action}/${propertyId}/comodos` : '#'), disabled: (propertyId.length > 0 ? false : true) },
        { label: 'Medidas', href: (propertyId.length > 0 ? `/imoveis/${action}/${propertyId}/medidas` : '#'), disabled: (propertyId.length > 0 ? false : true) },
        { label: 'Preço', href: (propertyId.length > 0 ? `/imoveis/${action}/${propertyId}/preco` : '#'), disabled: (propertyId.length > 0 ? false : true) },
        { label: 'Características', href: (propertyId.length > 0 ? `/imoveis/${action}/${propertyId}/caracteristicas` : '#'), disabled: (propertyId.length > 0 ? false : true) },
        { label: 'Condomínio', href: (propertyId.length > 0 ? `/imoveis/${action}/${propertyId}/condominio` : '#'), disabled: (propertyId.length > 0 ? false : true) },
        { label: 'Localização', href: (propertyId.length > 0 ? `/imoveis/${action}/${propertyId}/localizacao` : '#'), disabled: (propertyId.length > 0 ? false : true) },
        { label: 'Proximidades', href: (propertyId.length > 0 ? `/imoveis/${action}/${propertyId}/proximidades` : '#'), disabled: (propertyId.length > 0 ? false : true) },
        { label: 'Descrição', href: (propertyId.length > 0 ? `/imoveis/${action}/${propertyId}/descricao` : '#'), disabled: (propertyId.length > 0 ? false : true) },
        { label: 'Imagens', href: (propertyId.length > 0 ? `/imoveis/${action}/${propertyId}/imagens` : '#'), disabled: (propertyId.length > 0 ? false : true) },
        { label: 'Publicação', href: (propertyId.length > 0 ? `/imoveis/${action}/${propertyId}/publicacao` : '#'), disabled: (propertyId.length > 0 ? false : true) },
      ]
    } else {
      listSteps = [
        { label: 'Informações', href: (propertyId.length > 0 ? `/imoveis/${action}/${propertyId}/informacoes` : '/imoveis/novo/informacoes'), disabled: false },
        { label: 'Medidas', href: (propertyId.length > 0 ? `/imoveis/${action}/${propertyId}/medidas` : '#'), disabled: (propertyId.length > 0 ? false : true) },
        { label: 'Preço', href: (propertyId.length > 0 ? `/imoveis/${action}/${propertyId}/preco` : '#'), disabled: (propertyId.length > 0 ? false : true) },
        { label: 'Características', href: (propertyId.length > 0 ? `/imoveis/${action}/${propertyId}/caracteristicas` : '#'), disabled: (propertyId.length > 0 ? false : true) },
        { label: 'Condomínio', href: (propertyId.length > 0 ? `/imoveis/${action}/${propertyId}/condominio` : '#'), disabled: (propertyId.length > 0 ? false : true) },
        { label: 'Localização', href: (propertyId.length > 0 ? `/imoveis/${action}/${propertyId}/localizacao` : '#'), disabled: (propertyId.length > 0 ? false : true) },
        { label: 'Proximidades', href: (propertyId.length > 0 ? `/imoveis/${action}/${propertyId}/proximidades` : '#'), disabled: (propertyId.length > 0 ? false : true) },
        { label: 'Descrição', href: (propertyId.length > 0 ? `/imoveis/${action}/${propertyId}/descricao` : '#'), disabled: (propertyId.length > 0 ? false : true) },
        { label: 'Imagens', href: (propertyId.length > 0 ? `/imoveis/${action}/${propertyId}/imagens` : '#'), disabled: (propertyId.length > 0 ? false : true) },
        { label: 'Publicação', href: (propertyId.length > 0 ? `/imoveis/${action}/${propertyId}/publicacao` : '#'), disabled: (propertyId.length > 0 ? false : true) },
      ]
    }

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