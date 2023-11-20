import AutoSizeImage from '@components/cs/AutoSizeImage'
import CSText from '@components/cs/CSText'
import React, { Dispatch, SetStateAction } from 'react'
import { useAppSelector, RootState } from 'src/store'
import { Agreements } from 'src/utils/types'
import { toSize } from 'styles/globalStyle'

interface Props {
  agreements: Agreements
  setAgreements: Dispatch<SetStateAction<Agreements>>
}

const Agreement = ({ agreements, setAgreements }: Props) => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )

  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  const handleAllAgreements = () => {
    setAgreements({
      allAgreements: !agreements.allAgreements,
      over14: !agreements.allAgreements,
      serviceTerms: !agreements.allAgreements,
      privacyPolicy: !agreements.allAgreements,
    })
  }

  const handleSingleAgreement = (agreementName: string) => {
    setAgreements((prevAgreements: any) => ({
      ...prevAgreements,
      [agreementName]: !prevAgreements[agreementName],
    }))
  }

  const data = [
    { title: '서비스 이용 약관 동의', key: 'serviceTerms' },
    { title: '개인정보 수집 및 이용 동의', key: 'privacyPolicy' },
    { title: '14세 이상 서비스 이용 약관 동의', key: 'over14' },
  ]
  return (
    <div className="mt-8">
      <label
        css={{
          display: 'flex',
          justifyItems: 'center',
          gap: 4,
          marginTop: '20px',
        }}
      >
        <input
          type="checkbox"
          checked={agreements.allAgreements}
          onChange={handleAllAgreements}
          hidden
        />
        <AutoSizeImage
          src={`/images/${
            agreements.allAgreements ? 'checkbox' : 'checkboxnone'
          }.png`}
          width={getSize(16)}
          height={getSize(16)}
        />
        <CSText size={13} color="#8b8b8b" lineHeight={1.15}>
          전체동의
        </CSText>
      </label>
      <ul>
        {data.map((value, index) => (
          <li key={index}>
            <label
              css={{
                display: 'flex',
                justifyItems: 'center',
                gap: 4,
                marginTop: '2px',
              }}
            >
              <input
                type="checkbox"
                checked={agreements[value.key]}
                onChange={() => handleSingleAgreement(value.key)}
                hidden
              />
              <AutoSizeImage
                src={`/images/${
                  agreements[value.key] ? 'checkbox' : 'checkboxnone'
                }.png`}
                width={getSize(16)}
                height={getSize(16)}
              />
              <CSText size={13} color="#8b8b8b" lineHeight={1.15}>
                {value.title} (필수)
              </CSText>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Agreement
