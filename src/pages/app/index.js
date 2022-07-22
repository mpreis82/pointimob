import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'

import { Backdrop, CircularProgress } from '@mui/material'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  const router = useRouter()

  useEffect(async () => {
    if (!router.isReady) return

    const abortController = new AbortController

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