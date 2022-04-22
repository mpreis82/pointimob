import { useEffect, useState } from 'react'
import { Box } from "@mui/system"
import { FormControl, FormGroup, FormControlLabel, ToggleButtonGroup, ToggleButton, TextField, Checkbox } from '@mui/material'
import { grey } from '@mui/material/colors'
import AsideNav from "../../../../components/AsideNav"
import ImoveisAsideNav from '../../../../components/imoveis/aside/AsideNav'
import Main from "../../../../components/imoveis/main/Main"
import Form from "../../../../components/imoveis/Form"

export default function Proximidades() {
  const [nearby, setNearby] = useState({
    'Banco': false,
    'Escola': false,
    'Escola de idioma': false,
    'Faculdade': false,
    'Farmácia': false,
    'Hospital': false,
    'Igreja': false,
    'Padaria': false,
    'Praça': false,
    'Rodovia': false,
    'Shopping': false,
    'Supermercado': false,
  })

  const [nearbyChecked, setNearbyChecked] = useState()

  useEffect(() => {
    console.log(nearbyChecked)
  }, [nearbyChecked])

  function handleChange(event) {
    const list = { ...nearbyChecked, [event.target.name]: event.target.checked }
    Object.keys(list).map(key => {
      list[key] == false && delete list[key]
    })
    setNearbyChecked(list)
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log('proximidades')
  }

  return (
    <Box display='flex' height='calc(100% - 45px)' bgcolor='silver' overflow='hidden'>
      <AsideNav>
        <ImoveisAsideNav />
      </AsideNav>

      <Main title='Proximidades'>
        <Form handleSubmit={handleSubmit} gridTemplateColumnsCustom='1fr'>
          <FormGroup position='relative' display='block' width='100%'>
            <Box position='relative' display='block' width='100%' sx={{ columnCount: 4 }}>
              {Object.keys(nearby).map((key, index) => (
                <Box key={index}>
                  <FormControlLabel
                    name={key}
                    control={<Checkbox />}
                    label={key}
                    display='block'
                    width='100%'
                    onChange={handleChange}
                  />
                </Box>
              ))}
            </Box>
          </FormGroup>
        </Form>
      </Main>
    </Box >
  )
}