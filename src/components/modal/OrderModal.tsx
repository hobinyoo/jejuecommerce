import Button from '@components/cs/Button'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction, useState } from 'react'
import MenuControl from '@components/MenuControl'
import IconX from '/public/X.svg'
import { RootState, useAppSelector } from 'src/store'
import { toHeightSize, toSize } from 'styles/globalStyle'
import CSText from '@components/cs/CSText'
import PackagingControl from '@components/PackagingControl'
import CSSpan from '@components/cs/CSSpan'
import CountControl from '@components/CountControl'

interface Props {
  uid: string
  orderVisible: boolean
  setOrderVisible: Dispatch<SetStateAction<boolean>>
}

const OrderModal = ({ setOrderVisible }: Props) => {
  const router = useRouter()

  const [selectMenu, setSelectMenu] = useState<string>('메뉴 선택')
  const [quantity, setQuantity] = useState<number>(1)
  const [packaging, setPackaging] = useState<string>('포장 방법 선택')

  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }
  return (
    <div css={overlay}>
      <div css={[orderModal, { height: `${toHeightSize(height, 540)}px` }]}>
        <div
          css={{
            position: 'absolute',
            top: `${getSize(14)}px`,
            right: `${getSize(14)}px`,
          }}
        >
          <IconX onClick={() => setOrderVisible(false)} />
        </div>
        <div css={{ padding: `0 ${getSize(20)}px` }}>
          <CSText
            size={15}
            fontFamily={'PretendardBold'}
            color={'#000'}
            lineHeight={1.25}
            marginTop={30}
          >
            {'메뉴'}
          </CSText>
          <MenuControl selectMenu={selectMenu} setSelectMenu={setSelectMenu} />
          <CSText
            size={15}
            fontFamily={'PretendardBold'}
            color={'#000'}
            lineHeight={1.25}
            marginTop={20}
          >
            {'포장 방법을 선택해주세요.'}
          </CSText>
          <PackagingControl packaging={packaging} setPackaging={setPackaging} />
          <div
            css={[
              decideQuantity,
              {
                width: `${getSize(320)}px`,
                height: `${getSize(80)}px`,
                marginTop: `${getSize(20)}px`,
                padding: `0 ${getSize(20)}px`,
              },
            ]}
          >
            <CSText
              size={13}
              fontFamily={'PretendardRegular'}
              color={'#000'}
              lineHeight={1.15}
              marginTop={13}
            >
              {'한우 소고기 국밥(1300g)'}
              <span
                css={[
                  line,
                  {
                    fontSize: `${getSize(10)}px`,
                    margin: `0 ${getSize(10)}px`,
                    lineHeight: 1.15,
                  },
                ]}
              />
              <CSSpan
                size={13}
                fontFamily={'PretendardRegular'}
                color={'#000'}
                lineHeight={1.15}
              >
                {packaging}
              </CSSpan>
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
            <CSText
              size={13}
              fontFamily={'PretendardRegular'}
              color={'#000'}
              lineHeight={1.18}
            >
              {'총 가격'}
            </CSText>
            <CSText
              size={17}
              fontFamily={'PretendardBold'}
              color={'#000'}
              lineHeight={1.18}
            >
              {quantity && quantity * 11000}원
            </CSText>
          </div>
        </div>
        <div css={buttonWrapper}>
          <Button
            onClick={() =>
              router.push(`/order/한우 소고기 국밥/${quantity}`, undefined, {
                shallow: true,
              })
            }
            btnHeight={50}
            backgroundColor={'#000'}
            fontColor={'#fff'}
            fontSize={17}
          >
            주문하기
          </Button>
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
const decideQuantity = css`
  background-color: #f6f6f6;
  border: solid 1px #ececec;
`
const line = css`
  border: solid 1px #9e9795;
`
const price = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: solid 1px #ececec;
  border-right: solid 1px #ececec;
  border-bottom: solid 1px #ececec;
`

const buttonWrapper = css`
  position: fixed;
  bottom: 0;
  width: 100%;
`
export default OrderModal
