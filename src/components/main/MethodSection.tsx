import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSText from '@components/cs/CSText'
import React from 'react'

const MethodSection = () => {
  const methodData = [
    {
      title: '해동하기',
      content: '냉동된 육수를 수돗물에서 해동한다.',
      imageUrl: '/images/way1.png',
    },
    {
      title: '끓여먹기',
      content:
        '냄비에 육수와 고기를 같이 넣고 끓인 후\n대파, 후추, 소금 등을 알맞게 넣어드세요.',
      imageUrl: '/images/way2.png',
    },
  ]

  return (
    <div>
      <CSText
        size={2.4}
        fontFamily={'SeoulHangangEB'}
        color={'#3e3737'}
        marginTop={6}
        marginBottom={4}
        lineHeight={0.83}
        textAlignCenter
      >
        맛있게 먹는 법 및 보관 방법
      </CSText>
      <div
        css={{
          width: '100%',
          padding: '2rem',
          backgroundColor: '#c4edff',
        }}
      >
        <div
          css={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            paddingTop: '3.4rem',
            paddingBottom: `2.6rem`,
          }}
        >
          <CSText
            size={1.2}
            color={'#5d5d5d'}
            lineHeight={1.33}
            textAlignCenter
          >
            달인의 가마솥 설렁탕, 한우곰탕, 갈비탕
          </CSText>
          <CSText
            size={2}
            color="#3e3737"
            lineHeight={1}
            textAlignCenter
            fontFamily="SeoulHangangEB"
            marginTop={1}
            marginBottom={4}
          >
            맛있게 먹는 방법
          </CSText>
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              gap: '3rem',
              paddingLeft: '3rem',
              paddingRight: '3rem',
              whiteSpace: 'pre-line',
            }}
          >
            {methodData.map((value, index) => (
              <div
                key={index}
                css={{
                  width: '100%',
                  display: 'flex',
                  gap: '2rem',
                  paddingBottom: index === 0 ? '3rem' : 0,
                  borderBottom: index === 0 ? '1px dotted #94d5ff' : undefined,
                }}
              >
                <div css={{ width: '9rem' }}>
                  <AutoSizeImage src={value.imageUrl} width={9} height={9} />
                </div>
                <div>
                  <CSText
                    size={1.5}
                    color="#15c9de"
                    lineHeight={1.33}
                    fontFamily="PretendardBold"
                  >
                    {`0${index + 1} ${value.title}`}
                  </CSText>
                  <CSText
                    size={1}
                    color="#5d5d5d"
                    lineHeight={1.5}
                    marginTop={1}
                  >
                    {value.content}
                  </CSText>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          css={{
            padding: '2rem 1.6rem',
            height: '10rem',
            backgroundColor: '#77bfdf',
            marginTop: '1.8rem',
            borderRadius: '1.2rem',
            whiteSpace: 'pre-line',
          }}
        >
          <CSText
            size={1.4}
            fontFamily={'PretendardBold'}
            color="#fff"
            lineHeight={1.21}
          >
            유통기한 안내
          </CSText>
          <CSText size={1.2} color="#fff" lineHeight={1.42} marginTop={1.3}>
            {`냉동보관, 6개월\n해동 후 개봉된 제품은 다시 냉동하지 마시고 바로 드세요.`}
          </CSText>
        </div>
      </div>
    </div>
  )
}

export default MethodSection
