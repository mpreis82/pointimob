import { useState, useEffect, createContext } from 'react'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { FirebaseApp } from '../../Firebase'

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
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setCurrentUser({
          username: userCredential.user.displayName,
          email: userCredential.user.email,
          uid: userCredential.user.uid
        })
        return true
      })
      .catch((error) => false)
  }

  const user = () => {
    return currentUser
  }

  const logout = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        setCurrentUser(null)
        return true
      })
      .catch(error => false)
  }

  const isProtectedRoute = (router) => {
    if (!currentUser) {
      router.push('/imoveis')
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isProtectedRoute }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }

