import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
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

const Edit = () => {
  const { id } = useParams() // Get the order ID from the URL
  const [order, setOrder] = useState({ product_name: '', sku: '', amount: '' })
  const [loading, setLoading] = useState(true) // State to handle loading
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/orders/edit/${id}`)
        setOrder(response.data.order)
      } catch (error) {
        console.error('Error fetching order:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [id])

  const handleChange = (e) => {
    const { id, value } = e.target
    setOrder((prevState) => ({ ...prevState, [id]: value }))
  }

  const [validated, setValidated] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      try {
        const response = await axios.post('/api/orders/update', {
          ...order,
          order_id: id,
        })
        if (response.status === 200) {
          toast.success(response.data.message)
          setTimeout(() => {
            navigate('/orders')
          }, 2000)
        }
      } catch (error) {
        toast.error(error.response.data.extraDetails)
      }
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!order) {
    return <div>Order not found</div>
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
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
                  value={order.product_name}
                  onChange={handleChange}
                  required
                />
                <CFormFeedback invalid>Please provide a Product Name.</CFormFeedback>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="sku">SKU</CFormLabel>
                <CFormInput
                  type="text"
                  id="sku"
                  value={order.sku}
                  onChange={handleChange}
                  required
                />
                <CFormFeedback invalid>Please provide a SKU.</CFormFeedback>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="amount">Amount</CFormLabel>
                <CFormInput
                  type="text"
                  id="amount"
                  value={order.amount}
                  onChange={handleChange}
                  required
                />
                <CFormFeedback invalid>Please provide an Amount.</CFormFeedback>
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Edit
