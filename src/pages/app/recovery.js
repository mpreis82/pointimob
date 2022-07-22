import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import NextLink from 'next/link'

import { Box } from '@mui/system'
import { FormControl, TextField, Button, Stack, Alert, FormHelperText, Typography, Link, Collapse, Backdrop, CircularProgress } from '@mui/material';
import { grey, pink } from '@mui/material/colors';
import { RiMailSendLine } from 'react-icons/ri'

import image from '../../../public/images/appBackgroud.jpg'
import logo from '../../../public/images/logo.png'

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { FirebaseApp } from '../../Firebase'

export default function Recovery() {
  const [email, setEmail] = useState('mpreis82@gmail.com')

  const [formValidate, setFormValidate] = useState({
    email: { error: false, message: 'E-mail inválido' },
  })

  const [alert, setAlert] = useState({ show: false, message: '' })

  const [backdrop, setBackdrop] = useState(false)

  const [sendEmail, setSendEmail] = useState(false)

  const router = useRouter()

  function handleEmailChange(event) {
    setEmail(event.target.value)
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
    return isValidated
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setAlert({ show: false, message: '' })

    if (!handleFormValidate()) {
      setBackdrop(false)
      return
    }

    setBackdrop(true)

    const auth = getAuth()

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSendEmail(true)
        setBackdrop(false)
      })
      .catch((error) => {
        if (error.code == 'auth/user-not-found') {
          setAlert({ show: true, message: 'E-mail não encontrado.' })
        } else {
          setAlert({ show: true, message: 'Não foi possivel recuperar a senha.' })
        }
      });

    setBackdrop(false)
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
                <Button variant='outlined' href='/login'>Faça login</Button>
              </NextLink>
            </Box>
          </Box>

          <Typography variant='subtitle2' textAlign='center' mb={4} color={grey[500]}>
            Recupera a sua senha através do e-mail
          </Typography>

          {(!sendEmail ? (
            <Box component='form' display='flex' flexDirection='column' width='100%' maxWidth='430px' onSubmit={handleSubmit}>
              <Collapse in={alert.show}>
                <Stack sx={{ width: '100%', mb: 3 }} spacing={2}>
                  <Alert variant="outlined" severity="error">{alert.message}</Alert>
                </Stack>
              </Collapse>

              <FormControl variant='outlined' sx={{ mb: 3 }}>
                <Box component='label' htmlFor='' fontWeight='bold' mb={1}>E-mail</Box>
                <TextField type='text' name='email' value={email} onChange={handleEmailChange} helperText={(formValidate.email.error ? formValidate.email.message : '')} error={formValidate.email.error} />
              </FormControl>

              <Button type='submit' color={'secondary'} variant='contained' sx={{ py: '16px' }}>
                Recuperar senha
              </Button>
            </Box>
          ) : (
            <>
              <Box fontSize={80} color='#d81b60'>
                <RiMailSendLine fontSize='inherit' color='inherti' />
              </Box>
              <Typography variant='h5' mb={2}>Verifique seu e-mail</Typography>
              <Typography maxWidth={350} textAlign='center' mb={2} variant='subtitle1'>Enviei um e-mail para <strong>{email}</strong> com as instruções para recuperar a sua senha.</Typography>
              <NextLink href='/login' passHref>
                <Link href='/login'>Voltar para o inicio</Link>
              </NextLink>
            </>
          ))}
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

Recovery.requiredAuth = false