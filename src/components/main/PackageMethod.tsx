import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import { useAppSelector, RootState } from 'src/store'
import { toSize } from 'styles/globalStyle'

const PackageMethod = () => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )

  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  return (
    <section
      css={{
        padding: '5rem 2rem 3rem 2rem',
      }}
    >
      <CSText
        size={2.4}
        fontFamily={'SeoulHangangEB'}
        color={'#3e3737'}
        lineHeight={0.83}
        textAlignCenter
      >
        포장 이미지 및 포장 방법
      </CSText>
      <CSText
        size={1.5}
        color={'#3e3737'}
        lineHeight={1.33}
        textAlignCenter
        marginTop={5}
        marginBottom={4.4}
      >
        포장에 관한 설명이 필요합니다
      </CSText>

      <AutoSizeImage
        src={'/images/packageImg.png'}
        width={getSize(320)}
        height={getSize(320)}
      />
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
            7만원 이상 배송시 배송비 무료
          </CSText>
        </div>

        <AutoSizeImage
          src={'/images/delivery.png'}
          width={getSize(46.5)}
          height={getSize(28.5)}
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
