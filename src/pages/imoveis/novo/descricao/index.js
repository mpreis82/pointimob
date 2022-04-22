import { useState } from "react"
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'
import { Box } from "@mui/system"
import { FormControl, TextField } from '@mui/material'
import AsideNav from "../../../../components/AsideNav"
import ImoveisAsideNav from '../../../../components/imoveis/aside/AsideNav'
import Main from "../../../../components/imoveis/main/Main"
import Form from "../../../../components/imoveis/Form"

import styles from './styles.module.css'

export default function Descricao() {
  const [pageTitle, setPageTitle] = useState('')
  const [description, setDescription] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    console.log('descrição')
  }

  return (
    <Box display='flex' height='calc(100% - 45px)' bgcolor='silver' overflow='hidden'>
      <AsideNav>
        <ImoveisAsideNav />
      </AsideNav>

      <Main title='Descrição'>
        <Form handleSubmit={handleSubmit} gridTemplateColumnsCustom='1fr'>
          <FormControl variant="outlined">
            <Box component='label' fontWeight='bold' mb={1}>Título da página de detalhamento do imóvel</Box>
            <TextField value={pageTitle} onChange={event => setPageTitle(event.target.value)} helperText='' />
          </FormControl>

          <Box position='relative' mb={6}>
            <ReactQuill theme="snow" value={description} onChange={setDescription} className={styles.quillBox}>
            </ReactQuill>
          </Box>
        </Form>
      </Main>
    </Box >
  )
}
