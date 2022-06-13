import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'

import { Backdrop, CircularProgress } from '@mui/material'

import { AuthContext } from '../../contexts/AuthContext'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  const router = useRouter()

  const authContext = useContext(AuthContext)

  useEffect(() => {
    if (!router.isReady) return

    if (!authContext.user()) {
      router.push('/login')
      return
    }
    setLoaded(true)
  }, [router.isReady]);

  if (loaded) {
    return (
      <h1>PointImob</h1>
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