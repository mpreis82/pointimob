import { useState, useContext } from 'react'
import dynamic from 'next/dynamic'

import { Box } from '@mui/system'
import { TextField, FormControl, Button, FormHelperText, Typography } from '@mui/material'
import { pink } from '@mui/material/colors'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

import { addDoc, collection, Timestamp } from 'firebase/firestore'

import { Firestore } from '../../../Firebase'
import HelpSendError from '../HelpSendError'
import HelpSended from '../HelpSended'

import { AuthContext } from '../../../contexts/AuthContext'

const quillStyle = {
  height: '120px'
}

const buttonStyle = {
  fontSize: 12,
  fontWeight: 'regular',
  py: 1.5,
  width: 96,
  borderColor: 'secondary.main',
}

const cancelButtonStyle = {
  color: 'secondary.main',
  borderColor: 'secondary.main',
  ':hover': {
    borderColor: 'secondary.light',
    backgroundColor: pink[50]
  }
}

const submitButtonStyle = {
  backgroundColor: 'secondary.main',
  ':hover': {
    backgroundColor: 'secondary.light'
  }
}

export default function HelpFormBase({ sended, setSended, sendError, setSendError, handleCloseClick, collectionName }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [formValidate, setFormValidate] = useState({
    title: { error: false, message: 'Campo obrigatório' },
    description: { error: false, message: 'Campo obrigatório' }
  })

  const authContext = useContext(AuthContext)

  function handleFormValidate() {
    let isValidated = true

    const formValues = {
      title: title,
      description: description
    }

    const validate = { ...formValidate }

    Object.keys(formValidate).forEach(itemValidate => {
      if (formValues[itemValidate].length == 0) {
        validate[itemValidate]['error'] = true
        isValidated = false
      } else {
        validate[itemValidate]['error'] = false
      }
    })

    setFormValidate(validate)

    return isValidated
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!handleFormValidate()) return

    const currentUser = await authContext.user()

    const docData = {
      title: title,
      description: description,
      uid: currentUser.uid,
      username: currentUser.username,
      email: currentUser.email,
      createdAt: Timestamp.fromDate(new Date())
    }

    try {
      await addDoc(collection(Firestore, collectionName), docData)
      setSended(true)

    } catch (error) {
      setSended(true)
      setSendError(true)
      console.log(error)
    }
  }

  if (!sended) {
    return (
      <Box component='form' onSubmit={handleSubmit} width='100%' px={3}>
        <FormControl variant='outlined' fullWidth sx={{ mb: 3 }}>
          <Box component='label' htmlFor='' fontWeight='bold' mb={1}>
            Título
          </Box>
          <TextField size='small' fullWidth name='title' value={title} onChange={(event) => setTitle(event.target.value)} error={formValidate.title.error} helperText={formValidate.title.error ? formValidate.title.message : ''} />
        </FormControl>

        <Box position='relative' pb='20px'>
          <Box component='label' htmlFor='' fontWeight='bold'>
            Descrição
          </Box>

          <Box mt={1}>
            <ReactQuill theme='snow' value={description} onChange={setDescription} style={quillStyle}></ReactQuill>
            <FormHelperText sx={{ mt: '45px', ml: '14px' }} error={formValidate.description.error}>{formValidate.description.error ? formValidate.description.message : ''}</FormHelperText>
          </Box>
        </Box>

        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Button variant='outlined' sx={{ ...buttonStyle, ...cancelButtonStyle }} onClick={handleCloseClick}>
            Cancelar
          </Button>

          <Button onClick={handleSubmit} variant='contained' sx={{ ...buttonStyle, ...submitButtonStyle }} type='submit'>
            Enviar
          </Button>
        </Box>
      </Box>
    )
  }

  if (sended && !sendError) return <HelpSended />

  if (sended && sendError) return <HelpSendError />
}