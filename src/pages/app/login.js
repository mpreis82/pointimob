import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Box } from '@mui/system'
import { FormControl, TextField, Button, Stack, Snackbar, Alert, FormHelperText } from '@mui/material';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { FirebaseApp } from '../../Firebase'
import { AuthContext, AuthContextProvider } from '../../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('mpreis82@gmail.com')
  const [password, setPassword] = useState('Deadfish001')

  const router = useRouter()

  const authContext = useContext(AuthContext)


  function handleEmailChange(event) {
    setEmail(event.target.value)
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const user = await authContext.login(email, password)
  }

  async function handleAuthClick(event) {
    event.preventDefault()
    console.log(authContext.user())
  }

  async function handleLogoutClick(event) {
    event.preventDefault()
    authContext.logout()
  }

  return (
    <Box width='100%' height='100vh' display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
      <Box component='form' display='flex' flexDirection='column' width='100%' maxWidth='500px' onSubmit={handleSubmit}>
        <FormControl variant='outlined' sx={{ mb: 2 }}>
          <Box component='label' htmlFor='' fontWeight='bold' mb={1}>E-mail</Box>
          <TextField type='email' name='email' value={email} onChange={handleEmailChange} />
        </FormControl>

        <FormControl variant='outlined' sx={{ mb: 2 }}>
          <Box component='label' htmlFor='' fontWeight='bold' mb={1}>Senha</Box>
          <TextField name='password' value={password} onChange={handlePasswordChange} />
        </FormControl>

        <Button type='submit' color={'secondary'} variant='contained'>Acessar sua conta</Button>
      </Box>

      <Box display='flex' sx={{ mt: 2 }}>
        <Button color='warning' onClick={handleAuthClick}>Console Auth</Button>
        <Button color='error' onClick={handleLogoutClick}>Logout</Button>
      </Box>
    </Box>
  )
}