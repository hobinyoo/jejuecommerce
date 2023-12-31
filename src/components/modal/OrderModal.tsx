import Button from '@components/cs/Button'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { modalOverlay } from 'styles/globalStyle'
import CSText from '@components/cs/CSText'
import CountControl from '@components/CountControl'
import AutoSizeImage from '@components/cs/AutoSizeImage'
import { calculateTotalPrice } from 'src/function/calculateTotalPrice'
import CSSpan from '@components/cs/CSSpan'

interface Props {
  uid: string
  orderVisible: boolean
  setOrderVisible: Dispatch<SetStateAction<boolean>>
}

const data = [
  {
    title: '한우설렁탕',
    content: '(한우사골곰탕: 600g 2포, 고기: 한우사태 80g)',
    price: '13,000원',
  },
  {
    title: '한우곰탕',
    content: '(한우고기육수: 600g 2포,고기: 한우사태 80g)',
    price: '12,000원',
  },
  {
    title: '한우갈비탕',
    content: '(한우고기육수: 600g 2포, 고기: 국내산 한우갈비 250g)',
    price: '18,000원',
  },
]

const OrderModal = ({ setOrderVisible, uid }: Props) => {
  const router = useRouter()

  const [quantity, setQuantity] = useState<number[]>([0, 0, 0])

  const handleOrder = () => {
    const allZeros = quantity.every((element) => element === 0)
    if (allZeros) return alert('메뉴를 선택해주세요.')
    router.push(`/order/${quantity}`, undefined, {
      shallow: true,
    })
    //shallow getStaticProps, getServerSideProps, getInitialProps를 실행하지 않고 업데이트 된 pathname과 query를 받아 url을 바꿔줄 수 있다.
    //뒤로가기했다가 다시 숫자를 바꾸고 들어가도 패칭은 이루어지지 않는다
  }

  return (
    <div css={modalOverlay}>
      <div css={[orderModal, { height: '57.7rem', overflowY: 'auto' }]}>
        <div
          css={{
            padding: '2rem',
          }}
        >
          <div css={buttonWrapper}>
            <AutoSizeImage
              src={'/images/btnX.png'}
              width={1.4}
              height={1.4}
              onClick={() => setOrderVisible(false)}
            />
          </div>
          {data.map(({ title, content, price }, index) => (
            <div
              key={index}
              css={[
                menuBox,
                {
                  marginTop: `${index === 0 && '1.6rem'}`,
                  borderTop: `${index === 0 && 'solid 1px #ececec'}`,
                  borderTopRightRadius: `${index === 0 && '1rem'}`,
                  borderTopLeftRadius: `${index === 0 && '1rem'}`,
                  width: '32rem',
                  padding: '1.5rem 2rem',
                },
              ]}
            >
              <div
                css={{
                  display: 'flex',
                  gap: '0.8rem',
                }}
              >
                <AutoSizeImage
                  src={'/images/checkbox.png'}
                  width={1.6}
                  height={1.6}
                />

                <CSText
                  size={1.4}
                  lineHeight={1.14}
                  fontFamily="PretendardBold"
                >
                  {title}
                </CSText>
              </div>
              <CSText
                size={1.1}
                color={'#818181'}
                lineHeight={1.67}
                marginTop={0.2}
                marginBottom={1}
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
                  size={1.5}
                  lineHeight={1.67}
                  fontFamily="PretendardBold"
                >
                  {price}
                </CSText>
              </div>
            </div>
          ))}

          <div css={price}>
            <div css={{ display: 'flex', justifyContent: 'space-between' }}>
              <CSText size={1.2} color="#818181" lineHeight={1.67}>
                결제 금액
              </CSText>

              <CSText size={1.2} color="#818181" lineHeight={1.67}>
                {calculateTotalPrice(quantity, uid).toLocaleString()}원
                {uid && (
                  <CSSpan size={1} color="#de1515" lineHeight={1.18}>
                    {' '}
                    5%
                  </CSSpan>
                )}
              </CSText>
            </div>
            <div css={{ display: 'flex', justifyContent: 'space-between' }}>
              <CSText size={1.2} color="#818181" lineHeight={1.67}>
                배송비
              </CSText>

              <CSText size={1.2} color="#818181" lineHeight={1.67}>
                {calculateTotalPrice(quantity, uid) >= 100000
                  ? '0원'
                  : '6,000원'}
              </CSText>
            </div>
            <div css={{ display: 'flex', justifyContent: 'space-between' }}>
              <CSText size={1.2} color="#818181" lineHeight={1.67}>
                총 결제 금액
              </CSText>

              <CSText
                size={1.5}
                fontFamily="PretendardBold"
                color="#15c9de"
                lineHeight={1.18}
              >
                {calculateTotalPrice(quantity, uid) >= 100000
                  ? calculateTotalPrice(quantity, uid).toLocaleString()
                  : (
                      calculateTotalPrice(quantity, uid) + 6000
                    ).toLocaleString()}
                원
              </CSText>
            </div>
          </div>
          <CSText
            size={1}
            color="#9e9e9e"
            lineHeight={2}
            marginTop={0.5}
            marginBottom={2}
          >
            배송정보
            <span
              css={[
                line,
                {
                  fontSize: '1rem',
                  margin: '0 0.5rem',
                  lineHeight: 1.15,
                },
              ]}
            />
            택배, 배송비 6,000원 (100,000원 이상 주문시 도외 택배비 무료)
          </CSText>
          <div css={buttonWrapper}>
            <Button
              onClick={handleOrder}
              btnHeight={5}
              backgroundColor="#15c9de"
              fontColor="#fff"
              fontSize={1.4}
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

const orderModal = css`
  width: 100%;
  background-color: white;
  position: absolute;
  bottom: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
  border-left: solid 1px #ececec;
  border-right: solid 1px #ececec;
  border-bottom: solid 1px #ececec;
  width: 32rem;
  padding: 1rem 1.8rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
`
const line = css`
  border: solid 1px #ececec;
`
export default OrderModal
