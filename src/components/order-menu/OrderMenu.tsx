import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSSpan from '@components/cs/CSSpan'
import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import { menuData } from 'src/constants/products'
import { calculateTotalPrice } from 'src/function/calculateTotalPrice'
import { useAppSelector, RootState } from 'src/store'
import { toSize } from 'styles/globalStyle'

interface Props {
  quantityArr: number[]
}

const OrderMenu = ({ quantityArr }: Props) => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }
  const newData = menuData
    .map((item, index) => ({
      ...item,
      quantity: quantityArr[index],
    }))
    .filter((item) => item.quantity !== 0)

  return (
    <div>
      <div
        css={{
          padding: `${getSize(20)}px ${getSize(20)}px ${getSize(0)}px ${getSize(
            20
          )}px`,
          border: '1px solid #ececec',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
        }}
      >
        <CSText
          size={12}
          fontFamily={'PretendardBold'}
          color={'#000'}
          lineHeight={1.17}
        >
          주문 상품
        </CSText>
        {newData.map((menu, index) => (
          <div key={index}>
            {menu.quantity !== 0 && (
              <div
                css={{
                  display: 'flex',
                  gap: `${getSize(10)}px`,
                  paddingTop: `${getSize(15)}px`,
                  paddingBottom: `${getSize(14)}px`,
                  borderTop: index === 0 ? 'none' : 'solid 1px #ececec',
                }}
              >
                <div>
                  <AutoSizeImage
                    src={'/images/orderMenu1.png'}
                    width={getSize(40)}
                    height={getSize(40)}
                  />
                </div>
                <div
                  css={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <CSText size={13} color={'#000'} lineHeight={1.15}>
                    {menu.title}
                  </CSText>
                  <CSText size={13} color={'#000'} lineHeight={1.15}>
                    {menu.price}
                    <span css={line} />
                    <CSSpan size={13} color={'#000'} lineHeight={1.15}>
                      수량 {menu.quantity}개
                    </CSSpan>
                  </CSText>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        css={{
          padding: `${getSize(18)}px ${getSize(16)}px`,
          borderLeft: '1px solid #ececec',
          borderRight: '1px solid #ececec',
          borderBottom: '1px solid #ececec',
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px',
        }}
      >
        <div css={{ display: 'flex', justifyContent: 'space-between' }}>
          <CSText size={12} color={'#818181'} lineHeight={1.67}>
            총 결제 금액
          </CSText>
          <CSText
            size={15}
            color={'#15c9de'}
            lineHeight={1.2}
            fontFamily={'PretendardBold'}
          >
            {calculateTotalPrice(quantityArr)}원
          </CSText>
        </div>
      </div>
    </div>
  )
}

const line = css`
  width: 1px;
  height: 10px;
  border: 1px solid #ececec;
  margin-left: 8px;
  margin-right: 8px;
`

export default OrderMenu
