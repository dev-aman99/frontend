import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { MdEmail } from 'react-icons/md'
import axios from 'axios'
import { cilLockLocked } from '@coreui/icons'
import { useAuth } from '../../../store/auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [theme, setTheme] = useState('light') // Default to 'light'
  const navigate = useNavigate()
  const { storeTokenToLocal } = useAuth()

  useEffect(() => {
    // Get theme from localStorage
    const storedTheme = localStorage.getItem('coreui-free-react-admin-template-theme')
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/login', { email, password })
      const token = response.data.token

      // Fetch user data after logging in
      const userResponse = await axios.get('/api/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const userData = userResponse.data.msg ;
      
      storeTokenToLocal(token);

      // Create toast message with user data
      const toastMessage = `Hello, ${userData.name} ! Welcome.`
      navigate('/dashboard', { state: { toastMessage } })
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        if (error.response.data.extraDetails) {
          setError(error.response.data.extraDetails);
        } else {
          setError(error.response.data.message);
        }
      } else {
        setError('Invalid credentials.');
      }
      setTimeout(() => {
        setError('')
      }, 2000)
    }
  }

  const textColor = theme === 'dark' ? 'white' : 'black'

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4 bg-primary" style={{ width: '40%', flex: 'unset' }}>
                <CCardBody className="d-flex flex-column align-items-center justify-content-center">
                  <h1 style={{ color: textColor }}>Login</h1>
                  <p className="text-body-secondary" style={{ color: textColor }}>
                    Sign In to your account
                  </p>
                </CCardBody>
              </CCard>
              <CCard className="text-white py-5" style={{ width: '60%' }}>
                <CCardBody className="text-center">
                  <CForm onSubmit={handleSubmit}>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <MdEmail />
                      </CInputGroupText>
                      <CFormInput
                        name="email"
                        placeholder="Email"
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        name="password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login 