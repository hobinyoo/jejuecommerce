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
        padding: `${getSize(50)}px ${getSize(20)}px ${getSize(30)}px ${getSize(
          20
        )}px`,
      }}
    >
      <CSText
        size={24}
        fontFamily={'SeoulHangangEB'}
        color={'#3e3737'}
        lineHeight={0.83}
        textAlignCenter
      >
        포장 이미지 및 포장 방법
      </CSText>
      <CSText
        size={15}
        color={'#3e3737'}
        lineHeight={1.33}
        textAlignCenter
        marginTop={50}
        marginBottom={44}
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
            padding: `${getSize(15)}px ${getSize(16)}px ${getSize(
              20
            )}px ${getSize(20)}px`,
            borderRadius: `${getSize(12)}px`,
            marginTop: `${getSize(30)}px`,
          },
        ]}
      >
        <div>
          <CSText
            size={16}
            color={'#fff'}
            lineHeight={1.13}
            fontFamily="PretendardBold"
          >
            배송 절차
          </CSText>
          <CSText size={13} color={'#fff'} lineHeight={1.38} marginTop={10}>
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
