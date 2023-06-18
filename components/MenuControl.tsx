import React, { Dispatch, SetStateAction } from 'react'
import { NativeSelect } from '@mantine/core'

interface MenuInputProps {
  value: string | undefined
  setValue: Dispatch<SetStateAction<string | undefined>>
}

const MenuControl = ({ value, setValue }: MenuInputProps) => {
  return (
    <NativeSelect
      placeholder="메뉴를 선택해주세요."
      data={['한우 소고기 국밥', '얼큰 한우 소고기 국밥', '불고기']}
      rightSectionWidth={40}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  )
}

export default MenuControl
