import AutoSizeImage from '@components/cs/AutoSizeImage'
import Button from '@components/cs/Button'
import CSSpan from '@components/cs/CSSpan'
import CSText from '@components/cs/CSText'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useAppSelector, RootState } from 'src/store'
import { toSize } from 'styles/globalStyle'

interface Props {
  setStartEnabled: Dispatch<SetStateAction<string | null>>
}

const StartPage = ({ setStartEnabled }: Props) => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )

  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  useEffect(() => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }, [])
  return (
    <div
      css={{
        padding: `${getSize(30)}px ${getSize(20)}px`,
        height: 'calc(var(--vh, 1vh) * 100)',
        width: '100%',
        zIndex: 3,
        position: 'fixed',
        backgroundColor: 'white',
      }}
    >
      <div
        css={{
          width: '100%',
          height: '100%',
          position: 'relative',
          whiteSpace: 'pre-line',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <CSText
          size={32}
          fontFamily={'PretendardBold'}
          color={'#3e3737'}
          lineHeight={1.38}
          textAlignCenter
        >
          {`Welcome\n달인의 가마솥`}
        </CSText>
        <CSText
          size={20}
          color={'#3e3737'}
          lineHeight={1.4}
          textAlignCenter
          marginTop={40}
          marginBottom={15}
        >
          회원가입 시
          <CSSpan size={20} fontFamily={'PretendardBold'} color={'#15c9de'}>
            {' '}
            10% 상시 할인
          </CSSpan>
        </CSText>
        <AutoSizeImage
          src={'/images/welcome_coupon.png'}
          width={getSize(192)}
          height={getSize(106)}
        />
        <CSText
          size={20}
          color={'#3e3737'}
          lineHeight={1.4}
          textAlignCenter
          marginTop={60}
        >
          70,000원 이상 주문시
        </CSText>
        <CSText
          size={20}
          color={'#3e3737'}
          lineHeight={1.4}
          textAlignCenter
          marginBottom={15}
        >
          도외
          <CSSpan size={20} fontFamily={'PretendardBold'} color={'#15c9de'}>
            {' '}
            택배비 무료
          </CSSpan>
        </CSText>
        <AutoSizeImage
          src={'/images/welcome_delivery.png'}
          width={getSize(192)}
          height={getSize(106)}
        />
        <div css={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <Button
            onClick={() => setStartEnabled('noShow')}
            btnHeight={46}
            backgroundColor="#15c9de"
            fontColor="#fff"
            fontSize={14}
            borderRadius={8}
            borderColor="#15c9de"
          >
            시작하기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StartPage
