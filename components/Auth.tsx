import { auth } from '@firebase/initFirebase'
import nookies from 'nookies'
import { createContext, useEffect, useState } from 'react'

const AuthContext = createContext<{ uid: string }>({
  uid: 'null',
})

const AuthProvider = ({ children }: any) => {
  const [uid, setUid] = useState<string>('')

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setUid('')
        nookies.set(undefined, 'uid', '', { path: '/' })
      } else {
        setUid(user.uid)
        nookies.set(undefined, 'uid', user.uid, { path: '/' })
      }
    })
  }, [])

  return <AuthContext.Provider value={{ uid }}>{children}</AuthContext.Provider>
}

export default AuthProvider
