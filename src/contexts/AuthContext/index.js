import { useState, useEffect, createContext } from 'react'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { FirebaseApp } from '../../Firebase'

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    if (!currentUser) {
      user().then(dataUser => {
        setCurrentUser({
          username: dataUser.displayName,
          email: dataUser.email,
          uid: dataUser.uid
        })
      })
    }
  }, [])

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

  function user() {
    const auth = getAuth()
    return new Promise((resolve) => {
      onAuthStateChanged(auth, user => {
        resolve({
          username: user.displayName,
          email: user.email,
          uid: user.uid
        })
      })
    })
  }

  const logout = () => {
    const auth = getAuth()
    return new Promise((resolve) => {
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
    <AuthContext.Provider value={{ user, login, logout, register, sendPasswordResetEmail, currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }

