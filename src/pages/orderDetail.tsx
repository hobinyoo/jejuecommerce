import Button from '@components/cs/Button'
import CSSpan from '@components/cs/CSSpan'
import CSText from '@components/cs/CSText'
import MainHeader from '@components/cs/MainHeader'
import OrderMenu from '@components/order-menu/OrderMenu'
import { css } from '@emotion/react'
import { useQuery } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useAppSelector, RootState } from 'src/store'

import { OrderProps } from 'types/types'

const OrderDetail = () => {
  const router = useRouter()

  const ordersInfo = useAppSelector(
    (state: RootState) => state.payment.ordersInfo
  )

  const { data } = useQuery<{ items: OrderProps[] }, unknown, OrderProps[]>({
    queryKey: [`/api/get-orderDetail?id=${router.query.uid}`],
    queryFn: () =>
      fetch(`/api/get-orderDetail?id=${router.query.uid}`).then((res) =>
        res.json().then((data) => data.items)
      ),
  })

  const orderData = isEmpty(ordersInfo) && data ? data : ordersInfo

  return (
    <div css={{ overflowY: 'auto' }}>
      <MainHeader uid={''} />
      <div
        css={{
          padding: '0 2rem',
        }}
      >
        <CSText size={2.4} fontFamily="PretendardBold" lineHeight={0.83}>
          주문 내역
        </CSText>
        <CSText size={1.5} color="#818181" lineHeight={1.22} marginTop={1.2}>
          주문하신 내역을 확인해보세요.
        </CSText>
        {orderData &&
          orderData.map((value, index) => {
            return (
              <div key={index}>
                <CSText
                  size={1.3}
                  color="#8b8b8b"
                  lineHeight={1.15}
                  marginTop={4}
                  marginBottom={0.5}
                >
                  주문일:{' '}
                  <CSSpan size={1.3} color="#8b8b8b" lineHeight={1.15}>
                    {value.timestamp}
                  </CSSpan>
                </CSText>
                <OrderMenu
                  quantityArr={value.quantity}
                  uid={String(router.query.uid)}
                />
                <div
                  css={{
                    marginTop: '2rem',
                    marginBottom: '2rem',
                  }}
                >
                  <CSText
                    size={1.5}
                    fontFamily="PretendardBold"
                    lineHeight={1.2}
                  >
                    받는사람
                  </CSText>
                  <div css={[carrierInfo, { marginTop: '2rem' }]}>
                    <div css={{ width: '9rem' }}>
                      <CSText size={1.5} color="#8b8b8b" lineHeight={1.2}>
                        받는 사람
                      </CSText>
                    </div>

                    <CSText size={1.5} lineHeight={1.2} marginLeft={3.1}>
                      {value.name}
                    </CSText>
                  </div>
                  <div css={[carrierInfo, { marginTop: '2rem' }]}>
                    <div css={{ width: '9rem' }}>
                      <CSText size={1.5} color="#8b8b8b" lineHeight={1.2}>
                        핸드폰 번호
                      </CSText>
                    </div>
                    <CSText size={1.5} lineHeight={1.2} marginLeft={3.1}>
                      {value.phoneNumber}
                    </CSText>
                  </div>
                  <div css={[carrierInfo, { marginTop: '2rem' }]}>
                    <div css={{ width: '9rem' }}>
                      <CSText size={1.5} color="#8b8b8b" lineHeight={1.2}>
                        주소
                      </CSText>
                    </div>
                    <div
                      css={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: '3.1rem',
                      }}
                    >
                      <CSText size={1.5} lineHeight={1.2}>
                        {value.address}
                      </CSText>
                      <CSText size={1.5} lineHeight={1.2}>
                        {value.addressDetail}
                      </CSText>
                    </div>
                  </div>
                  <div css={[carrierInfo, { marginTop: '2rem' }]}>
                    <div css={{ width: '9rem' }}>
                      <CSText size={1.5} color="#8b8b8b" lineHeight={1.2}>
                        우편 번호
                      </CSText>
                    </div>
                    <CSText size={1.5} lineHeight={1.2} marginLeft={3.1}>
                      {value.postCode}
                    </CSText>
                  </div>
                  <div css={[carrierInfo, { marginTop: '2rem' }]}>
                    <div css={{ width: '9rem' }}>
                      <CSText size={1.5} color="#8b8b8b" lineHeight={1.2}>
                        배송 요청사항
                      </CSText>
                    </div>
                    <CSText size={1.5} lineHeight={1.2} marginLeft={3.1}>
                      {value.carrierRequest}
                    </CSText>
                  </div>
                  <div css={[carrierInfo, { marginTop: '1rem' }]}>
                    <div css={{ width: '9rem' }}>
                      <CSText size={1.5} color="#8b8b8b" lineHeight={1.2}>
                        배송현황
                      </CSText>
                    </div>
                    <CSText size={1.5} lineHeight={1.2} marginLeft={3.1}>
                      {value.status === 'DONE' ? '상품준비' : value.status}
                    </CSText>
                  </div>
                  <div css={[carrierInfo, { marginTop: '2rem' }]}>
                    <div css={{ width: '9rem' }}>
                      <CSText size={1.5} color="#8b8b8b" lineHeight={1.2}>
                        영수증
                      </CSText>
                    </div>
                    {value.receipt && (
                      <Link href={value.receipt}>
                        <CSText
                          size={1.5}
                          color="blue"
                          lineHeight={1.2}
                          marginLeft={3.1}
                          textDecoration={'underline'}
                        >
                          영수증
                        </CSText>
                      </Link>
                    )}
                  </div>

                  <div css={[btnWrapper, { marginTop: '3rem' }]}>
                    <Button
                      btnHeight={4.6}
                      fontSize={1.4}
                      backgroundColor={value.content ? '#818181' : '#15c9de'}
                      borderColor={value.content ? '#818181' : '#15c9de'}
                      fontColor="#fff"
                      borderRadius={0.8}
                      onClick={() =>
                        !value.content &&
                        router.push(`/comment?orderId=${value.id}`)
                      }
                    >
                      {value.content ? '작성 완료' : '후기작성'}
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
