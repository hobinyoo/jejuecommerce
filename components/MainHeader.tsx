import React, { useCallback, useEffect, useState } from 'react'
import { css } from '@emotion/react'
import MenuDrawer from '../components/navigation/Drawer'
import { auth, db } from '../firebase/initFirebase'
import { doc, getDoc } from 'firebase/firestore'
import { isEmpty } from 'lodash'

const MainHeader = () => {
  const user = auth.currentUser

  const [name, setName] = useState('')
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const getUser = useCallback(async () => {
    if (user) {
      const docRef = doc(db, 'users', user.uid)
      const result = await getDoc(docRef)
      setName(result?.data()?.name)
    }
  }, [user])

  useEffect(() => {
    getUser()
  }, [getUser])

  return (
    <div css={container}>
      <p>로고</p>
      <div css={menu}>
        {!isEmpty(name) && (
          <div style={{ marginRight: '1rem' }}>{name}님! 환영합니다.</div>
        )}
        <MenuDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      </div>
    </div>
  )
}

const container = css`
  width: 100%;
  padding: 1.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const menu = css`
  display: flex;
  align-items: center;
`
export default MainHeader
