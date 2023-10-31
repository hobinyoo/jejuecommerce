import Button from '@components/cs/Button'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { RootState, useAppSelector } from 'src/store'
import { toHeightSize, toSize } from 'styles/globalStyle'
import CSText from '@components/cs/CSText'
import CountControl from '@components/CountControl'
import AutoSizeImage from '@components/cs/AutoSizeImage'

interface Props {
  uid: string
  orderVisible: boolean
  setOrderVisible: Dispatch<SetStateAction<boolean>>
}

const OrderModal = ({ setOrderVisible }: Props) => {
  const router = useRouter()

  const [quantity, setQuantity] = useState<number>(1)

  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }
  return (
    <div css={overlay}>
      <div css={[orderModal, { height: `${toHeightSize(height, 577)}px` }]}>
        <div
          css={{
            padding: `${getSize(20)}px ${getSize(20)}px ${getSize(
              30
            )}px ${getSize(20)}px`,
          }}
        >
          <div css={buttonWrapper}>
            <AutoSizeImage
              src={'/images/btnX.png'}
              width={getSize(14)}
              height={getSize(14)}
              onClick={() => setOrderVisible(false)}
            />
          </div>
          <div
            css={[
              decideQuantity,
              {
                width: `${getSize(320)}px`,
                height: `${getSize(80)}px`,
                marginTop: `${getSize(16)}px`,
                padding: `0 ${getSize(20)}px`,
              },
            ]}
          >
            <CSText size={13} color={'#000'} lineHeight={1.15} marginTop={13}>
              {'한우 소고기 국밥(1300g)'}
            </CSText>
            <CountControl quantity={quantity} setQuantity={setQuantity} />
          </div>
          <div
            css={[
              price,
              {
                width: `${getSize(320)}px`,
                height: `${getSize(60)}px`,
                padding: `0 ${getSize(20)}px`,
              },
            ]}
          >
            <CSText size={13} color="#000" lineHeight={1.18}>
              총 결제 금액
            </CSText>
            <CSText
              size={17}
              fontFamily="PretendardBold"
              color="#000"
              lineHeight={1.18}
            >
              {quantity && quantity * 11000}원
            </CSText>
          </div>
          <div css={buttonWrapper}>
            <Button
              onClick={() =>
                //shallow getStaticProps, getServerSideProps, getInitialProps를 실행하지 않고 업데이트 된 pathname과 query를 받아 url을 바꿔줄 수 있다.
                //뒤로가기했다가 다시 숫자를 바꾸고 들어가도 패칭은 이루어지지 않는다
                router.push(`/order/한우 소고기 국밥/${quantity}`, undefined, {
                  shallow: true,
                })
              }
              btnHeight={50}
              backgroundColor="#15c9de"
              fontColor="#fff"
              fontSize={14}
              borderColor="#15c9de"
            >
              주문하기
            </Button>
          </div>
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
  background-color: white;
  position: absolute;
  bottom: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  z-index: 9999;
`

const buttonWrapper = css`
  display: flex;
  justify-content: end;
`
const decideQuantity = css`
  background-color: #f6f6f6;
  border: solid 1px #ececec;
`
const price = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: solid 1px #ececec;
  border-right: solid 1px #ececec;
  border-bottom: solid 1px #ececec;
`

export default OrderModal
