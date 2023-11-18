import * as React from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import DrawerList from './DrawerList'
import AutoSizeImage from '@components/cs/AutoSizeImage'
import { toSize } from 'styles/globalStyle'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  uid: string
  openDrawer: boolean
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
  setOrderDetailVisible: Dispatch<SetStateAction<boolean>> | undefined
  windowWidth: number
  windowHeight: number
  name: string
}

const MenuDrawer = ({
  openDrawer,
  setOpenDrawer,
  setOrderDetailVisible,
  uid,
  windowWidth,
  windowHeight,
  name,
}: Props) => {
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setOpenDrawer(open)
    }
  const ref = React.useRef<any>()

  return (
    <div>
      <AutoSizeImage
        src={'/images/menuIcon.png'}
        width={toSize(windowWidth, windowHeight, 30)}
        height={toSize(windowWidth, windowHeight, 30)}
        onClick={() => setOpenDrawer(!openDrawer)}
      />
      <SwipeableDrawer
        anchor="right"
        open={openDrawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        ref={ref}
      >
        <DrawerList
          uid={uid}
          name={name}
          setOpenDrawer={setOpenDrawer}
          setOrderDetailVisible={setOrderDetailVisible}
        />
      </SwipeableDrawer>
    </div>
  )
}

export default MenuDrawer
