import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import NextLink from 'next/link'

import { Box } from '@mui/system'
import { FormControl, TextField, Button, Stack, Alert, FormHelperText, Typography, Link, Collapse, Backdrop, CircularProgress } from '@mui/material';
import { grey, pink } from '@mui/material/colors';

import { AuthContext } from '../../contexts/AuthContext';

import image from '../../../public/images/appBackgroud.jpg'
import logo from '../../../public/images/logo.png'

export default function Login() {
  const [email, setEmail] = useState('mpreis82@gmail.com')
  const [password, setPassword] = useState('Deadfish001')

  const [formValidate, setFormValidate] = useState({
    email: { error: false, message: 'E-mail inválido' },
    password: { error: false, message: 'Campo obrigatório' }
  })

  const [alert, setAlert] = useState(false)

  const [backdrop, setBackdrop] = useState(false)

  const [loaded, setLoaded] = useState(false)

  const router = useRouter()

  const authContext = useContext(AuthContext)

  useEffect(() => {
    if (authContext.user()) {
      router.push('/')
      return
    }
    setLoaded(true)
  }, [])

  function handleEmailChange(event) {
    setEmail(event.target.value)
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }

  function handleFormValidate() {
    let isValidated = true

    let data = { ...formValidate }

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
      setFormValidate(data)
      isValidated = false
    }

    return isValidated
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!handleFormValidate()) return

    try {
      const login = await authContext.login(email, password)
      if (login) {
        setBackdrop(true)
        router.push('/imoveis')
        return
      }
    } catch (error) {
      setAlert(true)
    }
  }

  if (loaded) {



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
              <Typography variant='caption' mr={1}>Não possui uma conta?</Typography>
              <NextLink href='/register' passHref>
                <Button variant='outlined' href='/register'>Crie Agora</Button>
              </NextLink>
            </Box>
          </Box>

          <Typography variant='subtitle2' textAlign='center' mb={4} color={grey[500]}>
            Faça login na sua conta
          </Typography>

          <Box component='form' display='flex' flexDirection='column' width='100%' maxWidth='430px' onSubmit={handleSubmit}>
            <Collapse in={alert}>
              <Stack sx={{ width: '100%', mb: 3 }} spacing={2}>
                <Alert variant="outlined" severity="error">E-mail ou senha inválido.</Alert>
              </Stack>
            </Collapse>

            <FormControl variant='outlined' sx={{ mb: 3 }}>
              <Box component='label' htmlFor='' fontWeight='bold' mb={1}>E-mail</Box>
              <TextField type='text' name='email' value={email} onChange={handleEmailChange} helperText={(formValidate.email.error ? formValidate.email.message : '')} error={formValidate.email.error} />
            </FormControl>

            <FormControl variant='outlined' sx={{ mb: 3 }}>
              <Box display='flex' alignItems='center' justifyContent='space-between' mb={1}>
                <Box component='label' htmlFor='' fontWeight='bold'>Senha</Box>
                <NextLink href='/register'>
                  <Link href='/register'>Esqueceu sua senha?</Link>
                </NextLink>
              </Box>
              <TextField name='password' value={password} onChange={handlePasswordChange} helperText={(formValidate.password.error ? formValidate.password.message : '')} error={formValidate.password.error} />
            </FormControl>

            <Button type='submit' color={'secondary'} variant='contained' sx={{ py: '16px' }}>
              Acessar sua conta
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

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdrop}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      </Box>
    )
  } else {
    return <></>
  }
}