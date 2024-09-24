import React from 'react'
import CIcon from '@coreui/icons-react'
import { 
  cilCreditCard, 
  cilSpeedometer, 
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  }, 
  {
    component: CNavItem,
    name: 'Order',
    to: '/orders',
    icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
  },
]

export default _nav
