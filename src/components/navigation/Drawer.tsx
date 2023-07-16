import * as React from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import DrawerList from './DrawerList'
import AutoSizeImage from '@components/cs/AutoSizeImage'
import { toSize } from 'styles/globalStyle'

interface Props {
  uid: string
  openDrawer: boolean
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
  windowWidth: number
  windowHeight: number
}

const MenuDrawer = ({
  openDrawer,
  setOpenDrawer,
  uid,
  windowWidth,
  windowHeight,
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

  return (
    <div>
      <React.Fragment>
        <AutoSizeImage
          src={'/images/gnb_menu@3x.png'}
          width={toSize(windowWidth, windowHeight, 30)}
          height={toSize(windowWidth, windowHeight, 30)}
          onClick={() => setOpenDrawer(!openDrawer)}
        />
        <SwipeableDrawer
          anchor={'right'}
          open={openDrawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <DrawerList uid={uid} />
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  )
}

export default MenuDrawer
