import { useState } from 'react'
import { Box } from '@mui/system'
import { FormControl, TextField, Button, Stack, Snackbar, Alert, FormHelperText } from '@mui/material';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { FirebaseApp } from '../../Firebase'
import { AuthContext, AuthContextProvider } from '../../contexts/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('roberta@email.com')
  const [password, setPassword] = useState('Deadfish001!')
  const [name, setName] = useState('Roberta')

  function handleEmailChange(event) {
    setEmail(event.target.value)
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }

  function handleNameChange(event) {
    setName(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        updateProfile(userCredential.user, { displayName: name })
          .then(() => console.log('Usuário criado!'))
      })
      .catch(error => console.log(error))
  }

  return (
    <Box width='100%' height='100vh' display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
      <Box component='form' display='flex' flexDirection='column' width='100%' maxWidth='500px' onSubmit={handleSubmit}>
        <FormControl variant='outlined' sx={{ mb: 2 }}>
          <Box component='label' htmlFor='' fontWeight='bold' mb={1}>Nome</Box>
          <TextField name='name' value={name} onChange={handleNameChange} />
        </FormControl>

        <FormControl variant='outlined' sx={{ mb: 2 }}>
          <Box component='label' htmlFor='' fontWeight='bold' mb={1}>E-mail</Box>
          <TextField type='email' name='email' value={email} onChange={handleEmailChange} />
        </FormControl>

        <FormControl variant='outlined' sx={{ mb: 2 }}>
          <Box component='label' htmlFor='' fontWeight='bold' mb={1}>Senha</Box>
          <TextField name='password' value={password} onChange={handlePasswordChange} />
        </FormControl>

        <Button type='submit' color={'secondary'} variant='contained'>Criar a sua conta</Button>
      </Box>

    </Box>
  )
}