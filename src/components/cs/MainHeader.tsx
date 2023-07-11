import React, { useCallback, useEffect, useState } from 'react'
import { css } from '@emotion/react'
import MenuDrawer from '@components/navigation/Drawer'
import { db } from '@firebase/initFirebase'
import { doc, getDoc } from 'firebase/firestore'
import { isEmpty } from 'lodash'
import AutoSizeImage from './AutoSizeImage'
import { toSize } from 'styles/globalStyle'

interface Props {
  uid: string
  windowWidth: number
  windowHeight: number
}
const MainHeader = ({ uid, windowWidth, windowHeight }: Props) => {
  const [name, setName] = useState('')
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const getUser = useCallback(async () => {
    if (!isEmpty(uid)) {
      const docRef = doc(db, 'users', uid)
      const result = await getDoc(docRef)
      setName(result?.data()?.name)
    }
  }, [uid])

  useEffect(() => {
    getUser()
  }, [getUser])

  return (
    <div css={container}>
      <AutoSizeImage
        src="/images/logo@3x.png"
        width={toSize(windowWidth, windowHeight, 143)}
        height={toSize(windowWidth, windowHeight, 30)}
      />
      <div css={menu}>
        {/* {!isEmpty(name) && (
          <div style={{ marginRight: '1rem' }}>{name}님! 환영합니다.</div>
        )} */}
        <MenuDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          uid={uid}
          windowWidth={windowWidth}
          windowHeight={windowHeight}
        />
      </div>
    </div>
  )
}

const container = css`
  width: 100%;
  padding: 0.938rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const menu = css`
  display: flex;
  align-items: center;
`
export default MainHeader
