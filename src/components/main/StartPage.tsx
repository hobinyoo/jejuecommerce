import AutoSizeImage from '@components/cs/AutoSizeImage'
import Button from '@components/cs/Button'
import CSSpan from '@components/cs/CSSpan'
import CSText from '@components/cs/CSText'
import { Dispatch, SetStateAction } from 'react'
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

  return (
    <div
      css={{
        padding: `${getSize(30)}px ${getSize(20)}px`,
        height: 'calc(var(--vh, 1vh) * 100)',
        width: '100%',
        zIndex: 3,
        whiteSpace: 'pre-line',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
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
      <div css={{ flex: 1, marginTop: '4vh' }}>
        <CSText
          size={20}
          color={'#3e3737'}
          lineHeight={1.4}
          textAlignCenter
          marginBottom={15}
        >
          회원가입 시
          <CSSpan size={20} fontFamily={'PretendardBold'} color={'#15c9de'}>
            10% 상시 할인
          </CSSpan>
        </CSText>
        <AutoSizeImage
          src={'/images/welcome_coupon.png'}
          width={getSize(192)}
          height={getSize(106)}
        />
        <div css={{ marginTop: '4vh' }}>
          <CSText size={20} color={'#3e3737'} lineHeight={1.4} textAlignCenter>
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
        </div>
      </div>
      <div
        css={{
          width: '100%',
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          flexDirection: 'column',
        }}
      >
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
  )
}

export default StartPage
