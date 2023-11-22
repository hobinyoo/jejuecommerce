import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { css } from '@emotion/react'
import MenuDrawer from '@components/navigation/Drawer'
import { db } from '@firebase/initFirebase'
import { doc, getDoc } from 'firebase/firestore'
import AutoSizeImage from './AutoSizeImage'
import { useRouter } from 'next/router'
import CSText from './CSText'
import Link from 'next/link'

interface Props {
  uid: string
  setOrderDetailVisible?: Dispatch<SetStateAction<boolean>>
}
const MainHeader = ({ uid, setOrderDetailVisible }: Props) => {
  const [name, setName] = useState('')
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const router = useRouter()

  const getUser = useCallback(async () => {
    if (uid) {
      const docRef = doc(db, 'users', uid)
      const result = await getDoc(docRef)
      setName(result?.data()?.name)
    }
  }, [uid])

  useEffect(() => {
    getUser()
  }, [getUser])

  return (
    <div css={[container, { height: '8rem', padding: '0 2.5rem' }]}>
      <div css={{ display: 'flex', alignItems: 'center' }}>
        {router.pathname === '/' ? (
          <Link href={'/'}>
            <AutoSizeImage src="/images/jujueLogo.png" width={8} height={6} />
          </Link>
        ) : (
          <AutoSizeImage
            src="/images/gnb_back@3x.png"
            width={3}
            height={3}
            onClick={() => router.back()}
          />
        )}

        <CSText size={1.8} lineHeight={1.17}>
          {router.pathname === '/admin' && '관리자 페이지'}
        </CSText>
      </div>

      {router.pathname === '/' && (
        <div>
          <MenuDrawer
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
            uid={uid}
            name={name}
            setOrderDetailVisible={setOrderDetailVisible}
          />
        </div>
      )}
    </div>
  )
}

const container = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  align-items: center;
`

export default MainHeader
