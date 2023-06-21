import { CountControl } from '@components/CountControl'
import Button from '@components/Button'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction, useState } from 'react'
import MenuControl from '@components/MenuControl'
import IconX from '../../public/X.svg'

interface Props {
  uid: string
  orderVisible: boolean
  setOrderVisible: Dispatch<SetStateAction<boolean>>
}

const OrderModal = ({ setOrderVisible, uid }: Props) => {
  const router = useRouter()

  const [quantity, setQuantity] = useState<number | undefined>(1)
  const [menu, setMenu] = useState<string | undefined>('한우 소고기 국밥')

  return (
    <div css={overlay}>
      <div css={orderModal}>
        <div css={modalInner}>
          <div
            css={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
          >
            <IconX onClick={() => setOrderVisible(false)} />
          </div>

          <div style={{ marginTop: '1rem' }}>메뉴를 선택해주세요.</div>
          <MenuControl value={menu} setValue={setMenu} />
          <div style={{ marginTop: '1rem' }}>수량:</div>
          <CountControl value={quantity} setValue={setQuantity} max={200} />

          <Button
            onClick={() =>
              router.push(`/order?menu=${menu}&quantity=${quantity}&uid=${uid}`)
            }
            bottom
          >
            주문하기
          </Button>

          <div>가격: {quantity && quantity * 11000} </div>
        </div>
      </div>
    </div>
  )
}

const overlay = css`
  position: fixed; /* 화면에 고정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 투명한 검은 배경 */
  z-index: 9999; /* 다른 요소들보다 위에 나타나도록 높은 값 설정 */
  display: flex;
`
const orderModal = css`
  width: 100%;
  height: 418px;
  background-color: white;
  position: absolute;
  bottom: 0;
  border-top-left-radius: 21px;
  border-top-right-radius: 21px;
`

const modalInner = css`
  padding: 2rem;
`
export default OrderModal
