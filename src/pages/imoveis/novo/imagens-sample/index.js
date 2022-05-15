import { useLayoutEffect, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage'

import { Box } from "@mui/system"
import { Tabs, Tab, Stack, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material'
import PropTypes from 'prop-types'

import AsideNav from "../../../../components/AsideNav"
import ImoveisAsideNav from '../../../../components/imoveis/aside/AsideNav'
import Main from "../../../../components/imoveis/main/Main"
import Form from "../../../../components/imoveis/Form"
import ImagesListSample from '../../../../components/imoveis/images/ImagesListSample'

import { Firestore, Storage } from '../../../../Firebase'

export default function ImagensSample() {
  const [imagesProperty, setImagesProperty] = useState([])
  const [count, setCount] = useState(0)

  async function sample() {
    const listRef = ref(Storage, `imoveis/images/OkOmfbUwPNooTpXkR1Ec`)
    const list = await listAll(listRef)
    return Promise.all(list.items.map(item => getDownloadURL(item)))
  }

  async function handleSubmit(event) {
    setImagesProperty(await sample())
  }

  return (
    <Box display='flex' flexDirection={'column'} height='calc(100% - 45px)' bgcolor='silver' overflow='hidden'>
      <Box bgcolor='green' height={300} display='flex' flexDirection='row'>
        <p>Count: {count}</p>
        {imagesProperty.map((image, index) => (
          <img src={image} key={index} width={'50px'} height='50px' />
        ))}

      </Box>
      <button style={{ padding: '20px' }} onClick={handleSubmit}>Enviar</button>
    </Box >
  )
}