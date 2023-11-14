import Button from '@components/cs/Button'
import CSSpan from '@components/cs/CSSpan'
import CSText from '@components/cs/CSText'
import MainHeader from '@components/cs/MainHeader'
import OrderMenu from '@components/order-menu/OrderMenu'
import { css } from '@emotion/react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useAppSelector, RootState } from 'src/store'
import { toSize } from 'styles/globalStyle'
import { OrderProps } from 'types/types'

const OrderDetail = () => {
  const router = useRouter()

  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  const { data } = useQuery<{ items: OrderProps[] }, unknown, OrderProps[]>({
    queryKey: [`/api/get-orderDetail?id=${router.query.uid}`],
    queryFn: () =>
      fetch(`/api/get-orderDetail?id=${router.query.uid}`).then((res) =>
        res.json().then((data) => data.items)
      ),
  })

  return (
    <div css={{ overflowY: 'auto' }}>
      <MainHeader windowWidth={width} windowHeight={height} uid={''} />
      <div
        css={{
          padding: `0 ${getSize(20)}px`,
        }}
      >
        <CSText
          size={24}
          fontFamily={'PretendardBold'}
          color="#000"
          lineHeight={0.83}
        >
          주문 내역
        </CSText>
        <CSText size={15} color={'#818181'} lineHeight={1.22} marginTop={12}>
          주문하신 내역을 확인해보세요.
        </CSText>
        {data &&
          data.map((value, index) => {
            return (
              <div key={index}>
                <CSText
                  size={13}
                  color="#8b8b8b"
                  lineHeight={1.15}
                  marginTop={40}
                  marginBottom={5}
                >
                  주문일:
                  <CSSpan size={13} color="#8b8b8b" lineHeight={1.15}>
                    {value.timestamp}
                  </CSSpan>
                </CSText>
                <OrderMenu quantityArr={value.quantity} />
                <div
                  css={{
                    marginTop: `${getSize(20)}px`,
                    marginBottom: `${getSize(20)}px`,
                  }}
                >
                  <CSText
                    size={15}
                    fontFamily={'PretendardBold'}
                    color="#000"
                    lineHeight={1.2}
                  >
                    받는사람
                  </CSText>
                  <div css={[carrierInfo, { marginTop: `${getSize(20)}px` }]}>
                    <div css={{ width: `${getSize(78)}px` }}>
                      <CSText size={15} color="#8b8b8b" lineHeight={1.2}>
                        {'받는 사람'}
                      </CSText>
                    </div>

                    <CSText
                      size={15}
                      color="#000"
                      lineHeight={1.2}
                      marginLeft={31}
                    >
                      {value.name}
                    </CSText>
                  </div>
                  <div css={[carrierInfo, { marginTop: ` ${getSize(20)}px` }]}>
                    <div css={{ width: `${getSize(78)}px` }}>
                      <CSText size={15} color="#8b8b8b" lineHeight={1.2}>
                        핸드폰 번호
                      </CSText>
                    </div>
                    <CSText
                      size={15}
                      color="#000"
                      lineHeight={1.2}
                      marginLeft={31}
                    >
                      {value.phoneNumber}
                    </CSText>
                  </div>
                  <div css={[carrierInfo, { marginTop: `${getSize(20)}px` }]}>
                    <div css={{ width: `${getSize(78)}px` }}>
                      <CSText size={15} color="#8b8b8b" lineHeight={1.2}>
                        주소
                      </CSText>
                    </div>
                    <div
                      css={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: `${getSize(31)}px`,
                      }}
                    >
                      <CSText size={15} color="#000" lineHeight={1.2}>
                        {value.address}
                      </CSText>
                      <CSText size={15} color="#000" lineHeight={1.2}>
                        {value.addressDetail}
                      </CSText>
                    </div>
                  </div>
                  <div css={[carrierInfo, { marginTop: ` ${getSize(20)}px` }]}>
                    <div css={{ width: `${getSize(78)}px` }}>
                      <CSText size={15} color="#8b8b8b" lineHeight={1.2}>
                        우편 번호
                      </CSText>
                    </div>
                    <CSText
                      size={15}
                      color="#000"
                      lineHeight={1.2}
                      marginLeft={31}
                    >
                      {value.postCode}
                    </CSText>
                  </div>
                  <div css={[carrierInfo, { marginTop: `${getSize(20)}px` }]}>
                    <div css={{ width: `${getSize(78)}px` }}>
                      <CSText size={15} color="#8b8b8b" lineHeight={1.2}>
                        배송 요청사항
                      </CSText>
                    </div>
                    <CSText
                      size={15}
                      color="#000"
                      lineHeight={1.2}
                      marginLeft={31}
                    >
                      {value.carrierRequest}
                    </CSText>
                  </div>
                  <div css={[carrierInfo, { marginTop: `${getSize(20)}px` }]}>
                    <div css={{ width: `${getSize(78)}px` }}>
                      <CSText size={15} color="#8b8b8b" lineHeight={1.2}>
                        배송현황
                      </CSText>
                    </div>
                    <CSText
                      size={15}
                      color="#000"
                      lineHeight={1.2}
                      marginLeft={31}
                    >
                      {value.status === 'DONE' ? '상품준비' : value.status}
                    </CSText>
                  </div>
                  <div css={[carrierInfo, { marginTop: `${getSize(20)}px` }]}>
                    <div css={{ width: `${getSize(78)}px` }}>
                      <CSText size={15} color="#8b8b8b" lineHeight={1.2}>
                        영수증
                      </CSText>
                    </div>
                    {value.receipt && (
                      <Link href={value.receipt}>
                        <CSText
                          size={15}
                          color="blue"
                          lineHeight={1.2}
                          marginLeft={31}
                          textDecoration={'underline'}
                        >
                          영수증
                        </CSText>
                      </Link>
                    )}
                  </div>

                  <div css={[btnWrapper, { marginTop: `${getSize(30)}px` }]}>
                    <Button
                      btnHeight={46}
                      fontSize={14}
                      backgroundColor="#15c9de"
                      borderColor="#15c9de"
                      fontColor="#fff"
                      borderRadius={8}
                      onClick={() =>
                        router.push(`/comment?orderId=${value.id}`)
                      }
                    >
                      후기작성
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

const carrierInfo = css`
  display: flex;
`

const btnWrapper = css`
  display: flex;
  justify-content: flex-end;
`
export default OrderDetail
