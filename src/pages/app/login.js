import { useState } from 'react'
import { Box } from '@mui/system'
import { FormControl, TextField, Button, Stack, Snackbar, Alert, FormHelperText } from '@mui/material';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseApp } from '../../Firebase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleEmailChange(event) {
    setEmail(event.target.value)
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const auth = getAuth()
      // const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      console.log(userCredential)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box component='form' display='flex' flexDirection='column' maxWidth='500px' onSubmit={handleSubmit}>
      <FormControl variant='outlined'>
        <Box component='label' htmlFor='' fontWeight='bold' mb={1}>E-mail</Box>
        <TextField name='people' value={email} onChange={handleEmailChange} />
      </FormControl>

      <FormControl variant='outlined'>
        <Box component='label' htmlFor='' fontWeight='bold' mb={1}>Senha</Box>
        <TextField name='people' value={password} onChange={handlePasswordChange} />
      </FormControl>

      <Button type='submit'>Acessar sua conta</Button>
    </Box>
  )
}