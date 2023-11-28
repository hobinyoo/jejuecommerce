import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'

const PackageMethod = () => {
  return (
    <section
      css={{
        padding: '5rem 2rem 3rem 2rem',
        whiteSpace: 'pre-line',
      }}
    >
      <CSText
        size={2.4}
        fontFamily={'SeoulHangangEB'}
        color={'#3e3737'}
        lineHeight={0.83}
        textAlignCenter
        marginBottom={3}
      >
        포장 이미지 및 포장 방법
      </CSText>
      <CSText
        size={1.4}
        color={'#3e3737'}
        marginTop={2}
        lineHeight={1.38}
        textAlignCenter
        marginBottom={1}
      >
        {`육수를 급냉한 후 스티로폼 박스에 고기와 같이 넣어\n 배송하면 주문 후 3일 이내에 받으시 수 있습니다.`}
      </CSText>
      <AutoSizeImage src={'/images/packing_2.png'} full />
      <AutoSizeImage src={'/images/packing_1.png'} full />
      <AutoSizeImage src={'/images/packing_3.png'} full />
      <div
        css={[
          packageProcess,
          {
            padding: '1.5rem 1.6rem 2rem 2rem',
            borderRadius: '1.2rem',
            marginTop: '3rem',
          },
        ]}
      >
        <div>
          <CSText
            size={1.6}
            color="#fff"
            lineHeight={1.13}
            fontFamily="PretendardBold"
          >
            배송 절차
          </CSText>
          <CSText size={1.3} color="#fff" lineHeight={1.38} marginTop={1}>
            10만원 이상 주문시 배송비 무료
          </CSText>
        </div>

        <AutoSizeImage
          src={'/images/delivery.png'}
          width={4.65}
          height={2.85}
        />
      </div>
    </section>
  )
}

export default PackageMethod
const packageProcess = css`
  display: flex;
  justify-content: space-between;
  background-color: #15c9de;
  align-items: center;
`
