import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'

import { Backdrop, CircularProgress } from '@mui/material'

import { AuthContext } from '../../contexts/AuthContext'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  const router = useRouter()

  const authContext = useContext(AuthContext)

  useEffect(async () => {
    if (!router.isReady) return

    const abortController = new AbortController

    if (!(await authContext.user())) {
      router.push('/login')
      return
    }
    setLoaded(true)

    return () => {
      abortController.abort()
    }

  }, [router.isReady]);

  if (loaded) {
    return (
      <></>
    )
  } else {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  }
}