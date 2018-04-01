import React from 'react'

import Aux from '../../hoc/Auxiliary'
import classes from './Layout.scss'

const layout = props => {
  return (
    <Aux>
      <div>Toolbar, SideDrawer, BackDrop</div>
      <main className={classes.content}>
        {props.children}
      </main>
    </Aux>
  )
}

export default layout
