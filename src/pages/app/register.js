import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import NextLink from 'next/link'

import { Box } from '@mui/system'
import { FormControl, TextField, Button, Stack, Alert, FormHelperText, Typography, Link, Collapse, Backdrop, CircularProgress } from '@mui/material';
import { grey, pink } from '@mui/material/colors';

import image from '../../../public/images/appBackgroud.jpg'
import logo from '../../../public/images/logo.png'

import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { FirebaseApp } from '../../Firebase'
import { AuthContext, AuthContextProvider } from '../../contexts/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('roberta@email.com')
  const [password, setPassword] = useState('Deadfish001!')
  const [passwordConfirm, setPasswordConfirm] = useState('Deadfish001!')
  const [name, setName] = useState('Roberta')

  const [formValidate, setFormValidate] = useState({
    name: { error: false, message: 'Campo obrigatório' },
    email: { error: false, message: 'E-mail inválido' },
    password: { error: false, message: 'Campo obrigatório' },
    passwordConfirm: { error: false, message: 'Senhas não conferem' }
  })

  const [alert, setAlert] = useState({ show: false, message: '' })

  const [backdrop, setBackdrop] = useState(false)

  const [loaded, setLoaded] = useState(false)

  const router = useRouter()

  const authContext = useContext(AuthContext)

  function handleEmailChange(event) {
    setEmail(event.target.value)
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }

  function handleNameChange(event) {
    setName(event.target.value)
  }

  function handlePasswordConfirmChange(event) {
    setPasswordConfirm(event.target.value)
  }

  function handleFormValidate() {
    let isValidated = true

    let data = { ...formValidate }

    if (name.length > 0) {
      data.name.error = false
      setFormValidate(data)
    } else {
      data.name.error = true
      setFormValidate(data)
      isValidated = false
    }

    const emailPattern = /(.+)@(.+)\.(.+)/g
    if (emailPattern.test(email)) {
      data.email.error = false
      setFormValidate(data)
    } else {
      data.email.error = true
      setFormValidate(data)
      isValidated = false
    }

    if (password.length > 0) {
      data.password.error = false
      setFormValidate(data)
    } else {
      data.password.error = true
      data.password.message = 'Campo obrigatório'
      setFormValidate(data)
      isValidated = false
    }

    if (passwordConfirm == password) {
      data.passwordConfirm.error = false
      setFormValidate(data)
    } else {
      data.passwordConfirm.error = true
      setFormValidate(data)
      isValidated = false
    }

    return isValidated
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setBackdrop(true)

    setAlert({ show: false, message: '' })

    if (!handleFormValidate()) return

    authContext.register(name, email, password)
      .then(result => {
        setBackdrop
        router.push('/')
        return
      })
      .catch(error => {
        if (error.error == 'auth/email-already-in-use') {
          setAlert({ show: true, message: 'E-mail já está sendo utilizado' })
        }
        if (error.error == 'auth/weak-password') {
          const data = { ...formValidate }
          console.log(data)
          data.password.error = true
          data.password.message = 'Senha fraca'
          setFormValidate(data)
        }
        setBackdrop(false)
      })
  }

  if (!backdrop) {
    return (
      <Box height='100vh' display='flex' flexDirection='row' overflow='hidden'>
        <Box display='flex' flexDirection='column' alignItems='center' px='35px' py='50px'
          sx={{
            overflowY: 'auto', width: { xs: '100%', sm: '60%', lg: '40%' },
            '::-webkit-scrollbar': { width: '8px', backgroundColor: grey[300], borderRadius: 3 },
            '::-webkit-scrollbar-thumb': { backgroundColor: grey[400], borderRadius: 3, cursor: 'pointer', transition: {} },
            '::-webkit-scrollbar-thumb:hover': { backgroundColor: pink[400], }
          }}>
          <Box width='100%' mb='32px' display='flex' alignItems='center' justifyContent='space-between' sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
            <Box>
              <Image src={logo} />
            </Box>

            <Box display='flex' alignItems='center'>
              <Typography variant='caption' mr={1}>Já possui uma conta?</Typography>
              <NextLink href='/login' passHref>
                <Button variant='outlined' href='/register'>Faça login</Button>
              </NextLink>
            </Box>
          </Box>

          <Typography variant='subtitle2' textAlign='center' mb={4} color={grey[500]}>
            Cria a sua conta em poucos segundos
          </Typography>

          <Box component='form' display='flex' flexDirection='column' width='100%' maxWidth='430px' onSubmit={handleSubmit}>
            <Collapse in={alert.show}>
              <Stack sx={{ width: '100%', mb: 3 }} spacing={2}>
                <Alert variant="outlined" severity="error">{alert.message}</Alert>
              </Stack>
            </Collapse>

            <FormControl variant='outlined' sx={{ mb: 3 }}>
              <Box component='label' htmlFor='' fontWeight='bold' mb={1}>Nome</Box>
              <TextField type='text' name='name' value={name} onChange={handleNameChange} helperText={(formValidate.name.error ? formValidate.name.message : '')} error={formValidate.name.error} />
            </FormControl>

            <FormControl variant='outlined' sx={{ mb: 3 }}>
              <Box component='label' htmlFor='' fontWeight='bold' mb={1}>E-mail</Box>
              <TextField type='text' name='email' value={email} onChange={handleEmailChange} helperText={(formValidate.email.error ? formValidate.email.message : '')} error={formValidate.email.error} />
            </FormControl>

            <Box display='flex' alignItems='center' justifyContent='space-between' sx={{ flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 0, md: 2 } }}>
              <FormControl fullWidth variant='outlined' sx={{ mb: 3 }}>
                <Box component='label' htmlFor='' fontWeight='bold'>Senha</Box>
                <TextField name='password' value={password} onChange={handlePasswordChange} helperText={(formValidate.password.error ? formValidate.password.message : '')} error={formValidate.password.error} />
              </FormControl>

              <FormControl fullWidth variant='outlined' sx={{ mb: 3 }}>
                <Box component='label' htmlFor='' fontWeight='bold'>Senha</Box>
                <TextField name='passwordConfirm' value={passwordConfirm} onChange={handlePasswordConfirmChange} helperText={(formValidate.passwordConfirm.error ? formValidate.passwordConfirm.message : '')} error={formValidate.passwordConfirm.error} />
              </FormControl>
            </Box>

            <Button type='submit' color={'secondary'} variant='contained' sx={{ py: '16px' }}>
              Criar minha conta
            </Button>
          </Box>
        </Box>

        <Box
          width='60%'
          sx={{ display: { xs: 'none', sm: 'block' }, width: { sm: '40%', lg: '60%' } }}
          style={{
            backgroundImage: `url(${image.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}></Box>
      </Box>
    )
  } else {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdrop} >
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  }
}

Register.requiredAuth = false