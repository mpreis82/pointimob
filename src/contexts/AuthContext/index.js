import { useState, useEffect, createContext } from 'react'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { FirebaseApp } from '../../Firebase'
import { getTabId } from '@mui/base'

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    if (!currentUser) {
      const auth = getAuth()
      onAuthStateChanged(auth, user => {
        if (user) {
          setCurrentUser({
            username: user.displayName,
            email: user.email,
            uid: user.uid
          })
        }
      })
    }
  }, [])

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

  const user = () => {
    return currentUser
  }

  const logout = () => {
    const auth = getAuth()
    return new Promise((resolve, reject) => {
      signOut(auth)
        .then(() => {
          setCurrentUser(null)
          resolve(true)
        })
        .catch(error => {
          resolve(false)
        })
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }

