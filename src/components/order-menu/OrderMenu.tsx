import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSSpan from '@components/cs/CSSpan'
import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import { menuData } from 'src/constants/products'
import { calculateTotalPrice } from 'src/function/calculateTotalPrice'

interface Props {
  quantityArr: number[]
  uid?: string
}

const OrderMenu = ({ quantityArr, uid }: Props) => {
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
          padding: '2rem 2rem 0 2rem',
          border: '1px solid #ececec',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
        }}
      >
        <CSText size={1.2} fontFamily={'PretendardBold'} lineHeight={1.17}>
          주문 상품
        </CSText>
        {newData.map((menu, index) => (
          <div key={index}>
            {menu.quantity !== 0 && (
              <div
                css={{
                  display: 'flex',
                  gap: '1rem',
                  paddingTop: '1.5rem',
                  paddingBottom: '1.4rem',
                  borderTop: index === 0 ? 'none' : 'solid 1px #ececec',
                }}
              >
                <div>
                  <AutoSizeImage
                    src={menu.image_url}
                    width={4}
                    height={4}
                    borderRadius={0.5}
                  />
                </div>
                <div
                  css={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <CSText size={1.3} lineHeight={1.15}>
                    {menu.title}
                  </CSText>
                  <CSText size={1.3} lineHeight={1.15}>
                    {menu.price}
                    <span css={line} />
                    <CSSpan size={1.3} lineHeight={1.15}>
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
          padding: '1.8rem 1.6rem',
          borderLeft: '1px solid #ececec',
          borderRight: '1px solid #ececec',
          borderBottom: '1px solid #ececec',
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px',
        }}
      >
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <CSText size={1.2} color="#818181" lineHeight={1.67}>
            총 결제 금액 + 배송비 (
            {calculateTotalPrice(quantityArr, 0) > 70000 ? '0원' : '4000원'})
          </CSText>
          <CSText
            size={1.5}
            fontFamily="PretendardBold"
            color="#15c9de"
            lineHeight={1.18}
          >
            {calculateTotalPrice(quantityArr, 0) > 70000
              ? calculateTotalPrice(quantityArr, 0, uid).toLocaleString()
              : calculateTotalPrice(quantityArr, 4000, uid).toLocaleString()}
            원
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
