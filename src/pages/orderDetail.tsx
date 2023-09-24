import AutoSizeImage from '@components/cs/AutoSizeImage'
import Button from '@components/cs/Button'
import CSSpan from '@components/cs/CSSpan'
import CSText from '@components/cs/CSText'
import Line from '@components/cs/Line'
import MainHeader from '@components/cs/MainHeader'
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
      {data &&
        data.map((value, index) => {
          return (
            <div key={index}>
              <div
                css={{
                  padding: `0 ${getSize(20)}px`,
                  marginBottom: `${getSize(30)}px`,
                }}
              >
                <div css={[product, { marginTop: `${getSize(20)}px` }]}>
                  <CSText
                    size={15}
                    fontFamily={'PretendardBold'}
                    color={'#000'}
                    lineHeight={1.2}
                  >
                    {'주문 상품'}
                  </CSText>
                  <CSText
                    size={13}
                    fontFamily={'PretendardRegular'}
                    color={'#8b8b8b'}
                    lineHeight={1.15}
                  >
                    {'주문일 : '}
                    <CSSpan
                      size={13}
                      fontFamily={'PretendardRegular'}
                      color={'#8b8b8b'}
                      lineHeight={1.15}
                    >
                      {value.timestamp}
                    </CSSpan>
                  </CSText>
                </div>
                <div css={[product]}>
                  <div>
                    <CSText
                      size={17}
                      fontFamily={'PretendardBold'}
                      color={'#000'}
                      lineHeight={1.18}
                      marginTop={30}
                    >
                      {value.menu}
                    </CSText>
                    <CSText
                      size={15}
                      fontFamily={'PretendardRegular'}
                      color={'#000'}
                      lineHeight={1.2}
                      marginTop={12}
                    >
                      {'주문수량 : '}
                      <CSSpan
                        size={15}
                        fontFamily={'PretendardRegular'}
                        color={'#000'}
                        lineHeight={1.2}
                      >
                        {`${value.quantity}개`}
                      </CSSpan>
                    </CSText>
                    <CSText
                      size={15}
                      fontFamily={'PretendardRegular'}
                      color={'#000'}
                      lineHeight={1.2}
                      marginTop={12}
                    >
                      {'총 가격 : '}
                      <CSSpan
                        size={15}
                        fontFamily={'PretendardRegular'}
                        color={'#000'}
                        lineHeight={1.2}
                      >
                        {`${value.totalPrice}원`}
                      </CSSpan>
                    </CSText>
                  </div>
                  <div css={{ marginTop: `${getSize(30)}px` }}>
                    <AutoSizeImage
                      src={'/images/main_img@3x.png'}
                      width={getSize(60)}
                      height={getSize(60)}
                    />
                  </div>
                </div>
              </div>
              <Line backgroundColor={'#f6f6f6'} />
              <div
                css={{
                  padding: `0 ${getSize(20)}px`,
                  marginTop: `${getSize(20)}px`,
                  marginBottom: `${getSize(20)}px`,
                }}
              >
                <CSText
                  size={15}
                  fontFamily={'PretendardBold'}
                  color={'#000'}
                  lineHeight={1.2}
                >
                  {'배송 정보'}
                </CSText>
                <div css={[carrierInfo, { marginTop: `${getSize(20)}px` }]}>
                  <div css={{ width: `${getSize(78)}px` }}>
                    <CSText
                      size={15}
                      fontFamily={'PretendardRegular'}
                      color={'#8b8b8b'}
                      lineHeight={1.2}
                    >
                      {'받는 사람'}
                    </CSText>
                  </div>

                  <CSText
                    size={15}
                    fontFamily={'PretendardRegular'}
                    color={'#000'}
                    lineHeight={1.2}
                    marginLeft={31}
                  >
                    {value.name}
                  </CSText>
                </div>
                <div css={[carrierInfo, { marginTop: ` ${getSize(20)}px` }]}>
                  <div css={{ width: `${getSize(78)}px` }}>
                    <CSText
                      size={15}
                      fontFamily={'PretendardRegular'}
                      color={'#8b8b8b'}
                      lineHeight={1.2}
                    >
                      {'핸드폰 번호'}
                    </CSText>
                  </div>
                  <CSText
                    size={15}
                    fontFamily={'PretendardRegular'}
                    color={'#000'}
                    lineHeight={1.2}
                    marginLeft={31}
                  >
                    {value.phoneNumber}
                  </CSText>
                </div>
                <div css={[carrierInfo, { marginTop: `${getSize(20)}px` }]}>
                  <div css={{ width: `${getSize(78)}px` }}>
                    <CSText
                      size={15}
                      fontFamily={'PretendardRegular'}
                      color={'#8b8b8b'}
                      lineHeight={1.2}
                    >
                      {'주소'}
                    </CSText>
                  </div>
                  <div
                    css={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginLeft: `${getSize(31)}px`,
                    }}
                  >
                    <CSText
                      size={15}
                      fontFamily={'PretendardRegular'}
                      color={'#000'}
                      lineHeight={1.2}
                    >
                      {value.address}
                    </CSText>
                    <CSText
                      size={15}
                      fontFamily={'PretendardRegular'}
                      color={'#000'}
                      lineHeight={1.2}
                    >
                      {value.addressDetail}
                    </CSText>
                  </div>
                </div>
                <div css={[carrierInfo, { marginTop: ` ${getSize(20)}px` }]}>
                  <div css={{ width: `${getSize(78)}px` }}>
                    <CSText
                      size={15}
                      fontFamily={'PretendardRegular'}
                      color={'#8b8b8b'}
                      lineHeight={1.2}
                    >
                      {'우편 번호'}
                    </CSText>
                  </div>
                  <CSText
                    size={15}
                    fontFamily={'PretendardRegular'}
                    color={'#000'}
                    lineHeight={1.2}
                    marginLeft={31}
                  >
                    {value.postCode}
                  </CSText>
                </div>
                <div css={[carrierInfo, { marginTop: `${getSize(20)}px` }]}>
                  <div css={{ width: `${getSize(78)}px` }}>
                    <CSText
                      size={15}
                      fontFamily={'PretendardRegular'}
                      color={'#8b8b8b'}
                      lineHeight={1.2}
                    >
                      {'배송 요청사항'}
                    </CSText>
                  </div>
                  <CSText
                    size={15}
                    fontFamily={'PretendardRegular'}
                    color={'#000'}
                    lineHeight={1.2}
                    marginLeft={31}
                  >
                    {value.carrierRequest}
                  </CSText>
                </div>
                <div css={[carrierInfo, { marginTop: `${getSize(20)}px` }]}>
                  <div css={{ width: `${getSize(78)}px` }}>
                    <CSText
                      size={15}
                      fontFamily={'PretendardRegular'}
                      color={'#8b8b8b'}
                      lineHeight={1.2}
                    >
                      {'배송현황'}
                    </CSText>
                  </div>
                  <CSText
                    size={15}
                    fontFamily={'PretendardRegular'}
                    color={'#000'}
                    lineHeight={1.2}
                    marginLeft={31}
                  >
                    {value.status === 'DONE' ? '상품준비' : value.status}
                  </CSText>
                </div>
                <div css={[carrierInfo, { marginTop: `${getSize(20)}px` }]}>
                  <div css={{ width: `${getSize(78)}px` }}>
                    <CSText
                      size={15}
                      fontFamily={'PretendardRegular'}
                      color={'#8b8b8b'}
                      lineHeight={1.2}
                    >
                      {'영수증'}
                    </CSText>
                  </div>
                  {value.receipt && (
                    <Link href={value.receipt}>
                      <CSText
                        size={15}
                        fontFamily={'PretendardRegular'}
                        color={'blue'}
                        lineHeight={1.2}
                        marginLeft={31}
                        textDecoration={'underline'}
                      >
                        {'영수증'}
                      </CSText>
                    </Link>
                  )}
                </div>

                <div css={[btnWrapper, { marginTop: `${getSize(30)}px` }]}>
                  <Button
                    btnWidth={155}
                    btnHeight={46}
                    fontSize={14}
                    backgroundColor={'#fff'}
                    fontColor={'#000'}
                    borderRadius={4}
                    onClick={() => router.push(`/comment?orderId=${value.id}`)}
                  >
                    후기작성
                  </Button>
                </div>
              </div>
              <Line backgroundColor={'#f5f0e8'} />
            </div>
          )
        })}
    </div>
  )
}

const product = css`
  display: flex;
  justify-content: space-between;
`

const carrierInfo = css`
  display: flex;
`

const btnWrapper = css`
  display: flex;
  justify-content: flex-end;
`
export default OrderDetail

{
  /* <div>메뉴: {value.menu}</div>
              <div>수량: {value.quantity}</div>
              <div>가격: {value.totalPrice}</div>
              <div>받는사람: {value.name}</div>
              <div>핸드폰 번호: {value.phoneNumber}</div>
              <div>주소: {value.address}</div>
              <div>상세주소: {value.addressDetail}</div>
              <div>우편번호: {value.postCode}</div>
              <div css={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>배송현황: {value.status}</div>
                {value.status === '상품준비' && (
                  <Button
                    btnWidth={155}
                    btnHeight={46}
                    fontSize={14}
                    backgroundColor={'#fff'}
                    fontColor={'#000'}
                    borderRadius={4}
                    onClick={() => router.push(`/comment?orderId=${value.id}`)}
                  >
                    후기작성
                  </Button>
                )}
              </div> */
}
