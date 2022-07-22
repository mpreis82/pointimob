import { useState, useEffect, createContext } from 'react'
import { useRouter } from 'next/router'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { Firestore } from '../../Firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Backdrop, CircularProgress } from '@mui/material'

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [requiredAuth, setRequiredAuth] = useState(true)

  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      user().then(dataUser => {
        if (dataUser) {
          setCurrentUser(dataUser)
        }
      })
    }
  }, [])

  useEffect(() => {
    if (!currentUser) {
      const requiredAuthLocal = children.props.children.type.requiredAuth ?? true

      setRequiredAuth(requiredAuthLocal)

      if (requiredAuthLocal) {
        const currentUser = (async () => await user())
        currentUser().then(usr => {
          if (!usr) router.push('/login')
        })
      }
    }
  }, [children.props.children.type.requiredAuth])

  const register = (name, email, password) => {
    const auth = getAuth()
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          updateProfile(userCredential.user, { displayName: name })
            .then(() => {
              setCurrentUser({
                username: name,
                email: email,
                uid: userCredential.user.uid
              })
              resolve({ created: true, error: '' })
            })
            .catch(error => reject({ created: false, error: error.code }))
        })
        .catch(error => reject({ created: false, error: error.code }))
    })
  }

  const login = (email, password) => {
    const auth = getAuth()
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          setCurrentUser({
            username: userCredential.user.displayName,
            email: userCredential.user.email,
            uid: userCredential.user.uid
          })
          resolve(true)
        })
        .catch((error) => reject(false))
    })
  }

  function currentAuth() {
    return new Promise((resolve) => {
      const auth = getAuth()
      onAuthStateChanged(auth, user => {
        if (user) {
          resolve({
            username: user.displayName,
            email: user.email,
            uid: user.uid
          })
        }
        resolve(null)
      })
    })
  }

  async function user() {
    const auth = await currentAuth()

    console.log('currentAuth::', auth)

    if (!auth) return null

    const clientRef = collection(Firestore, 'clients')
    const q = query(clientRef, where('uid', '==', auth.uid))
    const clientDocs = await getDocs(q)
    const clientData = clientDocs.docs[0].data()

    return {
      ...auth,
      client: {
        clientId: clientDocs.docs[0].id,
        ...clientData
      }
    }
  }

  const logout = () => {
    const auth = getAuth()
    return new Promise((resolve) => {
      signOut(auth)
        .then(() => {
          setCurrentUser(null)
          router.push('/login')
          resolve(true)
        })
        .catch(error => {
          resolve(false)
        })
    })
  }

  if ((requiredAuth && currentUser) || !requiredAuth) {
    return (
      <AuthContext.Provider value={{ login, logout, register, sendPasswordResetEmail, currentUser }}>
        {children}
      </AuthContext.Provider>
    )
  }

  return (
    <AuthContext.Provider value={{ authenticated: false }}>
      <Backdrop open={true} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }