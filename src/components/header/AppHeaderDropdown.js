import React,{ useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilBell, cilLockLocked, cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'
import avatar8 from './../../assets/images/avatars/dummy.jpg'
import {useAuth} from '../../store/auth'

const AppHeaderDropdown = () => { 
  const { userData } = useAuth();
  const userImage = userData && userData.image ? `/src/assets/images/avatars/${userData.image}` : avatar8
   
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={userImage} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
        <Link className="dropdown-item" to="/profile-setting">
          <CIcon icon={cilUser} className="me-2" />
          Profile Settings
        </Link>
        <CDropdownDivider />
        <Link className="dropdown-item" to="/logout">
          <CIcon icon={cilLockLocked} className="me-2" />
          Lock Account
        </Link>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
