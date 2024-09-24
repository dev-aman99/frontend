import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CRow,
} from '@coreui/react'

const CustomStyles = () => {
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({ product_name: '', sku: '', amount: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevState) => ({ ...prevState, [id]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      try {
        const response = await axios.post('/api/orders/create', formData)
        if (response.status === 200) {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          })
          setTimeout(() => {
            navigate('/orders')
          }, 2000)
        }
      } catch (error) {
        toast.error(error.response.data.extraDetails, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        })
      }
    }
    setValidated(true)
  }

  return (
    <>
      <CForm
        className="row g-3 needs-validation"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <CCol md={4}>
          <CFormLabel htmlFor="product_name">Product Name</CFormLabel>
          <CFormInput
            type="text"
            id="product_name"
            value={formData.product_name}
            onChange={handleChange}
            required
          />
          <CFormFeedback invalid>Please provide a product name.</CFormFeedback>
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="sku">Sku</CFormLabel>
          <CFormInput type="text" id="sku" value={formData.sku} onChange={handleChange} required />
          <CFormFeedback invalid>Please provide a sku.</CFormFeedback>
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="amount">Amount</CFormLabel>
          <CFormInput
            type="number"
            id="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <CFormFeedback invalid>Please provide an amount.</CFormFeedback>
        </CCol>
        <CCol xs={12}>
          <CButton className="me-2" color="primary" type="submit">
            Submit form
          </CButton>
          <Link to="/orders" className="btn btn-primary">
            Cancel
          </Link>
        </CCol>
      </CForm>
      <ToastContainer />
    </>
  )
}

const Validation = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CustomStyles />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Validation
