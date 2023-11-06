import Button from '@components/cs/Button'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'
import CSText from '@components/cs/CSText'
import CountControl from '@components/CountControl'
import AutoSizeImage from '@components/cs/AutoSizeImage'
import { calculateTotalPrice } from 'src/function/calculateTotalPrice'

interface Props {
  uid: string
  orderVisible: boolean
  setOrderVisible: Dispatch<SetStateAction<boolean>>
}

const data = [
  {
    title: '한우곰탕',
    content: '(한우육수: 600g 2포,고기: 한우사태 80g)',
    price: '12,000원',
  },
  {
    title: '한우설렁탕',
    content: '(한우육수: 600g 2포, 고기: 한우사태 80g)',
    price: '13,000원',
  },
  {
    title: '육우 갈비탕',
    content: '(한우육수: 600g 2포, 고기: 국내산 육우갈비 220g)',
    price: '15,000원',
  },
  {
    title: '육우곰탕',
    content: '(한우육수: 600g 2포, 고기: 국내산 한우갈비 220g)',
    price: '18,000원',
  },
]

const OrderModal = ({ setOrderVisible }: Props) => {
  const router = useRouter()

  const [quantity, setQuantity] = useState<number[]>([0, 0, 0, 0])

  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  return (
    <div css={overlay}>
      <div css={[orderModal]}>
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
          {data.map(({ title, content, price }, index) => (
            <div
              key={index}
              css={[
                menuBox,
                {
                  marginTop: `${index === 0 && getSize(16)}px`,
                  borderTop: `${index === 0 && 'solid 1px #ececec'}`,
                  borderTopRightRadius: `${index === 0 && getSize(10)}px`,
                  borderTopLeftRadius: `${index === 0 && getSize(10)}px`,
                  width: `${getSize(320)}px`,
                  padding: `${getSize(15)}px ${getSize(20)}px`,
                },
              ]}
            >
              <div
                css={{
                  display: 'flex',
                  gap: `${getSize(8)}px`,
                }}
              >
                <AutoSizeImage
                  src={'/images/checkbox.png'}
                  width={getSize(16)}
                  height={getSize(16)}
                />

                <CSText
                  size={14}
                  color={'#000'}
                  lineHeight={1.14}
                  fontFamily="PretendardBold"
                >
                  {title}
                </CSText>
              </div>
              <CSText
                size={11}
                color={'#818181'}
                lineHeight={1.67}
                marginTop={2}
                marginBottom={10}
              >
                {content}
              </CSText>
              <div
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <CountControl
                  index={index}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
                <CSText
                  size={15}
                  color={'#000'}
                  lineHeight={1.67}
                  fontFamily="PretendardBold"
                >
                  {price}
                </CSText>
              </div>
            </div>
          ))}

          <div
            css={[
              price,
              {
                width: `${getSize(320)}px`,
                height: `${getSize(50)}px`,
                padding: `0 ${getSize(18)}px`,
                borderBottomLeftRadius: `${getSize(10)}px`,
                borderBottomRightRadius: `${getSize(10)}px`,
              },
            ]}
          >
            <CSText size={12} color="#818181" lineHeight={1.67}>
              총 결제 금액
            </CSText>
            <CSText
              size={15}
              fontFamily="PretendardBold"
              color="#15c9de"
              lineHeight={1.18}
            >
              {calculateTotalPrice(quantity)}원
            </CSText>
          </div>
          <CSText
            size={10}
            color="#9e9e9e"
            lineHeight={2}
            marginTop={5}
            marginBottom={20}
          >
            배송정보
            <span
              css={[
                line,
                {
                  fontSize: `${getSize(10)}px`,
                  margin: `0 ${getSize(5)}px`,
                  lineHeight: 1.15,
                },
              ]}
            />
            택배, 배송비 4,000원 (70,000원 이상 주문시 도외 택배비 무료)
          </CSText>
          <div css={buttonWrapper}>
            <Button
              onClick={() =>
                //shallow getStaticProps, getServerSideProps, getInitialProps를 실행하지 않고 업데이트 된 pathname과 query를 받아 url을 바꿔줄 수 있다.
                //뒤로가기했다가 다시 숫자를 바꾸고 들어가도 패칭은 이루어지지 않는다
                router.push(`/order/${quantity}`, undefined, {
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
const menuBox = css`
  background-color: #fff;
  border-left: solid 1px #ececec;
  border-right: solid 1px #ececec;
  border-bottom: solid 1px #ececec;
`

const price = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: solid 1px #ececec;
  border-right: solid 1px #ececec;
  border-bottom: solid 1px #ececec;
`
const line = css`
  border: solid 1px #ececec;
`
export default OrderModal
