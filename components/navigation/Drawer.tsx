import * as React from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import MenuIcon from '@mui/icons-material/Menu'
import { css } from '@emotion/react'
import DrawerList from './DrawerList'

interface Props {
  uid: string
  openDrawer: boolean
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

const MenuDrawer = ({ openDrawer, setOpenDrawer, uid }: Props) => {
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
        <MenuIcon css={menuIcon} onClick={() => setOpenDrawer(!openDrawer)} />
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

const menuIcon = css`
  width: 2rem;
  height: 2rem;
`
export default MenuDrawer
