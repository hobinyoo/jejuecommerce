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
import { isEmpty } from 'lodash'
import AutoSizeImage from './AutoSizeImage'
import { toSize } from 'styles/globalStyle'
import { useRouter } from 'next/router'
import CSText from './CSText'

interface Props {
  uid: string
  windowWidth: number
  windowHeight: number
  setOrderDetailVisible?: Dispatch<SetStateAction<boolean>>
}
const MainHeader = ({
  uid,
  windowWidth,
  windowHeight,
  setOrderDetailVisible,
}: Props) => {
  const [name, setName] = useState('')
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const router = useRouter()

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

  const getSize = (input: number) => {
    return toSize(windowWidth, windowHeight, input)
  }

  return (
    <div
      css={[
        container,
        { height: `${getSize(60)}px`, padding: `0 ${getSize(20)}px` },
      ]}
    >
      <div css={text}>
        {router.pathname === '/' ? (
          <AutoSizeImage
            src="/images/logo@3x.png"
            width={getSize(143)}
            height={getSize(30)}
          />
        ) : (
          <AutoSizeImage
            src="/images/gnb_back@3x.png"
            width={getSize(30)}
            height={getSize(30)}
            onClick={() => router.back()}
          />
        )}

        <CSText
          size={18}
          fontFamily={'PretendardRegular'}
          color={'#000'}
          lineHeight={1.17}
          marginLeft={10}
        >
          {router.pathname === '/signUp'
            ? '회원가입'
            : router.route.split('/')[1] === 'order'
            ? '주문하기'
            : router.route.split('/')[1] === 'orderDetail'
            ? '주문내역'
            : router.route.split('/')[1] === 'comment'
            ? '후기작성'
            : ''}
        </CSText>
      </div>

      <div css={menu}>
        <MenuDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          uid={uid}
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          name={name}
          setOrderDetailVisible={setOrderDetailVisible}
        />
      </div>
    </div>
  )
}

const container = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: solid 1px #f2f2f2;
`
const text = css`
  display: flex;
  align-items: center;
`

const menu = css`
  display: flex;
  align-items: center;
`
export default MainHeader
