import { createRef, useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Box } from "@mui/system"
import { Autocomplete, Button, FormControl, InputAdornment, MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { grey } from "@mui/material/colors"
import SelectPropertyTypes from '../../../SelectPropertyTypes'
import { Firestore } from '../../../../Firebase'
import style from './style.module.css'

const ufList = ['Todos', 'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO',]

export default function ImoveisListAside({ setPropertiesList, setIsBackdrop, user }) {
  const asideFilterBoxRef = createRef()
  const [positionButtons, setPositionButtons] = useState('sticky')
  const [type, setType] = useState('')
  const [transaction, setTransaction] = useState('Venda')
  const [profile, setProfile] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [uf, setUf] = useState('Todos')
  const [cityList, setCityList] = useState(['Todas'])
  const [city, setCity] = useState('Todas')

  useEffect(() => {
    const asideEl = asideFilterBoxRef.current.parentNode

    if (asideEl.scrollHeight <= asideEl.offsetHeight) {
      setPositionButtons('absolute')
    } else {
      setPositionButtons('sticky')
    }

    if (asideFilterBoxRef.current != null) {
      function asideButtonsPosition() {
        if (asideFilterBoxRef.current) {
          if (asideEl.scrollHeight <= asideEl.offsetHeight) {
            setPositionButtons('absolute')
          } else {
            setPositionButtons('sticky')
          }
        }
      }
      window.removeEventListener('resize', asideButtonsPosition, true)
      window.addEventListener('resize', asideButtonsPosition, true)
    }
  }, [asideFilterBoxRef])

  function handleType(event) {
    setType(event.target.value)
  }

  function handleTransaction(event, newValue) {
    setTransaction(newValue)
  }

  function handleProfile(event) {
    setProfile(event.target.value)
  }

  function handleMinPrice(event) {
    let value = event.target.value

    if (value.replace(/\D/g, '') == 0) {
      setMinPrice('')
      return
    }

    value = Intl.NumberFormat('pt-BR',
      { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      .format(value.replace(/\D/g, '') / 100)

    setMinPrice(value)
  }

  function handleMaxPrice(event) {
    let value = event.target.value

    if (value.replace(/\D/g, '') == 0) {
      setMaxPrice('')
      return
    }

    value = Intl.NumberFormat('pt-BR',
      { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      .format(value.replace(/\D/g, '') / 100)

    setMaxPrice(value)
  }

  async function handleUf(event, newValue) {
    setUf(newValue)

    if (newValue != '' && newValue != 'Todos') {
      const result = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${newValue}/distritos`)

      if (result.status == 200) {
        const data = await result.json()
        let newCityList = data.map(c => c.municipio.nome)
        newCityList.unshift('Todas')
        setCityList([...new Set(newCityList)])
      }
    }
  }

  function handleCity(event, newValue) {
    setCity(newValue)
  }

  async function handleFilterClick(event) {
    setIsBackdrop(true)

    const queryConstraints = []

    queryConstraints.push(where('uid', '==', user.uid))
    queryConstraints.push(where('financial.transaction', '==', transaction))
    if (type) queryConstraints.push(where('initial_informations.subtype.docId', '==', type))
    if (profile) queryConstraints.push(where('initial_informations.profile', '==', profile))
    if (uf != 'Todos') queryConstraints.push(where('location.uf', '==', uf))
    if (city != 'Todas') queryConstraints.push(where('location.city', '==', city))

    const q = query(collection(Firestore, 'properties'), ...queryConstraints)
    const querySnap = await getDocs(q)
    const list = []
    querySnap.forEach((doc) => {
      list.push({ docId: doc.id, ...doc.data() })
    })

    setPropertiesList(list
      .filter(property => Number(property.financial.price) >= Number(minPrice ? (minPrice.replace(/\D/g, '') / 100) : 0))
      .filter(property => Number(property.financial.price) <= Number(maxPrice ? (maxPrice.replace(/\D/g, '') / 100) : Number.MAX_VALUE))
    )

    setIsBackdrop(false)
  }

  async function handleClearFilterClick(event) {
    setIsBackdrop(true)

    setType('')
    setTransaction('Venda')
    setProfile('')
    setMinPrice('')
    setMaxPrice('')
    setUf('Todos')
    setCityList(['Todas'])
    setCity('Todas')

    const q = query(collection(Firestore, 'properties'), where('uid', '==', user.uid))
    const querySnap = await getDocs(q)
    const list = []
    querySnap.forEach((doc) => {
      list.push({ docId: doc.id, ...doc.data() })
    })
    setPropertiesList(list)
    setIsBackdrop(false)
  }

  return (
    <>
      <Box padding={2} ref={asideFilterBoxRef}>
        <Box fontWeight='bold' mb={2}>FILTROS:</Box>

        <SelectPropertyTypes value={type} setValue={handleType} size='small' />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <Box component='label' fontWeight='bold' mb={1}>Tipo de transação</Box>
          <ToggleButtonGroup
            name='transaction'
            id='transaction'
            value={transaction}
            exclusive
            color='primary'
            position='relative'
            sx={{ height: '100%' }}
            onChange={handleTransaction}
          >
            <ToggleButton name='transaction' size="small" sx={{ width: '50%', height: '100%' }} value='Venda'>Venda</ToggleButton>
            <ToggleButton name='transaction' size="small" sx={{ width: '50%', height: '100%' }} value='Aluguel'>Aluguel</ToggleButton>
          </ToggleButtonGroup>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }} size='small'>
          <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Perfil do imóvel</Box>
          <Select name="profile" value={profile} onChange={handleProfile}>
            <MenuItem value={'Residencial'}>Residencial</MenuItem>
            <MenuItem value={'Comercial'}>Comercial</MenuItem>
            <MenuItem value={'Residencial/Comercial'}>Residencial/Comercial</MenuItem>
            <MenuItem value={'Industrial'}>Industrial</MenuItem>
            <MenuItem value={'Rural'}>Rural</MenuItem>
            <MenuItem value={'Temporada'}>Temporada</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} size='small'>
          <Box component='label' fontWeight='bold' mb={1}>Valor do Imóvel</Box>
          <Box display='flex' flexDirection='row'>
            <TextField className={style.price} name="price" value={minPrice} onChange={handleMinPrice} sx={{ mr: 1 }} size='small' InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }} />
            <TextField className={style.price} name="price" value={maxPrice} onChange={handleMaxPrice} size='small' InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }} />
          </Box>
        </FormControl>

        <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} size='small'>
          <Box component='label' fontWeight='bold' mb={1}>Estado</Box>
          <Autocomplete
            value={uf}
            name='uf'
            size='small'
            onChange={(event, newValue) => handleUf(event, newValue)}
            options={ufList}
            renderInput={(params) => <TextField {...params} />}
          />
        </FormControl>

        <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
          <Box component='label' fontWeight='bold' mb={1}>Cidade</Box>
          <Autocomplete
            value={city}
            name='city'
            size="small"
            onChange={(event, newValue) => handleCity(event, newValue)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            options={cityList}
            renderInput={(params) => <TextField {...params} />}
          />
        </FormControl>
      </Box>

      <Box width='100%' position={positionButtons} bottom='0' bgcolor={grey[300]} zIndex='99' display='grid' gridTemplateColumns='1fr 1fr' gap={1} p={1}>
        <Button variant='outlined' color='secondary' fullWidth onClick={handleClearFilterClick}>Limpar</Button>
        <Button variant='contained' color='secondary' fullWidth onClick={handleFilterClick}>Filtrar</Button>
      </Box>
    </>
  )
}